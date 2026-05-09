"use client";

import { useState, useRef, useEffect } from "react";

interface CollegeOption {
  slug: string;
  name: string;
  acronym: string;
  location: string;
  rating: number;
  logoGradient: string[];
}

interface CompareSelectorProps {
  selectedSlugs: string[];
  canAdd: boolean;
  maxCompare: number;
  onAdd: (slug: string) => void;
  onRemove: (slug: string) => void;
  onClearAll: () => void;
}

export default function CompareSelector({
  selectedSlugs,
  canAdd,
  maxCompare,
  onAdd,
  onRemove,
  onClearAll,
}: CompareSelectorProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<CollegeOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch colleges from API when dropdown opens or query changes
  useEffect(() => {
    if (!isOpen) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const params = new URLSearchParams({ perPage: "20", sort: "rating", order: "desc" });
        if (query.trim()) params.set("search", query.trim());
        const res = await fetch(`/api/colleges?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setOptions(data.colleges);
        }
      } catch {
        console.error("Failed to fetch colleges for selector");
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, isOpen]);

  const filtered = options.filter((c) => !selectedSlugs.includes(c.slug));

  // Build selected college info from options or show slug-based chips
  const selectedColleges = selectedSlugs.map((slug) => {
    const fromOptions = options.find((c) => c.slug === slug);
    if (fromOptions) return fromOptions;
    return { slug, name: slug.replace(/-/g, " "), acronym: slug.slice(0, 3).toUpperCase(), logoGradient: ["#6366f1", "#8b5cf6"], location: "", rating: 0 };
  });

  return (
    <div className="space-y-4" id="compare-selector">
      {/* ── Selected Chips ─────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        {selectedColleges.map((college) => (
          <div
            key={college.slug}
            className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/[0.04] transition-all duration-200"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})`,
              }}
            >
              {college.acronym.slice(0, 3)}
            </div>
            <span className="text-sm font-medium text-white max-w-[160px] truncate">
              {college.name}
            </span>
            <button
              onClick={() => onRemove(college.slug)}
              className="ml-1 p-0.5 rounded-md text-surface-200/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label={`Remove ${college.name}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {Array.from({ length: maxCompare - selectedSlugs.length }).map((_, i) => (
          <div
            key={`slot-${i}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/10 text-surface-200/20 text-sm cursor-pointer hover:border-primary-500/30 hover:text-primary-400/40 transition-all duration-200"
            onClick={() => setIsOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add College
          </div>
        ))}

        {selectedSlugs.length > 0 && (
          <button onClick={onClearAll} className="ml-2 text-xs text-red-400/60 hover:text-red-400 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* ── Search Dropdown ────────────────── */}
      <div ref={dropdownRef} className="relative max-w-lg">
        <div className={`flex items-center rounded-xl transition-all duration-200 ${isOpen ? "glass-strong ring-2 ring-primary-500/20" : "glass"}`}>
          <svg className="w-4 h-4 text-surface-200/30 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            placeholder={canAdd ? "Search colleges to compare..." : `Maximum ${maxCompare} colleges selected`}
            disabled={!canAdd}
            className="w-full px-3 py-3 bg-transparent text-white text-sm placeholder-surface-200/25 outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            id="compare-search-input"
          />
        </div>

        {isOpen && canAdd && (
          <div className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto rounded-xl glass-strong shadow-2xl shadow-black/40 border border-white/5">
            {isSearching ? (
              <div className="flex items-center justify-center py-6">
                <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-400 rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-surface-200/30">
                {query ? "No colleges found" : "All colleges already selected"}
              </p>
            ) : (
              filtered.map((college) => (
                <button
                  key={college.slug}
                  onClick={() => {
                    onAdd(college.slug);
                    setQuery("");
                    if (selectedSlugs.length + 1 >= maxCompare) setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.04] transition-colors border-b border-white/[0.03] last:border-b-0"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})` }}
                  >
                    {college.acronym.slice(0, 3)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{college.name}</p>
                    <p className="text-xs text-surface-200/40">{college.location} · ⭐ {college.rating}</p>
                  </div>
                  <svg className="w-4 h-4 text-primary-400/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
