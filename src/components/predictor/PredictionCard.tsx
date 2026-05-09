import Link from "next/link";
import type { PredictionResult } from "@/types/predictor";
import ChanceBadge from "./ChanceBadge";

interface PredictionCardProps {
  result: PredictionResult;
  index: number;
}

function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function PredictionCard({ result, index }: PredictionCardProps) {
  const { cutoff, chance, userRank, closingRank, gap } = result;

  return (
    <div
      className="group relative flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 80}ms` }}
      id={`prediction-card-${cutoff.courseId}`}
    >
      {/* ── Left: Logo + Info ──────────────── */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        {/* Logo */}
        <Link href={`/colleges/${cutoff.collegeSlug}`} className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${cutoff.logoGradient[0]}, ${cutoff.logoGradient[1]})`,
            }}
          >
            {cutoff.acronym.slice(0, 4)}
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          {/* College name */}
          <Link
            href={`/colleges/${cutoff.collegeSlug}`}
            className="text-sm font-semibold text-white hover:text-primary-400 transition-colors line-clamp-1"
          >
            {cutoff.collegeName}
          </Link>

          {/* Course */}
          <p className="text-xs text-primary-400/80 font-medium mt-0.5">
            {cutoff.courseName}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-surface-200/40">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{cutoff.location}</span>
          </div>
        </div>
      </div>

      {/* ── Middle: Stats ──────────────────── */}
      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
        {/* Rank comparison */}
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase tracking-wider">Closing Rank</p>
          <p className="text-sm font-bold text-white">{closingRank.toLocaleString("en-IN")}</p>
          <p className={`text-[10px] font-medium mt-0.5 ${gap >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {gap >= 0 ? `↑ ${gap.toLocaleString("en-IN")} ahead` : `↓ ${Math.abs(gap).toLocaleString("en-IN")} behind`}
          </p>
        </div>

        {/* Fees */}
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase tracking-wider">Fees</p>
          <p className="text-sm font-semibold text-gradient">{formatCurrency(cutoff.fees)}</p>
        </div>

        {/* Rating */}
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase tracking-wider">Rating</p>
          <p className="text-sm font-semibold text-amber-400">⭐ {cutoff.rating}</p>
        </div>
      </div>

      {/* ── Right: Badge + Actions ─────────── */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <ChanceBadge chance={chance} size="md" />
        <Link
          href={`/colleges/${cutoff.collegeSlug}`}
          className="p-2 rounded-lg text-surface-200/30 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
          title="View Details"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
