import { Navbar, Footer } from "@/components/layout";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-xs text-surface-200/30 mb-8">Last updated: May 1, 2025</p>
          <div className="space-y-6">
            <Section title="1. Acceptance of Terms">
              By accessing CollegeZen, you agree to these terms. If you do not agree, please do not use the platform.
            </Section>
            <Section title="2. Use of Service">
              CollegeZen provides college information, comparison tools, and prediction services for educational purposes. Data is provided &quot;as is&quot; and should be used as a guide, not as the sole basis for decisions.
            </Section>
            <Section title="3. User Accounts">
              You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration and keep your data up to date.
            </Section>
            <Section title="4. Intellectual Property">
              All content, design, and code on CollegeZen is owned by the platform. You may not reproduce, distribute, or modify any content without written permission.
            </Section>
            <Section title="5. Limitation of Liability">
              CollegeZen is not liable for any decisions made based on information provided on the platform. College data, rankings, and predictions are for informational purposes only.
            </Section>
            <Section title="6. Changes to Terms">
              We may update these terms periodically. Continued use after changes constitutes acceptance of the updated terms.
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl glass">
      <h2 className="font-display text-base font-semibold text-white mb-3">{title}</h2>
      <p className="text-sm text-surface-200/50 leading-relaxed">{children}</p>
    </div>
  );
}
