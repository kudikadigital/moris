"use client";

import { motion } from "framer-motion";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants  = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white px-6 py-20 overflow-hidden">
      {/* Elemento Decorativo Minimalista (Sorriso do Logo) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-5xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          initial={itemVariants}
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mb-6"
        >
          Academia Mori&#39;s-Reforma 
        </motion.span>

        <motion.h1 
          initial={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8"
        >
          Moldando os <span className="text-orange-600">Líderes</span> do Amanhã, Hoje. 
        </motion.h1>

        <motion.p 
          initial={itemVariants}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Preparamos a nova geração para os desafios globais com ferramentas intelectuais e comportamentais para que se destaquem em qualquer cenário. 
        </motion.p>

        <motion.div 
          initial={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-4 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-all duration-300 w-full sm:w-auto">
            Preparar meu filho para o futuro 
          </button>
          
          <button className="px-8 py-4 border border-slate-200 text-slate-900 font-medium rounded-full hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto">
            Conhecer Metodologia 
          </button>
        </motion.div>
      </motion.div>

      {/* Footer da Hero - Detalhe de Localização */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-medium"
      >
        Luanda • Benfica 
      </motion.div>
    </section>
  );
}