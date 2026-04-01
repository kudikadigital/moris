"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Sparkles, TrendingUp, HeartPulse } from "lucide-react";

const pillars = [
  { title: "Comunicação e Oratória", description: "A arte de expressar ideias com fluidez, clareza e convicção para encantar audiências.", icon: <MessageSquare className="w-6 h-6" />, tag: "Domínio da Expressão" },
  { title: "Liderança e Ética", description: "Desenvolvimento de carisma, responsabilidade e gestão de equipas para os grandes gestores de amanhã.", icon: <Users className="w-6 h-6" />, tag: "Protagonismo" },
  { title: "Etiqueta e Postura", description: "Normas de convivência, boas maneiras e protocolo social que abrem portas no mundo pessoal e profissional.", icon: <Sparkles className="w-6 h-6" />, tag: "Educação Comportamental" },
  { title: "Empreendedorismo Kids", description: "Despertar a proactividade, visão estratégica, noções de valor e criatividade financeira desde cedo.", icon: <TrendingUp className="w-6 h-6" />, tag: "Mentalidade Empreendedora" },
  { title: "Inteligência Emocional", description: "Autoconhecimento, empatia e ferramentas para a gestão de sentimentos e resolução de conflitos.", icon: <HeartPulse className="w-6 h-6" />, tag: "Resiliência" },
];

export function Pillars() {
  return (
    // Normal vertical — stabilizes after About horizontal slides
    <section id="pilares" className="relative py-32 bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-10 h-px bg-orange-600" />
              <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Excelência Pedagógica</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
            >
              Os Pilares da <br />Nossa Formação
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-sm text-lg font-light leading-relaxed"
          >
            Nossa grelha curricular é desenhada para cada faixa etária, focando no que realmente diferencia um líder.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 shadow-sm mb-8 group-hover:bg-orange-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {pillar.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600/70 mb-3 block">{pillar.tag}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
