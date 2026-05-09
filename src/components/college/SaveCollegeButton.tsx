"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

interface SaveCollegeButtonProps {
  collegeId: string;
  collegeName: string;
  size?: "sm" | "md";
}

export default function SaveCollegeButton({ collegeId, collegeName, size = "md" }: SaveCollegeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already saved
  useEffect(() => {
    if (!session) return;
    fetch("/api/saved")
      .then((r) => r.json())
      .then((data) => {
        const saved = (data.colleges ?? []).some((c: { id: string }) => c.id === collegeId);
        setIsSaved(saved);
      })
      .catch(() => {});
  }, [session, collegeId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const method = isSaved ? "DELETE" : "POST";
      const res = await fetch("/api/saved", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });

      if (res.ok) {
        setIsSaved(!isSaved);
        toast(
          isSaved ? `Removed ${collegeName} from saved` : `Saved ${collegeName}!`,
          isSaved ? "info" : "success"
        );
      }
    } catch {
      toast("Failed to update. Try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = size === "sm"
    ? "w-8 h-8 rounded-lg"
    : "w-10 h-10 rounded-xl";

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${sizeClasses} flex items-center justify-center transition-all duration-200 disabled:opacity-50 ${
        isSaved
          ? "bg-primary-500/15 text-primary-400 hover:bg-primary-500/25"
          : "glass text-surface-200/30 hover:text-white hover:bg-white/[0.06]"
      }`}
      title={isSaved ? "Remove from saved" : "Save college"}
      aria-label={isSaved ? "Unsave" : "Save"}
    >
      <svg
        className={size === "sm" ? "w-4 h-4" : "w-5 h-5"}
        fill={isSaved ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
}
