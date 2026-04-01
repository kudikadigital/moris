"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "500+", label: "Alunos Formados", sub: "desde a fundação" },
  { number: "5", label: "Programas Activos", sub: "por faixa etária" },
  { number: "98%", label: "Satisfação Parental", sub: "em questionários internos" },
  { number: "3", label: "Anos de Impacto", sub: "em Luanda, Benfica" },
];

export function Stats() {
  return (
    // Normal vertical — acts as stabilizer between About and Pillars
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, #ea580c33 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-8 py-4"
            >
              <span className="text-5xl md:text-6xl font-bold text-orange-500 tracking-tight mb-2">{s.number}</span>
              <span className="font-bold text-white text-sm uppercase tracking-widest mb-1">{s.label}</span>
              <span className="text-slate-500 text-xs">{s.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
