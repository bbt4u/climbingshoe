import { shoes } from "@/data/shoes";
import { brandSizing } from "@/data/sizing";
import type { FormData } from "@/lib/types";

/** Build the Claude prompt for shoe recommendations */
export function buildPrompt(body: FormData): { prompt: string; currentShoesInfo: string } {
  const currentShoesInfo =
    body.currentShoes.includes("none") || body.currentShoes.length === 0
      ? "None — this person does not currently own climbing shoes."
      : body.currentShoes
          .map((id) => {
            const shoe = shoes.find((s) => s.id === id);
            return shoe ? `${shoe.brand} ${shoe.name}` : id;
          })
          .join(", ") + " (these are shoes the climber says fit them well — use as reference for sizing and fit preferences)";

  const shoeDb = JSON.stringify(
    shoes.map((s) => ({
      id: s.id,
      name: `${s.brand} ${s.name}`,
      priceRange: s.priceRange,
      aggressiveness: s.aggressiveness,
      bestFor: s.bestFor,
      fitProfile: s.fitProfile,
      idealFootShapes: s.idealFootShapes,
      keyFeatures: s.keyFeatures,
      description: s.description,
    })),
    null,
    2
  );

  const sizeTypeNote = body.sizeType === "climbing"
    ? `Note: This is their CLIMBING shoe size, not street shoe size. When calculating recommended sizes, treat this as an already-downsized reference. Do NOT downsize again from this number. Instead, use it to estimate their street shoe size (add back typical downsize) and then calculate recommendations from there.`
    : `This is their street shoe size. Apply brand-specific downsizing from this number.`;

  const brandSizingInfo = brandSizing
    .map((b) => `- **${b.brand}**: ${b.fitTendency}. Performance downsize: ${b.performanceDownsize} EU sizes. Comfort downsize: ${b.comfortDownsize} EU sizes. ${b.notes}`)
    .join("\n");

  const prompt = `You are an expert climbing shoe fitter with years of experience in a bouldering gear shop. Analyze the photo of both feet (top-down front view) and follow the decision tree below to recommend the 3 best bouldering shoes.

STEP 1 — CLASSIFY FOOT SHAPE
Look at the photo and classify the foot into one of 5 types based on toe pattern:

- **Egyptian**: Big toe is the longest, each subsequent toe is shorter in a diagonal line. Tapered shape. Most common type (~70% of people).
- **Roman**: First three toes (big toe, second, third) are roughly the same length, creating a squared-off front. Wider forefoot.
- **Greek**: Second toe extends beyond the big toe. Creates a pointed/triangular toe profile.
- **German**: Big toe is the longest, remaining four toes are roughly the same shorter length. Wide forefoot with a step-down after big toe.
- **Celtic**: Second toe is longest (like Greek), but third toe is nearly as tall, with big toe shorter. Irregular/uneven profile.

STEP 2 — ASSESS ADDITIONAL FOOT FEATURES
From the photo, also assess:
- Estimated foot width and volume
- Any asymmetry between left and right feet
- Any notable features (bunions, high instep, etc.)

STEP 3 — DECISION TREE FOR SHOE SELECTION
Use this logic to filter and rank shoes:

1. Start with shoes whose "idealFootShapes" includes the detected foot shape.
2. Filter by experience level — only include shoes whose "bestFor" includes the climber's level.
3. Factor in foot width:
   - Narrow feet → prefer "narrow" or "medium" fitProfile shoes
   - Medium feet → prefer "medium" fitProfile shoes
   - Wide feet → prefer "wide" or "high-volume" fitProfile shoes
4. Factor in arch height:
   - High arch → aggressive shoes with downturn wrap the foot better
   - Low arch → flat or moderate shoes are more comfortable
   - Medium arch → any aggressiveness level works
5. If they have current shoes that fit well, use those as reference points — recommend shoes with similar fit characteristics but that address any gaps or offer progression.
6. Rank the final candidates by how many criteria they match perfectly.

STEP 4 — SIZING & DOWNSIZE RECOMMENDATIONS
For each recommended shoe, factor in brand-specific sizing. Here is how each brand fits:

${brandSizingInfo}

Include a recommended climbing shoe size (EU) for each recommendation. Also include the specific downsize amount from their street shoe size and explain why.

${sizeTypeNote}

CLIMBER PROFILE:
- Size type: ${body.sizeType} shoe
- Shoe size: ${body.sizeSystem} ${body.shoeSize}
- Foot width: ${body.footWidth}
- Experience level: ${body.experience}
- Current well-fitting climbing shoes: ${currentShoesInfo}

SHOE DATABASE:
${shoeDb}

Return your response as JSON only (no markdown, no code blocks), in this exact format:
{
  "footShape": "egyptian" | "roman" | "greek" | "german" | "celtic",
  "footAnalysis": "2-3 sentences: state the detected foot shape, arch height, volume, and how these characteristics influence shoe choice.",
  "recommendations": [
    {
      "shoeId": "the shoe id from the database",
      "recommendedSize": "EU size as a number (e.g. 41.5)",
      "sizingNote": "Brief note about sizing for this specific shoe (e.g. 'Size up 0.5 from street — La Sportiva runs small')",
      "downsizeAmount": "How much to downsize from street shoe and why (e.g. '-1.5 EU from street size — aggressive fit for advanced climbing')",
      "reasoning": "2-3 sentences explaining why this shoe is ideal for their specific foot shape and profile. Reference the foot shape by name."
    },
    {
      "shoeId": "...",
      "recommendedSize": "...",
      "sizingNote": "...",
      "downsizeAmount": "...",
      "reasoning": "..."
    },
    {
      "shoeId": "...",
      "recommendedSize": "...",
      "sizingNote": "...",
      "downsizeAmount": "...",
      "reasoning": "..."
    }
  ]
}`;

  return { prompt, currentShoesInfo };
}
