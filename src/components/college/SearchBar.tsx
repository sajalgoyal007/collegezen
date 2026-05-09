"use client";

import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  isLoading: boolean;
}

export default function SearchBar({
  value,
  onChange,
  resultCount,
  isLoading,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  return (
    <div className="relative w-full" id="college-search">
      {/* Search Container */}
      <div
        className={`relative flex items-center rounded-2xl transition-all duration-300 ${
          isFocused
            ? "glass-strong ring-2 ring-primary-500/30 shadow-lg shadow-primary-500/10"
            : "glass hover:bg-white/[0.04]"
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 flex items-center pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? "text-primary-400" : "text-surface-200/40"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search colleges by name, city, or state..."
          id="college-search-input"
          className="w-full pl-12 pr-24 py-4 bg-transparent text-white placeholder-surface-200/30 text-base outline-none"
        />

        {/* Right Side */}
        <div className="absolute right-3 flex items-center gap-2">
          {/* Clear Button */}
          {value && (
            <button
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-surface-200/40 hover:text-white transition-all duration-200"
              aria-label="Clear search"
              id="search-clear-btn"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Keyboard Shortcut Hint */}
          {!isFocused && !value && (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-surface-200/30 bg-white/5 rounded-lg border border-white/5">
              /
            </kbd>
          )}

          {/* Loading spinner */}
          {isLoading && (
            <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-400 rounded-full animate-spin" />
          )}
        </div>
      </div>

      {/* Result Count */}
      {value && !isLoading && (
        <p className="mt-2 ml-1 text-xs text-surface-200/40">
          {resultCount === 0
            ? "No colleges found"
            : `${resultCount} college${resultCount !== 1 ? "s" : ""} found`}
        </p>
      )}
    </div>
  );
}
