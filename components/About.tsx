"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const slideFromRight = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const values = [
  { title: "Excelência", desc: "Rigor na qualidade do ensino e no acompanhamento pedagógico de cada aluno." },
  { title: "Integridade", desc: "Ética e transparência em todas as relações e ensinamentos." },
  { title: "Empatia", desc: "Fomentar o respeito mútuo e a compreensão emocional entre todos." },
  { title: "Inovação", desc: "Estimular a criatividade e o pensamento fora da caixa, sempre." },
  { title: "Protagonismo", desc: "Incentivar o aluno a ser o autor da sua própria história de vida." },
];

const pillars = [
  {
    icon: <Target className="w-7 h-7" />,
    label: "Missão",
    text: "Capacitar crianças e adolescentes por meio de uma educação disruptiva e humanizada, transformando o potencial individual em habilidades práticas de comunicação, liderança e inteligência emocional.",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    label: "Visão",
    text: "Ser a referência nacional e internacional na formação de jovens líderes, reconhecida pela excelência pedagógica e pelo impacto positivo na construção de uma geração mais confiante, ética e empreendedora.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    label: "Valores",
    text: "Excelência · Integridade · Empatia · Inovação · Protagonismo. Estes cinco princípios guiam cada aula, cada interacção e cada decisão que tomamos.",
  },
];

export function About() {
  return (
    // Slides in from the right, then becomes static — overflow-x hidden on parent handles clipping
    <section id="sobre" className="relative py-32 bg-[#fafaf9] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header slides in from right */}
        <motion.div
          className="max-w-3xl mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={slideFromRight} className="flex items-center gap-2 mb-4">
            <span className="w-10 h-px bg-orange-600" />
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">A Nossa História</span>
          </motion.div>

          <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Uma instituição feita para{" "}
            <span className="text-orange-600 italic font-serif">transformar</span>{" "}vidas
          </motion.h2>

          <motion.p variants={slideFromRight} className="text-slate-500 text-lg leading-relaxed font-light">
            A Academia Mori&#39;s-Reforma nasceu da convicção de que a educação verdadeira vai muito além das matérias
            escolares. Em Luanda, preparamos crianças e adolescentes para o mundo real — onde comunicar bem, liderar
            com ética e gerir emoções são as competências que fazem a diferença.
          </motion.p>
        </motion.div>

        {/* Cards also slide from right with stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {pillars.map((p) => (
            <motion.div
              key={p.label}
              variants={slideFromRight}
              className="relative bg-white border border-slate-100 rounded-[2rem] p-10 hover:shadow-xl hover:shadow-orange-600/5 transition-shadow duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                {p.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">{p.label}</h3>
              <p className="text-slate-600 leading-relaxed font-light">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values strip */}
        <motion.div
          className="border-t border-slate-100 pt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={slideFromRight} className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-10">
            Os nossos valores em detalhe
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v) => (
              <motion.div key={v.title} variants={slideFromRight} className="group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-orange-600 group-hover:scale-150 transition-transform" />
                  <h4 className="font-bold text-slate-900">{v.title}</h4>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
