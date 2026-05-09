"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo ───────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow duration-300">
              <span className="text-white font-display font-bold text-lg leading-none">
                C
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* ── Desktop Links ──────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-medium text-surface-200 hover:text-white rounded-lg transition-colors duration-200 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop Auth ──────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-20 h-9 rounded-xl glass animate-pulse" />
            ) : isAuth ? (
              <>
                <Link
                  href="/saved"
                  id="nav-saved"
                  className="px-4 py-2 text-sm font-medium text-surface-200 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Saved
                </Link>
                <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity" id="nav-profile">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                    {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-medium text-white leading-tight">{session.user?.name}</p>
                    <p className="text-[10px] text-surface-200/40 leading-tight">{session.user?.email}</p>
                  </div>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors duration-200"
                  id="nav-logout"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  id="nav-login"
                  className="px-4 py-2 text-sm font-medium text-surface-200 hover:text-white transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  id="nav-signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Menu Toggle ─────────────── */}
          <button
            type="button"
            id="mobile-menu-toggle"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-surface-200 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu ───────────────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 text-sm font-medium text-surface-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
              {isAuth ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                      {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{session?.user?.name}</p>
                      <p className="text-xs text-surface-200/40">{session?.user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/saved"
                    className="px-4 py-2.5 text-sm font-medium text-surface-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ❤️ Saved Colleges
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setMobileMenuOpen(false); }}
                    className="px-4 py-2.5 text-sm font-medium text-red-400/70 hover:text-red-400 rounded-lg hover:bg-red-500/5 transition-colors text-left"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2.5 text-sm font-medium text-surface-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-center shadow-lg shadow-primary-500/25"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
