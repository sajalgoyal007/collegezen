/**
 * College-related type definitions
 */

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  description: string;
  fees: number;
  rating: number;
  reviewCount: number;
  courseTypes: CourseType[];
  established: number;
  imageUrl: string;
  logoGradient: [string, string];
  acronym: string;
  accreditation: string;
  featured: boolean;
}

export type CourseType =
  | "Engineering"
  | "Medical"
  | "Management"
  | "Law"
  | "Arts"
  | "Science"
  | "Commerce"
  | "Design"
  | "Pharmacy";

export type SortField = "rating" | "fees" | "name";
export type SortOrder = "asc" | "desc";

export interface CollegeFilters {
  search: string;
  location: string;
  feesRange: [number, number];
  courseType: string;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  perPage: number;
}

export interface CollegeListResult {
  colleges: College[];
  total: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

// ── Detail Page Types ──────────────────────────────────

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  eligibility: string;
  seats: number;
  type: CourseType;
}

export interface PlacementData {
  year: number;
  averagePackage: number;
  highestPackage: number;
  medianPackage: number;
  placementPercentage: number;
  totalOffers: number;
  topRecruiters: Recruiter[];
}

export interface Recruiter {
  name: string;
  logoGradient: [string, string];
  acronym: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  graduationYear: number;
  course: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  helpful: number;
}

export interface GalleryImage {
  id: string;
  alt: string;
  gradient: [string, string];
  label: string;
}

export interface CollegeDetail extends College {
  affiliation: string;
  campusSize: string;
  totalStudents: number;
  totalFaculty: number;
  website: string;
  longDescription: string;
  courses: Course[];
  placement: PlacementData;
  reviews: Review[];
  gallery: GalleryImage[];
}

export const DETAIL_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses" },
  { id: "placements", label: "Placements" },
  { id: "reviews", label: "Reviews" },
  { id: "gallery", label: "Gallery" },
] as const;
