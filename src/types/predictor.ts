/**
 * Predictor Tool type definitions
 */

export type ExamType = "JEE Main" | "JEE Advanced" | "NEET" | "CUET";

export type Category = "General" | "OBC" | "SC" | "ST" | "EWS";

export type ChanceLevel = "High" | "Moderate" | "Low";

export interface PredictorInput {
  examType: ExamType;
  rank: number;
  category: Category;
  preferredState: string;
  coursePreference: string;
}

export interface CutoffEntry {
  collegeSlug: string;
  collegeName: string;
  courseId: string;
  courseName: string;
  examType: ExamType;
  location: string;
  state: string;
  fees: number;
  rating: number;
  logoGradient: [string, string];
  acronym: string;
  closingRanks: Record<Category, number>;
}

export interface PredictionResult {
  cutoff: CutoffEntry;
  chance: ChanceLevel;
  userRank: number;
  closingRank: number;
  gap: number; // positive = within cutoff, negative = beyond cutoff
}

export const EXAM_TYPES: ExamType[] = ["JEE Main", "JEE Advanced", "NEET", "CUET"];

export const CATEGORIES: Category[] = ["General", "OBC", "SC", "ST", "EWS"];

export const PREDICTOR_STATES = [
  "All States",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
] as const;

export const PREDICTOR_COURSES: Record<ExamType, string[]> = {
  "JEE Main": ["All Courses", "Computer Science", "Electrical", "Mechanical", "Civil", "Electronics"],
  "JEE Advanced": ["All Courses", "Computer Science", "Electrical", "Mechanical", "Aerospace", "Chemical"],
  "NEET": ["All Courses", "MBBS", "BDS", "B.Sc Nursing", "BAMS", "BHMS"],
  "CUET": ["All Courses", "B.A. Honours", "B.Com Honours", "B.Sc Honours", "BBA", "Integrated Law"],
};
