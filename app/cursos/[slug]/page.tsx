// app/cursos/[slug]/page.tsx — Página individual de cada curso
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import {
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return {};
  return {
    title: `${course.title} — Academia Mori's Reforma`,
    description: course.excerpt,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course || !course.published) notFound();

  // Outros cursos para "Veja também"
  const related = await prisma.course.findMany({
    where: { published: true, NOT: { slug } },
    take: 3,
    orderBy: { order: "asc" },
    select: { slug: true, title: true, excerpt: true, image: true, ageRange: true },
  });

  const objectives = (course.objectives as string[] | null) ?? [];
  const modules = (course.modules as { heading: string; body: string }[] | null) ?? [];

  return (
    <main className="min-h-screen bg-white">
      <PageHeader />

      {/* ── Hero do Curso ───────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] bg-slate-950 text-white flex items-end pt-32 pb-20 overflow-hidden">
        {course.image && (
          <div className="absolute inset-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-orange-500 transition-colors">Início</Link>
            <ChevronRight size={12} />
            <Link href="/cursos" className="hover:text-orange-500 transition-colors">Cursos</Link>
            <ChevronRight size={12} />
            <span className="text-orange-500">{course.category}</span>
          </nav>

          {course.tag && (
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full mb-4">
              {course.tag}
            </span>
          )}

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            {course.title}
          </h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed mb-8">
            {course.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            {course.duration && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                <span>{course.duration}</span>
              </div>
            )}
            {course.ageRange && (
              <div className="flex items-center gap-2">
                <Users size={16} className="text-orange-500" />
                <span>{course.ageRange}</span>
              </div>
            )}
            {course.category && (
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-orange-500" />
                <span>{course.category}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Corpo do Curso ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Coluna Principal */}
          <div className="lg:col-span-7 space-y-16">

            {/* Descrição */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Sobre o Curso</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{course.description}</p>
            </section>

            {/* Objectivos */}
            {objectives.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">O que vai aprender</h2>
                <ul className="space-y-4">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Metodologia */}
            {course.methodology && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Metodologia</h2>
                <p className="text-slate-600 leading-relaxed">{course.methodology}</p>
              </section>
            )}

            {/* Módulos do Programa */}
            {modules.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Programa</h2>
                <div className="space-y-6">
                  {modules.map((mod, i) => (
                    <div
                      key={i}
                      className="border border-slate-100 rounded-2xl p-6 bg-slate-50"
                    >
                      <h3 className="font-bold text-slate-900 mb-3">{mod.heading}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{mod.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — Formulário de Inscrição */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="mb-6 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-2 block">
                  Inscrições Abertas 2026
                </span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tighter">
                  Inscreva-se Agora
                </h2>
                <p className="text-slate-500 font-light mt-2 text-sm">
                  Preencha os dados e a nossa equipa entrará em contacto.
                </p>
              </div>
              {/* Passa o curso pré-selecionado ao formulário */}
              <EnrollmentForm preselectedCourse={course.title} />
            </div>
          </aside>
        </div>

        {/* ── Outros Cursos ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-24 pt-16 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">Veja também</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/cursos/${r.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-slate-100 hover:border-orange-200 transition-colors"
                >
                  {r.image && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-widest mb-1">
                      {r.ageRange}
                    </p>
                    <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
