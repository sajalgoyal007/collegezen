import type { CollegeDetail } from "@/types/college";

interface GallerySectionProps {
  college: CollegeDetail;
}

export default function GallerySection({ college }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary-400 to-accent-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Campus Gallery
          </h2>
        </div>

        {/* ── Image Grid ──────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {college.gallery.map((image, index) => {
            // First image spans 2 rows on large screens
            const isLarge = index === 0;
            return (
              <div
                key={image.id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  isLarge ? "lg:row-span-2 aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"
                }`}
              >
                {/* Gradient placeholder image */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${image.gradient[0]}40, ${image.gradient[1]}25)`,
                  }}
                />

                {/* Decorative elements */}
                <div
                  className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: image.gradient[0] }}
                />

                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    backgroundSize: "25px 25px",
                  }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Label Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {image.label}
                  </p>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-inset ring-white/10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
