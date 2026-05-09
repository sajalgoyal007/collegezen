import Link from "next/link";
import type { CollegeDetail } from "@/types/college";

interface CollegeHeroProps {
  college: CollegeDetail;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CollegeHero({ college }: CollegeHeroProps) {
  return (
    <section className="relative overflow-hidden" id="college-hero">
      {/* ── Banner Background ──────────────── */}
      <div className="relative h-56 sm:h-72 lg:h-80">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${college.logoGradient[0]}30, ${college.logoGradient[1]}15, transparent)`,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Decorative orbs */}
        <div
          className="absolute top-10 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-30"
          style={{ backgroundColor: college.logoGradient[0] }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full blur-[80px] opacity-20"
          style={{ backgroundColor: college.logoGradient[1] }}
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent" />
      </div>

      {/* ── Content Card ───────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          {/* Logo */}
          <div
            className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-white font-display font-bold text-3xl sm:text-4xl shadow-2xl ring-4 ring-surface-950"
            style={{
              background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})`,
            }}
          >
            {college.acronym.slice(0, 4)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-surface-200/40 mb-2">
              <Link href="/colleges" className="hover:text-primary-400 transition-colors">
                Colleges
              </Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-surface-200/60 truncate">{college.name}</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {college.name}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3">
              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-surface-200/60">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{college.location}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-sm">
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-white">{college.rating.toFixed(1)}</span>
                <span className="text-surface-200/40">({college.reviewCount.toLocaleString("en-IN")} reviews)</span>
              </div>

              {/* Established */}
              <div className="flex items-center gap-1.5 text-sm text-surface-200/60">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Est. {college.established}</span>
              </div>

              {/* Accreditation badge */}
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-accent-500/15 text-accent-400 rounded-full">
                {college.accreditation}
              </span>
            </div>
          </div>

          {/* ── Action Buttons ─────────────── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              id="btn-apply"
              className="px-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Apply Now
            </button>
            <button
              id="btn-save"
              className="px-6 py-3 text-sm font-semibold text-surface-200 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 inline mr-1.5 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save
            </button>
          </div>
        </div>

        {/* ── Quick Stats ──────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { label: "Avg. Package", value: formatCurrency(college.placement.averagePackage) },
            { label: "Courses", value: college.courses.length.toString() },
            { label: "Students", value: college.totalStudents.toLocaleString("en-IN") },
            { label: "Placement", value: `${college.placement.placementPercentage}%` },
          ].map((stat) => (
            <div key={stat.label} className="p-3 rounded-xl glass text-center">
              <p className="text-lg sm:text-xl font-display font-bold text-gradient">
                {stat.value}
              </p>
              <p className="text-[11px] text-surface-200/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
