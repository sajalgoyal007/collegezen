export default function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="h-72 bg-white/[0.02]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          {/* Logo */}
          <div className="w-28 h-28 rounded-2xl bg-white/[0.05]" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-white/[0.04] rounded w-1/4" />
            <div className="h-8 bg-white/[0.05] rounded-lg w-3/4" />
            <div className="flex gap-4">
              <div className="h-4 bg-white/[0.03] rounded w-32" />
              <div className="h-4 bg-white/[0.03] rounded w-24" />
              <div className="h-4 bg-white/[0.03] rounded w-20" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-white/[0.03]" />
          ))}
        </div>
      </div>

      {/* Section nav skeleton */}
      <div className="h-12 bg-white/[0.02] border-b border-white/5" />

      {/* Content sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Overview */}
        <div className="space-y-4">
          <div className="h-7 bg-white/[0.04] rounded w-40" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              <div className="h-4 bg-white/[0.03] rounded w-full" />
              <div className="h-4 bg-white/[0.03] rounded w-full" />
              <div className="h-4 bg-white/[0.03] rounded w-3/4" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-white/[0.03]" />
              ))}
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="space-y-4">
          <div className="h-7 bg-white/[0.04] rounded w-48" />
          <div className="rounded-2xl bg-white/[0.02] overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 border-b border-white/[0.03]" />
            ))}
          </div>
        </div>

        {/* Placements */}
        <div className="space-y-4">
          <div className="h-7 bg-white/[0.04] rounded w-44" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white/[0.03]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
