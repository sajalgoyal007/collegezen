export default function CollegeCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl glass overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="h-40 bg-white/[0.03]" />

      {/* Body skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 bg-white/[0.05] rounded-lg w-4/5" />
        <div className="h-5 bg-white/[0.04] rounded-lg w-3/5" />

        {/* Location */}
        <div className="h-3 bg-white/[0.03] rounded w-2/5 mt-2" />

        {/* Description */}
        <div className="space-y-1.5 mt-3">
          <div className="h-3 bg-white/[0.03] rounded w-full" />
          <div className="h-3 bg-white/[0.03] rounded w-4/5" />
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-3">
          <div className="h-5 w-16 bg-white/[0.04] rounded-md" />
          <div className="h-5 w-14 bg-white/[0.04] rounded-md" />
          <div className="h-5 w-12 bg-white/[0.04] rounded-md" />
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between pt-4 mt-4 border-t border-white/5">
          <div className="space-y-1">
            <div className="h-4 w-24 bg-white/[0.04] rounded" />
            <div className="h-2.5 w-16 bg-white/[0.03] rounded" />
          </div>
          <div className="space-y-1 text-right">
            <div className="h-6 w-14 bg-white/[0.05] rounded ml-auto" />
            <div className="h-2.5 w-10 bg-white/[0.03] rounded ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
