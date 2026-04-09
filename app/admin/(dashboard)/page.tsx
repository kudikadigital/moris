// app/admin/(dashboard)/page.tsx — VERSÃO ACTUALIZADA
// Adiciona estatísticas de cursos e anúncios ao dashboard

import { prisma } from "@/lib/prisma";
import {
  Users,
  FileText,
  TrendingUp,
  Clock,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Megaphone,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [totalLeads, totalPosts, totalCourses, totalAds, recentLeads, newLeadsToday] =
    await Promise.all([
      prisma.lead.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.course.count({ where: { published: true } }),
      prisma.ad.count({ where: { active: true } }),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.lead.count({
        where: {
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
    ]);

  const stats = [
    { label: "Total de Leads", value: totalLeads, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Leads Hoje", value: newLeadsToday, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Artigos Publicados", value: totalPosts, icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Cursos Activos", value: totalCourses, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Anúncios Activos", value: totalAds, icon: Megaphone, color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <div className="p-8 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Dashboard<span className="text-orange-600">.</span>Principal
          </h1>
          <p className="text-slate-500 text-sm font-light">
            Bem-vindo ao centro de gestão da Academia Mori&apos;s.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/cursos/new"
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
          >
            Novo Curso
          </Link>
          <Link
            href="/admin/blog/new"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20"
          >
            Novo Artigo +
          </Link>
        </div>
      </header>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900/40 border border-slate-800 p-5 rounded-[2rem] backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Live</span>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h3 className="text-3xl font-black text-white italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads Recentes */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-orange-600" /> Últimas Inscrições
            </h3>
            <Link
              href="/admin/leads"
              className="text-[10px] font-black text-slate-500 hover:text-orange-600 uppercase tracking-widest transition-colors"
            >
              Ver Todos
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentLeads.length === 0 && (
              <p className="p-8 text-slate-600 italic text-sm text-center">
                Nenhuma inscrição ainda.
              </p>
            )}
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-orange-600 font-bold text-xs">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{lead.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
                      {lead.phone} • {lead.source}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      lead.status === "Novo"
                        ? "bg-orange-600/10 text-orange-500 border border-orange-600/20"
                        : lead.status === "Matriculado"
                        ? "bg-emerald-600/10 text-emerald-500 border border-emerald-600/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atalhos rápidos */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-4">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={18} className="text-orange-600" /> Acesso Rápido
          </h3>

          {[
            { label: "Gerir Cursos", href: "/admin/cursos", icon: BookOpen, desc: `${totalCourses} activos` },
            { label: "Gerir Anúncios", href: "/admin/anuncios", icon: Megaphone, desc: `${totalAds} activos` },
            { label: "Ver Blog Público", href: "/blog", icon: FileText, desc: "Vozes da Reforma", external: true },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-orange-600/30 hover:bg-slate-800/30 transition-all group"
            >
              <div className="p-2 bg-slate-800 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <item.icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </div>
              <ArrowUpRight size={14} className="text-slate-600 group-hover:text-orange-500 transition-colors" />
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-800">
            <div className="p-4 bg-orange-600/5 border border-orange-600/10 rounded-2xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
                Dica Mori&apos;s
              </p>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                Publique 1 artigo por semana no blog &quot;Vozes da Reforma&quot; para
                aumentar a autoridade no Google Angola.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
