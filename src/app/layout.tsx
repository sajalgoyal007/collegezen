import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "CollegeZen — Discover Your Perfect College",
  description:
    "Discover, compare, and choose the perfect college for your future. Data-driven insights to make your most important decision with confidence.",
  keywords: [
    "college search",
    "college comparison",
    "university rankings",
    "college finder",
    "higher education",
  ],
  openGraph: {
    title: "CollegeZen — Discover Your Perfect College",
    description:
      "Data-driven insights to make your most important education decision with confidence.",
    siteName: "CollegeZen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider><ToastProvider>{children}</ToastProvider></AuthProvider>
      </body>
    </html>
  );
}

