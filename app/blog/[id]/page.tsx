"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, } from "lucide-react";
import { SiWhatsapp, SiFacebook,  } from "react-icons/si";
import { AdBannerInline } from "@/components/ads/AdBannerInline";
import { SlSocialLinkedin } from "react-icons/sl";

export default function BlogPost({ params }: { params: { id: string } }) {
  // Barra de progresso de leitura
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen bg-white pb-20">
      {/* Barra de Leitura Fixa no Topo */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-60" 
        style={{ scaleX }} 
      />

      <div className="max-w-4xl mx-auto px-6 pt-32">
        
        {/* Voltar e Metadados */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Voltar ao Blog
        </Link>

        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6 text-[10px] uppercase font-black tracking-[0.2em] text-orange-600"
          >
            <span>Educação Moderna</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1 text-slate-400 italic">
              <Clock size={12} /> 5 min de leitura
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-8"
          >
            O impacto da Oratória no sistema de ensino em Angola
          </motion.h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative">
                {/* <Image src="/author.jpg" alt="Autor" fill className="object-cover" /> */}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Dr. Mateus Mori&#39;s</p>
                <p className="text-xs text-slate-500 font-light">Director Pedagógico</p>
              </div>
            </div>
            <div className="flex gap-3">
               <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors"><SiWhatsapp size={18}/></button>
               <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors"><SlSocialLinkedin size={18}/></button>
            </div>
          </div>
        </header>

        {/* Imagem de Destaque */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl shadow-slate-200"
        >
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
             {/* <Image src="/blog-hero.jpg" alt="Hero Blog" fill className="object-cover" /> */}
             <span>[Imagem do Artigo]</span>
          </div>
        </motion.div>

        {/* Conteúdo do Artigo */}
        <article className="prose prose-slate prose-lg max-w-none">
          <p className="lead text-2xl text-slate-600 font-light italic leading-relaxed mb-8">
            Vivemos num mercado cada vez mais competitivo, onde o conhecimento técnico já não é o único factor determinante para o sucesso. Em Angola, a nova geração enfrenta o desafio de se destacar numa economia globalizada.
          </p>
          
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">A Barreira do Silêncio</h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            Muitas vezes, alunos brilhantes perdem oportunidades por não conseguirem articular os seus pensamentos de forma clara. A reforma educativa que propomos foca-se precisamente na quebra desta barreira...
          </p>

          {/* Inserção de Anúncio Estratégico no Meio do Texto */}
          <AdBannerInline />

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Liderança é Comunicação</h2>
          <p className="text-slate-700 leading-relaxed mb-8">
            Não existe líder silencioso. Na Academia Mori&#39;s-Reforma, acreditamos que ensinar uma criança a falar em público é dar-lhe uma ferramenta de poder e ética.
          </p>
        </article>

        {/* Footer do Artigo */}
        <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Partilhe este pensamento</p>
          <div className="flex justify-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 text-slate-900 font-bold hover:bg-orange-50 hover:text-orange-600 transition-all">
               <SiWhatsapp /> WhatsApp
             </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 text-slate-900 font-bold hover:bg-orange-50 hover:text-orange-600 transition-all">
               <SiFacebook /> Facebook
             </button>
          </div>
        </footer>
      </div>
    </main>
  );
}