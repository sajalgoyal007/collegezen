"use client";

import { useState, useEffect, useCallback } from "react";
import type { CollegeDetail } from "@/types/college";

const STORAGE_KEY = "collegezen-compare";
const MAX_COMPARE = 3;

/**
 * Custom hook for managing college comparison state.
 * Persists selected college slugs in localStorage.
 * Fetches detail data from /api/compare.
 */
export function useCompare() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [colleges, setColleges] = useState<CollegeDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Restore from URL params or localStorage on mount ─────────
  useEffect(() => {
    // Check URL params first (for saved comparison links)
    const urlParams = new URLSearchParams(window.location.search);
    const urlSlugs = urlParams.get("slugs");
    if (urlSlugs) {
      const parsed = urlSlugs.split(",").filter(Boolean).slice(0, MAX_COMPARE);
      if (parsed.length > 0) {
        setSlugs(parsed);
        setIsLoading(false);
        return;
      }
    }

    // Fall back to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) {
          setSlugs(parsed.slice(0, MAX_COMPARE));
        }
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoading(false);
  }, []);

  // ── Fetch college data from API ────────────────
  useEffect(() => {
    if (isLoading) return;

    if (slugs.length === 0) {
      setColleges([]);
      return;
    }

    const fetchCompareData = async () => {
      try {
        const res = await fetch(`/api/compare?slugs=${slugs.join(",")}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setColleges(data.colleges ?? []);
      } catch {
        console.error("Failed to fetch compare data");
        setColleges([]);
      }
    };

    fetchCompareData();
  }, [slugs, isLoading]);

  // ── Persist to localStorage ────────────────────
  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, isLoading]);

  const addCollege = useCallback(
    (slug: string) => {
      setSlugs((prev) => {
        if (prev.includes(slug) || prev.length >= MAX_COMPARE) return prev;
        return [...prev, slug];
      });
    },
    []
  );

  const removeCollege = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearAll = useCallback(() => {
    setSlugs([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs]
  );

  const canAdd = slugs.length < MAX_COMPARE;

  return {
    colleges,
    slugs,
    isLoading,
    canAdd,
    maxCompare: MAX_COMPARE,
    addCollege,
    removeCollege,
    clearAll,
    isSelected,
  };
}
