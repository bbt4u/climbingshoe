import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { shoes } from "@/data/shoes";
import type { FormData, RecommendResponse, Recommendation, FootShape } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    if (!body.photos?.front || !body.photos?.side) {
      return NextResponse.json(
        { error: "Both front and side photos are required" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic();

    const frontBase64 = body.photos.front.replace(
      /^data:image\/\w+;base64,/,
      ""
    );
    const sideBase64 = body.photos.side.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const currentShoesInfo =
      body.currentShoes.includes("none") || body.currentShoes.length === 0
        ? "None — this person does not currently own climbing shoes."
        : body.currentShoes
            .map((id) => {
              const shoe = shoes.find((s) => s.id === id);
              return shoe ? `${shoe.brand} ${shoe.name}` : id;
            })
            .join(", ");

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

    const prompt = `You are an expert climbing shoe fitter with years of experience in a bouldering gear shop. Analyze the two foot photos provided (front view and side view) and follow the decision tree below to recommend the 3 best bouldering shoes.

STEP 1 — CLASSIFY FOOT SHAPE
Look at the front view photo and classify the foot into one of 5 types based on toe pattern:

- **Egyptian**: Big toe is the longest, each subsequent toe is shorter in a diagonal line. Tapered shape. Most common type (~70% of people).
- **Roman**: First three toes (big toe, second, third) are roughly the same length, creating a squared-off front. Wider forefoot.
- **Greek**: Second toe extends beyond the big toe. Creates a pointed/triangular toe profile.
- **German**: Big toe is the longest, remaining four toes are roughly the same shorter length. Wide forefoot with a step-down after big toe.
- **Celtic**: Second toe is longest (like Greek), but third toe is nearly as tall, with big toe shorter. Irregular/uneven profile.

STEP 2 — ASSESS ADDITIONAL FOOT FEATURES
From both photos, also assess:
- Arch height (low / medium / high) from the side view
- Foot volume (low / medium / high)
- Any asymmetry or notable features

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
5. If they have current shoes, recommend something different that addresses gaps (e.g., if they have a flat beginner shoe, suggest an upgrade).
6. Rank the final candidates by how many criteria they match perfectly.

CLIMBER PROFILE:
- Shoe size: ${body.sizeSystem} ${body.shoeSize}
- Foot width: ${body.footWidth}
- Experience level: ${body.experience}
- Current climbing shoes: ${currentShoesInfo}

SHOE DATABASE:
${shoeDb}

Return your response as JSON only (no markdown, no code blocks), in this exact format:
{
  "footShape": "egyptian" | "roman" | "greek" | "german" | "celtic",
  "footAnalysis": "2-3 sentences: state the detected foot shape, arch height, volume, and how these characteristics influence shoe choice.",
  "recommendations": [
    {
      "shoeId": "the shoe id from the database",
      "reasoning": "2-3 sentences explaining why this shoe is ideal for their specific foot shape and profile. Reference the foot shape by name."
    },
    {
      "shoeId": "...",
      "reasoning": "..."
    },
    {
      "shoeId": "...",
      "reasoning": "..."
    }
  ]
}`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: frontBase64,
              },
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: sideBase64,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from AI");
    }

    let parsed;
    try {
      parsed = JSON.parse(textBlock.text);
    } catch {
      const match = textBlock.text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Could not parse AI response");
      parsed = JSON.parse(match[0]);
    }

    const validShapes: FootShape[] = ["egyptian", "roman", "greek", "german", "celtic"];
    const footShape: FootShape = validShapes.includes(parsed.footShape)
      ? parsed.footShape
      : "egyptian";

    const recommendations: Recommendation[] = parsed.recommendations.map(
      (rec: { shoeId: string; reasoning: string }) => {
        const shoe = shoes.find((s) => s.id === rec.shoeId);
        if (!shoe) throw new Error(`Unknown shoe ID: ${rec.shoeId}`);
        return { shoeId: rec.shoeId, shoe, reasoning: rec.reasoning };
      }
    );

    const result: RecommendResponse = {
      footAnalysis: parsed.footAnalysis,
      footShape,
      recommendations,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Recommendation error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to generate recommendations",
      },
      { status: 500 }
    );
  }
}
