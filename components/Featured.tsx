"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mic2, ShieldCheck, BrainCircuit, Rocket, Palette } from "lucide-react";

const courses = [
  { title: "Oratória e Retórica Infantil", description: "Perca o medo de falar e encante audiências com domínio da expressão clara.", icon: <Mic2 className="w-5 h-5" />, tag: "Mais Procurado" },
  { title: "Liderança e Ética", description: "Onde nascem os grandes gestores: foco em carisma e gestão de equipas.", icon: <ShieldCheck className="w-5 h-5" />, tag: "Adolescentes" },
  { title: "Inteligência Emocional", description: "Autocontrolo e ferramentas de gestão de sentimentos para vencer desafios.", icon: <BrainCircuit className="w-5 h-5" />, tag: "Resiliência" },
  { title: "Empreendedorismo Kids", description: "Da ideia à ação: despertando a proactividade e visão estratégica cedo.", icon: <Rocket className="w-5 h-5" />, tag: "Inovação" },
  { title: "Etiqueta e Postura", description: "Elegância e comportamento social que abrem portas em qualquer lugar.", icon: <Palette className="w-5 h-5" />, tag: "Comportamental" },
];

export function Featured() {
  return (
    // Sticky cover — slides over Pillars exactly like Essence covered the Hero
    <section id="cursos" className="sticky top-0 z-20 min-h-screen flex items-center bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 block"
            >
              Formação de Protagonistas
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Cursos em Destaque
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-sm text-sm leading-relaxed"
          >
            No mundo actual, saber o básico não chega. O diferencial está na capacidade de comunicar e liderar.
          </motion.p>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ x: 8 }}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0">
                  {course.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{course.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-slate-400 uppercase font-bold tracking-tighter">{course.tag}</span>
                  </div>
                  <p className="text-slate-400 text-sm max-w-xl">{course.description}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
