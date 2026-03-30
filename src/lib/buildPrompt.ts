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
          .map((id) => { const s = shoes.find((x) => x.id === id); return s ? `${s.brand} ${s.name}` : id; })
          .join(", ") + " (these fit them well — use as reference)";

  const shoeDb = JSON.stringify(
    shoes.map((s) => ({ id: s.id, name: `${s.brand} ${s.name}`, priceRange: s.priceRange, aggressiveness: s.aggressiveness, bestFor: s.bestFor, fitProfile: s.fitProfile, idealFootShapes: s.idealFootShapes, keyFeatures: s.keyFeatures, description: s.description })), null, 2
  );

  const brandSizingInfo = brandSizing.map((b) => `- **${b.brand}**: ${b.fitTendency}. Performance downsize: ${b.performanceDownsize} EU sizes. Comfort downsize: ${b.comfortDownsize} EU sizes. ${b.notes}`).join("\n");
  const brandAvailableSizes = brandSizes.map((b) => `- **${b.brand}**: ${b.euSizes.map(formatEuSize).join(", ")}`).join("\n");

  const hasClimbingSize = body.climbingSize && body.climbingBrand;
  const sizingContext = hasClimbingSize
    ? `Street shoe: ${body.sizeSystem} ${body.streetSize}. Climbing shoe: EU ${body.climbingSize} in ${body.climbingBrand}. PRIORITIZE the climbing shoe size for calibration.`
    : `Street shoe only: ${body.sizeSystem} ${body.streetSize}. Apply brand-specific downsizing.`;

  // Indirect fit answers for width estimation
  const fa = body.fitAnswers;
  const fitContext = `Indirect fit indicators (do NOT ask the user directly about width — estimate from photo + these answers):
- Shoes feel tight on sides: ${fa.tightOnSides || "not answered"}
- Sizes up for width: ${fa.sizeUpForWidth || "not answered"}
- Heel slips in shoes: ${fa.heelSlips || "not answered"}
Use these signals alongside the photo to estimate forefoot width, heel width, and overall volume. Present width as an estimate.`;

  const scanNote = "PRECISION SCAN: The photo includes an A4 paper reference. Use the A4 paper (210×297mm) visible in the image to calibrate measurements. Extract approximate foot length, forefoot width, and heel width relative to the A4 dimensions.";

  const prompt = `You are an expert climbing shoe fitter. Analyze the foot photos and recommend the 3 best bouldering shoes.

${scanNote}

STEP 1 — CLASSIFY FOOT SHAPE
Classify into: Egyptian, Roman, Greek, German, or Celtic based on toe pattern.

STEP 2 — ESTIMATE FOOT DIMENSIONS
From the photo, estimate:
- Foot shape classification
- Forefoot width (narrow/medium/wide)
- Heel width (narrow/medium/wide)
- Overall volume (low/medium/high)
- Any notable features (bunions, high instep, asymmetry)

${fitContext}

STEP 3 — DECISION TREE
1. Match shoes whose "idealFootShapes" includes detected shape
2. Filter by experience level
3. Factor in estimated width: narrow feet → narrow/medium fitProfile, wide → wide/high-volume
4. Factor in arch/volume
5. Use current shoes as reference if provided
6. Rank by criteria match

STEP 4 — SIZING
Brand sizing info:
${brandSizingInfo}

Available sizes per brand (ONLY recommend sizes that exist):
${brandAvailableSizes}

${sizingContext}

CLIMBER PROFILE:
- Experience: ${body.experience}
- Current shoes: ${currentShoesInfo}

SHOE DATABASE:
${shoeDb}

Return JSON only (no markdown):
{
  "footShape": "egyptian"|"roman"|"greek"|"german"|"celtic",
  "footAnalysis": "2-3 sentences: foot shape, estimated forefoot/heel width, volume, and how these influence shoe choice. Present width as an estimate based on photo analysis.",
  "recommendations": [
    {
      "shoeId": "id from database",
      "recommendedSize": "exact EU size the brand offers",
      "sizingNote": "brief sizing note",
      "downsizeAmount": "downsize from street shoe and why",
      "reasoning": "2-3 sentences why this shoe fits their foot shape and estimated dimensions"
    },
    { "shoeId":"...", "recommendedSize":"...", "sizingNote":"...", "downsizeAmount":"...", "reasoning":"..." },
    { "shoeId":"...", "recommendedSize":"...", "sizingNote":"...", "downsizeAmount":"...", "reasoning":"..." }
  ]
}`;

  return { prompt, currentShoesInfo };
}
