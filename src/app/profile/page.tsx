"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";

interface SavedCollege {
  id: string;
  slug: string;
  name: string;
  acronym: string;
  logoGradient: string[];
  rating: number;
}

interface SavedComparison {
  id: string;
  label: string;
  slugs: string[];
}

interface RecentItem {
  slug: string;
  name: string;
  acronym: string;
  logoGradient: string[];
  viewedAt: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedCount, setSavedCount] = useState(0);
  const [compCount, setCompCount] = useState(0);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [savedColleges, setSavedColleges] = useState<SavedCollege[]>([]);
  const [comparisons, setComparisons] = useState<SavedComparison[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    Promise.all([
      fetch("/api/saved").then((r) => r.json()),
      fetch("/api/saved/comparisons").then((r) => r.json()),
    ]).then(([cData, compData]) => {
      const colleges = cData.colleges ?? [];
      const comps = compData.comparisons ?? [];
      setSavedColleges(colleges.slice(0, 5));
      setComparisons(comps.slice(0, 3));
      setSavedCount(colleges.length);
      setCompCount(comps.length);
    }).catch(() => {});

    try {
      const stored = localStorage.getItem("collegezen-recently-viewed");
      if (stored) setRecentItems(JSON.parse(stored).slice(0, 5));
    } catch {}
  }, [status]);

  if (status !== "authenticated" || !session) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-2xl glass animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const initials = session.user?.name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) ?? "U";

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* ── Profile Header ───────────────── */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 p-6 rounded-2xl glass-strong">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-display font-bold text-2xl shadow-xl shadow-primary-500/20">
              {initials}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="font-display text-2xl font-bold text-white">{session.user?.name}</h1>
              <p className="text-sm text-surface-200/50 mt-1">{session.user?.email}</p>
              <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
                <span className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-lg">{savedCount} saved</span>
                <span className="px-3 py-1 text-xs font-medium bg-accent-500/10 text-accent-400 rounded-lg">{compCount} comparisons</span>
                <span className="px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-lg">{recentItems.length} viewed</span>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 text-xs font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              Log out
            </button>
          </div>

          {/* ── Quick Links ──────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Saved Colleges", href: "/saved", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z", count: savedCount },
              { label: "Comparisons", href: "/saved", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m6 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14", count: compCount },
              { label: "Compare", href: "/compare", icon: "M4 6h16M4 12h16M4 18h16", count: null },
              { label: "Predictor", href: "/predictor", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707", count: null },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="p-4 rounded-2xl glass hover:bg-white/[0.03] transition-all group text-center">
                <svg className="w-5 h-5 mx-auto text-surface-200/30 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <p className="text-xs font-medium text-surface-200/60 mt-2 group-hover:text-white transition-colors">{item.label}</p>
                {item.count !== null && <p className="text-lg font-display font-bold text-white mt-1">{item.count}</p>}
              </Link>
            ))}
          </div>

          {/* ── Saved Colleges Preview ────────── */}
          <ProfileSection title="Saved Colleges" viewAllHref="/saved" count={savedCount}>
            {savedColleges.length === 0 ? (
              <p className="text-sm text-surface-200/30 py-4">No saved colleges yet. <Link href="/colleges" className="text-primary-400">Explore →</Link></p>
            ) : (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {savedColleges.map((c) => (
                  <Link key={c.id} href={`/colleges/${c.slug}`} className="flex-shrink-0 w-32 p-3 rounded-xl glass hover:bg-white/[0.03] transition-all text-center group">
                    <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-white font-display font-bold text-xs" style={{ background: `linear-gradient(135deg, ${c.logoGradient[0]}, ${c.logoGradient[1]})` }}>
                      {c.acronym.slice(0, 4)}
                    </div>
                    <p className="text-[11px] font-medium text-white mt-2 truncate group-hover:text-primary-400 transition-colors">{c.name.split(" ").slice(0, 3).join(" ")}</p>
                    <p className="text-[10px] text-amber-400 mt-0.5">⭐ {c.rating}</p>
                  </Link>
                ))}
              </div>
            )}
          </ProfileSection>

          {/* ── Saved Comparisons Preview ─────── */}
          <ProfileSection title="Saved Comparisons" viewAllHref="/saved" count={compCount}>
            {comparisons.length === 0 ? (
              <p className="text-sm text-surface-200/30 py-4">No comparisons yet. <Link href="/compare" className="text-primary-400">Compare →</Link></p>
            ) : (
              <div className="space-y-2">
                {comparisons.map((comp) => (
                  <Link key={comp.id} href={`/compare?slugs=${comp.slugs.join(",")}`} className="flex items-center justify-between p-3 rounded-xl glass hover:bg-white/[0.03] transition-all group">
                    <span className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">{comp.label}</span>
                    <span className="text-xs text-surface-200/25">{comp.slugs.length} colleges →</span>
                  </Link>
                ))}
              </div>
            )}
          </ProfileSection>

          {/* ── Recently Viewed ───────────────── */}
          <ProfileSection title="Recently Viewed" count={recentItems.length}>
            {recentItems.length === 0 ? (
              <p className="text-sm text-surface-200/30 py-4">Visit college pages to build your history.</p>
            ) : (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {recentItems.map((item) => (
                  <Link key={item.slug} href={`/colleges/${item.slug}`} className="flex-shrink-0 w-28 p-3 rounded-xl glass hover:bg-white/[0.03] transition-all text-center group">
                    <div className="w-9 h-9 mx-auto rounded-lg flex items-center justify-center text-white font-display font-bold text-[10px]" style={{ background: `linear-gradient(135deg, ${item.logoGradient[0]}, ${item.logoGradient[1]})` }}>
                      {item.acronym.slice(0, 4)}
                    </div>
                    <p className="text-[10px] font-medium text-white mt-2 truncate group-hover:text-primary-400 transition-colors">{item.name.split(" ").slice(0, 3).join(" ")}</p>
                  </Link>
                ))}
              </div>
            )}
          </ProfileSection>

          {/* ── Account Settings ──────────────── */}
          <div className="mt-8 p-6 rounded-2xl glass">
            <h2 className="font-display text-base font-semibold text-white mb-4">Account Settings</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">Email notifications</p>
                  <p className="text-xs text-surface-200/30">Receive updates about saved colleges</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-primary-500/20 relative cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-primary-400 shadow-lg transition-all" />
                </div>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">Dark mode</p>
                  <p className="text-xs text-surface-200/30">Always on (system default)</p>
                </div>
                <span className="text-xs text-surface-200/25">Active</span>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-red-400/70">Delete account</p>
                  <p className="text-xs text-surface-200/30">Permanently remove your data</p>
                </div>
                <button className="text-xs text-red-400/40 hover:text-red-400 transition-colors">Request</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProfileSection({ title, viewAllHref, count, children }: {
  title: string; viewAllHref?: string; count: number; children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold text-white">
          {title} <span className="text-surface-200/25 font-normal text-sm">({count})</span>
        </h2>
        {viewAllHref && count > 0 && (
          <Link href={viewAllHref} className="text-xs text-primary-400/60 hover:text-primary-400 transition-colors">
            View all →
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
