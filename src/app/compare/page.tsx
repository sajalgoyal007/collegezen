"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import {
  CompareSelector,
  CompareTable,
  CompareCard,
  CompareHighlights,
  CompareEmptyState,
} from "@/components/compare";
import { useCompare } from "@/hooks/useCompare";
import { useToast } from "@/components/ui/Toast";

export default function ComparePage() {
  const {
    colleges,
    slugs,
    isLoading,
    canAdd,
    maxCompare,
    addCollege,
    removeCollege,
    clearAll,
  } = useCompare();
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveComparison = async () => {
    if (!session) { router.push("/login"); return; }
    if (slugs.length < 2) return;
    setIsSaving(true);
    try {
      const label = colleges.map((c) => c.acronym || c.name.split(" ")[0]).join(" vs ");
      const res = await fetch("/api/saved/comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, slugs }),
      });
      if (res.ok) toast("Comparison saved!", "success");
      else toast("Failed to save comparison", "error");
    } catch { toast("Failed to save", "error"); }
    finally { setIsSaving(false); }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Page Header ──────────────────── */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Compare{" "}
              <span className="text-gradient">Colleges</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-surface-200/50 max-w-2xl mx-auto">
              Select up to {maxCompare} colleges for a detailed side-by-side comparison. Make data-driven decisions for your future.
            </p>
          </div>

          {/* ── Selector ─────────────────────── */}
          <div className="mb-10">
            <CompareSelector
              selectedSlugs={slugs}
              canAdd={canAdd}
              maxCompare={maxCompare}
              onAdd={addCollege}
              onRemove={removeCollege}
              onClearAll={clearAll}
            />
          </div>

          {/* Save Comparison Button */}
          {slugs.length >= 2 && (
            <div className="flex justify-end mb-6 -mt-4">
              <button
                onClick={handleSaveComparison}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl glass text-surface-200/70 hover:text-white hover:bg-white/[0.04] transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isSaving ? "Saving..." : "Save Comparison"}
              </button>
            </div>
          )}

          {/* ── Loading ──────────────────────── */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-400 rounded-full animate-spin" />
            </div>
          )}

          {/* ── Empty State ──────────────────── */}
          {!isLoading && colleges.length < 2 && (
            <>
              {/* Show cards if 1 is selected */}
              {colleges.length === 1 && (
                <div className="mb-8">
                  <p className="text-sm text-surface-200/40 mb-4">
                    Select at least one more college to start comparing.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <CompareCard college={colleges[0]} onRemove={removeCollege} />
                  </div>
                </div>
              )}
              <CompareEmptyState />
            </>
          )}

          {/* ── Comparison View ───────────────── */}
          {!isLoading && colleges.length >= 2 && (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {colleges.map((college) => (
                  <CompareCard
                    key={college.slug}
                    college={college}
                    onRemove={removeCollege}
                  />
                ))}
              </div>

              {/* Recommendation Badges */}
              <CompareHighlights colleges={colleges} />

              {/* Detailed Comparison Table */}
              <CompareTable colleges={colleges} onRemove={removeCollege} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
