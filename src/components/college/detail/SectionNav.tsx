"use client";

import { useState, useEffect } from "react";
import { DETAIL_SECTIONS } from "@/types/college";

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as string);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    DETAIL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="sticky top-16 z-40 glass-strong border-b border-white/5"
      id="section-nav"
      aria-label="Page sections"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {DETAIL_SECTIONS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary-400"
                    : "text-surface-200/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
