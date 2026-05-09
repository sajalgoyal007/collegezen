import type { CollegeDetail } from "@/types/college";
import { MOCK_COLLEGES } from "./colleges";

/**
 * Helper to build a full CollegeDetail from a base College entry.
 * All detail data below is mock data for frontend development.
 */
function buildDetail(
  slug: string,
  extra: Omit<
    CollegeDetail,
    keyof typeof MOCK_COLLEGES[0]
  >
): CollegeDetail {
  const base = MOCK_COLLEGES.find((c) => c.slug === slug);
  if (!base) throw new Error(`College not found: ${slug}`);
  return { ...base, ...extra };
}

// ── Shared Recruiter List ─────────────────────────────
const COMMON_RECRUITERS = [
  { name: "Google", logoGradient: ["#4285F4", "#34A853"] as [string, string], acronym: "G" },
  { name: "Microsoft", logoGradient: ["#00A4EF", "#7FBA00"] as [string, string], acronym: "MS" },
  { name: "Amazon", logoGradient: ["#FF9900", "#232F3E"] as [string, string], acronym: "AMZ" },
  { name: "Goldman Sachs", logoGradient: ["#6BA3D6", "#1D3557"] as [string, string], acronym: "GS" },
  { name: "McKinsey", logoGradient: ["#004B87", "#0072CE"] as [string, string], acronym: "McK" },
  { name: "Deloitte", logoGradient: ["#86BC25", "#0076A8"] as [string, string], acronym: "DT" },
  { name: "Tata Consultancy", logoGradient: ["#1A1A2E", "#0F4C75"] as [string, string], acronym: "TCS" },
  { name: "Infosys", logoGradient: ["#007CC3", "#00AEEF"] as [string, string], acronym: "INF" },
];

// ── Mock Detail Entries ───────────────────────────────

const COLLEGE_DETAILS: CollegeDetail[] = [
  buildDetail("iit-bombay", {
    affiliation: "Autonomous (UGC Act 1956)",
    campusSize: "550 acres",
    totalStudents: 11200,
    totalFaculty: 680,
    website: "https://www.iitb.ac.in",
    longDescription:
      "Indian Institute of Technology Bombay is one of India's premier engineering institutions, established in 1958 with assistance from UNESCO and the Soviet Union. Located in Powai, Mumbai, IIT Bombay is renowned for its rigorous academic programs, cutting-edge research facilities, and exceptional placement records. The institute offers undergraduate, postgraduate, and doctoral programs across various departments of engineering, science, humanities, and management. IIT Bombay consistently ranks among the top 200 universities globally and is known for fostering innovation through its robust startup ecosystem and industry collaborations.",
    courses: [
      { id: "c1", name: "B.Tech Computer Science", duration: "4 Years", fees: 250000, eligibility: "JEE Advanced", seats: 120, type: "Engineering" },
      { id: "c2", name: "B.Tech Electrical Engineering", duration: "4 Years", fees: 250000, eligibility: "JEE Advanced", seats: 100, type: "Engineering" },
      { id: "c3", name: "B.Tech Mechanical Engineering", duration: "4 Years", fees: 250000, eligibility: "JEE Advanced", seats: 110, type: "Engineering" },
      { id: "c4", name: "M.Tech AI & Data Science", duration: "2 Years", fees: 130000, eligibility: "GATE + Interview", seats: 40, type: "Engineering" },
      { id: "c5", name: "MBA", duration: "2 Years", fees: 1100000, eligibility: "CAT + Interview", seats: 120, type: "Management" },
      { id: "c6", name: "M.Sc Physics", duration: "2 Years", fees: 50000, eligibility: "JAM", seats: 60, type: "Science" },
    ],
    placement: {
      year: 2025,
      averagePackage: 2150000,
      highestPackage: 27500000,
      medianPackage: 1800000,
      placementPercentage: 95,
      totalOffers: 1420,
      topRecruiters: COMMON_RECRUITERS.slice(0, 6),
    },
    reviews: [
      {
        id: "r1", author: "Arjun Mehta", avatar: "AM", graduationYear: 2024, course: "B.Tech CSE",
        rating: 5, title: "Best 4 years of my life",
        text: "IIT Bombay gave me world-class exposure, amazing peers, and opportunities I couldn't have imagined. The campus culture, tech clubs, and placement support are unmatched. The professors are incredibly knowledgeable and approachable.",
        date: "2024-06-15", helpful: 142,
      },
      {
        id: "r2", author: "Priya Sharma", avatar: "PS", graduationYear: 2023, course: "MBA",
        rating: 4, title: "Incredible MBA experience",
        text: "SJMSOM at IIT Bombay provides a unique blend of management and technology education. The peer learning is exceptional, and the IIT brand opens doors everywhere. Industry connections are strong.",
        date: "2023-08-20", helpful: 98,
      },
      {
        id: "r3", author: "Rahul Kumar", avatar: "RK", graduationYear: 2024, course: "B.Tech EE",
        rating: 5, title: "Rigorous but rewarding",
        text: "The academic rigor here is intense but it prepares you for anything. Research opportunities are abundant, and the campus life with festivals like Mood Indigo makes the journey memorable.",
        date: "2024-03-10", helpful: 87,
      },
    ],
    gallery: [
      { id: "g1", alt: "Main Building", gradient: ["#6366f1", "#8b5cf6"], label: "Main Building" },
      { id: "g2", alt: "Library", gradient: ["#0ea5e9", "#6366f1"], label: "Central Library" },
      { id: "g3", alt: "Hostel", gradient: ["#10b981", "#059669"], label: "Hostel Complex" },
      { id: "g4", alt: "Lab", gradient: ["#f59e0b", "#ef4444"], label: "Research Lab" },
      { id: "g5", alt: "Sports", gradient: ["#8b5cf6", "#ec4899"], label: "Sports Complex" },
      { id: "g6", alt: "Auditorium", gradient: ["#ef4444", "#f97316"], label: "Convocation Hall" },
    ],
  }),

  buildDetail("iit-delhi", {
    affiliation: "Autonomous (UGC Act 1956)",
    campusSize: "325 acres",
    totalStudents: 9800,
    totalFaculty: 550,
    website: "https://home.iitd.ac.in",
    longDescription:
      "Indian Institute of Technology Delhi, established in 1961, is among India's most prestigious engineering institutions. Located in Hauz Khas, South Delhi, the campus provides a vibrant academic ecosystem. IIT Delhi excels in research with numerous patents, publications, and startup incubation. The institute is particularly strong in computer science, electrical engineering, and textile technology. It consistently ranks among the top 5 engineering colleges in India.",
    courses: [
      { id: "c1", name: "B.Tech Computer Science", duration: "4 Years", fees: 230000, eligibility: "JEE Advanced", seats: 95, type: "Engineering" },
      { id: "c2", name: "B.Tech Electrical Engineering", duration: "4 Years", fees: 230000, eligibility: "JEE Advanced", seats: 90, type: "Engineering" },
      { id: "c3", name: "B.Des Industrial Design", duration: "4 Years", fees: 230000, eligibility: "UCEED", seats: 30, type: "Design" },
      { id: "c4", name: "M.Tech Machine Learning", duration: "2 Years", fees: 120000, eligibility: "GATE + Interview", seats: 35, type: "Engineering" },
      { id: "c5", name: "M.Sc Mathematics", duration: "2 Years", fees: 45000, eligibility: "JAM", seats: 50, type: "Science" },
    ],
    placement: {
      year: 2025,
      averagePackage: 2050000,
      highestPackage: 25000000,
      medianPackage: 1750000,
      placementPercentage: 93,
      totalOffers: 1200,
      topRecruiters: [COMMON_RECRUITERS[0], COMMON_RECRUITERS[1], COMMON_RECRUITERS[2], COMMON_RECRUITERS[3], COMMON_RECRUITERS[5], COMMON_RECRUITERS[6]],
    },
    reviews: [
      {
        id: "r1", author: "Kavita Singh", avatar: "KS", graduationYear: 2024, course: "B.Tech CSE",
        rating: 5, title: "Transformative experience",
        text: "IIT Delhi's CS department is world-class. The research opportunities, coding culture, and placement support are extraordinary. Being in Delhi also gives access to incredible networking events.",
        date: "2024-05-12", helpful: 120,
      },
      {
        id: "r2", author: "Aditya Verma", avatar: "AV", graduationYear: 2023, course: "B.Des",
        rating: 4, title: "Great design program",
        text: "The B.Des program at IIT Delhi is unique. Studios are well-equipped, faculty bring industry experience, and the cross-disciplinary environment with engineers sparks incredible innovation.",
        date: "2023-09-08", helpful: 75,
      },
    ],
    gallery: [
      { id: "g1", alt: "Campus Gate", gradient: ["#0ea5e9", "#6366f1"], label: "Main Gate" },
      { id: "g2", alt: "Academic Block", gradient: ["#6366f1", "#8b5cf6"], label: "Lecture Hall Complex" },
      { id: "g3", alt: "Library", gradient: ["#10b981", "#0d9488"], label: "Central Library" },
      { id: "g4", alt: "Innovation Center", gradient: ["#f59e0b", "#f97316"], label: "Innovation Hub" },
      { id: "g5", alt: "Sports Ground", gradient: ["#8b5cf6", "#ec4899"], label: "Sports Grounds" },
      { id: "g6", alt: "Hostel Area", gradient: ["#ef4444", "#dc2626"], label: "Residential Zone" },
    ],
  }),

  buildDetail("aiims-delhi", {
    affiliation: "Central Government (AIIMS Act 1956)",
    campusSize: "107 acres",
    totalStudents: 4500,
    totalFaculty: 750,
    website: "https://www.aiims.edu",
    longDescription:
      "The All India Institute of Medical Sciences, New Delhi, established in 1956, is India's most prestigious medical institution. It functions as both a premier medical college and a hospital that treats over 4 million patients annually. AIIMS Delhi is globally recognized for clinical excellence, groundbreaking medical research, and affordable healthcare education. The institute has produced some of the finest doctors, surgeons, and medical researchers in the world.",
    courses: [
      { id: "c1", name: "MBBS", duration: "5.5 Years", fees: 7500, eligibility: "NEET UG", seats: 107, type: "Medical" },
      { id: "c2", name: "B.Sc Nursing", duration: "4 Years", fees: 5000, eligibility: "NEET UG", seats: 60, type: "Medical" },
      { id: "c3", name: "MD General Medicine", duration: "3 Years", fees: 12000, eligibility: "NEET PG", seats: 30, type: "Medical" },
      { id: "c4", name: "MS General Surgery", duration: "3 Years", fees: 12000, eligibility: "NEET PG", seats: 25, type: "Medical" },
    ],
    placement: {
      year: 2025,
      averagePackage: 1500000,
      highestPackage: 5000000,
      medianPackage: 1200000,
      placementPercentage: 100,
      totalOffers: 200,
      topRecruiters: [
        { name: "Apollo Hospitals", logoGradient: ["#1d4ed8", "#3b82f6"], acronym: "APL" },
        { name: "Fortis Healthcare", logoGradient: ["#059669", "#10b981"], acronym: "FTS" },
        { name: "Max Healthcare", logoGradient: ["#dc2626", "#ef4444"], acronym: "MAX" },
        { name: "AIIMS Network", logoGradient: ["#0ea5e9", "#6366f1"], acronym: "AIM" },
      ],
    },
    reviews: [
      {
        id: "r1", author: "Dr. Sneha Gupta", avatar: "SG", graduationYear: 2023, course: "MBBS",
        rating: 5, title: "The gold standard of medical education",
        text: "Studying at AIIMS Delhi is a privilege. The clinical exposure from day one, world-class faculty, and the sheer volume of cases you see is unparalleled anywhere in India.",
        date: "2023-12-01", helpful: 210,
      },
      {
        id: "r2", author: "Dr. Vikram Patel", avatar: "VP", graduationYear: 2022, course: "MD Medicine",
        rating: 5, title: "Unmatched residency experience",
        text: "The MD program at AIIMS is incredibly rigorous. You are exposed to rare cases, cutting-edge treatments, and mentored by legends in Indian medicine. Wouldn't trade this experience for anything.",
        date: "2022-07-15", helpful: 178,
      },
    ],
    gallery: [
      { id: "g1", alt: "Main Hospital", gradient: ["#10b981", "#059669"], label: "Main Hospital" },
      { id: "g2", alt: "Research Wing", gradient: ["#0ea5e9", "#0284c7"], label: "Research Wing" },
      { id: "g3", alt: "Anatomy Hall", gradient: ["#6366f1", "#4f46e5"], label: "Anatomy Hall" },
      { id: "g4", alt: "Medical Library", gradient: ["#f59e0b", "#d97706"], label: "B.B. Dikshit Library" },
      { id: "g5", alt: "Student Quarters", gradient: ["#8b5cf6", "#7c3aed"], label: "Student Quarters" },
      { id: "g6", alt: "Conference Hall", gradient: ["#ec4899", "#db2777"], label: "Conference Center" },
    ],
  }),

  buildDetail("iim-ahmedabad", {
    affiliation: "Autonomous (IIMA Society)",
    campusSize: "106 acres",
    totalStudents: 1200,
    totalFaculty: 130,
    website: "https://www.iima.ac.in",
    longDescription:
      "Indian Institute of Management Ahmedabad, founded in 1961 with collaboration from Harvard Business School, is India's premier business school. Known for its iconic Louis Kahn-designed campus, IIMA has produced generations of business leaders, CEOs, and entrepreneurs. Its flagship PGP (MBA) program is among the most selective globally, with acceptance rates under 1%.",
    courses: [
      { id: "c1", name: "PGP (MBA)", duration: "2 Years", fees: 2300000, eligibility: "CAT + WAT/PI", seats: 400, type: "Management" },
      { id: "c2", name: "PGP-FABM", duration: "2 Years", fees: 2100000, eligibility: "CAT + Interview", seats: 50, type: "Management" },
      { id: "c3", name: "ePGP (Executive MBA)", duration: "1 Year", fees: 3200000, eligibility: "5+ Yrs Experience", seats: 80, type: "Management" },
    ],
    placement: {
      year: 2025,
      averagePackage: 3600000,
      highestPackage: 58000000,
      medianPackage: 3100000,
      placementPercentage: 100,
      totalOffers: 520,
      topRecruiters: [COMMON_RECRUITERS[3], COMMON_RECRUITERS[4], COMMON_RECRUITERS[0], COMMON_RECRUITERS[1], COMMON_RECRUITERS[5]],
    },
    reviews: [
      {
        id: "r1", author: "Neha Agarwal", avatar: "NA", graduationYear: 2024, course: "PGP",
        rating: 5, title: "MBA that changes your worldview",
        text: "The case-based pedagogy at IIMA is phenomenal. Every class is a debate, every assignment pushes boundaries. The alumni network is the strongest in India. Life-changing experience.",
        date: "2024-04-20", helpful: 190,
      },
    ],
    gallery: [
      { id: "g1", alt: "Louis Kahn Plaza", gradient: ["#f59e0b", "#ef4444"], label: "Louis Kahn Plaza" },
      { id: "g2", alt: "Harvard Steps", gradient: ["#dc2626", "#b91c1c"], label: "Heritage Campus" },
      { id: "g3", alt: "New Campus", gradient: ["#6366f1", "#4f46e5"], label: "New Campus" },
      { id: "g4", alt: "Library", gradient: ["#0ea5e9", "#0284c7"], label: "Vikram Sarabhai Library" },
      { id: "g5", alt: "Dorms", gradient: ["#10b981", "#059669"], label: "Student Dorms" },
      { id: "g6", alt: "Auditorium", gradient: ["#8b5cf6", "#7c3aed"], label: "Auditorium" },
    ],
  }),
];

/**
 * Generate a generic detail for any college that doesn't have hand-crafted data.
 */
function generateGenericDetail(slug: string): CollegeDetail | null {
  const base = MOCK_COLLEGES.find((c) => c.slug === slug);
  if (!base) return null;

  return {
    ...base,
    affiliation: "University Grants Commission (UGC)",
    campusSize: "200 acres",
    totalStudents: 5000,
    totalFaculty: 300,
    website: `https://www.${slug.replace(/-/g, "")}.edu`,
    longDescription: `${base.description} The institution has a strong academic tradition spanning ${new Date().getFullYear() - base.established} years and continues to evolve with modern pedagogy, research initiatives, and industry partnerships. Students benefit from a comprehensive learning environment that combines theoretical knowledge with practical application.`,
    courses: base.courseTypes.slice(0, 4).map((type, i) => ({
      id: `c${i + 1}`,
      name: `B.${type === "Engineering" ? "Tech" : type === "Medical" ? "Sc" : type === "Management" ? "BA" : type === "Law" ? "A.LLB" : type === "Commerce" ? "Com" : type === "Arts" ? "A" : type === "Design" ? "Des" : type === "Pharmacy" ? "Pharm" : "Sc"} ${type}`,
      duration: type === "Medical" ? "5.5 Years" : type === "Law" ? "5 Years" : "4 Years",
      fees: base.fees,
      eligibility: type === "Engineering" ? "JEE Main" : type === "Medical" ? "NEET" : type === "Management" ? "CAT" : type === "Law" ? "CLAT" : "Merit Based",
      seats: 60 + i * 20,
      type,
    })),
    placement: {
      year: 2025,
      averagePackage: base.fees * 3,
      highestPackage: base.fees * 15,
      medianPackage: base.fees * 2.5,
      placementPercentage: 80 + Math.floor(base.rating * 3),
      totalOffers: 300 + base.reviewCount,
      topRecruiters: COMMON_RECRUITERS.slice(2, 6),
    },
    reviews: [
      {
        id: "r1",
        author: "Student Alumni",
        avatar: "SA",
        graduationYear: 2024,
        course: base.courseTypes[0],
        rating: base.rating,
        title: `Great experience at ${base.acronym}`,
        text: `${base.name} provided an excellent foundation for my career. The faculty was supportive, the campus life was vibrant, and the placement assistance was commendable. I would highly recommend this institution to aspiring students.`,
        date: "2024-06-01",
        helpful: 45,
      },
    ],
    gallery: [
      { id: "g1", alt: "Main Building", gradient: base.logoGradient, label: "Main Building" },
      { id: "g2", alt: "Library", gradient: ["#0ea5e9", "#6366f1"], label: "Library" },
      { id: "g3", alt: "Campus", gradient: ["#10b981", "#059669"], label: "Campus Grounds" },
      { id: "g4", alt: "Lab", gradient: ["#f59e0b", "#ef4444"], label: "Laboratories" },
      { id: "g5", alt: "Sports", gradient: ["#8b5cf6", "#ec4899"], label: "Sports Facilities" },
      { id: "g6", alt: "Hostel", gradient: ["#ef4444", "#f97316"], label: "Hostel Block" },
    ],
  };
}

/**
 * Look up a college detail by slug.
 * Returns hand-crafted detail if available, otherwise generates a generic one.
 */
export function getCollegeBySlug(slug: string): CollegeDetail | null {
  return (
    COLLEGE_DETAILS.find((c) => c.slug === slug) ??
    generateGenericDetail(slug) ??
    null
  );
}
