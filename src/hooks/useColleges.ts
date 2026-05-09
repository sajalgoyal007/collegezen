"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import type {
  College,
  CollegeFilters,
  CollegeListResult,
  SortField,
  SortOrder,
} from "@/types/college";

const DEFAULT_PER_PAGE = 6;

const DEFAULT_FILTERS: CollegeFilters = {
  search: "",
  location: "",
  feesRange: [0, Infinity],
  courseType: "",
  sortField: "rating",
  sortOrder: "desc",
  page: 1,
  perPage: DEFAULT_PER_PAGE,
};

/**
 * Custom hook for managing college listing with search, filters, sorting, and pagination.
 * Fetches from /api/colleges (database-backed).
 */
export function useColleges() {
  const [filters, setFilters] = useState<CollegeFilters>(DEFAULT_FILTERS);
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedSearch = useDebounce(filters.search, 300);

  // ── Fetch from API ──────────────────────────────────
  useEffect(() => {
    // Abort previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchColleges = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
        if (filters.location) params.set("state", filters.location);
        if (filters.courseType) params.set("courseType", filters.courseType);
        if (filters.feesRange[0] > 0) params.set("minFees", String(filters.feesRange[0]));
        if (filters.feesRange[1] < Infinity) params.set("maxFees", String(filters.feesRange[1]));
        params.set("sort", filters.sortField);
        params.set("order", filters.sortOrder);
        params.set("page", String(filters.page));
        params.set("perPage", String(filters.perPage));

        const res = await fetch(`/api/colleges?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setColleges(data.colleges);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Failed to fetch colleges:", err);
        setError("Failed to load colleges. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();

    return () => controller.abort();
  }, [debouncedSearch, filters.location, filters.courseType, filters.feesRange, filters.sortField, filters.sortOrder, filters.page, filters.perPage]);

  // ── Actions ──────────────────────────────────────────
  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const setLocation = useCallback((location: string) => {
    setFilters((prev) => ({ ...prev, location, page: 1 }));
  }, []);

  const setFeesRange = useCallback((feesRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, feesRange, page: 1 }));
  }, []);

  const setCourseType = useCallback((courseType: string) => {
    setFilters((prev) => ({ ...prev, courseType, page: 1 }));
  }, []);

  const setSort = useCallback((sortField: SortField, sortOrder: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortField, sortOrder }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const activeFilterCount = [
    filters.location,
    filters.courseType,
    filters.feesRange[0] !== 0 || filters.feesRange[1] !== Infinity,
  ].filter(Boolean).length;

  const result: CollegeListResult = {
    colleges,
    total,
    totalPages,
    currentPage: filters.page,
    isLoading,
    error,
  };

  return {
    ...result,
    filters,
    activeFilterCount,
    setSearch,
    setLocation,
    setFeesRange,
    setCourseType,
    setSort,
    setPage,
    clearFilters,
  };
}
