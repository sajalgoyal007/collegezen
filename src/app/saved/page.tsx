"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { useToast } from "@/components/ui/Toast";

interface SavedCollege {
  id: string;
  slug: string;
  name: string;
  acronym: string;
  location: string;
  fees: number;
  rating: number;
  logoGradient: string[];
  courseTypes: string[];
}

interface SavedComparison {
  id: string;
  label: string;
  slugs: string[];
  createdAt: string;
}

interface RecentlyViewed {
  slug: string;
  name: string;
  acronym: string;
  logoGradient: string[];
  viewedAt: number;
}

type Tab = "colleges" | "comparisons" | "recent";

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("colleges");
  const [colleges, setColleges] = useState<SavedCollege[]>([]);
  const [comparisons, setComparisons] = useState<SavedComparison[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Fetch saved data
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [collegesRes, comparisonsRes] = await Promise.all([
          fetch("/api/saved"),
          fetch("/api/saved/comparisons"),
        ]);
        const [cData, compData] = await Promise.all([
          collegesRes.json(),
          comparisonsRes.json(),
        ]);
        setColleges(cData.colleges ?? []);
        setComparisons(compData.comparisons ?? []);
      } catch {
        toast("Failed to load saved data", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();

    // Load recently viewed from localStorage
    try {
      const stored = localStorage.getItem("collegezen-recently-viewed");
      if (stored) setRecentlyViewed(JSON.parse(stored));
    } catch {}
  }, [status, toast]);

  const handleUnsaveCollege = useCallback(async (collegeId: string, collegeName: string) => {
    setColleges((prev) => prev.filter((c) => c.id !== collegeId));
    try {
      await fetch("/api/saved", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });
      toast(`Removed ${collegeName}`, "info");
    } catch {
      toast("Failed to remove", "error");
    }
  }, [toast]);

  const handleDeleteComparison = useCallback(async (id: string) => {
    setComparisons((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch("/api/saved/comparisons", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Comparison removed", "info");
    } catch {
      toast("Failed to remove", "error");
    }
  }, [toast]);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    localStorage.removeItem("collegezen-recently-viewed");
    toast("History cleared", "info");
  }, [toast]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 rounded-2xl glass animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const TABS: { key: Tab; label: string; count: number; icon: string }[] = [
    { key: "colleges", label: "Saved Colleges", count: colleges.length, icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
    { key: "comparisons", label: "Comparisons", count: comparisons.length, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { key: "recent", label: "Recently Viewed", count: recentlyViewed.length, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* ── Header ─────────────────────────── */}
          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Your <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="mt-2 text-sm text-surface-200/50">
              Welcome back, {session?.user?.name}. Manage your saved colleges and comparisons.
            </p>
          </div>

          {/* ── Tabs ───────────────────────────── */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto no-scrollbar border-b border-white/5 pb-px" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-primary-500 text-primary-400"
                    : "border-transparent text-surface-200/40 hover:text-surface-200/70"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    activeTab === tab.key ? "bg-primary-500/15 text-primary-400" : "bg-white/5 text-surface-200/30"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Loading ────────────────────────── */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 rounded-2xl glass animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
          )}

          {/* ── Saved Colleges Tab ─────────────── */}
          {!isLoading && activeTab === "colleges" && (
            <>
              {colleges.length === 0 ? (
                <EmptyState
                  icon="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  title="No saved colleges yet"
                  description="Browse colleges and tap the bookmark icon to save them here for quick access."
                  actionLabel="Explore Colleges"
                  actionHref="/colleges"
                />
              ) : (
                <div className="space-y-2">
                  {colleges.map((college, i) => (
                    <div
                      key={college.id}
                      className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <Link href={`/colleges/${college.slug}`} className="flex items-center gap-4 flex-1 min-w-0">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-bold text-xs flex-shrink-0 shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${college.logoGradient[0]}, ${college.logoGradient[1]})` }}
                        >
                          {college.acronym.slice(0, 4)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate hover:text-primary-400 transition-colors">{college.name}</p>
                          <div className="flex items-center gap-2 text-xs text-surface-200/40">
                            <span>{college.location}</span>
                            <span>·</span>
                            <span className="text-amber-400">⭐ {college.rating}</span>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="hidden sm:inline text-xs text-surface-200/25">{college.courseTypes.slice(0, 2).join(", ")}</span>
                        <button
                          onClick={() => handleUnsaveCollege(college.id, college.name)}
                          className="p-2 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Remove from saved"
                          aria-label={`Remove ${college.name}`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Saved Comparisons Tab ──────────── */}
          {!isLoading && activeTab === "comparisons" && (
            <>
              {comparisons.length === 0 ? (
                <EmptyState
                  icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  title="No saved comparisons"
                  description="Compare colleges side-by-side and save your comparison sets for later review."
                  actionLabel="Compare Colleges"
                  actionHref="/compare"
                />
              ) : (
                <div className="space-y-3">
                  {comparisons.map((comp, i) => (
                    <div
                      key={comp.id}
                      className="p-4 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">{comp.label}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-surface-200/25">
                            {new Date(comp.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <button
                            onClick={() => handleDeleteComparison(comp.id)}
                            className="p-1.5 rounded-lg text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            aria-label="Delete comparison"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {comp.slugs.map((slug) => (
                          <span key={slug} className="px-2.5 py-1 text-xs font-medium bg-primary-500/10 text-primary-400/70 rounded-lg">
                            {slug.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <Link
                          href={`/compare?slugs=${comp.slugs.join(",")}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-400/70 hover:text-primary-400 transition-colors"
                        >
                          Open comparison
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Recently Viewed Tab ────────────── */}
          {!isLoading && activeTab === "recent" && (
            <>
              {recentlyViewed.length === 0 ? (
                <EmptyState
                  icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  title="No recently viewed colleges"
                  description="Colleges you visit will appear here for quick access."
                  actionLabel="Browse Colleges"
                  actionHref="/colleges"
                />
              ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <button onClick={clearRecentlyViewed} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">
                      Clear history
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentlyViewed.map((item, i) => (
                      <Link
                        key={item.slug}
                        href={`/colleges/${item.slug}`}
                        className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-200 animate-fade-in-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-xs flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${item.logoGradient[0]}, ${item.logoGradient[1]})` }}
                        >
                          {item.acronym.slice(0, 4)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-[10px] text-surface-200/30">
                            Viewed {timeAgo(item.viewedAt)}
                          </p>
                        </div>
                        <svg className="w-4 h-4 text-surface-200/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Reusable Empty State ────────────────────
function EmptyState({ icon, title, description, actionLabel, actionHref }: {
  icon: string; title: string; description: string; actionLabel: string; actionHref: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
      <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-surface-200/12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <h3 className="font-display text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-surface-200/40 max-w-sm mb-6">{description}</p>
      <Link
        href={actionHref}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

// ── Time Ago Helper ─────────────────────────
function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
