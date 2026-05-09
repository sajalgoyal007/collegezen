import Link from "next/link";

const STATS = [
  { value: "25K+", label: "Colleges" },
  { value: "10M+", label: "Reviews" },
  { value: "500+", label: "Cities" },
  { value: "98%", label: "Satisfaction" },
] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" id="hero">
      {/* ── Background Decorations ──────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient orb */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-600/15 blur-[120px] animate-pulse-glow" />
        {/* Accent gradient orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* ── Badge ──────────────────────────── */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
          <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
          <span className="text-xs font-medium text-surface-200/80 tracking-wide">
            Trusted by 2M+ students across India
          </span>
        </div>

        {/* ── Heading ────────────────────────── */}
        <h1 className="animate-fade-in-up-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Find Your{" "}
          <span className="text-gradient">Perfect College</span>
          <br />
          with Confidence
        </h1>

        {/* ── Subtitle ──────────────────────── */}
        <p className="animate-fade-in-up-delay-2 mt-6 text-lg sm:text-xl text-surface-200/60 max-w-2xl mx-auto leading-relaxed">
          Compare colleges, explore rankings, read authentic reviews, and make the most
          important decision of your academic journey — powered by data, designed for you.
        </p>

        {/* ── CTA Buttons ────────────────────── */}
        <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/colleges"
            id="hero-cta-explore"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore Colleges</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link
            href="/compare"
            id="hero-cta-compare"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-surface-200 rounded-2xl glass hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Compare Now</span>
          </Link>
        </div>

        {/* ── Stats Bar ─────────────────────── */}
        <div className="animate-fade-in-up-delay-3 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="group text-center p-4 rounded-2xl glass hover:bg-white/[0.04] transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-surface-200/50 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ─────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent" />
    </section>
  );
}
