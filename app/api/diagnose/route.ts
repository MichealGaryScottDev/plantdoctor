import { NextRequest, NextResponse } from "next/server";
import { runWorkersAi } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms, plantType } = body;

    if (!symptoms || typeof symptoms !== "string") {
      return NextResponse.json(
        { error: "Symptoms are required" },
        { status: 400 }
      );
    }

    // Build a detailed prompt for the AI
    const plantInfo = plantType ? `Plant Type: ${plantType}\n` : "";
    const prompt = `${plantInfo}Symptoms: ${symptoms}

Based on the symptoms described above, provide a plant health diagnosis with:
1. Most likely condition or disease
2. Severity level (Mild/Moderate/Severe)
3. Treatment recommendations
4. Prevention tips

Format your response as a clear diagnosis report.`;

    const system = `You are PlantDoctor, an expert plant pathologist. Analyze plant symptoms and provide accurate diagnoses with treatment recommendations. Be specific, practical, and helpful. Focus on common houseplants and garden plants.`;

    // Call Cloudflare Workers AI
    const result = await runWorkersAi({
      prompt,
      system,
      model: "@cf/meta/llama-3.1-8b-instruct",
      maxTokens: 1024,
    });

    // Parse the response to structure it
    const diagnosis = {
      condition: "Analysis Complete",
      severity: "Unknown",
      treatment: result,
      timestamp: new Date().toISOString(),
    };

    // Try to extract severity if mentioned
    const severityMatch = result.match(
      /severity[:\s]+(mild|moderate|severe)/i
    );
    if (severityMatch) {
      diagnosis.severity =
        severityMatch[1].charAt(0).toUpperCase() + severityMatch[1].slice(1);
    }

    return NextResponse.json({
      success: true,
      diagnosis,
    });
  } catch (error) {
    console.error("Diagnosis error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze plant symptoms",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}