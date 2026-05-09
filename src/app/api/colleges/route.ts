import { NextRequest, NextResponse } from "next/server";
import { getColleges } from "@/services/college.service";

/**
 * GET /api/colleges
 * Query params: search, state, courseType, minFees, maxFees, sort, order, page, perPage
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const params = {
      search: searchParams.get("search") ?? undefined,
      state: searchParams.get("state") ?? undefined,
      courseType: searchParams.get("courseType") ?? undefined,
      minFees: searchParams.has("minFees") ? Number(searchParams.get("minFees")) : undefined,
      maxFees: searchParams.has("maxFees") ? Number(searchParams.get("maxFees")) : undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
      page: searchParams.has("page") ? Number(searchParams.get("page")) : undefined,
      perPage: searchParams.has("perPage") ? Number(searchParams.get("perPage")) : undefined,
    };

    const result = await getColleges(params);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/colleges]", error);
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
