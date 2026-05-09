import type { ChanceLevel } from "@/types/predictor";

interface ChanceBadgeProps {
  chance: ChanceLevel;
  size?: "sm" | "md";
}

const BADGE_CONFIG: Record<ChanceLevel, { bg: string; text: string; ring: string; dot: string }> = {
  High: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
    dot: "bg-emerald-400",
  },
  Moderate: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    ring: "ring-amber-500/20",
    dot: "bg-amber-400",
  },
  Low: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    ring: "ring-red-500/20",
    dot: "bg-red-400",
  },
};

export default function ChanceBadge({ chance, size = "sm" }: ChanceBadgeProps) {
  const config = BADGE_CONFIG[chance];
  const sizeClasses = size === "md"
    ? "px-3 py-1.5 text-xs"
    : "px-2.5 py-1 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider rounded-full ring-1 ${config.bg} ${config.text} ${config.ring} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {chance} Chance
    </span>
  );
}
