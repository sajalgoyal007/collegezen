import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

const FOOTER_RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
] as const;

const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/5" id="footer">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ── Brand Column ─────────────────── */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-display font-bold text-lg leading-none">C</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-surface-200/70 leading-relaxed max-w-xs">
              Empowering students to make informed decisions about their higher education journey.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {["X", "LI", "IG"].map((icon) => (
                <div
                  key={icon}
                  className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-surface-200/60 hover:text-white transition-all duration-200 cursor-pointer text-xs font-semibold"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* ── Explore Column ───────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources Column ─────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {FOOTER_RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal Column ─────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-200/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────── */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-200/50">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-surface-200/40">
            Built with ❤️ for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
