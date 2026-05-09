/**
 * Application-wide constants
 */
export const SITE_CONFIG = {
  name: "CollegeZen",
  description:
    "Discover, compare, and choose the perfect college for your future. Data-driven insights to make your most important decision with confidence.",
  url: "https://collegezen.com",
} as const;

export const NAV_LINKS = [
  { label: "Explore", href: "/colleges" },
  { label: "Compare", href: "/compare" },
  { label: "Predictor", href: "/predictor" },
  { label: "Rankings", href: "/rankings" },
] as const;
