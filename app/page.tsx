// app/page.tsx — COM SUSPENSE BOUNDARY
// O Suspense garante que o FeaturedServer (que vai à DB) não bloqueia
// o render das secções acima e abaixo.
// Enquanto a DB carrega, o utilizador vê o skeleton e pode fazer scroll.

import { Suspense } from "react";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Pillars } from "@/components/Pillars";
import { FeaturedServer } from "@/components/FeaturedServer";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { HeroImage } from "@/components/HeroImage";
import { CTA2 } from "@/components/Cta2";
import { HomeClient } from "@/components/HomeClient";

// Skeleton mostrado enquanto os cursos carregam da DB
function FeaturedSkeleton() {
  return (
    <section className="sticky top-0 z-20 min-h-screen bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="h-3 w-32 bg-slate-800 rounded-full mb-4 animate-pulse" />
          <div className="h-10 w-72 bg-slate-800 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-slate-900 aspect-[4/3] animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      {/*
        HomeClient: Client Component que gere o modal de inscrição.
        Renderiza Header + Hero + Essence + EnrollmentModal.
      */}
      <HomeClient>
        <div className="relative z-20 overflow-x-hidden">
          <About />
          <Stats />
          <HeroImage />
          <Pillars />
          <CTA2 />
        </div>

        <div className="relative z-20">
          {/*
            Suspense: a página renderiza imediatamente.
            FeaturedServer vai à DB (Neon pode ter cold start).
            O skeleton aparece enquanto aguarda — sem bloquear nada.
          */}
          <Suspense fallback={<FeaturedSkeleton />}>
            <FeaturedServer />
          </Suspense>

          <div className="relative z-30 overflow-x-hidden">
            <Testimonials />
            <FAQ />
          </div>
        </div>

        <div className="relative z-30">
          <CTA />
          <Footer />
        </div>
      </HomeClient>
    </main>
  );
}
