"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar, Footer } from "@/components/layout";
import { TopCollegesHero, RankingFilters, RankingCard } from "@/components/rankings";
import { useDebounce } from "@/hooks/useDebounce";

interface RankedCollege {
  rank: number;
  slug: string;
  name: string;
  acronym: string;
  location: string;
  state: string;
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

export default function RankingsPage() {
  const [colleges, setColleges] = useState<RankedCollege[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [sortBy, setSortBy] = useState("rating");
  const [state, setState] = useState("");
  const [courseType, setCourseType] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Filter options
  const [states, setStates] = useState<string[]>([]);
  const [courseTypes, setCourseTypes] = useState<string[]>([]);

  // Fetch filter options on mount
  useEffect(() => {
    fetch("/api/colleges?perPage=100")
      .then((r) => r.json())
      .then((data) => {
        const allStates = [...new Set(data.colleges.map((c: { state: string }) => c.state))] as string[];
        const allCourseTypes = [...new Set(data.colleges.flatMap((c: { courseTypes: string[] }) => c.courseTypes))] as string[];
        setStates(allStates.sort());
        setCourseTypes(allCourseTypes.sort());
      })
      .catch(() => {});
  }, []);

  // Fetch rankings
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("sort", sortBy);
    params.set("order", sortBy === "fees" ? "asc" : "desc");
    if (state) params.set("state", state);
    if (courseType) params.set("courseType", courseType);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());

    fetch(`/api/rankings?${params.toString()}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setColleges(data.colleges);
      })
      .catch(() => {
        setError("Failed to load rankings. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortBy, state, courseType, debouncedSearch]);

  const handleClear = useCallback(() => {
    setState("");
    setCourseType("");
    setSearch("");
  }, []);

  const top3 = colleges.slice(0, 3);
  const showPodium = !state && !courseType && !debouncedSearch.trim();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* ── Page Header ──────────────────── */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              College{" "}
              <span className="text-gradient">Rankings</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-surface-200/50 max-w-2xl mx-auto">
              Data-driven rankings of {colleges.length || "top"} institutions based on ratings, placements, fees, and popularity.
            </p>
          </div>

          {/* ── Top 3 Podium ─────────────────── */}
          {!isLoading && showPodium && top3.length >= 3 && (
            <TopCollegesHero colleges={top3} />
          )}

          {/* ── Filters ──────────────────────── */}
          <RankingFilters
            sortBy={sortBy}
            state={state}
            courseType={courseType}
            search={search}
            states={states}
            courseTypes={courseTypes}
            onSortChange={setSortBy}
            onStateChange={setState}
            onCourseTypeChange={setCourseType}
            onSearchChange={setSearch}
            onClear={handleClear}
          />

          {/* ── Loading ──────────────────────── */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-20 rounded-2xl glass animate-pulse" />
              ))}
            </div>
          )}

          {/* ── Error ────────────────────────── */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-sm text-surface-200/50">{error}</p>
            </div>
          )}

          {/* ── Empty ────────────────────────── */}
          {!isLoading && !error && colleges.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-surface-200/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-1">No colleges found</h3>
              <p className="text-sm text-surface-200/40">Try adjusting your filters or search query.</p>
            </div>
          )}

          {/* ── Rankings List ─────────────────── */}
          {!isLoading && !error && colleges.length > 0 && (
            <div className="space-y-2">
              {colleges.map((college) => (
                <RankingCard key={college.slug} college={college} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
