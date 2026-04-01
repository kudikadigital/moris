import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Essence } from "@/components/Essence";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Pillars } from "@/components/Pillars";
import { Featured } from "@/components/Featured";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/Cta";
import { Footer } from "@/components/Footer";

/**
 * SCROLL ARCHITECTURE
 * ─────────────────────────────────────────────────────────────
 * Hero          sticky top-0 z-0   → fixed backdrop
 * Essence       sticky top-0 z-10  → covers Hero (card-stack)
 *
 * About         normal z-20        → slides in from RIGHT
 * Stats         normal z-20        → vertical stabilizer
 * Pillars       normal z-20        → vertical stabilizer
 *
 * Featured      sticky top-0 z-20  → covers Pillars (card-stack)
 *
 * Testimonials  normal z-30        → slides in from LEFT, closes Featured
 * FAQ           normal z-30        → slides in from RIGHT, stabilizes
 *
 * CTA + Footer  normal z-30        → vertical, clean ending
 * ─────────────────────────────────────────────────────────────
 *
 * overflow-x: hidden on <body> prevents horizontal scrollbar
 * during whileInView slide animations.
 * Set in globals.css: body { overflow-x: hidden }
 */

export default function Home() {
  return (
    <main className="relative bg-white selection:bg-orange-100 selection:text-orange-900">
      <Header />

      {/* LAYER 1 — Card stack: Hero + Essence */}
      <div className="relative">
        <Hero />
        <Essence />
      </div>

      {/* LAYER 2 — Normal vertical scroll: About → Stats → Pillars */}
      {/* overflow-x hidden clips the horizontal slide-in animations */}
      <div className="relative z-20 overflow-x-hidden">
        <About />
        <Stats />
        <Pillars />
      </div>

      {/* LAYER 3 — Card stack: Featured (sticky) + closers */}
      <div className="relative z-20">
        <Featured />
        {/* Testimonials and FAQ sit at z-30 — they scroll over Featured */}
        <div className="relative z-30 overflow-x-hidden">
          <Testimonials />
          <FAQ />
        </div>
      </div>

      {/* LAYER 4 — Normal vertical ending */}
      <div className="relative z-30">
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
