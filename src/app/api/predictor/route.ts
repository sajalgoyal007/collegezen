import { NextRequest, NextResponse } from "next/server";
import { runPrediction } from "@/data/predictor";
import type { PredictorInput, ExamType, Category } from "@/types/predictor";
import { EXAM_TYPES, CATEGORIES } from "@/types/predictor";

/**
 * POST /api/predictor
 * Body: { examType, rank, category, preferredState, coursePreference }
 * Returns predicted college matches with chance levels.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const errors: string[] = [];

    if (!body.examType || !EXAM_TYPES.includes(body.examType as ExamType)) {
      errors.push("Invalid exam type");
    }

    const rank = Number(body.rank);
    if (!rank || rank < 1 || rank > 500000) {
      errors.push("Rank must be between 1 and 500000");
    }

    if (body.category && !CATEGORIES.includes(body.category as Category)) {
      errors.push("Invalid category");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const input: PredictorInput = {
      examType: body.examType as ExamType,
      rank,
      category: (body.category as Category) ?? "General",
      preferredState: body.preferredState ?? "All States",
      coursePreference: body.coursePreference ?? "All Courses",
    };

    const results = runPrediction(input);

    return NextResponse.json({
      results,
      input: { ...input },
      total: results.length,
    });
  } catch (error) {
    console.error("[POST /api/predictor]", error);
    return NextResponse.json(
      { error: "Failed to generate predictions" },
      { status: 500 }
    );
  }
}
