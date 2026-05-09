import { Navbar, Footer } from "@/components/layout";

const POSTS = [
  { title: "Top 10 Engineering Colleges in India 2025", desc: "A comprehensive ranking based on placements, faculty, and infrastructure.", date: "May 5, 2025", tag: "Rankings", gradient: ["#6366f1", "#8b5cf6"] },
  { title: "How to Choose Between IIT and NIT", desc: "Key factors to consider when deciding between these premier institutions.", date: "Apr 28, 2025", tag: "Guide", gradient: ["#0ea5e9", "#6366f1"] },
  { title: "JEE Main 2025: Complete Preparation Strategy", desc: "Expert tips and study plans to crack JEE Main with a top rank.", date: "Apr 20, 2025", tag: "Exam Tips", gradient: ["#10b981", "#059669"] },
  { title: "MBA vs M.Tech: Which Path is Right for You?", desc: "Comparing career prospects, salaries, and growth in both paths.", date: "Apr 15, 2025", tag: "Career", gradient: ["#f59e0b", "#ef4444"] },
  { title: "Understanding NIRF Rankings Methodology", desc: "How India's official college rankings are calculated and what they mean.", date: "Apr 10, 2025", tag: "Rankings", gradient: ["#ec4899", "#8b5cf6"] },
  { title: "Scholarship Guide for Indian Students", desc: "Complete list of scholarships available for undergraduate and postgraduate students.", date: "Apr 5, 2025", tag: "Finance", gradient: ["#14b8a6", "#0ea5e9"] },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              College<span className="text-gradient">Zen</span> Blog
            </h1>
            <p className="mt-3 text-sm text-surface-200/50 max-w-lg mx-auto">
              Expert insights, guides, and news to help you navigate your college journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POSTS.map((post, i) => (
              <article key={i} className="group p-6 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full" style={{ background: `linear-gradient(135deg, ${post.gradient[0]}20, ${post.gradient[1]}20)`, color: post.gradient[0] }}>
                    {post.tag}
                  </span>
                  <span className="text-[10px] text-surface-200/30">{post.date}</span>
                </div>
                <h2 className="font-display text-lg font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">{post.title}</h2>
                <p className="text-sm text-surface-200/40 leading-relaxed">{post.desc}</p>
                <div className="mt-4 text-xs font-medium text-primary-400/60 group-hover:text-primary-400 transition-colors">
                  Read more →
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
