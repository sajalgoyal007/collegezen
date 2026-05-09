import Link from "next/link";

interface RankedCollege {
  rank: number;
  slug: string;
  name: string;
  acronym: string;
  location: string;
  fees: number;
  rating: number;
  accreditation: string;
  logoGradient: string[];
  courseTypes: string[];
  placementPercentage: number;
  averagePackage: number;
  highestPackage: number;
  reviewCount: number;
}

interface RankingCardProps {
  college: RankedCollege;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

const TOP3_COLORS = [
  "ring-amber-500/20 bg-gradient-to-r from-amber-500/[0.04] to-transparent",
  "ring-slate-400/15 bg-gradient-to-r from-slate-400/[0.03] to-transparent",
  "ring-amber-700/15 bg-gradient-to-r from-amber-700/[0.03] to-transparent",
];

export default function RankingCard({ college }: RankingCardProps) {
  const isTop3 = college.rank <= 3;
  const topStyle = isTop3 ? TOP3_COLORS[college.rank - 1] : "";

  return (
    <Link
      href={`/colleges/${college.slug}`}
      className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
        isTop3 ? `ring-1 ${topStyle}` : "glass hover:bg-white/[0.03]"
      }`}
      id={`ranking-card-${college.rank}`}
    >
      {/* Rank Number */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm ${
        college.rank === 1 ? "bg-amber-500/15 text-amber-400" :
        college.rank === 2 ? "bg-slate-400/10 text-slate-300" :
        college.rank === 3 ? "bg-amber-700/15 text-amber-600" :
        "bg-white/[0.03] text-surface-200/40"
      }`}>
        #{college.rank}
      </div>

      {/* Logo */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-bold text-xs shadow-lg group-hover:scale-110 transition-transform duration-300"
        style={{ background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})` }}
      >
        {college.acronym.slice(0, 4)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-white truncate group-hover:text-primary-400 transition-colors">
            {college.name}
          </p>
          <span className="flex-shrink-0 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-primary-500/10 text-primary-400/70">
            {college.accreditation}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-surface-200/40">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {college.location}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-surface-200/30">{college.courseTypes.slice(0, 2).join(", ")}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase">Rating</p>
          <p className="text-sm font-bold text-amber-400">⭐ {college.rating}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase">Avg Package</p>
          <p className="text-sm font-bold text-accent-400">{formatCurrency(college.averagePackage)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase">Fees</p>
          <p className="text-sm font-semibold text-gradient">{formatCurrency(college.fees)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-surface-200/30 uppercase">Placement</p>
          <p className="text-sm font-semibold text-emerald-400">{college.placementPercentage}%</p>
        </div>
      </div>

      {/* Mobile stats */}
      <div className="sm:hidden flex flex-col items-end gap-0.5 flex-shrink-0">
        <span className="text-xs font-bold text-amber-400">⭐ {college.rating}</span>
        <span className="text-[10px] text-accent-400">{formatCurrency(college.averagePackage)}</span>
      </div>

      {/* Arrow */}
      <svg className="w-4 h-4 text-surface-200/15 group-hover:text-primary-400 transition-colors flex-shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
