interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center" id="empty-state">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-surface-200/20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>

      {/* Text */}
      <h3 className="font-display text-xl font-semibold text-white mb-2">
        {hasFilters ? "No colleges match your filters" : "No colleges found"}
      </h3>
      <p className="text-sm text-surface-200/40 max-w-sm mb-6">
        {hasFilters
          ? "Try adjusting your search query or filters to discover more colleges."
          : "We couldn't find any colleges to display. Please try again later."}
      </p>

      {/* Action */}
      {hasFilters && (
        <button
          onClick={onClearFilters}
          id="empty-state-clear-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Clear Filters
        </button>
      )}
    </div>
  );
}
