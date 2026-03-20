import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { shoes } from "@/data/shoes";
import { buildPrompt } from "@/lib/buildPrompt";
import type { FormData, RecommendResponse, Recommendation, FootShape } from "@/lib/types";

export const maxDuration = 60;

const VALID_SHAPES: FootShape[] = ["egyptian", "roman", "greek", "german", "celtic"];

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    if (!body.photos?.front) {
      return NextResponse.json(
        { error: "A photo of your feet is required" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic();
    const frontBase64 = body.photos.front.replace(/^data:image\/\w+;base64,/, "");
    const { prompt } = buildPrompt(body);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: frontBase64 } },
            { type: "text", text: prompt },
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

    const footShape: FootShape = VALID_SHAPES.includes(parsed.footShape)
      ? parsed.footShape
      : "egyptian";

    const recommendations: Recommendation[] = parsed.recommendations.map(
      (rec: { shoeId: string; reasoning: string; recommendedSize?: string; sizingNote?: string; downsizeAmount?: string }) => {
        const shoe = shoes.find((s) => s.id === rec.shoeId);
        if (!shoe) throw new Error(`Unknown shoe ID: ${rec.shoeId}`);
        return {
          shoeId: rec.shoeId,
          shoe,
          reasoning: rec.reasoning,
          recommendedSize: rec.recommendedSize || "",
          sizingNote: rec.sizingNote || "",
          downsizeAmount: rec.downsizeAmount || "",
        };
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
      { error: err instanceof Error ? err.message : "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
