"use client";

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
import { useState } from "react";
import { EnrollmentModal } from "@/components/Modals/EnrollmentModal";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="relative min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      {/* Navegação fixa */}
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Fluxo de Conteúdo */}
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Essence />

      {/* Espaçamento estratégico entre seções para respiro visual (UX) */}
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


        {/* Modal de inscrição */}
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </main>
  );
}
