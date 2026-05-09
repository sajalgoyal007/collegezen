import type { CollegeDetail } from "@/types/college";

interface OverviewSectionProps {
  college: CollegeDetail;
}

export default function OverviewSection({ college }: OverviewSectionProps) {
  const infoItems = [
    { label: "Established", value: college.established.toString(), icon: "📅" },
    { label: "Affiliation", value: college.affiliation, icon: "🏛️" },
    { label: "Accreditation", value: college.accreditation, icon: "✅" },
    { label: "Campus Size", value: college.campusSize, icon: "🌿" },
    { label: "Total Students", value: college.totalStudents.toLocaleString("en-IN"), icon: "👨‍🎓" },
    { label: "Faculty Members", value: college.totalFaculty.toLocaleString("en-IN"), icon: "👨‍🏫" },
  ];

  return (
    <section id="overview" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary-400 to-accent-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Description ───────────────── */}
          <div className="lg:col-span-2">
            <p className="text-surface-200/70 leading-relaxed text-sm sm:text-base">
              {college.longDescription}
            </p>

            {/* Website Link */}
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Official Website
            </a>
          </div>

          {/* ── Info Grid ─────────────────── */}
          <div className="space-y-3">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 rounded-xl glass"
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-[11px] text-surface-200/40 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
