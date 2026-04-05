"use client";

import { motion } from "framer-motion";
import { Mic2, ShieldCheck, BrainCircuit, Rocket, Palette } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { CourseGrid } from "./CourseGrid";

// Mock images - substitua pelas suas URLs reais
const courseImages = {
  oratoria: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
  lideranca: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
  emocional: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800",
  empreendedorismo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
  etiqueta: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
};

const courses = [
  {
    id: 1,
    title: "Oratória e Retórica Infantil",
    description: "Perca o medo de falar e encante audiências com domínio da expressão clara.",
    image: courseImages.oratoria,
    icon: <Mic2 className="w-5 h-5" />,
    tag: "Mais Procurado",
    duration: "6 semanas",
    level: "8-12 anos",
    students: 234,
    href: "/cursos/oratoria-infantil",
  },
  {
    id: 2,
    title: "Liderança e Ética para Adolescente",
    description: "Onde nascem os grandes gestores: foco em carisma e gestão de equipas.",
    image: courseImages.lideranca,
    icon: <ShieldCheck className="w-5 h-5" />,
    tag: "Adolescentes",
    duration: "10 semanas",
    level: "13-17 anos",
    students: 189,
    href: "/cursos/lideranca-etica",
  },
  {
    id: 3,
    title: "Inteligência Emocional",
    description: "Autocontrolo e ferramentas de gestão de sentimentos para vencer desafios.",
    image: courseImages.emocional,
    icon: <BrainCircuit className="w-5 h-5" />,
    tag: "Resiliência",
    duration: "8 semanas",
    level: "Todas idades",
    students: 456,
    href: "/cursos/inteligencia-emocional",
  },
  {
    id: 4,
    title: "Empreendedorismo Kids",
    description: "Da ideia à ação: despertando a proactividade e visão estratégica cedo.",
    image: courseImages.empreendedorismo,
    icon: <Rocket className="w-5 h-5" />,
    tag: "Inovação",
    duration: "12 semanas",
    level: "10-15 anos",
    students: 167,
    href: "/cursos/empreendedorismo-kids",
  },
  {
    id: 5,
    title: "Etiqueta e Postura",
    description: "Elegância e comportamento social que abrem portas em qualquer lugar.",
    image: courseImages.etiqueta,
    icon: <Palette className="w-5 h-5" />,
    tag: "Comportamental",
    duration: "4 semanas",
    level: "Todas idades",
    students: 123,
    href: "/cursos/etiqueta-postura",
  },
];

export function Featured() {
  return (
    <section id="cursos" className="sticky top-0 z-20 min-h-screen bg-slate-950 text-white overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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

        {/* Grid de Cards */}
        <CourseGrid courses={courses} columns={3} />
      </div>
    </section>
  );
}