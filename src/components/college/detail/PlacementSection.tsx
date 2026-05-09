import type { CollegeDetail } from "@/types/college";

interface PlacementSectionProps {
  college: CollegeDetail;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function PlacementSection({ college }: PlacementSectionProps) {
  const { placement } = college;

  const stats = [
    { label: "Average Package", value: formatCurrency(placement.averagePackage), color: "from-primary-400 to-primary-600" },
    { label: "Highest Package", value: formatCurrency(placement.highestPackage), color: "from-accent-400 to-accent-600" },
    { label: "Median Package", value: formatCurrency(placement.medianPackage), color: "from-amber-400 to-amber-600" },
    { label: "Placement Rate", value: `${placement.placementPercentage}%`, color: "from-rose-400 to-rose-600" },
  ];

  return (
    <section id="placements" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary-400 to-accent-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Placements {placement.year}
          </h2>
        </div>

        {/* ── Stats Grid ──────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="relative group p-5 rounded-2xl glass overflow-hidden hover:-translate-y-0.5 transition-all duration-300">
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-surface-200/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Summary Row ─────────────────── */}
        <div className="flex flex-wrap items-center gap-4 mb-10 p-4 rounded-xl glass">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-surface-200/60">
              <span className="font-semibold text-white">{placement.totalOffers.toLocaleString("en-IN")}</span> total offers made
            </span>
          </div>
          <span className="text-surface-200/20">•</span>
          <span className="text-sm text-surface-200/60">
            Data for academic year {placement.year - 1}–{placement.year}
          </span>
        </div>

        {/* ── Top Recruiters ──────────────── */}
        <div>
          <h3 className="text-sm font-semibold text-surface-200/50 uppercase tracking-wider mb-4">
            Top Recruiters
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {placement.topRecruiters.map((recruiter) => (
              <div
                key={recruiter.name}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl glass hover:bg-white/[0.04] transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${recruiter.logoGradient[0]}, ${recruiter.logoGradient[1]})`,
                  }}
                >
                  {recruiter.acronym}
                </div>
                <p className="text-xs font-medium text-surface-200/60 text-center leading-tight">
                  {recruiter.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
