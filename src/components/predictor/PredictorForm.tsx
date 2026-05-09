"use client";

import { useState } from "react";
import type { ExamType, Category, PredictorInput } from "@/types/predictor";
import { EXAM_TYPES, CATEGORIES, PREDICTOR_STATES, PREDICTOR_COURSES } from "@/types/predictor";

interface PredictorFormProps {
  onPredict: (input: PredictorInput) => void;
  isLoading: boolean;
}

interface FormErrors {
  rank?: string;
}

export default function PredictorForm({ onPredict, isLoading }: PredictorFormProps) {
  const [examType, setExamType] = useState<ExamType>("JEE Main");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState<Category>("General");
  const [preferredState, setPreferredState] = useState("All States");
  const [coursePreference, setCoursePreference] = useState("All Courses");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const newErrors: FormErrors = {};
    const rankNum = parseInt(rank, 10);
    if (!rank.trim()) {
      newErrors.rank = "Please enter your rank";
    } else if (isNaN(rankNum) || rankNum < 1) {
      newErrors.rank = "Rank must be a positive number";
    } else if (rankNum > 500000) {
      newErrors.rank = "Rank must be below 5,00,000";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onPredict({
      examType,
      rank: rankNum,
      category,
      preferredState,
      coursePreference,
    });
  };

  // Reset course when exam type changes
  const handleExamChange = (exam: ExamType) => {
    setExamType(exam);
    setCoursePreference("All Courses");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="predictor-form">
      {/* ── Exam Type Selector ────────────── */}
      <div>
        <label className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-3">
          Select Exam
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EXAM_TYPES.map((exam) => {
            const isActive = examType === exam;
            return (
              <button
                key={exam}
                type="button"
                onClick={() => handleExamChange(exam)}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary-500/15 text-primary-400 ring-1 ring-primary-500/25 shadow-lg shadow-primary-500/10"
                    : "glass text-surface-200/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {exam}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Rank + Category Row ────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rank Input */}
        <div>
          <label htmlFor="rank-input" className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
            Your Rank
          </label>
          <div className="relative">
            <input
              type="number"
              id="rank-input"
              value={rank}
              onChange={(e) => {
                setRank(e.target.value);
                if (errors.rank) setErrors({});
              }}
              placeholder="Enter your rank"
              min={1}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-white text-sm placeholder-surface-200/25 outline-none transition-all duration-200 ${
                errors.rank
                  ? "border-red-500/40 focus:ring-2 focus:ring-red-500/20"
                  : "border-white/5 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/20"
              }`}
            />
            {errors.rank && (
              <p className="mt-1.5 text-xs text-red-400">{errors.rank}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category-select" className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
            Category
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/20 transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-surface-900">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── State + Course Row ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* State */}
        <div>
          <label htmlFor="state-select" className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
            Preferred State
          </label>
          <select
            id="state-select"
            value={preferredState}
            onChange={(e) => setPreferredState(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/20 transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            {PREDICTOR_STATES.map((state) => (
              <option key={state} value={state} className="bg-surface-900">
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div>
          <label htmlFor="course-select" className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">
            Course Preference
          </label>
          <select
            id="course-select"
            value={coursePreference}
            onChange={(e) => setCoursePreference(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/20 transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
          >
            {PREDICTOR_COURSES[examType].map((course) => (
              <option key={course} value={course} className="bg-surface-900">
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Submit Button ──────────────────── */}
      <button
        type="submit"
        disabled={isLoading}
        id="predict-btn"
        className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Predicting...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Predict My Colleges
          </>
        )}
      </button>
    </form>
  );
}
