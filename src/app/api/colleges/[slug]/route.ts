import { NextRequest, NextResponse } from "next/server";
import { getCollegeBySlug } from "@/services/college.service";

/**
 * GET /api/colleges/:slug
 * Returns full college detail with courses, placements, reviews, gallery.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    const college = await getCollegeBySlug(slug);

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    // Transform placements to match frontend CollegeDetail shape
    const placement = college.placements[0]
      ? {
          year: college.placements[0].year,
          averagePackage: college.placements[0].averagePackage,
          highestPackage: college.placements[0].highestPackage,
          medianPackage: college.placements[0].medianPackage,
          placementPercentage: college.placements[0].placementPercentage,
          totalOffers: college.placements[0].totalOffers,
          topRecruiters: college.placements[0].topRecruiters as Array<{
            name: string;
            logoGradient: [string, string];
            acronym: string;
          }>,
        }
      : null;

    const response = {
      ...college,
      placement,
      placements: undefined, // Remove raw placements array
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[GET /api/colleges/:slug]", error);
    return NextResponse.json(
      { error: "Failed to fetch college details" },
      { status: 500 }
    );
  }
}
