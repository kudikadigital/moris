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
import { AdBannerInline } from "@/components/ads/AdBannerInline";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="relative min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      {/* Navegação fixa */}
      <Header />
      
      {/* Fluxo de Conteúdo */}
      <article>
        <Hero />
        
        {/* Espaçamento estratégico entre seções para respiro visual (UX) */}
        <div className="space-y-0">
          <Essence />
          <Pillars />
          <AdBannerInline />
          <Featured />
          <CTA />
        </div>
      </article>

      <Footer />
    </main>
  );
}
