// app/cursos/page.tsx — CORRIGIDO
// Usa PageHeader (Client Component autónomo) em vez de Header com onOpenModal

import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { CourseGrid } from "@/components/CourseGrid";
import { Mic2, ShieldCheck, BrainCircuit, Palette, Heart, Rocket } from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  Mic2: <Mic2 className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
};

export const metadata = {
  title: "Cursos — Academia Mori's Reforma",
  description: "Descubra todos os programas de formação da Academia Mori's.",
};

export default async function CursosPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const courseCards = courses.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.excerpt,
    image: c.image ?? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    icon: c.icon ? iconMap[c.icon] : undefined,
    tag: c.tag ?? undefined,
    duration: c.duration ?? undefined,
    level: c.ageRange ?? undefined,
    href: `/cursos/${c.slug}`,
  }));

  return (
    <main className="min-h-screen bg-white">
      <PageHeader />

      <section className="pt-32 pb-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
            Formação de Protagonistas
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Todos os Cursos
          </h1>
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
            Programas desenhados para transformar crianças e adolescentes em
            comunicadores confiantes e líderes do futuro.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <CourseGrid courses={courseCards} columns={3} />
          {courseCards.length === 0 && (
            <p className="text-center text-slate-400 py-20">
              Nenhum curso disponível de momento.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
