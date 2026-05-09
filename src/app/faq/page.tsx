import { Navbar, Footer } from "@/components/layout";

const FAQS = [
  { q: "Is CollegeZen free to use?", a: "Yes! CollegeZen is completely free for students. We believe every student deserves access to quality college information and comparison tools." },
  { q: "Where does CollegeZen get its data?", a: "Our data is sourced from official college websites, government databases (NIRF, UGC), and verified student reviews. We update our data regularly to ensure accuracy." },
  { q: "How accurate is the College Predictor?", a: "Our predictor uses historical cutoff data and statistical models to estimate your chances. While no prediction is 100% certain, it provides a reliable directional guide based on past trends." },
  { q: "Can I save colleges for later?", a: "Absolutely! Create a free account to save colleges, comparison sets, and track your recently viewed institutions from your personal dashboard." },
  { q: "How many colleges can I compare at once?", a: "You can compare up to 3 colleges simultaneously. This allows for a detailed, side-by-side analysis without information overload." },
  { q: "Do you cover all colleges in India?", a: "We currently cover IITs, NITs, IIITs, AIIMS, IIMs, and top private institutions. We're continuously expanding our database to include more colleges." },
  { q: "How do I report incorrect information?", a: "Please use the Support page to report any inaccuracies. We take data quality seriously and will investigate and correct any issues promptly." },
  { q: "Is my personal data safe?", a: "Yes. We use industry-standard encryption and never share your personal information with third parties. See our Privacy Policy for details." },
];

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Frequently Asked <span className="text-gradient">Questions</span></h1>
            <p className="mt-3 text-sm text-surface-200/50">Everything you need to know about CollegeZen.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-2xl glass overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-white hover:text-primary-400 transition-colors">
                  {faq.q}
                  <svg className="w-4 h-4 text-surface-200/30 group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-surface-200/50 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
