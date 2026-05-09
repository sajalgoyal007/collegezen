import { Navbar, Footer } from "@/components/layout";
import Link from "next/link";

const GUIDES = [
  { title: "Getting Started with CollegeZen", desc: "Learn how to use all features — search, compare, predict, and save colleges.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "How to Compare Colleges Effectively", desc: "Tips on selecting the right criteria for comparing colleges side by side.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "Understanding the College Predictor", desc: "How our AI-powered predictor uses your rank and preferences to suggest colleges.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { title: "Saving & Organizing Colleges", desc: "How to save colleges, create comparison sets, and manage your dashboard.", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
];

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">User <span className="text-gradient">Guides</span></h1>
            <p className="mt-3 text-sm text-surface-200/50">Step-by-step guides to get the most out of CollegeZen.</p>
          </div>
          <div className="space-y-4">
            {GUIDES.map((g, i) => (
              <div key={i} className="group flex items-start gap-4 p-6 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/15 transition-colors">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={g.icon} />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-base font-semibold text-white group-hover:text-primary-400 transition-colors">{g.title}</h2>
                  <p className="mt-1 text-sm text-surface-200/40">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/support" className="text-sm text-primary-400/70 hover:text-primary-400 transition-colors">
              Need more help? Contact Support →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
