import type { CollegeDetail } from "@/types/college";

interface CompareHighlightsProps {
  colleges: CollegeDetail[];
}

interface Badge {
  label: string;
  icon: string;
  color: string;
  collegeSlug: string;
}

export default function CompareHighlights({ colleges }: CompareHighlightsProps) {
  if (colleges.length < 2) return null;

  const badges: Badge[] = [];

  // Best Rating
  const bestRating = [...colleges].sort((a, b) => b.rating - a.rating)[0];
  badges.push({
    label: "Best Rating",
    icon: "⭐",
    color: "from-amber-500/15 to-amber-600/5 border-amber-500/20 text-amber-400",
    collegeSlug: bestRating.slug,
  });

  // Best Value (lowest fees)
  const bestValue = [...colleges].sort((a, b) => a.fees - b.fees)[0];
  badges.push({
    label: "Best Value",
    icon: "💰",
    color: "from-emerald-500/15 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
    collegeSlug: bestValue.slug,
  });

  // Best Placement
  const bestPlacement = [...colleges].sort(
    (a, b) => b.placement.averagePackage - a.placement.averagePackage
  )[0];
  badges.push({
    label: "Best Placement",
    icon: "🚀",
    color: "from-primary-500/15 to-primary-600/5 border-primary-500/20 text-primary-400",
    collegeSlug: bestPlacement.slug,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8" id="compare-highlights">
      {badges.map((badge) => {
        const college = colleges.find((c) => c.slug === badge.collegeSlug);
        if (!college) return null;
        return (
          <div
            key={badge.label}
            className={`relative p-4 rounded-2xl bg-gradient-to-br ${badge.color} border overflow-hidden`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  {badge.label}
                </p>
                <p className="text-sm font-bold text-white truncate mt-0.5">
                  {college.acronym} — {college.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
