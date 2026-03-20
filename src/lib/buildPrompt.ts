import { shoes } from "@/data/shoes";
import { brandSizing } from "@/data/sizing";
import { brandSizes, formatEuSize } from "@/data/brandSizes";
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

  const brandSizingInfo = brandSizing
    .map((b) => `- **${b.brand}**: ${b.fitTendency}. Performance downsize: ${b.performanceDownsize} EU sizes. Comfort downsize: ${b.comfortDownsize} EU sizes. ${b.notes}`)
    .join("\n");

  // Build brand-specific available sizes so the AI recommends sizes that actually exist
  const brandAvailableSizes = brandSizes
    .map((b) => `- **${b.brand}**: EU sizes available: ${b.euSizes.map(formatEuSize).join(", ")}`)
    .join("\n");

  // Build sizing context based on what the user provided
  const hasClimbingSize = body.climbingSize && body.climbingBrand;
  let sizingContext: string;

  if (hasClimbingSize) {
    sizingContext = `The climber provided BOTH their street shoe size AND a climbing shoe size.
- Street shoe size: ${body.sizeSystem} ${body.streetSize}
- Climbing shoe size: EU ${body.climbingSize} in ${body.climbingBrand}

IMPORTANT: Prioritize the climbing shoe size for accuracy. Since they already know their climbing size in ${body.climbingBrand}, use it to calibrate recommendations for other brands. For example, if they wear EU 39 in La Sportiva (runs small), they likely need EU 39.5-40 in a brand that runs true to size.`;
  } else {
    sizingContext = `The climber provided their street shoe size only: ${body.sizeSystem} ${body.streetSize}
They don't have a climbing shoe size reference, so calculate recommended sizes by applying brand-specific downsizing from their street shoe size.`;
  }

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
For each recommended shoe, factor in brand-specific sizing:

${brandSizingInfo}

IMPORTANT: Each brand offers specific EU sizes (not all brands use half sizes). You MUST recommend a size that the brand actually offers:

${brandAvailableSizes}

${sizingContext}

CLIMBER PROFILE:
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
      "recommendedSize": "The exact EU size this brand offers (e.g. 41.5 or 41.33 for Five Ten)",
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
