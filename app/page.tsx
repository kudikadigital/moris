"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Essence } from "@/components/Essence";
import { Pillars } from "@/components/Pillars";
import { Featured } from "@/components/Featured";
import { CTA } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { AdBannerInline } from "@/components/ads/AdBannerInline";
import { EnrollmentModal } from "@/components/Modals/EnrollmentModal";
import { useState } from "react";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="relative min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      {/* Navegação fixa */}
      <Header onOpenModal={() => setIsModalOpen(true)} />
      
      {/* Fluxo de Conteúdo */}
      <article>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        
        {/* Espaçamento estratégico entre seções para respiro visual (UX) */}
        <div className="space-y-0">
          <Essence />
          <Pillars />
          <AdBannerInline />
          <Featured />
          <CTA />
        </div>
      </article>
    <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </main>
  );
}