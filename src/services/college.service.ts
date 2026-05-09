import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// ── Types ───────────────────────────────────────────────

export interface CollegeListParams {
  search?: string;
  state?: string;
  courseType?: string;
  minFees?: number;
  maxFees?: number;
  sort?: string;  // "rating" | "fees" | "name"
  order?: string; // "asc" | "desc"
  page?: number;
  perPage?: number;
}

export interface CollegeListResponse {
  colleges: Awaited<ReturnType<typeof prisma.college.findMany>>;
  total: number;
  totalPages: number;
  currentPage: number;
}

// ── Service Functions ───────────────────────────────────

/**
 * Get paginated, filtered, sorted list of colleges.
 */
export async function getColleges(params: CollegeListParams): Promise<CollegeListResponse> {
  const {
    search,
    state,
    courseType,
    minFees,
    maxFees,
    sort = "rating",
    order = "desc",
    page = 1,
    perPage = 6,
  } = params;

  // Build where clause
  const where: Prisma.CollegeWhereInput = {};

  if (search?.trim()) {
    const q = search.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { state: { contains: q, mode: "insensitive" } },
      { acronym: { contains: q, mode: "insensitive" } },
    ];
  }

  if (state) {
    where.state = state;
  }

  if (courseType) {
    where.courseTypes = { has: courseType };
  }

  if (minFees !== undefined || maxFees !== undefined) {
    where.fees = {};
    if (minFees !== undefined) where.fees.gte = minFees;
    if (maxFees !== undefined) where.fees.lte = maxFees;
  }

  // Build orderBy
  const validSorts = ["rating", "fees", "name"];
  const sortField = validSorts.includes(sort) ? sort : "rating";
  const sortOrder = order === "asc" ? "asc" : "desc";
  const orderBy: Prisma.CollegeOrderByWithRelationInput = { [sortField]: sortOrder };

  // Pagination
  const skip = (page - 1) * perPage;
  const take = perPage;

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({ where, orderBy, skip, take }),
    prisma.college.count({ where }),
  ]);

  return {
    colleges,
    total,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
    currentPage: page,
  };
}

/**
 * Get full college detail by slug (with courses, placements, reviews, gallery).
 */
export async function getCollegeBySlug(slug: string) {
  return prisma.college.findUnique({
    where: { slug },
    include: {
      courses: true,
      placements: { orderBy: { year: "desc" }, take: 1 },
      reviews: { orderBy: { createdAt: "desc" } },
      gallery: true,
    },
  });
}

/**
 * Get multiple colleges for comparison.
 */
export async function getCollegesForCompare(slugs: string[]) {
  return prisma.college.findMany({
    where: { slug: { in: slugs } },
    include: {
      courses: true,
      placements: { orderBy: { year: "desc" }, take: 1 },
    },
  });
}

/**
 * Get distinct filter options (states, course types).
 */
export async function getFilterOptions() {
  const colleges = await prisma.college.findMany({
    select: { state: true, courseTypes: true },
  });

  const states = [...new Set(colleges.map((c) => c.state))].sort();
  const courseTypes = [...new Set(colleges.flatMap((c) => c.courseTypes))].sort();

  return { states, courseTypes };
}
