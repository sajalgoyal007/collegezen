import Link from "next/link";

interface TopCollege {
  rank: number;
  slug: string;
  name: string;
  acronym: string;
  location: string;
  rating: number;
  averagePackage: number;
  logoGradient: string[];
}

interface TopCollegesHeroProps {
  colleges: TopCollege[];
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

const RANK_STYLES = [
  { ring: "ring-amber-400/30", badge: "from-amber-400 to-yellow-500", glow: "shadow-amber-500/20", label: "🥇" },
  { ring: "ring-slate-300/20", badge: "from-slate-300 to-slate-400", glow: "shadow-slate-400/15", label: "🥈" },
  { ring: "ring-amber-700/20", badge: "from-amber-600 to-amber-700", glow: "shadow-amber-700/15", label: "🥉" },
];

export default function TopCollegesHero({ colleges }: TopCollegesHeroProps) {
  if (colleges.length < 3) return null;

  // Display order: #2, #1, #3 (podium style)
  const podium = [colleges[1], colleges[0], colleges[2]];
  const heights = ["h-40", "h-52", "h-36"];

  return (
    <div className="mb-12" id="top-colleges-hero">
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {podium.map((college, i) => {
          const style = RANK_STYLES[i === 0 ? 1 : i === 1 ? 0 : 2];
          const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;

          return (
            <Link
              key={college.slug}
              href={`/colleges/${college.slug}`}
              className={`group relative flex flex-col items-center px-4 sm:px-6 pt-6 pb-4 rounded-2xl glass ring-1 ${style.ring} hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 flex-1 max-w-[220px] ${heights[i]}`}
            >
              {/* Rank badge */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${style.badge} flex items-center justify-center text-sm font-bold text-surface-950 shadow-lg ${style.glow}`}>
                {actualRank}
              </div>

              {/* Logo */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm sm:text-base shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3"
                style={{ background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})` }}
              >
                {college.acronym.slice(0, 4)}
              </div>

              {/* Info */}
              <p className="text-xs sm:text-sm font-semibold text-white text-center line-clamp-2 leading-tight mb-1">
                {college.name}
              </p>
              <p className="text-[10px] text-surface-200/40 text-center mb-2 hidden sm:block">{college.location}</p>

              {/* Stats */}
              <div className="flex items-center gap-3 mt-auto">
                <span className="text-xs font-semibold text-amber-400">⭐ {college.rating}</span>
                <span className="text-xs font-semibold text-accent-400">{formatCurrency(college.averagePackage)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
