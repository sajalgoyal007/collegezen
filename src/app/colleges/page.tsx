"use client";

import { Navbar, Footer } from "@/components/layout";
import {
  SearchBar,
  CollegeCard,
  CollegeCardSkeleton,
  CollegeFilters,
  Pagination,
  EmptyState,
  ErrorState,
} from "@/components/college";
import { useColleges } from "@/hooks/useColleges";

export default function CollegesPage() {
  const {
    colleges,
    total,
    totalPages,
    currentPage,
    isLoading,
    error,
    filters,
    activeFilterCount,
    setSearch,
    setLocation,
    setFeesRange,
    setCourseType,
    setSort,
    setPage,
    clearFilters,
  } = useColleges();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Page Header ──────────────────────── */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Explore{" "}
              <span className="text-gradient">Top Colleges</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-surface-200/50 max-w-2xl mx-auto">
              Discover {total}+ top-rated institutions across India. Search, filter, and compare to find your perfect match.
            </p>
          </div>

          {/* ── Search ───────────────────────────── */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              value={filters.search}
              onChange={setSearch}
              resultCount={total}
              isLoading={isLoading}
            />
          </div>

          {/* ── Filters & Sorting ────────────────── */}
          <div className="mb-8">
            <CollegeFilters
              location={filters.location}
              courseType={filters.courseType}
              feesRange={filters.feesRange}
              sortField={filters.sortField}
              sortOrder={filters.sortOrder}
              activeFilterCount={activeFilterCount}
              onLocationChange={setLocation}
              onCourseTypeChange={setCourseType}
              onFeesRangeChange={setFeesRange}
              onSortChange={setSort}
              onClearFilters={clearFilters}
            />
          </div>

          {/* ── Results Info Bar ──────────────────── */}
          {!isLoading && !error && colleges.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-surface-200/40">
                Showing{" "}
                <span className="font-medium text-surface-200/60">
                  {(currentPage - 1) * filters.perPage + 1}–
                  {Math.min(currentPage * filters.perPage, total)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-surface-200/60">{total}</span>{" "}
                colleges
              </p>
            </div>
          )}

          {/* ── Error State ──────────────────────── */}
          {error && <ErrorState message={error} onRetry={clearFilters} />}

          {/* ── Loading Skeletons ─────────────────── */}
          {isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* ── Empty State ──────────────────────── */}
          {!isLoading && !error && colleges.length === 0 && (
            <EmptyState
              hasFilters={activeFilterCount > 0 || filters.search.length > 0}
              onClearFilters={clearFilters}
            />
          )}

          {/* ── College Cards Grid ───────────────── */}
          {!isLoading && !error && colleges.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}

          {/* ── Pagination ───────────────────────── */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
