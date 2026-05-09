import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

/**
 * GET /api/rankings
 * Query params: sort (rating|placement|fees|popularity), order, state, courseType, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const sort = searchParams.get("sort") ?? "rating";
    const order = searchParams.get("order") ?? "desc";
    const state = searchParams.get("state") ?? undefined;
    const courseType = searchParams.get("courseType") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const where: Prisma.CollegeWhereInput = {};

    if (search?.trim()) {
      where.OR = [
        { name: { contains: search.trim(), mode: "insensitive" } },
        { acronym: { contains: search.trim(), mode: "insensitive" } },
        { city: { contains: search.trim(), mode: "insensitive" } },
      ];
    }
    if (state) where.state = state;
    if (courseType) where.courseTypes = { has: courseType };

    // Fetch colleges with latest placement data
    const colleges = await prisma.college.findMany({
      where,
      include: {
        placements: { orderBy: { year: "desc" }, take: 1 },
      },
    });

    // Build ranking scores
    const ranked = colleges.map((c) => {
      const p = c.placements[0];
      return {
        id: c.id,
        slug: c.slug,
        name: c.name,
        acronym: c.acronym,
        location: c.location,
        state: c.state,
        fees: c.fees,
        rating: c.rating,
        reviewCount: c.reviewCount,
        established: c.established,
        accreditation: c.accreditation,
        courseTypes: c.courseTypes,
        logoGradient: c.logoGradient,
        featured: c.featured,
        placementPercentage: p?.placementPercentage ?? 0,
        averagePackage: p?.averagePackage ?? 0,
        highestPackage: p?.highestPackage ?? 0,
      };
    });

    // Sort
    const dir = order === "asc" ? 1 : -1;
    ranked.sort((a, b) => {
      switch (sort) {
        case "placement":
          return (a.averagePackage - b.averagePackage) * dir;
        case "fees":
          return (a.fees - b.fees) * (order === "asc" ? 1 : -1);
        case "popularity":
          return (a.reviewCount - b.reviewCount) * dir;
        default: // rating
          return (a.rating - b.rating) * dir;
      }
    });

    // Add rank numbers
    const results = ranked.map((c, i) => ({ ...c, rank: i + 1 }));

    return NextResponse.json({ colleges: results, total: results.length });
  } catch (error) {
    console.error("[GET /api/rankings]", error);
    return NextResponse.json({ error: "Failed to fetch rankings" }, { status: 500 });
  }
}
