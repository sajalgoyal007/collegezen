"use client";

import { useState } from "react";
import {
  LOCATION_OPTIONS,
  COURSE_TYPE_OPTIONS,
  FEES_RANGES,
} from "@/data/colleges";
import type { SortField, SortOrder } from "@/types/college";

interface CollegeFiltersProps {
  location: string;
  courseType: string;
  feesRange: [number, number];
  sortField: SortField;
  sortOrder: SortOrder;
  activeFilterCount: number;
  onLocationChange: (value: string) => void;
  onCourseTypeChange: (value: string) => void;
  onFeesRangeChange: (value: [number, number]) => void;
  onSortChange: (field: SortField, order: SortOrder) => void;
  onClearFilters: () => void;
}

export default function CollegeFilters({
  location,
  courseType,
  feesRange,
  sortField,
  sortOrder,
  activeFilterCount,
  onLocationChange,
  onCourseTypeChange,
  onFeesRangeChange,
  onSortChange,
  onClearFilters,
}: CollegeFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentFeesLabel =
    FEES_RANGES.find(
      (r) => r.value[0] === feesRange[0] && r.value[1] === feesRange[1]
    )?.label || "All Fees";

  return (
    <div className="space-y-4" id="college-filters">
      {/* ── Top Bar: Sort + Toggle ─────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-surface-200/40 uppercase tracking-wider">
            Sort by
          </span>
          {(["rating", "fees", "name"] as SortField[]).map((field) => {
            const isActive = sortField === field;
            return (
              <button
                key={field}
                id={`sort-${field}`}
                onClick={() => {
                  if (isActive) {
                    onSortChange(field, sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    onSortChange(field, field === "name" ? "asc" : "desc");
                  }
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary-500/15 text-primary-400 ring-1 ring-primary-500/20"
                    : "text-surface-200/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="capitalize">{field}</span>
                {isActive && (
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          id="filter-toggle-btn"
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
            isExpanded || activeFilterCount > 0
              ? "glass-strong text-primary-400"
              : "glass text-surface-200/60 hover:text-white"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-primary-500 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Expanded Filter Panel ──────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 rounded-2xl glass space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Location Select */}
            <div>
              <label
                htmlFor="filter-location"
                className="block text-xs font-medium text-surface-200/50 uppercase tracking-wider mb-2"
              >
                Location
              </label>
              <select
                id="filter-location"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/30 transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1rem",
                }}
              >
                <option value="" className="bg-surface-900">All States</option>
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-surface-900">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Type Select */}
            <div>
              <label
                htmlFor="filter-course"
                className="block text-xs font-medium text-surface-200/50 uppercase tracking-wider mb-2"
              >
                Course Type
              </label>
              <select
                id="filter-course"
                value={courseType}
                onChange={(e) => onCourseTypeChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/30 transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1rem",
                }}
              >
                <option value="" className="bg-surface-900">All Courses</option>
                {COURSE_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type} className="bg-surface-900">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Fees Range Select */}
            <div>
              <label
                htmlFor="filter-fees"
                className="block text-xs font-medium text-surface-200/50 uppercase tracking-wider mb-2"
              >
                Fees Range
              </label>
              <select
                id="filter-fees"
                value={currentFeesLabel}
                onChange={(e) => {
                  const selected = FEES_RANGES.find((r) => r.label === e.target.value);
                  onFeesRangeChange(selected ? selected.value : [0, Infinity]);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/30 transition-all duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1rem",
                }}
              >
                <option value="All Fees" className="bg-surface-900">All Fees</option>
                {FEES_RANGES.map((range) => (
                  <option key={range.label} value={range.label} className="bg-surface-900">
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <div className="flex justify-end pt-1">
              <button
                onClick={onClearFilters}
                id="clear-filters-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
