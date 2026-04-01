"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="sticky top-0 h-screen flex items-center bg-white overflow-hidden">
      {/* Background image — face/content on the RIGHT side of photo, so we place it right */}
      <div className="absolute right-0 top-0 w-full h-full lg:w-3/5 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/60 z-10" />
        <Image
          src="/hero-student.jpg"
          alt="Estudante Academia Mori's"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Content — LEFT aligned, max-w-7xl */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } } }}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="flex items-center gap-2 mb-6">
          <span className="h-px w-8 bg-orange-600" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500">
            Academia Mori&#39;s-Reforma
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6 max-w-2xl"
        >
          Moldando os <br />
          <span className="text-orange-600 relative inline-block">
            Líderes
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 338 12" fill="none">
              <path d="M1 9.5C51.5 4.66667 152.5 -1.5 337 9.5" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          {" "}do Amanhã.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-slate-600 max-w-md mb-10 leading-relaxed font-light"
        >
          Preparamos a nova geração para os desafios globais com ferramentas
          intelectuais e comportamentais para que se destaquem em qualquer cenário.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="https://wa.me/244938460008"
            className="group relative px-8 py-4 bg-slate-900 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-600"
          >
            Preparar meu filho
          </a>
          <a
            href="#sobre"
            className="px-8 py-4 border border-slate-200 text-slate-900 font-medium rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
          >
            Conhecer a Academia
          </a>
        </motion.div>

        {/* Location tag */}
        <motion.p
          variants={item}
          className="mt-16 text-slate-400 text-xs font-medium tracking-[0.25em] uppercase"
        >
          Luanda · Benfica · Via Expressa
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-orange-600 to-transparent" />
      </motion.div>
    </section>
  );
}
