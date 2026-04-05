"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "Antes, o meu filho mal falava em público. Hoje, apresenta trabalhos com uma confiança que me deixa sem palavras. A Mori's transformou-o completamente.", name: "Carla Mendonça", role: "Mãe do Diogo, 11 anos", initials: "CM", color: "bg-orange-100 text-orange-700" },
  { quote: "Vi a minha filha crescer como pessoa em apenas três meses. A inteligência emocional que ela desenvolveu surpreende até os professores da escola.", name: "Eduardo Teixeira", role: "Pai da Sofia, 14 anos", initials: "ET", color: "bg-slate-100 text-slate-700" },
  { quote: "A metodologia é única. Não é uma aula comum — é uma experiência que muda a forma como as crianças se vêem a si mesmas. Recomendo a todos os pais.", name: "Beatriz Lopes", role: "Mãe do Gabriel, 9 anos", initials: "BL", color: "bg-orange-100 text-orange-700" },
  { quote: "O meu filho foi ao primeiro dia com medo. No segundo, ele próprio nos pediu para voltar. A equipa da Mori's tem um dom especial para lidar com crianças.", name: "André Simões", role: "Pai da Mariana, 12 anos", initials: "AS", color: "bg-slate-100 text-slate-700" },
];

// Slides from LEFT — opposite direction from About (which came from right)
const slideFromLeft = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const} },
};

export function Testimonials() {
  return (
    // This section "closes" Featured (cursos) — sits on top with z-30
    <section id="depoimentos" className="relative z-30 py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-100 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={slideFromLeft} className="flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-orange-600" />
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">O que dizem os pais</span>
          </motion.div>
          <motion.h2 variants={slideFromLeft} className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            As histórias que nos{" "}
            <br className="hidden md:block" />
            <span className="text-orange-600 italic font-serif">motivam</span> a continuar
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={slideFromLeft}
              className="relative bg-[#fafaf9] border border-slate-100 rounded-[2rem] p-10 hover:shadow-xl hover:shadow-orange-600/5 transition-shadow duration-500"
            >
              <Quote className="w-8 h-8 text-orange-200 mb-6" />
              <p className="text-slate-700 text-lg leading-relaxed font-light italic mb-8">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-slate-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
