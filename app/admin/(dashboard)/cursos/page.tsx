// app/admin/(dashboard)/cursos/page.tsx — Gestão de Cursos no Admin
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Eye, Edit3, BookOpen, Users, Star } from "lucide-react";
import { DeleteCourseBtn } from "./DeleteCourseBtn";

export default async function AdminCursosPage() {
  const courses = await prisma.course.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Gestão de Cursos<span className="text-orange-600">.</span>CMS
          </h1>
          <p className="text-slate-500 text-sm font-light mt-1">
            Administra os programas de formação da Academia Mori&apos;s.
          </p>
        </div>
        <Link
          href="/admin/cursos/new"
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20"
        >
          <Plus size={16} /> Criar Novo Curso
        </Link>
      </header>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
          <p className="text-3xl font-black text-white italic">{courses.length}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Total</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
          <p className="text-3xl font-black text-orange-500 italic">
            {courses.filter((c) => c.featured).length}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Destaque</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
          <p className="text-3xl font-black text-emerald-500 italic">
            {courses.filter((c) => c.published).length}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Publicados</p>
        </div>
      </div>

      {/* Tabela de Cursos */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/20">
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Curso</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Categoria</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Faixa Etária</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Estado</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-800/20 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-500">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors">
                        {course.title}
                      </p>
                      <p className="text-[10px] text-slate-500 font-light truncate max-w-xs">
                        /cursos/{course.slug}
                      </p>
                    </div>
                    {course.featured && (
                      <Star size={14} className="text-orange-500 fill-orange-500 ml-1" />
                    )}
                  </div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {course.category}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Users size={12} />
                    <span>{course.ageRange ?? "—"}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      course.published
                        ? "bg-emerald-600/10 text-emerald-500 border border-emerald-600/20"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {course.published ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/cursos/${course.slug}`}
                      target="_blank"
                      className="p-2 text-slate-500 hover:text-white transition-colors"
                      title="Ver no site"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/admin/cursos/${course.id}/edit`}
                      className="p-2 text-slate-500 hover:text-orange-500 transition-colors"
                      title="Editar"
                    >
                      <Edit3 size={16} />
                    </Link>
                    <DeleteCourseBtn id={course.id} title={course.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="p-20 text-center text-slate-600 italic">
            Nenhum curso criado ainda.{" "}
            <Link href="/admin/cursos/new" className="text-orange-500 hover:underline">
              Criar o primeiro curso.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
