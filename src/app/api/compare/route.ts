import { NextRequest, NextResponse } from "next/server";
import { getCollegesForCompare } from "@/services/college.service";

/**
 * GET /api/compare?slugs=iit-bombay,aiims-delhi,iim-ahmedabad
 * Returns batch college data for comparison.
 */
export async function GET(request: NextRequest) {
  try {
    const slugsParam = request.nextUrl.searchParams.get("slugs");

    if (!slugsParam) {
      return NextResponse.json(
        { error: "Missing 'slugs' query parameter" },
        { status: 400 }
      );
    }

    const slugs = slugsParam.split(",").map((s) => s.trim()).filter(Boolean);

    if (slugs.length < 1 || slugs.length > 3) {
      return NextResponse.json(
        { error: "Provide 1 to 3 college slugs" },
        { status: 400 }
      );
    }

    const colleges = await getCollegesForCompare(slugs);

    // Transform each college to match frontend CollegeDetail shape
    const results = colleges.map((college) => {
      const placement = college.placements[0]
        ? {
            year: college.placements[0].year,
            averagePackage: college.placements[0].averagePackage,
            highestPackage: college.placements[0].highestPackage,
            medianPackage: college.placements[0].medianPackage,
            placementPercentage: college.placements[0].placementPercentage,
            totalOffers: college.placements[0].totalOffers,
            topRecruiters: college.placements[0].topRecruiters,
          }
        : null;

      return {
        ...college,
        placement,
        placements: undefined,
      };
    });

    // Preserve original slug order
    const ordered = slugs
      .map((slug) => results.find((c) => c.slug === slug))
      .filter(Boolean);

    return NextResponse.json({ colleges: ordered });
  } catch (error) {
    console.error("[GET /api/compare]", error);
    return NextResponse.json(
      { error: "Failed to fetch comparison data" },
      { status: 500 }
    );
  }
}
