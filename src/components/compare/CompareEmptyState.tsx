export default function CompareEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center" id="compare-empty">
      {/* Icon */}
      <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-surface-200/15"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>

      <h3 className="font-display text-xl font-semibold text-white mb-2">
        Start Comparing Colleges
      </h3>
      <p className="text-sm text-surface-200/40 max-w-md mb-2">
        Select 2 to 3 colleges from the search above to see a detailed side-by-side comparison of fees, placements, ratings, and more.
      </p>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        {[
          { step: "1", text: "Search for a college" },
          { step: "2", text: "Add to compare list" },
          { step: "3", text: "View comparison" },
        ].map((item, i) => (
          <div key={item.step} className="flex items-center gap-3">
            {i > 0 && (
              <svg className="hidden sm:block w-4 h-4 text-surface-200/15 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-500/15 text-primary-400 text-xs font-bold flex items-center justify-center">
                {item.step}
              </span>
              <span className="text-xs text-surface-200/50">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
