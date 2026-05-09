import Link from "next/link";
import type { College } from "@/types/college";
import SaveCollegeButton from "./SaveCollegeButton";

interface CollegeCardProps {
  college: College;
}

function formatFees(fees: number): string {
  if (fees >= 100000) {
    return `₹${(fees / 100000).toFixed(fees % 100000 === 0 ? 0 : 1)}L`;
  }
  if (fees >= 1000) {
    return `₹${(fees / 1000).toFixed(0)}K`;
  }
  return `₹${fees.toLocaleString("en-IN")}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        return (
          <svg
            key={star}
            className="w-3.5 h-3.5"
            viewBox="0 0 20 20"
            fill="none"
          >
            {/* Background star */}
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill="rgba(255,255,255,0.06)"
            />
            {/* Filled star */}
            {fill > 0 && (
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill="#f59e0b"
                opacity={fill}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Link
      href={`/colleges/${college.slug}`}
      id={`college-card-${college.id}`}
      className="group relative flex flex-col rounded-2xl glass overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-primary-500/5"
    >
      {/* Top-right actions */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        {college.featured && (
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-lg shadow-primary-500/20">
            Featured
          </div>
        )}
        <SaveCollegeButton collegeId={college.id} collegeName={college.name} size="sm" />
      </div>

      {/* ── Image / Gradient Header ─────────────── */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${college.logoGradient[0]}20, ${college.logoGradient[1]}20)`,
        }}
      >
        {/* Decorative shapes */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: college.logoGradient[0] }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full opacity-15 blur-2xl"
          style={{ backgroundColor: college.logoGradient[1] }}
        />

        {/* Logo */}
        <div
          className="relative z-[1] w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-xl group-hover:scale-110 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})`,
          }}
        >
          {college.acronym.slice(0, 3)}
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* ── Card Body ───────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name */}
        <h3 className="font-display font-semibold text-base text-white group-hover:text-primary-300 transition-colors duration-200 line-clamp-2 leading-snug">
          {college.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-surface-200/50">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{college.location}</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs text-surface-200/40 leading-relaxed line-clamp-2">
          {college.description}
        </p>

        {/* Course Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {college.courseTypes.slice(0, 3).map((type) => (
            <span
              key={type}
              className="px-2 py-0.5 text-[10px] font-medium text-primary-300/80 bg-primary-500/10 rounded-md"
            >
              {type}
            </span>
          ))}
          {college.courseTypes.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-medium text-surface-200/40 bg-white/5 rounded-md">
              +{college.courseTypes.length - 3}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── Footer: Rating + Fees ─────────────── */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <StarRating rating={college.rating} />
              <span className="text-sm font-semibold text-white">
                {college.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-surface-200/30">
              {college.reviewCount.toLocaleString("en-IN")} reviews
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-display font-bold text-gradient">
              {formatFees(college.fees)}
            </p>
            <p className="text-[10px] text-surface-200/30">per year</p>
          </div>
        </div>
      </div>

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 0 1px rgba(99, 102, 241, 0.12)" }}
      />
    </Link>
  );
}
