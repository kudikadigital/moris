// components/Featured.tsx — VERSÃO CORRIGIDA
// Client Component puro: recebe os cursos como props (não acede à DB).
// A DB é acedida pelo FeaturedServer (Server Component).

"use client";

import { motion } from "framer-motion";
import { Mic2, ShieldCheck, BrainCircuit, Rocket, Palette, Heart, BookOpen } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { CourseGrid } from "./CourseGrid";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  Mic2: <Mic2 className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
};

export interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
  tag?: string;
  duration?: string;
  level?: string;
  href: string;
}

interface FeaturedProps {
  courses: FeaturedCourse[];
}

export function Featured({ courses }: FeaturedProps) {
  const courseCards = courses.map((c) => ({
    ...c,
    icon: c.icon ? iconMap[c.icon] : undefined,
  }));

  return (
    <section
      id="cursos"
      className="sticky top-0 z-20 min-h-screen bg-slate-950 text-white overflow-hidden py-24"
    >
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
          <div className="flex flex-col items-start md:items-end gap-3">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 max-w-sm text-sm leading-relaxed"
            >
              No mundo actual, saber o básico não chega. O diferencial está na
              capacidade de comunicar e liderar.
            </motion.p>
            <a
              href="/cursos"
              className="text-orange-500 text-xs font-black uppercase tracking-widest hover:text-orange-400 transition-colors"
            >
              Ver todos os cursos →
            </a>
          </div>
        </div>

        {/* Grid */}
        <CourseGrid courses={courseCards} columns={3} />
      </div>
    </section>
  );
}
