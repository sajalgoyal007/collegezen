import Link from "next/link";
import type { CollegeDetail } from "@/types/college";

interface CompareCardProps {
  college: CollegeDetail;
  onRemove: (slug: string) => void;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function CompareCard({ college, onRemove }: CompareCardProps) {
  return (
    <div className="relative flex flex-col rounded-2xl glass overflow-hidden group">
      {/* Remove button */}
      <button
        onClick={() => onRemove(college.slug)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/40 text-surface-200/40 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
        aria-label={`Remove ${college.name}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div
        className="relative h-28 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${college.logoGradient[0]}25, ${college.logoGradient[1]}15)`,
        }}
      >
        <Link href={`/colleges/${college.slug}`}>
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shadow-xl hover:scale-110 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})`,
            }}
          >
            {college.acronym.slice(0, 4)}
          </div>
        </Link>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <Link
          href={`/colleges/${college.slug}`}
          className="font-display text-sm font-semibold text-white hover:text-primary-400 transition-colors line-clamp-2 leading-snug"
        >
          {college.name}
        </Link>

        <p className="text-xs text-surface-200/40">{college.location}</p>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-white/5">
          <div>
            <p className="text-[10px] text-surface-200/30 uppercase">Rating</p>
            <p className="text-sm font-semibold text-amber-400">⭐ {college.rating}</p>
          </div>
          <div>
            <p className="text-[10px] text-surface-200/30 uppercase">Fees</p>
            <p className="text-sm font-semibold text-gradient">{formatCurrency(college.fees)}</p>
          </div>
          <div>
            <p className="text-[10px] text-surface-200/30 uppercase">Avg. Package</p>
            <p className="text-sm font-semibold text-accent-400">
              {formatCurrency(college.placement.averagePackage)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-surface-200/30 uppercase">Placement</p>
            <p className="text-sm font-semibold text-white">
              {college.placement.placementPercentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
