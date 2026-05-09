import type { CollegeDetail } from "@/types/college";

interface CoursesSectionProps {
  college: CollegeDetail;
}

function formatFees(fees: number): string {
  if (fees >= 100000) return `₹${(fees / 100000).toFixed(fees % 100000 === 0 ? 0 : 1)}L`;
  if (fees >= 1000) return `₹${(fees / 1000).toFixed(0)}K`;
  return `₹${fees.toLocaleString("en-IN")}`;
}

export default function CoursesSection({ college }: CoursesSectionProps) {
  return (
    <section id="courses" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary-400 to-accent-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Courses Offered
          </h2>
          <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold bg-primary-500/15 text-primary-400 rounded-full">
            {college.courses.length}
          </span>
        </div>

        {/* ── Desktop Table ────────────────── */}
        <div className="hidden md:block rounded-2xl glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-semibold text-surface-200/40 uppercase tracking-wider">
                  Course
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-surface-200/40 uppercase tracking-wider">
                  Duration
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-surface-200/40 uppercase tracking-wider">
                  Fees / Year
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-surface-200/40 uppercase tracking-wider">
                  Eligibility
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-surface-200/40 uppercase tracking-wider">
                  Seats
                </th>
              </tr>
            </thead>
            <tbody>
              {college.courses.map((course, index) => (
                <tr
                  key={course.id}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    index < college.courses.length - 1 ? "border-b border-white/[0.03]" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-white">{course.name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium text-primary-300/80 bg-primary-500/10 rounded">
                        {course.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-200/60">{course.duration}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gradient">{formatFees(course.fees)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-200/60">{course.eligibility}</td>
                  <td className="px-6 py-4 text-sm text-surface-200/60 text-right">{course.seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ─────────────────── */}
        <div className="md:hidden space-y-3">
          {college.courses.map((course) => (
            <div key={course.id} className="p-4 rounded-2xl glass">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{course.name}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium text-primary-300/80 bg-primary-500/10 rounded">
                    {course.type}
                  </span>
                </div>
                <p className="text-sm font-bold text-gradient flex-shrink-0">
                  {formatFees(course.fees)}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-surface-200/40 uppercase">Duration</p>
                  <p className="text-xs font-medium text-surface-200/70">{course.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] text-surface-200/40 uppercase">Eligibility</p>
                  <p className="text-xs font-medium text-surface-200/70">{course.eligibility}</p>
                </div>
                <div>
                  <p className="text-[10px] text-surface-200/40 uppercase">Seats</p>
                  <p className="text-xs font-medium text-surface-200/70">{course.seats}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
