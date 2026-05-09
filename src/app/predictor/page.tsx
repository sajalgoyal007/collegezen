"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { PredictorForm, PredictorResults } from "@/components/predictor";
import type { PredictorInput, PredictionResult } from "@/types/predictor";

export default function PredictorPage() {
  const [results, setResults] = useState<PredictionResult[] | null>(null);
  const [userRank, setUserRank] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePredict = async (input: PredictorInput) => {
    setIsLoading(true);
    setUserRank(input.rank);

    try {
      const res = await fetch("/api/predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      setResults(data.results);
      setHasSearched(true);

      // Scroll to results
      setTimeout(() => {
        const el = document.getElementById("predictor-results");
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      console.error("Prediction error:", err);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* ── Page Header ──────────────────── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-xs font-medium text-surface-200/70 tracking-wide">
                AI-Powered Predictions
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              College{" "}
              <span className="text-gradient">Predictor</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-surface-200/50 max-w-2xl mx-auto">
              Enter your exam rank and preferences to discover which colleges you have the best
              chance of getting admitted to.
            </p>
          </div>

          {/* ── Predictor Form ────────────────── */}
          <div className="p-6 sm:p-8 rounded-2xl glass-strong mb-10">
            <PredictorForm onPredict={handlePredict} isLoading={isLoading} />
          </div>

          {/* ── Loading Animation ─────────────── */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16" id="predictor-loading">
              <div className="relative">
                <div className="w-16 h-16 border-3 border-primary-500/20 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-3 border-t-primary-400 rounded-full animate-spin" />
              </div>
              <p className="mt-6 text-sm text-surface-200/50 font-medium animate-pulse">
                Analyzing rank {userRank.toLocaleString("en-IN")} against cutoff data...
              </p>
            </div>
          )}

          {/* ── Pre-search Empty State ─────────── */}
          {!hasSearched && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-surface-200/12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                Your Predictions Await
              </h3>
              <p className="text-sm text-surface-200/40 max-w-sm">
                Fill in the form above with your exam details and hit &quot;Predict My Colleges&quot; to see your personalized results.
              </p>
            </div>
          )}

          {/* ── Results ───────────────────────── */}
          {hasSearched && !isLoading && results !== null && (
            <PredictorResults results={results} userRank={userRank} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
