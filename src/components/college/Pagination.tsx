interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  /**
   * Build page number list with ellipsis.
   * Always shows first, last, current, and one page on each side of current.
   */
  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 1;

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1.5" id="pagination" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        id="pagination-prev"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-surface-200/60 hover:text-white hover:bg-white/5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPages().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-sm text-surface-200/30"
              >
                ⋯
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              id={`pagination-page-${page}`}
              className={`min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary-500/20 text-primary-400 ring-1 ring-primary-500/20 shadow-lg shadow-primary-500/10"
                  : "text-surface-200/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        id="pagination-next"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-surface-200/60 hover:text-white hover:bg-white/5"
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
