import type { CutoffEntry, PredictorInput, PredictionResult, ChanceLevel, Category } from "@/types/predictor";

// ── Mock Cutoff Data ──────────────────────────────────
// Realistic cutoff ranges for Indian colleges across exam types.

const CUTOFFS: CutoffEntry[] = [
  // ─── JEE Advanced Colleges ──────────────────────
  {
    collegeSlug: "iit-bombay", collegeName: "Indian Institute of Technology Bombay",
    courseId: "jee-adv-cs-iitb", courseName: "Computer Science & Engineering",
    examType: "JEE Advanced", location: "Mumbai, Maharashtra", state: "Maharashtra",
    fees: 250000, rating: 4.9, logoGradient: ["#6366f1", "#8b5cf6"], acronym: "IITB",
    closingRanks: { General: 120, OBC: 200, SC: 600, ST: 350, EWS: 180 },
  },
  {
    collegeSlug: "iit-bombay", collegeName: "Indian Institute of Technology Bombay",
    courseId: "jee-adv-ee-iitb", courseName: "Electrical Engineering",
    examType: "JEE Advanced", location: "Mumbai, Maharashtra", state: "Maharashtra",
    fees: 250000, rating: 4.9, logoGradient: ["#6366f1", "#8b5cf6"], acronym: "IITB",
    closingRanks: { General: 350, OBC: 550, SC: 1200, ST: 700, EWS: 450 },
  },
  {
    collegeSlug: "iit-bombay", collegeName: "Indian Institute of Technology Bombay",
    courseId: "jee-adv-me-iitb", courseName: "Mechanical Engineering",
    examType: "JEE Advanced", location: "Mumbai, Maharashtra", state: "Maharashtra",
    fees: 250000, rating: 4.9, logoGradient: ["#6366f1", "#8b5cf6"], acronym: "IITB",
    closingRanks: { General: 1500, OBC: 2200, SC: 4000, ST: 2500, EWS: 1800 },
  },
  {
    collegeSlug: "iit-delhi", collegeName: "Indian Institute of Technology Delhi",
    courseId: "jee-adv-cs-iitd", courseName: "Computer Science & Engineering",
    examType: "JEE Advanced", location: "New Delhi, Delhi", state: "Delhi",
    fees: 230000, rating: 4.8, logoGradient: ["#0ea5e9", "#6366f1"], acronym: "IITD",
    closingRanks: { General: 150, OBC: 250, SC: 700, ST: 400, EWS: 220 },
  },
  {
    collegeSlug: "iit-delhi", collegeName: "Indian Institute of Technology Delhi",
    courseId: "jee-adv-ee-iitd", courseName: "Electrical Engineering",
    examType: "JEE Advanced", location: "New Delhi, Delhi", state: "Delhi",
    fees: 230000, rating: 4.8, logoGradient: ["#0ea5e9", "#6366f1"], acronym: "IITD",
    closingRanks: { General: 400, OBC: 650, SC: 1400, ST: 800, EWS: 500 },
  },
  {
    collegeSlug: "iit-madras", collegeName: "Indian Institute of Technology Madras",
    courseId: "jee-adv-cs-iitm", courseName: "Computer Science & Engineering",
    examType: "JEE Advanced", location: "Chennai, Tamil Nadu", state: "Tamil Nadu",
    fees: 240000, rating: 4.9, logoGradient: ["#6366f1", "#0ea5e9"], acronym: "IITM",
    closingRanks: { General: 130, OBC: 220, SC: 650, ST: 380, EWS: 190 },
  },
  {
    collegeSlug: "iit-madras", collegeName: "Indian Institute of Technology Madras",
    courseId: "jee-adv-me-iitm", courseName: "Mechanical Engineering",
    examType: "JEE Advanced", location: "Chennai, Tamil Nadu", state: "Tamil Nadu",
    fees: 240000, rating: 4.9, logoGradient: ["#6366f1", "#0ea5e9"], acronym: "IITM",
    closingRanks: { General: 1400, OBC: 2100, SC: 3800, ST: 2400, EWS: 1700 },
  },
  {
    collegeSlug: "iit-kanpur", collegeName: "Indian Institute of Technology Kanpur",
    courseId: "jee-adv-cs-iitk", courseName: "Computer Science & Engineering",
    examType: "JEE Advanced", location: "Kanpur, Uttar Pradesh", state: "Uttar Pradesh",
    fees: 235000, rating: 4.8, logoGradient: ["#2563eb", "#7c3aed"], acronym: "IITK",
    closingRanks: { General: 200, OBC: 350, SC: 900, ST: 500, EWS: 280 },
  },
  {
    collegeSlug: "iit-kanpur", collegeName: "Indian Institute of Technology Kanpur",
    courseId: "jee-adv-ee-iitk", courseName: "Electrical Engineering",
    examType: "JEE Advanced", location: "Kanpur, Uttar Pradesh", state: "Uttar Pradesh",
    fees: 235000, rating: 4.8, logoGradient: ["#2563eb", "#7c3aed"], acronym: "IITK",
    closingRanks: { General: 500, OBC: 800, SC: 1600, ST: 1000, EWS: 650 },
  },
  {
    collegeSlug: "iisc-bangalore", collegeName: "Indian Institute of Science Bangalore",
    courseId: "jee-adv-bs-iisc", courseName: "B.S. Research Program",
    examType: "JEE Advanced", location: "Bangalore, Karnataka", state: "Karnataka",
    fees: 35000, rating: 4.9, logoGradient: ["#1d4ed8", "#3b82f6"], acronym: "IISc",
    closingRanks: { General: 450, OBC: 700, SC: 1500, ST: 900, EWS: 600 },
  },

  // ─── JEE Main Colleges ──────────────────────────
  {
    collegeSlug: "bits-pilani", collegeName: "Birla Institute of Technology and Science Pilani",
    courseId: "jee-main-cs-bits", courseName: "Computer Science",
    examType: "JEE Main", location: "Pilani, Rajasthan", state: "Rajasthan",
    fees: 520000, rating: 4.6, logoGradient: ["#ef4444", "#f97316"], acronym: "BITS",
    closingRanks: { General: 5000, OBC: 8000, SC: 15000, ST: 12000, EWS: 6500 },
  },
  {
    collegeSlug: "bits-pilani", collegeName: "Birla Institute of Technology and Science Pilani",
    courseId: "jee-main-ee-bits", courseName: "Electrical & Electronics",
    examType: "JEE Main", location: "Pilani, Rajasthan", state: "Rajasthan",
    fees: 520000, rating: 4.6, logoGradient: ["#ef4444", "#f97316"], acronym: "BITS",
    closingRanks: { General: 12000, OBC: 18000, SC: 30000, ST: 25000, EWS: 15000 },
  },
  {
    collegeSlug: "vit-vellore", collegeName: "Vellore Institute of Technology",
    courseId: "jee-main-cs-vit", courseName: "Computer Science",
    examType: "JEE Main", location: "Vellore, Tamil Nadu", state: "Tamil Nadu",
    fees: 395000, rating: 4.2, logoGradient: ["#7c3aed", "#4f46e5"], acronym: "VIT",
    closingRanks: { General: 25000, OBC: 35000, SC: 60000, ST: 50000, EWS: 30000 },
  },
  {
    collegeSlug: "vit-vellore", collegeName: "Vellore Institute of Technology",
    courseId: "jee-main-ee-vit", courseName: "Electronics & Communication",
    examType: "JEE Main", location: "Vellore, Tamil Nadu", state: "Tamil Nadu",
    fees: 395000, rating: 4.2, logoGradient: ["#7c3aed", "#4f46e5"], acronym: "VIT",
    closingRanks: { General: 40000, OBC: 55000, SC: 80000, ST: 70000, EWS: 45000 },
  },
  {
    collegeSlug: "manipal-university", collegeName: "Manipal Academy of Higher Education",
    courseId: "jee-main-cs-mahe", courseName: "Computer Science",
    examType: "JEE Main", location: "Manipal, Karnataka", state: "Karnataka",
    fees: 450000, rating: 4.3, logoGradient: ["#f97316", "#eab308"], acronym: "MAHE",
    closingRanks: { General: 30000, OBC: 42000, SC: 65000, ST: 55000, EWS: 35000 },
  },
  {
    collegeSlug: "manipal-university", collegeName: "Manipal Academy of Higher Education",
    courseId: "jee-main-me-mahe", courseName: "Mechanical Engineering",
    examType: "JEE Main", location: "Manipal, Karnataka", state: "Karnataka",
    fees: 450000, rating: 4.3, logoGradient: ["#f97316", "#eab308"], acronym: "MAHE",
    closingRanks: { General: 50000, OBC: 65000, SC: 90000, ST: 80000, EWS: 55000 },
  },
  {
    collegeSlug: "symbiosis-pune", collegeName: "Symbiosis International University",
    courseId: "jee-main-cs-siu", courseName: "Computer Science",
    examType: "JEE Main", location: "Pune, Maharashtra", state: "Maharashtra",
    fees: 580000, rating: 4.3, logoGradient: ["#0891b2", "#06b6d4"], acronym: "SIU",
    closingRanks: { General: 45000, OBC: 60000, SC: 85000, ST: 75000, EWS: 50000 },
  },

  // ─── NEET Colleges ──────────────────────────────
  {
    collegeSlug: "aiims-delhi", collegeName: "All India Institute of Medical Sciences",
    courseId: "neet-mbbs-aiims", courseName: "MBBS",
    examType: "NEET", location: "New Delhi, Delhi", state: "Delhi",
    fees: 7500, rating: 4.9, logoGradient: ["#10b981", "#059669"], acronym: "AIIMS",
    closingRanks: { General: 100, OBC: 200, SC: 500, ST: 300, EWS: 150 },
  },
  {
    collegeSlug: "aiims-delhi", collegeName: "All India Institute of Medical Sciences",
    courseId: "neet-bsc-aiims", courseName: "B.Sc Nursing",
    examType: "NEET", location: "New Delhi, Delhi", state: "Delhi",
    fees: 5000, rating: 4.9, logoGradient: ["#10b981", "#059669"], acronym: "AIIMS",
    closingRanks: { General: 5000, OBC: 8000, SC: 15000, ST: 10000, EWS: 6000 },
  },
  {
    collegeSlug: "cmc-vellore", collegeName: "Christian Medical College Vellore",
    courseId: "neet-mbbs-cmc", courseName: "MBBS",
    examType: "NEET", location: "Vellore, Tamil Nadu", state: "Tamil Nadu",
    fees: 65000, rating: 4.7, logoGradient: ["#16a34a", "#15803d"], acronym: "CMC",
    closingRanks: { General: 2000, OBC: 4000, SC: 8000, ST: 6000, EWS: 3000 },
  },
  {
    collegeSlug: "manipal-university", collegeName: "Manipal Academy of Higher Education",
    courseId: "neet-mbbs-mahe", courseName: "MBBS",
    examType: "NEET", location: "Manipal, Karnataka", state: "Karnataka",
    fees: 450000, rating: 4.3, logoGradient: ["#f97316", "#eab308"], acronym: "MAHE",
    closingRanks: { General: 15000, OBC: 22000, SC: 40000, ST: 30000, EWS: 18000 },
  },
  {
    collegeSlug: "manipal-university", collegeName: "Manipal Academy of Higher Education",
    courseId: "neet-bds-mahe", courseName: "BDS",
    examType: "NEET", location: "Manipal, Karnataka", state: "Karnataka",
    fees: 380000, rating: 4.3, logoGradient: ["#f97316", "#eab308"], acronym: "MAHE",
    closingRanks: { General: 35000, OBC: 50000, SC: 70000, ST: 60000, EWS: 40000 },
  },

  // ─── CUET Colleges ──────────────────────────────
  {
    collegeSlug: "srcc-delhi", collegeName: "Shri Ram College of Commerce",
    courseId: "cuet-bcom-srcc", courseName: "B.Com Honours",
    examType: "CUET", location: "New Delhi, Delhi", state: "Delhi",
    fees: 35000, rating: 4.6, logoGradient: ["#dc2626", "#b91c1c"], acronym: "SRCC",
    closingRanks: { General: 500, OBC: 1000, SC: 3000, ST: 2000, EWS: 700 },
  },
  {
    collegeSlug: "lsr-delhi", collegeName: "Lady Shri Ram College for Women",
    courseId: "cuet-ba-lsr", courseName: "B.A. Honours (Economics)",
    examType: "CUET", location: "New Delhi, Delhi", state: "Delhi",
    fees: 28000, rating: 4.5, logoGradient: ["#c026d3", "#a855f7"], acronym: "LSR",
    closingRanks: { General: 800, OBC: 1500, SC: 4000, ST: 2500, EWS: 1000 },
  },
  {
    collegeSlug: "xaviers-mumbai", collegeName: "St. Xavier's College Mumbai",
    courseId: "cuet-bsc-sxc", courseName: "B.Sc Honours",
    examType: "CUET", location: "Mumbai, Maharashtra", state: "Maharashtra",
    fees: 45000, rating: 4.5, logoGradient: ["#0284c7", "#0ea5e9"], acronym: "SXC",
    closingRanks: { General: 2000, OBC: 3500, SC: 7000, ST: 5000, EWS: 2500 },
  },
  {
    collegeSlug: "jnu-delhi", collegeName: "Jawaharlal Nehru University",
    courseId: "cuet-ba-jnu", courseName: "B.A. Honours (International Relations)",
    examType: "CUET", location: "New Delhi, Delhi", state: "Delhi",
    fees: 15000, rating: 4.4, logoGradient: ["#059669", "#0d9488"], acronym: "JNU",
    closingRanks: { General: 1200, OBC: 2000, SC: 5000, ST: 3500, EWS: 1500 },
  },
  {
    collegeSlug: "symbiosis-pune", collegeName: "Symbiosis International University",
    courseId: "cuet-bba-siu", courseName: "BBA",
    examType: "CUET", location: "Pune, Maharashtra", state: "Maharashtra",
    fees: 580000, rating: 4.3, logoGradient: ["#0891b2", "#06b6d4"], acronym: "SIU",
    closingRanks: { General: 5000, OBC: 8000, SC: 15000, ST: 10000, EWS: 6000 },
  },
  {
    collegeSlug: "nlsiu-bangalore", collegeName: "National Law School of India University",
    courseId: "cuet-law-nlsiu", courseName: "Integrated Law (B.A. LLB)",
    examType: "CUET", location: "Bangalore, Karnataka", state: "Karnataka",
    fees: 280000, rating: 4.7, logoGradient: ["#8b5cf6", "#ec4899"], acronym: "NLSIU",
    closingRanks: { General: 600, OBC: 1200, SC: 3500, ST: 2200, EWS: 800 },
  },
];

// ── Prediction Engine ─────────────────────────────────

function getChanceLevel(userRank: number, closingRank: number): ChanceLevel {
  const ratio = userRank / closingRank;
  if (ratio <= 0.7) return "High";
  if (ratio <= 1.0) return "Moderate";
  // Allow 30% buffer beyond closing rank for Low chance
  if (ratio <= 1.3) return "Low";
  return "Low"; // Will be filtered out if beyond threshold
}

/**
 * Run prediction against mock cutoff data.
 * Returns sorted results by chance level, then by gap.
 */
export function runPrediction(input: PredictorInput): PredictionResult[] {
  const { examType, rank, category, preferredState, coursePreference } = input;

  // Filter cutoffs by exam type
  let entries = CUTOFFS.filter((c) => c.examType === examType);

  // Filter by state if specified
  if (preferredState && preferredState !== "All States") {
    entries = entries.filter((c) => c.state === preferredState);
  }

  // Filter by course preference if specified
  if (coursePreference && coursePreference !== "All Courses") {
    entries = entries.filter((c) =>
      c.courseName.toLowerCase().includes(coursePreference.toLowerCase())
    );
  }

  // Generate predictions
  const results: PredictionResult[] = [];

  for (const cutoff of entries) {
    const closingRank = cutoff.closingRanks[category as Category] ?? cutoff.closingRanks.General;
    const gap = closingRank - rank;
    const ratio = rank / closingRank;

    // Only include if within 1.3x of closing rank (i.e. not hopelessly beyond)
    if (ratio <= 1.3) {
      const chance = getChanceLevel(rank, closingRank);
      results.push({
        cutoff,
        chance,
        userRank: rank,
        closingRank,
        gap,
      });
    }
  }

  // Sort: High > Moderate > Low, then by gap (largest positive first)
  const chancePriority: Record<ChanceLevel, number> = { High: 0, Moderate: 1, Low: 2 };
  results.sort((a, b) => {
    const chanceDiff = chancePriority[a.chance] - chancePriority[b.chance];
    if (chanceDiff !== 0) return chanceDiff;
    return b.gap - a.gap; // Higher gap = more comfortable margin
  });

  return results;
}
