import type { PredictionResult, ChanceLevel } from "@/types/predictor";
import PredictionCard from "./PredictionCard";

interface PredictorResultsProps {
  results: PredictionResult[];
  userRank: number;
}

export default function PredictorResults({ results, userRank }: PredictorResultsProps) {
  const highCount = results.filter((r) => r.chance === "High").length;
  const moderateCount = results.filter((r) => r.chance === "Moderate").length;
  const lowCount = results.filter((r) => r.chance === "Low").length;

  const summaryItems: { label: string; count: number; chance: ChanceLevel; color: string }[] = [
    { label: "High Chance", count: highCount, chance: "High", color: "from-emerald-500/15 to-emerald-600/5 border-emerald-500/15 text-emerald-400" },
    { label: "Moderate Chance", count: moderateCount, chance: "Moderate", color: "from-amber-500/15 to-amber-600/5 border-amber-500/15 text-amber-400" },
    { label: "Low Chance", count: lowCount, chance: "Low", color: "from-red-500/15 to-red-600/5 border-red-500/15 text-red-400" },
  ];

  return (
    <div id="predictor-results">
      {/* ── Summary Bar ───────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Prediction Results
          </h2>
          <p className="text-sm text-surface-200/40 mt-0.5">
            {results.length} college{results.length !== 1 ? "s" : ""} found for rank{" "}
            <span className="font-semibold text-primary-400">{userRank.toLocaleString("en-IN")}</span>
          </p>
        </div>

        {/* Chance summary chips */}
        <div className="flex items-center gap-2">
          {summaryItems.map((item) =>
            item.count > 0 ? (
              <div
                key={item.chance}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r ${item.color} border`}
              >
                <span className="text-white font-bold">{item.count}</span>
                <span className="opacity-80">{item.label}</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* ── Results List ──────────────────── */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-surface-200/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-1">
            No matches found
          </h3>
          <p className="text-sm text-surface-200/40 max-w-sm">
            Try adjusting your rank, category, or removing state/course filters to see more predictions.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((result, index) => (
            <PredictionCard key={result.cutoff.courseId} result={result} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
