"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "A partir de que idade as crianças podem frequentar a Academia?", a: "Os nossos programas são desenhados para crianças a partir dos 6 anos. Temos turmas segmentadas por faixa etária (6-9 anos, 10-13 anos e 14-17 anos) para garantir que o conteúdo seja adequado e eficaz para cada fase de desenvolvimento." },
  { q: "Com que frequência decorrem as aulas?", a: "As aulas têm frequência semanal, com sessões de 90 minutos. Trabalhamos também com formatos intensivos aos fins de semana para famílias com horários mais exigentes. Contacte-nos para encontrar a melhor opção para o seu filho." },
  { q: "Como é a metodologia da Academia Mori's?", a: "A nossa metodologia é prática e experiencial. Não fazemos aulas tradicionais de carteira e quadro. Usamos dinâmicas de grupo, simulações, jogos de papel, apresentações reais e feedback construtivo. O objetivo é que cada aluno aprenda fazendo." },
  { q: "Que resultados posso esperar para o meu filho?", a: "Os pais notam mudanças logo nas primeiras semanas: mais confiança para falar, melhor gestão de conflitos em casa e na escola, iniciativa, postura e uma visão mais matura do mundo. Os resultados variam consoante o aluno, mas o impacto é sempre real e visível." },
  { q: "Como posso inscrever o meu filho?", a: "O processo é simples. Pode contactar-nos via WhatsApp (938 460 008) ou telefonema. Fazemos uma breve conversa inicial para perceber o perfil do aluno e orientar para o programa mais adequado. Estamos em Luanda, Benfica, Via Expressa." },
  { q: "A Academia tem certificação?", a: "Sim. Os nossos programas são concluídos com certificados de participação e avaliação. Trabalhamos também com as escolas dos alunos para alinhar competências e garantir reconhecimento académico onde possível." },
];

// FAQ slides from RIGHT then stabilizes — final horizontal section before CTA
const slideFromRight = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-30 py-32 bg-[#fafaf9] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header slides from right */}
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={slideFromRight} className="flex items-center justify-center gap-2 mb-4">
            <span className="w-10 h-px bg-orange-600" />
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Perguntas Frequentes</span>
            <span className="w-10 h-px bg-orange-600" />
          </motion.div>
          <motion.h2 variants={slideFromRight} className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Tudo o que precisa de{" "}
            <span className="text-orange-600 italic font-serif">saber</span>
          </motion.h2>
          <motion.p variants={slideFromRight} className="text-slate-500 mt-4 font-light">
            As dúvidas mais comuns dos pais respondidas com transparência.
          </motion.p>
        </motion.div>

        {/* FAQ items slide from right with stagger */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={slideFromRight}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors group"
              >
                <span className="font-semibold text-slate-900 text-lg leading-snug pr-4">{faq.q}</span>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? "bg-orange-600 border-orange-600 rotate-45" : "border-slate-200 group-hover:border-orange-300"}`}>
                  <Plus className={`w-4 h-4 transition-colors ${open === i ? "text-white" : "text-slate-400"}`} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <div className="h-px bg-slate-100 mb-6" />
                      <p className="text-slate-600 leading-relaxed font-light">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
