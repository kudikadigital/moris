"use client";

import { motion } from "framer-motion";

export function Essence() {
  return (
    // sticky cover — sits over the Hero as user scrolls down
    <section className="sticky top-0 z-10 min-h-screen flex items-center bg-[#fcfcfc] overflow-hidden">
      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="px-5 py-2 rounded-full border border-orange-100 bg-white text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
              Nossa Essência
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.15] mb-14 tracking-tight"
          >
            &#34;A reforma do mundo começa pela{" "}
            <br className="hidden md:block" />
            <span className="text-orange-600 italic font-serif px-2">educação</span>
            {" "}das nossas crianças.&#34;
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-3xl space-y-8"
          >
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light italic">
              A Academia Mori&#39;s-Reforma é uma instituição de vanguarda.
              Nosso foco vai além do ensino tradicional: preparamos a nova geração para os desafios globais.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              <div className="h-px w-12 bg-orange-200 hidden md:block" />
              <p className="text-base md:text-lg font-medium text-slate-800 uppercase tracking-widest">
                Comunicação · Liderança · Inteligência Emocional
              </p>
              <div className="h-px w-12 bg-orange-200 hidden md:block" />
            </div>
          </motion.div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "80px", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
            className="h-1 bg-orange-600 mt-20 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
