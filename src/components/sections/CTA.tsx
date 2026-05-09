import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32" id="cta">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-surface-900 to-accent-500/10" />
          <div className="absolute inset-0 glass" />

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-500/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-500/10 blur-[80px]" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
              Ready to Start Your{" "}
              <span className="text-gradient">College Journey</span>?
            </h2>
            <p className="mt-6 text-lg text-surface-200/60 max-w-xl mx-auto leading-relaxed">
              Join millions of students who found their dream college through CollegeZen.
              Your future starts with the right choice.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                id="cta-signup"
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                Create Free Account
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
                href="/colleges"
                id="cta-explore"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-surface-200 rounded-2xl glass hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse Colleges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
