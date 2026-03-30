"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center bg-white px-6 py-20 overflow-hidden">
      {/* 1. Background Image Layer com Fade para Branco */}
      <div className="absolute right-0 top-0 w-full h-full lg:w-3/5 z-0 overflow-hidden">
        {/* Gradiente de transição (ajustado para melhor mesclagem) */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white z-10" />

        <Image
          src="/hero-student.jpg"
          alt="Estudante em posição de liderança na Academia Mori's"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center grayscale-20 opacity- transition-transform duration-1000 hover:scale-105"
        />
      </div>

      {/* 2. Textura de Grade Subtil (Modernista) */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Brilho Atmosférico (Efeito Sorriso Mori's) */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-5xl mx-auto text-center lg:text-left lg:ml-0 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={itemVariants}
          className="flex items-center gap-2 mb-6 justify-center lg:justify-start"
        >
          <span className="h-px w-8 bg-orange-600" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500">
            Academia Mori&#39;s-Reforma
          </span>
        </motion.div>

        <motion.h1
          initial={itemVariants}
          className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-4"
        >
          Moldando os <br />
          <span className="text-orange-600 relative inline-block">
            Líderes
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 338 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.5C51.5 4.66667 152.5 -1.5 337 9.5"
                stroke="#EA580C"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          <br />
          do Amanhã.
        </motion.h1>

        <motion.p
          initial={itemVariants}
          className="text-lg md:text-xl text-slate-600 max-w-xl mb-4 leading-relaxed font-light"
        >
          Preparamos a nova geração para os desafios globais com ferramentas
          intelectuais e comportamentais para que se destaquem em qualquer
          cenário.
        </motion.p>

        <motion.div
          initial={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        >
          <button className="group relative px-8 py-4 bg-slate-900 text-white font-medium rounded-full overflow-hidden transition-all duration-300 w-full sm:w-auto hover:pr-12">
            <span className="relative z-10">Preparar meu filho</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              →
            </span>
          </button>

          <button className="px-8 py-4 border border-slate-200 text-slate-900 font-medium rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 w-full sm:w-auto">
            Conhecer Metodologia
          </button>
        </motion.div>
      </motion.div>

      {/* 4. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
          Scroll
        </span>
        <div className="w-px h-12 bg-linear-to-b from-orange-600 to-transparent" />
      </motion.div>

      <div className="absolute bottom-10 right-10 hidden md:block">
        <p className="text-slate-400 text-xs font-medium tracking-tighter rotate-90 origin-right">
          LUANDA • BENFICA • VIA EXPRESSA
        </p>
      </div>
    </section>
  );
}
