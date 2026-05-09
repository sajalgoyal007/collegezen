import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper to build gallery
const gallery = (g: [string, string][], labels: string[]) =>
  labels.map((label, i) => ({ alt: label, gradient: g[i % g.length], label }));

// Helper for recruiters JSON
const recruiters = (
  list: { name: string; logoGradient: [string, string]; acronym: string }[]
) =>
  list.map((item) => ({
    ...item,
    logoGradient: item.logoGradient as [string, string],
  }));

const TECH_RECRUITERS = [
  { 
    name: "Google", 
    logoGradient: ["#4285F4", "#34A853"] as [string, string], 
    acronym: "G" 
  },
  { 
    name: "Microsoft", 
    logoGradient: ["#00A4EF", "#7FBA00"] as [string, string], 
    acronym: "MS" 
  },
  { 
    name: "Amazon", 
    logoGradient: ["#FF9900", "#232F3E"] as [string, string], 
    acronym: "AMZ" 
  },
  { 
    name: "Goldman Sachs", 
    logoGradient: ["#6BA3D6", "#1D3557"] as [string, string], 
    acronym: "GS" 
  },
  { 
    name: "McKinsey", 
    logoGradient: ["#004B87", "#0072CE"] as [string, string], 
    acronym: "McK" 
  },
  { 
    name: "Deloitte", 
    logoGradient: ["#86BC25", "#0076A8"] as [string, string], 
    acronym: "DT" 
  },
];
const MED_RECRUITERS = [
  {
    name: "Apollo Hospitals",
    logoGradient: ["#1d4ed8", "#3b82f6"] as [string, string],
    acronym: "APL",
  },
  {
    name: "Fortis Healthcare",
    logoGradient: ["#059669", "#10b981"] as [string, string],
    acronym: "FTS",
  },
  {
    name: "Max Healthcare",
    logoGradient: ["#dc2626", "#ef4444"] as [string, string],
    acronym: "MAX",
  },
  {
    name: "AIIMS Network",
    logoGradient: ["#0ea5e9", "#6366f1"] as [string, string],
    acronym: "AIM",
  },
];

interface CollegeSeed {
  name: string; slug: string; location: string; city: string; state: string;
  description: string; longDescription: string; fees: number; rating: number;
  reviewCount: number; established: number; logoGradient: string[]; acronym: string;
  accreditation: string; featured: boolean; courseTypes: string[];
  affiliation: string; campusSize: string; totalStudents: number; totalFaculty: number;
  website: string;
  courses: { name: string; duration: string; fees: number; eligibility: string; seats: number; type: string }[];
  placement: { year: number; averagePackage: number; highestPackage: number; medianPackage: number; placementPercentage: number; totalOffers: number; topRecruiters: unknown[] };
  reviews: { author: string; avatar: string; graduationYear: number; course: string; rating: number; title: string; text: string; helpful: number }[];
  galleryLabels: string[];
  galleryGradients: [string, string][];
}

const COLLEGES: CollegeSeed[] = [
  {
    name: "Indian Institute of Technology Bombay", slug: "iit-bombay",
    location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra",
    description: "Premier engineering institute known for cutting-edge research, world-class faculty, and exceptional placement records.",
    longDescription: "Indian Institute of Technology Bombay is one of India's premier engineering institutions, established in 1958 with assistance from UNESCO and the Soviet Union. Located in Powai, Mumbai, IIT Bombay is renowned for its rigorous academic programs, cutting-edge research facilities, and exceptional placement records. The institute offers undergraduate, postgraduate, and doctoral programs across various departments of engineering, science, humanities, and management.",
    fees: 250000, rating: 4.9, reviewCount: 3842, established: 1958,
    logoGradient: ["#6366f1", "#8b5cf6"], acronym: "IITB", accreditation: "NAAC A++", featured: true,
    courseTypes: ["Engineering", "Science", "Management"],
    affiliation: "Autonomous (UGC Act 1956)", campusSize: "550 acres", totalStudents: 11200, totalFaculty: 680, website: "https://www.iitb.ac.in",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 250000, eligibility: "JEE Advanced", seats: 120, type: "Engineering" },
      { name: "B.Tech Electrical Engineering", duration: "4 Years", fees: 250000, eligibility: "JEE Advanced", seats: 100, type: "Engineering" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years", fees: 250000, eligibility: "JEE Advanced", seats: 110, type: "Engineering" },
      { name: "M.Tech AI & Data Science", duration: "2 Years", fees: 130000, eligibility: "GATE + Interview", seats: 40, type: "Engineering" },
      { name: "MBA", duration: "2 Years", fees: 1100000, eligibility: "CAT + Interview", seats: 120, type: "Management" },
      { name: "M.Sc Physics", duration: "2 Years", fees: 50000, eligibility: "JAM", seats: 60, type: "Science" },
    ],
    placement: { year: 2025, averagePackage: 2150000, highestPackage: 27500000, medianPackage: 1800000, placementPercentage: 95, totalOffers: 1420, topRecruiters: recruiters(TECH_RECRUITERS) },
    reviews: [
      { author: "Arjun Mehta", avatar: "AM", graduationYear: 2024, course: "B.Tech CSE", rating: 5, title: "Best 4 years of my life", text: "IIT Bombay gave me world-class exposure, amazing peers, and opportunities I couldn't have imagined.", helpful: 142 },
      { author: "Priya Sharma", avatar: "PS", graduationYear: 2023, course: "MBA", rating: 4, title: "Incredible MBA experience", text: "SJMSOM at IIT Bombay provides a unique blend of management and technology education.", helpful: 98 },
      { author: "Rahul Kumar", avatar: "RK", graduationYear: 2024, course: "B.Tech EE", rating: 5, title: "Rigorous but rewarding", text: "The academic rigor here is intense but it prepares you for anything.", helpful: 87 },
    ],
    galleryLabels: ["Main Building", "Central Library", "Hostel Complex", "Research Lab", "Sports Complex", "Convocation Hall"],
    galleryGradients: [["#6366f1", "#8b5cf6"], ["#0ea5e9", "#6366f1"], ["#10b981", "#059669"], ["#f59e0b", "#ef4444"], ["#8b5cf6", "#ec4899"], ["#ef4444", "#f97316"]],
  },
  {
    name: "Indian Institute of Technology Delhi", slug: "iit-delhi",
    location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi",
    description: "One of India's top engineering institutions offering innovative programs in engineering, sciences, and humanities.",
    longDescription: "Indian Institute of Technology Delhi, established in 1961, is among India's most prestigious engineering institutions. Located in Hauz Khas, South Delhi, the campus provides a vibrant academic ecosystem with numerous patents, publications, and startup incubation.",
    fees: 230000, rating: 4.8, reviewCount: 3156, established: 1961,
    logoGradient: ["#0ea5e9", "#6366f1"], acronym: "IITD", accreditation: "NAAC A++", featured: true,
    courseTypes: ["Engineering", "Science", "Design"],
    affiliation: "Autonomous (UGC Act 1956)", campusSize: "325 acres", totalStudents: 9800, totalFaculty: 550, website: "https://home.iitd.ac.in",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 230000, eligibility: "JEE Advanced", seats: 95, type: "Engineering" },
      { name: "B.Tech Electrical Engineering", duration: "4 Years", fees: 230000, eligibility: "JEE Advanced", seats: 90, type: "Engineering" },
      { name: "B.Des Industrial Design", duration: "4 Years", fees: 230000, eligibility: "UCEED", seats: 30, type: "Design" },
      { name: "M.Tech Machine Learning", duration: "2 Years", fees: 120000, eligibility: "GATE + Interview", seats: 35, type: "Engineering" },
    ],
    placement: { year: 2025, averagePackage: 2050000, highestPackage: 25000000, medianPackage: 1750000, placementPercentage: 93, totalOffers: 1200, topRecruiters: recruiters(TECH_RECRUITERS.slice(0, 5)) },
    reviews: [
      { author: "Kavita Singh", avatar: "KS", graduationYear: 2024, course: "B.Tech CSE", rating: 5, title: "Transformative experience", text: "IIT Delhi's CS department is world-class with extraordinary research opportunities.", helpful: 120 },
    ],
    galleryLabels: ["Main Gate", "Lecture Hall Complex", "Central Library", "Innovation Hub", "Sports Grounds", "Residential Zone"],
    galleryGradients: [["#0ea5e9", "#6366f1"], ["#6366f1", "#8b5cf6"], ["#10b981", "#0d9488"], ["#f59e0b", "#f97316"], ["#8b5cf6", "#ec4899"], ["#ef4444", "#dc2626"]],
  },
  {
    name: "All India Institute of Medical Sciences", slug: "aiims-delhi",
    location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi",
    description: "India's most prestigious medical institute with state-of-the-art healthcare facilities and groundbreaking medical research.",
    longDescription: "The All India Institute of Medical Sciences, New Delhi, established in 1956, is India's most prestigious medical institution. It functions as both a premier medical college and a hospital that treats over 4 million patients annually.",
    fees: 7500, rating: 4.9, reviewCount: 2789, established: 1956,
    logoGradient: ["#10b981", "#059669"], acronym: "AIIMS", accreditation: "NAAC A++", featured: true,
    courseTypes: ["Medical"],
    affiliation: "Central Government (AIIMS Act 1956)", campusSize: "107 acres", totalStudents: 4500, totalFaculty: 750, website: "https://www.aiims.edu",
    courses: [
      { name: "MBBS", duration: "5.5 Years", fees: 7500, eligibility: "NEET UG", seats: 107, type: "Medical" },
      { name: "B.Sc Nursing", duration: "4 Years", fees: 5000, eligibility: "NEET UG", seats: 60, type: "Medical" },
      { name: "MD General Medicine", duration: "3 Years", fees: 12000, eligibility: "NEET PG", seats: 30, type: "Medical" },
    ],
    placement: { year: 2025, averagePackage: 1500000, highestPackage: 5000000, medianPackage: 1200000, placementPercentage: 100, totalOffers: 200, topRecruiters: recruiters(MED_RECRUITERS) },
    reviews: [
      { author: "Dr. Sneha Gupta", avatar: "SG", graduationYear: 2023, course: "MBBS", rating: 5, title: "Gold standard of medical education", text: "Studying at AIIMS Delhi is a privilege. Clinical exposure from day one is unparalleled.", helpful: 210 },
    ],
    galleryLabels: ["Main Hospital", "Research Wing", "Anatomy Hall", "Medical Library", "Student Quarters", "Conference Center"],
    galleryGradients: [["#10b981", "#059669"], ["#0ea5e9", "#0284c7"], ["#6366f1", "#4f46e5"], ["#f59e0b", "#d97706"], ["#8b5cf6", "#7c3aed"], ["#ec4899", "#db2777"]],
  },
  {
    name: "Indian Institute of Management Ahmedabad", slug: "iim-ahmedabad",
    location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat",
    description: "India's premier business school producing top-tier business leaders with world-class MBA programs.",
    longDescription: "Indian Institute of Management Ahmedabad, founded in 1961 with collaboration from Harvard Business School, is India's premier business school. Known for its iconic Louis Kahn-designed campus with acceptance rates under 1%.",
    fees: 2300000, rating: 4.9, reviewCount: 2456, established: 1961,
    logoGradient: ["#f59e0b", "#ef4444"], acronym: "IIMA", accreditation: "NAAC A++", featured: true,
    courseTypes: ["Management"],
    affiliation: "Autonomous (IIMA Society)", campusSize: "106 acres", totalStudents: 1200, totalFaculty: 130, website: "https://www.iima.ac.in",
    courses: [
      { name: "PGP (MBA)", duration: "2 Years", fees: 2300000, eligibility: "CAT + WAT/PI", seats: 400, type: "Management" },
      { name: "PGP-FABM", duration: "2 Years", fees: 2100000, eligibility: "CAT + Interview", seats: 50, type: "Management" },
      { name: "ePGP (Executive MBA)", duration: "1 Year", fees: 3200000, eligibility: "5+ Yrs Experience", seats: 80, type: "Management" },
    ],
    placement: { year: 2025, averagePackage: 3600000, highestPackage: 58000000, medianPackage: 3100000, placementPercentage: 100, totalOffers: 520, topRecruiters: recruiters([TECH_RECRUITERS[3], TECH_RECRUITERS[4], TECH_RECRUITERS[0], TECH_RECRUITERS[1]]) },
    reviews: [
      { author: "Neha Agarwal", avatar: "NA", graduationYear: 2024, course: "PGP", rating: 5, title: "MBA that changes your worldview", text: "The case-based pedagogy at IIMA is phenomenal. The alumni network is the strongest in India.", helpful: 190 },
    ],
    galleryLabels: ["Louis Kahn Plaza", "Heritage Campus", "New Campus", "Vikram Sarabhai Library", "Student Dorms", "Auditorium"],
    galleryGradients: [["#f59e0b", "#ef4444"], ["#dc2626", "#b91c1c"], ["#6366f1", "#4f46e5"], ["#0ea5e9", "#0284c7"], ["#10b981", "#059669"], ["#8b5cf6", "#7c3aed"]],
  },
];

// Generate remaining 14 colleges with generic detail data
const REMAINING: Omit<CollegeSeed, "longDescription" | "courses" | "placement" | "reviews" | "galleryLabels" | "galleryGradients" | "affiliation" | "campusSize" | "totalStudents" | "totalFaculty" | "website">[] = [
  { name: "National Law School of India University", slug: "nlsiu-bangalore", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", description: "India's premier law university setting benchmarks in legal education and advocacy training.", fees: 280000, rating: 4.7, reviewCount: 1234, established: 1987, logoGradient: ["#8b5cf6", "#ec4899"], acronym: "NLSIU", accreditation: "NAAC A", featured: false, courseTypes: ["Law"] },
  { name: "Birla Institute of Technology and Science Pilani", slug: "bits-pilani", location: "Pilani, Rajasthan", city: "Pilani", state: "Rajasthan", description: "Leading private engineering institute known for its unique practice school system.", fees: 520000, rating: 4.6, reviewCount: 2890, established: 1964, logoGradient: ["#ef4444", "#f97316"], acronym: "BITS", accreditation: "NAAC A", featured: false, courseTypes: ["Engineering", "Science", "Pharmacy"] },
  { name: "St. Xavier's College Mumbai", slug: "xaviers-mumbai", location: "Mumbai, Maharashtra", city: "Mumbai", state: "Maharashtra", description: "One of India's oldest and most prestigious liberal arts colleges.", fees: 45000, rating: 4.5, reviewCount: 1567, established: 1869, logoGradient: ["#0284c7", "#0ea5e9"], acronym: "SXC", accreditation: "NAAC A++", featured: false, courseTypes: ["Arts", "Science", "Commerce"] },
  { name: "National Institute of Design Ahmedabad", slug: "nid-ahmedabad", location: "Ahmedabad, Gujarat", city: "Ahmedabad", state: "Gujarat", description: "India's foremost design institution offering programs in industrial, communication, and digital design.", fees: 380000, rating: 4.7, reviewCount: 987, established: 1961, logoGradient: ["#ec4899", "#f43f5e"], acronym: "NID", accreditation: "NAAC A", featured: false, courseTypes: ["Design"] },
  { name: "Indian Institute of Technology Madras", slug: "iit-madras", location: "Chennai, Tamil Nadu", city: "Chennai", state: "Tamil Nadu", description: "Consistently ranked #1 in India, excels in research output and innovative engineering education.", fees: 240000, rating: 4.9, reviewCount: 3567, established: 1959, logoGradient: ["#6366f1", "#0ea5e9"], acronym: "IITM", accreditation: "NAAC A++", featured: true, courseTypes: ["Engineering", "Science", "Management"] },
  { name: "Jawaharlal Nehru University", slug: "jnu-delhi", location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi", description: "India's top research university known for social sciences and international studies.", fees: 15000, rating: 4.4, reviewCount: 2134, established: 1969, logoGradient: ["#059669", "#0d9488"], acronym: "JNU", accreditation: "NAAC A++", featured: false, courseTypes: ["Arts", "Science"] },
  { name: "Manipal Academy of Higher Education", slug: "manipal-university", location: "Manipal, Karnataka", city: "Manipal", state: "Karnataka", description: "Globally recognized multi-disciplinary university offering 300+ programs.", fees: 450000, rating: 4.3, reviewCount: 3210, established: 1953, logoGradient: ["#f97316", "#eab308"], acronym: "MAHE", accreditation: "NAAC A++", featured: false, courseTypes: ["Engineering", "Medical", "Management", "Commerce"] },
  { name: "Vellore Institute of Technology", slug: "vit-vellore", location: "Vellore, Tamil Nadu", city: "Vellore", state: "Tamil Nadu", description: "Top private engineering university with excellent placement records.", fees: 395000, rating: 4.2, reviewCount: 4567, established: 1984, logoGradient: ["#7c3aed", "#4f46e5"], acronym: "VIT", accreditation: "NAAC A++", featured: false, courseTypes: ["Engineering", "Science", "Management"] },
  { name: "Shri Ram College of Commerce", slug: "srcc-delhi", location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi", description: "India's most prestigious commerce college known for producing top finance professionals.", fees: 35000, rating: 4.6, reviewCount: 1876, established: 1926, logoGradient: ["#dc2626", "#b91c1c"], acronym: "SRCC", accreditation: "NAAC A++", featured: false, courseTypes: ["Commerce", "Management"] },
  { name: "Indian Institute of Technology Kanpur", slug: "iit-kanpur", location: "Kanpur, Uttar Pradesh", city: "Kanpur", state: "Uttar Pradesh", description: "A pioneer in computer science education in India with pioneering research.", fees: 235000, rating: 4.8, reviewCount: 2890, established: 1959, logoGradient: ["#2563eb", "#7c3aed"], acronym: "IITK", accreditation: "NAAC A++", featured: false, courseTypes: ["Engineering", "Science", "Design"] },
  { name: "Symbiosis International University", slug: "symbiosis-pune", location: "Pune, Maharashtra", city: "Pune", state: "Maharashtra", description: "Leading private university offering globally benchmarked programs.", fees: 580000, rating: 4.3, reviewCount: 2345, established: 2002, logoGradient: ["#0891b2", "#06b6d4"], acronym: "SIU", accreditation: "NAAC A", featured: false, courseTypes: ["Management", "Law", "Design", "Arts"] },
  { name: "Christian Medical College Vellore", slug: "cmc-vellore", location: "Vellore, Tamil Nadu", city: "Vellore", state: "Tamil Nadu", description: "One of India's top medical colleges known for affordable healthcare education.", fees: 65000, rating: 4.7, reviewCount: 1890, established: 1900, logoGradient: ["#16a34a", "#15803d"], acronym: "CMC", accreditation: "NAAC A++", featured: false, courseTypes: ["Medical", "Pharmacy"] },
  { name: "Indian Institute of Science Bangalore", slug: "iisc-bangalore", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", description: "India's foremost research institution and highest-ranked Indian university globally.", fees: 35000, rating: 4.9, reviewCount: 1567, established: 1909, logoGradient: ["#1d4ed8", "#3b82f6"], acronym: "IISc", accreditation: "NAAC A++", featured: true, courseTypes: ["Engineering", "Science"] },
  { name: "Lady Shri Ram College for Women", slug: "lsr-delhi", location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi", description: "India's leading women's college known for academic excellence in humanities and social sciences.", fees: 28000, rating: 4.5, reviewCount: 1456, established: 1956, logoGradient: ["#c026d3", "#a855f7"], acronym: "LSR", accreditation: "NAAC A++", featured: false, courseTypes: ["Arts", "Commerce"] },
  // NITs
  { name: "National Institute of Technology Trichy", slug: "nit-trichy", location: "Tiruchirappalli, Tamil Nadu", city: "Tiruchirappalli", state: "Tamil Nadu", description: "India's top-ranked NIT known for stellar placements and strong alumni network.", fees: 175000, rating: 4.6, reviewCount: 2890, established: 1964, logoGradient: ["#0d9488", "#14b8a6"], acronym: "NITT", accreditation: "NAAC A++", featured: false, courseTypes: ["Engineering", "Science", "Management"] },
  { name: "National Institute of Technology Warangal", slug: "nit-warangal", location: "Warangal, Telangana", city: "Warangal", state: "Telangana", description: "One of the premier NITs with excellent research facilities and industry collaborations.", fees: 165000, rating: 4.5, reviewCount: 2345, established: 1959, logoGradient: ["#1e40af", "#3b82f6"], acronym: "NITW", accreditation: "NAAC A+", featured: false, courseTypes: ["Engineering", "Science"] },
  { name: "National Institute of Technology Surathkal", slug: "nit-surathkal", location: "Mangalore, Karnataka", city: "Mangalore", state: "Karnataka", description: "Top NIT on the west coast known for its scenic campus and strong technical education.", fees: 170000, rating: 4.5, reviewCount: 2567, established: 1960, logoGradient: ["#0369a1", "#0ea5e9"], acronym: "NITK", accreditation: "NAAC A+", featured: false, courseTypes: ["Engineering", "Science"] },
  { name: "National Institute of Technology Rourkela", slug: "nit-rourkela", location: "Rourkela, Odisha", city: "Rourkela", state: "Odisha", description: "Leading NIT in eastern India with strong metallurgical and mining engineering programs.", fees: 155000, rating: 4.4, reviewCount: 2100, established: 1961, logoGradient: ["#b45309", "#f59e0b"], acronym: "NITR", accreditation: "NAAC A+", featured: false, courseTypes: ["Engineering", "Science"] },
  // IIITs
  { name: "IIIT Hyderabad", slug: "iiit-hyderabad", location: "Hyderabad, Telangana", city: "Hyderabad", state: "Telangana", description: "India's premier IIIT known for exceptional CS research and startup incubation.", fees: 310000, rating: 4.7, reviewCount: 1980, established: 1998, logoGradient: ["#7e22ce", "#a855f7"], acronym: "IIITH", accreditation: "NAAC A++", featured: false, courseTypes: ["Engineering", "Science"] },
  { name: "IIIT Bangalore", slug: "iiit-bangalore", location: "Bangalore, Karnataka", city: "Bangalore", state: "Karnataka", description: "Top IIIT in India's tech capital with strong industry-academia partnerships.", fees: 350000, rating: 4.5, reviewCount: 1670, established: 1999, logoGradient: ["#4338ca", "#6366f1"], acronym: "IIITB", accreditation: "NAAC A", featured: false, courseTypes: ["Engineering"] },
  { name: "IIIT Allahabad", slug: "iiit-allahabad", location: "Prayagraj, Uttar Pradesh", city: "Prayagraj", state: "Uttar Pradesh", description: "Government IIIT with strong placement records and growing research output.", fees: 145000, rating: 4.3, reviewCount: 1890, established: 1999, logoGradient: ["#15803d", "#22c55e"], acronym: "IIITA", accreditation: "NAAC A", featured: false, courseTypes: ["Engineering", "Science", "Management"] },
  { name: "IIIT Delhi", slug: "iiit-delhi", location: "New Delhi, Delhi", city: "New Delhi", state: "Delhi", description: "State IIIT offering cutting-edge programs in CS, AI, and data science.", fees: 325000, rating: 4.6, reviewCount: 1540, established: 2008, logoGradient: ["#be185d", "#ec4899"], acronym: "IIITD", accreditation: "NAAC A+", featured: false, courseTypes: ["Engineering"] },
];

function buildGenericSeed(c: typeof REMAINING[0]): CollegeSeed {
  const courseMap: Record<string, { prefix: string; elig: string; dur: string }> = {
    Engineering: { prefix: "B.Tech", elig: "JEE Main", dur: "4 Years" },
    Medical: { prefix: "MBBS", elig: "NEET", dur: "5.5 Years" },
    Management: { prefix: "BBA", elig: "CAT", dur: "2 Years" },
    Law: { prefix: "B.A. LLB", elig: "CLAT", dur: "5 Years" },
    Arts: { prefix: "B.A.", elig: "Merit Based", dur: "3 Years" },
    Science: { prefix: "B.Sc", elig: "Merit Based", dur: "3 Years" },
    Commerce: { prefix: "B.Com", elig: "Merit Based", dur: "3 Years" },
    Design: { prefix: "B.Des", elig: "Merit Based", dur: "4 Years" },
    Pharmacy: { prefix: "B.Pharm", elig: "Merit Based", dur: "4 Years" },
  };
  return {
    ...c,
    longDescription: `${c.description} The institution has a strong academic tradition spanning ${2025 - c.established} years and continues to evolve with modern pedagogy, research initiatives, and industry partnerships.`,
    affiliation: "University Grants Commission (UGC)", campusSize: "200 acres",
    totalStudents: 5000, totalFaculty: 300, website: `https://www.${c.slug.replace(/-/g, "")}.edu`,
    courses: c.courseTypes.slice(0, 3).map((type, i) => ({
      name: `${courseMap[type]?.prefix ?? "B.Sc"} ${type}`, duration: courseMap[type]?.dur ?? "3 Years",
      fees: c.fees, eligibility: courseMap[type]?.elig ?? "Merit Based", seats: 60 + i * 20, type,
    })),
    placement: {
      year: 2025, averagePackage: c.fees * 3, highestPackage: c.fees * 15,
      medianPackage: Math.round(c.fees * 2.5), placementPercentage: 80 + Math.floor(c.rating * 3),
      totalOffers: 300 + c.reviewCount,
      topRecruiters: recruiters(c.courseTypes.includes("Medical") ? MED_RECRUITERS.slice(0, 3) : TECH_RECRUITERS.slice(2, 6)),
    },
    reviews: [{ author: "Student Alumni", avatar: "SA", graduationYear: 2024, course: c.courseTypes[0], rating: c.rating, title: `Great experience at ${c.acronym}`, text: `${c.name} provided an excellent foundation for my career. The faculty was supportive and the campus life vibrant.`, helpful: 45 }],
    galleryLabels: ["Main Building", "Library", "Campus Grounds", "Laboratories", "Sports Facilities", "Hostel Block"],
    galleryGradients: [c.logoGradient as [string, string], ["#0ea5e9", "#6366f1"], ["#10b981", "#059669"], ["#f59e0b", "#ef4444"], ["#8b5cf6", "#ec4899"], ["#ef4444", "#f97316"]],
  };
}

async function main() {
  console.log("🌱 Seeding CollegeZen database...");

  // Clear existing data
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.placementStat.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  const allColleges = [...COLLEGES, ...REMAINING.map(buildGenericSeed)];

  for (const c of allColleges) {
    const college = await prisma.college.create({
      data: {
        name: c.name, slug: c.slug, location: c.location, city: c.city, state: c.state,
        description: c.description, longDescription: c.longDescription, fees: c.fees,
        rating: c.rating, reviewCount: c.reviewCount, established: c.established,
        logoGradient: c.logoGradient, acronym: c.acronym, accreditation: c.accreditation,
        featured: c.featured, courseTypes: c.courseTypes,
        affiliation: c.affiliation, campusSize: c.campusSize,
        totalStudents: c.totalStudents, totalFaculty: c.totalFaculty, website: c.website,
        courses: { create: c.courses },
        placements: {
          create: {
            year: c.placement.year, averagePackage: c.placement.averagePackage,
            highestPackage: c.placement.highestPackage, medianPackage: c.placement.medianPackage,
            placementPercentage: c.placement.placementPercentage, totalOffers: c.placement.totalOffers,
            topRecruiters: c.placement.topRecruiters,
          },
        },
        reviews: { create: c.reviews },
        gallery: {
          create: gallery(c.galleryGradients, c.galleryLabels),
        },
      },
    });
    console.log(`  ✅ ${college.name}`);
  }

  // Create a demo user
  await prisma.user.create({
    data: { email: "demo@collegezen.com", name: "Demo User", password: "hashed_placeholder" },
  });

  console.log("\n🎉 Seeding complete! 26 colleges + 1 demo user created.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
