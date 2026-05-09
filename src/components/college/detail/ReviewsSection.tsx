import type { CollegeDetail } from "@/types/college";

interface ReviewsSectionProps {
  college: CollegeDetail;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-white/10"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection({ college }: ReviewsSectionProps) {
  const avgRating = college.reviews.length > 0
    ? college.reviews.reduce((sum, r) => sum + r.rating, 0) / college.reviews.length
    : 0;

  return (
    <section id="reviews" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary-400 to-accent-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Student Reviews
          </h2>
          <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold bg-primary-500/15 text-primary-400 rounded-full">
            {college.reviews.length}
          </span>
        </div>

        {/* ── Rating Summary ──────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 p-5 rounded-2xl glass">
          <div className="text-center sm:text-left">
            <p className="text-4xl font-display font-bold text-white">
              {avgRating.toFixed(1)}
            </p>
            <StarRating rating={Math.round(avgRating)} />
            <p className="mt-1 text-xs text-surface-200/40">
              Based on {college.reviewCount.toLocaleString("en-IN")} reviews
            </p>
          </div>
          {/* Rating distribution bars */}
          <div className="flex-1 w-full space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = college.reviews.filter((r) => Math.round(r.rating) === star).length;
              const pct = college.reviews.length > 0 ? (count / college.reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-surface-200/40 w-3 text-right">{star}</span>
                  <svg className="w-3 h-3 text-amber-400/60" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-surface-200/30 w-6">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Review Cards ────────────────── */}
        <div className="space-y-4">
          {college.reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl glass hover:bg-white/[0.02] transition-colors duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center text-xs font-bold text-white">
                  {review.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <p className="text-sm font-semibold text-white">{review.author}</p>
                      <p className="text-xs text-surface-200/40">
                        {review.course} · Class of {review.graduationYear}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-surface-200/30">
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Title & Text */}
                  <h4 className="mt-2 text-sm font-semibold text-white/90">
                    {review.title}
                  </h4>
                  <p className="mt-1 text-sm text-surface-200/50 leading-relaxed">
                    {review.text}
                  </p>

                  {/* Helpful */}
                  <div className="flex items-center gap-3 mt-3">
                    <button className="inline-flex items-center gap-1.5 text-xs text-surface-200/30 hover:text-primary-400 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
