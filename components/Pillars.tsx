"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Users, 
  Sparkles, 
  TrendingUp, 
  HeartPulse 
} from "lucide-react";

export function Pillars() {
  const pillars = [
    {
      title: "Comunicação e Oratória",
      description: "A arte de expressar ideias com fluidez, clareza e convicção para encantar audiências.",
      icon: <MessageSquare className="w-6 h-6" />,
      tag: "Domínio da Expressão"
    },
    {
      title: "Liderança e Ética",
      description: "Desenvolvimento de carisma, responsabilidade e gestão de equipas para os grandes gestores de amanhã.",
      icon: <Users className="w-6 h-6" />,
      tag: "Protagonismo"
    },
    {
      title: "Etiqueta e Postura",
      description: "Normas de convivência, boas maneiras e protocolo social que abrem portas no mundo pessoal e profissional.",
      icon: <Sparkles className="w-6 h-6" />,
      tag: "Educação Comportamental"
    },
    {
      title: "Empreendedorismo Kids",
      description: "Despertar a proactividade, visão estratégica, noções de valor e criatividade financeira desde cedo.",
      icon: <TrendingUp className="w-6 h-6" />,
      tag: "Mentalidade Empreendedora"
    },
    {
      title: "Inteligência Emocional",
      description: "Autoconhecimento, empatia e ferramentas para a gestão de sentimentos e resolução de conflitos.",
      icon: <HeartPulse className="w-6 h-6" />,
      tag: "Resiliência"
    }
  ];

  return (
    <section id="pilares" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Pilares da Formação
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl"
          >
            Nossa grelha curricular é desenhada especificamente para cada faixa etária, focando no que realmente diferencia um líder.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                {pillar.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-2 block">
                {pillar.tag}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}