import { Navbar, Footer } from "@/components/layout";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-xs text-surface-200/30 mb-8">Last updated: May 1, 2025</p>
          <div className="prose-custom space-y-6">
            <Section title="1. Information We Collect">
              We collect information you provide directly: name, email address, and password when you create an account. We also collect usage data such as pages visited, colleges saved, and comparisons made to improve your experience.
            </Section>
            <Section title="2. How We Use Your Information">
              Your information is used to provide and improve our services, personalize your experience, send important updates, and maintain the security of your account. We do not sell your personal data.
            </Section>
            <Section title="3. Data Storage & Security">
              Your data is stored securely using industry-standard encryption. Passwords are hashed using bcrypt and are never stored in plain text. We use PostgreSQL databases with restricted access controls.
            </Section>
            <Section title="4. Cookies">
              We use essential cookies for authentication and session management. No third-party tracking cookies are used. See our Cookie Policy for details.
            </Section>
            <Section title="5. Your Rights">
              You can access, update, or delete your account data at any time from your Profile page. You may also request a complete export of your data by contacting support.
            </Section>
            <Section title="6. Contact">
              For privacy-related inquiries, contact us at privacy@collegezen.com or visit our Support page.
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
