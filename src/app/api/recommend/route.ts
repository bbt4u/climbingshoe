import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { shoes } from "@/data/shoes";
import type { FormData, RecommendResponse, Recommendation } from "@/lib/types";

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

    // Strip data URL prefix to get raw base64
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
        keyFeatures: s.keyFeatures,
        description: s.description,
      })),
      null,
      2
    );

    const prompt = `You are an expert climbing shoe fitter with years of experience in a bouldering gear shop. Analyze the two foot photos provided (front view and side view) along with the climber's profile to recommend the 3 best bouldering shoes.

CLIMBER PROFILE:
- Shoe size: ${body.sizeSystem} ${body.shoeSize}
- Foot width: ${body.footWidth}
- Experience level: ${body.experience}
- Current climbing shoes: ${currentShoesInfo}

SHOE DATABASE:
${shoeDb}

INSTRUCTIONS:
1. Analyze the foot photos for: arch height, toe profile shape (Egyptian/Greek/Roman), width, volume, and any notable features.
2. Consider the climber's experience level to balance comfort vs performance.
3. If they have current shoes, suggest something that complements or improves on what they have.
4. Select exactly 3 shoes from the database above. Pick shoes that best match their foot shape, width, and experience level.

Return your response as JSON only (no markdown, no code blocks), in this exact format:
{
  "footAnalysis": "A 2-3 sentence summary of the foot shape analysis from the photos.",
  "recommendations": [
    {
      "shoeId": "the shoe id from the database",
      "reasoning": "2-3 sentences explaining why this shoe is a great match for this specific person."
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

    // Extract JSON — try raw parse first, then regex for code blocks
    let parsed;
    try {
      parsed = JSON.parse(textBlock.text);
    } catch {
      const match = textBlock.text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Could not parse AI response");
      parsed = JSON.parse(match[0]);
    }

    // Map shoe IDs back to full shoe objects
    const recommendations: Recommendation[] = parsed.recommendations.map(
      (rec: { shoeId: string; reasoning: string }) => {
        const shoe = shoes.find((s) => s.id === rec.shoeId);
        if (!shoe) throw new Error(`Unknown shoe ID: ${rec.shoeId}`);
        return { shoeId: rec.shoeId, shoe, reasoning: rec.reasoning };
      }
    );

    const result: RecommendResponse = {
      footAnalysis: parsed.footAnalysis,
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
