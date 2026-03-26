"use client";

import { motion } from "framer-motion";

export function Essence() {
  return (
    <section className="py-24 md:py-40 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          
          {/* Tag de Missão */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-widest">
              Nossa Missão
            </span>
          </motion.div>

          {/* Citação Principal com Scroll Reveal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-slate-900 leading-tight mb-12 tracking-tight"
          >
            &#34;A reforma do mundo começa pela <span className="text-orange-600 italic">educação</span> das nossas crianças.&#34;
          </motion.h2>

          {/* Texto de Apoio Narrativo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-3xl space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light"
          >
            <p>
              Somos uma instituição educacional de vanguarda dedicada ao desenvolvimento integral. 
              Nosso foco vai além do ensino tradicional: preparamos a nova geração para os desafios globais.
            </p>
            <p className="font-normal text-slate-800">
              Transformamos o potencial individual em habilidades práticas de comunicação, liderança e inteligência emocional.
            </p>
          </motion.div>

          {/* Divider Minimalista */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
            className="w-24 h-px bg-orange-300 mt-16"
          />
        </div>
      </div>
    </section>
  );
}