import { Navbar, Footer } from "@/components/layout";

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">Get <span className="text-gradient">Support</span></h1>
            <p className="mt-3 text-sm text-surface-200/50">We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.</p>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl glass-strong space-y-5">
            <div>
              <label className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">Your Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder-surface-200/25 outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder-surface-200/25 outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all appearance-none">
                <option className="bg-surface-900">General Inquiry</option>
                <option className="bg-surface-900">Report Incorrect Data</option>
                <option className="bg-surface-900">Bug Report</option>
                <option className="bg-surface-900">Feature Request</option>
                <option className="bg-surface-900">Account Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-200/50 uppercase tracking-wider mb-2">Message</label>
              <textarea rows={5} placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm placeholder-surface-200/25 outline-none focus:ring-2 focus:ring-primary-500/30 transition-all resize-none" />
            </div>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-500 hover:to-primary-400 transition-all duration-300">
              Send Message
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
