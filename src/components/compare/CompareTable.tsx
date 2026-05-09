import Link from "next/link";
import type { CollegeDetail } from "@/types/college";

interface CompareTableProps {
  colleges: CollegeDetail[];
  onRemove: (slug: string) => void;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

type HighlightMode = "highest" | "lowest" | "none";

function getCellHighlight(
  values: number[],
  index: number,
  mode: HighlightMode
): string {
  if (mode === "none" || values.length < 2) return "";
  const best = mode === "highest" ? Math.max(...values) : Math.min(...values);
  if (values[index] === best) {
    return "text-accent-400 font-bold";
  }
  return "";
}

interface Row {
  label: string;
  icon: string;
  getValue: (c: CollegeDetail) => string;
  getNumeric?: (c: CollegeDetail) => number;
  highlight: HighlightMode;
}

const COMPARISON_ROWS: Row[] = [
  {
    label: "Location",
    icon: "📍",
    getValue: (c) => c.location,
    highlight: "none",
  },
  {
    label: "Rating",
    icon: "⭐",
    getValue: (c) => `${c.rating.toFixed(1)} / 5.0`,
    getNumeric: (c) => c.rating,
    highlight: "highest",
  },
  {
    label: "Fees (per year)",
    icon: "💵",
    getValue: (c) => formatCurrency(c.fees),
    getNumeric: (c) => c.fees,
    highlight: "lowest",
  },
  {
    label: "Established",
    icon: "🏛️",
    getValue: (c) => c.established.toString(),
    highlight: "none",
  },
  {
    label: "Accreditation",
    icon: "✅",
    getValue: (c) => c.accreditation,
    highlight: "none",
  },
  {
    label: "Placement %",
    icon: "📈",
    getValue: (c) => `${c.placement.placementPercentage}%`,
    getNumeric: (c) => c.placement.placementPercentage,
    highlight: "highest",
  },
  {
    label: "Avg. Package",
    icon: "💰",
    getValue: (c) => formatCurrency(c.placement.averagePackage),
    getNumeric: (c) => c.placement.averagePackage,
    highlight: "highest",
  },
  {
    label: "Highest Package",
    icon: "🚀",
    getValue: (c) => formatCurrency(c.placement.highestPackage),
    getNumeric: (c) => c.placement.highestPackage,
    highlight: "highest",
  },
  {
    label: "Total Courses",
    icon: "📚",
    getValue: (c) => c.courses.length.toString(),
    getNumeric: (c) => c.courses.length,
    highlight: "highest",
  },
  {
    label: "Top Courses",
    icon: "🎓",
    getValue: (c) => c.courseTypes.slice(0, 3).join(", "),
    highlight: "none",
  },
];

export default function CompareTable({ colleges, onRemove }: CompareTableProps) {
  return (
    <div id="compare-table">
      {/* ── Desktop Table ─────────────────── */}
      <div className="hidden md:block rounded-2xl glass overflow-hidden">
        <table className="w-full">
          {/* Header: College logos + names */}
          <thead>
            <tr className="border-b border-white/5">
              <th className="sticky left-0 z-10 bg-surface-950/90 backdrop-blur-xl w-44 px-5 py-5 text-left text-xs font-semibold text-surface-200/40 uppercase tracking-wider">
                Compare
              </th>
              {colleges.map((college) => (
                <th key={college.slug} className="px-5 py-5 text-center min-w-[200px]">
                  <div className="flex flex-col items-center gap-2">
                    {/* Logo */}
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="group"
                    >
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})`,
                        }}
                      >
                        {college.acronym.slice(0, 4)}
                      </div>
                    </Link>
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="text-sm font-semibold text-white hover:text-primary-400 transition-colors line-clamp-2 leading-tight"
                    >
                      {college.name}
                    </Link>
                    <button
                      onClick={() => onRemove(college.slug)}
                      className="text-[10px] text-surface-200/30 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body: Comparison rows */}
          <tbody>
            {COMPARISON_ROWS.map((row, rowIdx) => {
              const numericValues = row.getNumeric
                ? colleges.map((c) => row.getNumeric!(c))
                : [];

              return (
                <tr
                  key={row.label}
                  className={`transition-colors hover:bg-white/[0.01] ${
                    rowIdx < COMPARISON_ROWS.length - 1
                      ? "border-b border-white/[0.03]"
                      : ""
                  }`}
                >
                  <td className="sticky left-0 z-10 bg-surface-950/90 backdrop-blur-xl px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{row.icon}</span>
                      <span className="text-xs font-medium text-surface-200/50">
                        {row.label}
                      </span>
                    </div>
                  </td>
                  {colleges.map((college, colIdx) => {
                    const highlight = row.getNumeric
                      ? getCellHighlight(numericValues, colIdx, row.highlight)
                      : "";
                    return (
                      <td
                        key={college.slug}
                        className={`px-5 py-4 text-center text-sm ${
                          highlight || "text-surface-200/70"
                        }`}
                      >
                        {row.getValue(college)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Stacked Cards ──────────── */}
      <div className="md:hidden space-y-6">
        {COMPARISON_ROWS.map((row) => {
          const numericValues = row.getNumeric
            ? colleges.map((c) => row.getNumeric!(c))
            : [];

          return (
            <div key={row.label} className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">{row.icon}</span>
                <span className="text-xs font-semibold text-surface-200/50 uppercase tracking-wider">
                  {row.label}
                </span>
              </div>
              <div className="space-y-2">
                {colleges.map((college, colIdx) => {
                  const highlight = row.getNumeric
                    ? getCellHighlight(numericValues, colIdx, row.highlight)
                    : "";
                  return (
                    <div
                      key={college.slug}
                      className="flex items-center justify-between py-1.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})`,
                          }}
                        >
                          {college.acronym.slice(0, 3)}
                        </div>
                        <span className="text-xs text-surface-200/50 truncate">
                          {college.acronym}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${highlight || "text-surface-200/70"}`}
                      >
                        {row.getValue(college)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
