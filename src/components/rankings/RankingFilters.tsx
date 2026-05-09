"use client";

interface RankingFiltersProps {
  sortBy: string;
  state: string;
  courseType: string;
  search: string;
  states: string[];
  courseTypes: string[];
  onSortChange: (sort: string) => void;
  onStateChange: (state: string) => void;
  onCourseTypeChange: (courseType: string) => void;
  onSearchChange: (search: string) => void;
  onClear: () => void;
}

const SORT_OPTIONS = [
  { value: "rating", label: "Overall Rating" },
  { value: "placement", label: "Placement Package" },
  { value: "fees", label: "Lowest Fees" },
  { value: "popularity", label: "Most Popular" },
];

export default function RankingFilters({
  sortBy,
  state,
  courseType,
  search,
  states,
  courseTypes,
  onSortChange,
  onStateChange,
  onCourseTypeChange,
  onSearchChange,
  onClear,
}: RankingFiltersProps) {
  const hasFilters = state || courseType || search;

  return (
    <div className="space-y-4 mb-8" id="ranking-filters">
      {/* Sort Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs font-semibold text-surface-200/40 uppercase tracking-wider flex-shrink-0 mr-1">
          Rank by
        </span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
              sortBy === opt.value
                ? "bg-primary-500/15 text-primary-400 ring-1 ring-primary-500/25"
                : "glass text-surface-200/50 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-200/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search colleges..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder-surface-200/25 outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
        </div>

        {/* State Filter */}
        <select
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500/20 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1rem",
            paddingRight: "2rem",
          }}
        >
          <option value="" className="bg-surface-900">All States</option>
          {states.map((s) => (<option key={s} value={s} className="bg-surface-900">{s}</option>))}
        </select>

        {/* Course Type Filter */}
        <select
          value={courseType}
          onChange={(e) => onCourseTypeChange(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500/20 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1rem",
            paddingRight: "2rem",
          }}
        >
          <option value="" className="bg-surface-900">All Courses</option>
          {courseTypes.map((c) => (<option key={c} value={c} className="bg-surface-900">{c}</option>))}
        </select>

        {hasFilters && (
          <button onClick={onClear} className="text-xs text-red-400/60 hover:text-red-400 transition-colors">
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
