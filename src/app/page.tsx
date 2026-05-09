import { Navbar, Footer } from "@/components/layout";
import { Hero, Features, CTA } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
