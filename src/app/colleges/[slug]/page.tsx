"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import {
  CollegeHero,
  SectionNav,
  OverviewSection,
  CoursesSection,
  PlacementSection,
  ReviewsSection,
  GallerySection,
  DetailSkeleton,
} from "@/components/college/detail";
import type { CollegeDetail } from "@/types/college";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CollegeDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setCollege(data);

        // Track recently viewed
        try {
          const KEY = "collegezen-recently-viewed";
          const stored = JSON.parse(localStorage.getItem(KEY) || "[]");
          const filtered = stored.filter((r: { slug: string }) => r.slug !== slug);
          filtered.unshift({
            slug: data.slug,
            name: data.name,
            acronym: data.acronym,
            logoGradient: data.logoGradient,
            viewedAt: Date.now(),
          });
          localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, 20)));
        } catch {}
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  if (error) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        {isLoading ? (
          <DetailSkeleton />
        ) : college ? (
          <>
            <CollegeHero college={college} />
            <SectionNav />
            <OverviewSection college={college} />
            <CoursesSection college={college} />
            <PlacementSection college={college} />
            <ReviewsSection college={college} />
            <GallerySection college={college} />
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
