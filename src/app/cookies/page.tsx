import { Navbar, Footer } from "@/components/layout";

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Cookie Policy</h1>
          <p className="text-xs text-surface-200/30 mb-8">Last updated: May 1, 2025</p>
          <div className="space-y-6">
            <Section title="What Are Cookies?">
              Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and provide a better experience.
            </Section>
            <Section title="Cookies We Use">
              CollegeZen uses only essential cookies required for authentication and session management. We do not use advertising or third-party tracking cookies.
            </Section>
            <Section title="Session Cookies">
              These cookies keep you logged in while using CollegeZen. They expire when you close your browser or after your session ends.
            </Section>
            <Section title="Local Storage">
              We use browser local storage to persist your compare selections and recently viewed colleges for convenience. This data stays on your device and is never transmitted to our servers.
            </Section>
            <Section title="Managing Cookies">
              You can manage or delete cookies through your browser settings. Note that disabling essential cookies may affect your ability to use certain features like saving colleges.
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
