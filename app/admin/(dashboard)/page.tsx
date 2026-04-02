import { prisma } from "@/lib/prisma";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  // Busca de dados em paralelo para performance
  const [totalLeads, totalPosts, recentLeads, newLeadsToday] = await Promise.all([
    prisma.lead.count(),
    prisma.post.count(),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    })
  ]);

  const stats = [
    { label: "Total de Leads", value: totalLeads, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Leads de Hoje", value: newLeadsToday, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Artigos no Blog", value: totalPosts, icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Taxa de Conversão", value: "12%", icon: ArrowUpRight, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="p-8 space-y-10">
      {/* Header Contextual */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Dashboard<span className="text-orange-600">.</span>Principal
          </h1>
          <p className="text-slate-500 text-sm font-light">Bem-vindo ao centro de gestão da Academia Mori&#39;s.</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20 text-center"
        >
          Novo Artigo +
        </Link>
      </header>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Live</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Leads Recentes (O seu CRM rápido) */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-orange-600" /> Últimos Leads (Luanda)
            </h3>
            <Link href="/admin/leads" className="text-[10px] font-black text-slate-500 hover:text-orange-600 uppercase tracking-widest transition-colors">Ver Todos</Link>
          </div>
          <div className="divide-y divide-slate-800">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-orange-600 font-bold text-xs">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{lead.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{lead.phone} • {lead.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    lead.status === 'Novo' ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {lead.status}
                  </span>
                  <button className="p-2 text-slate-500 hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status do Sistema / Blog */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={18} className="text-orange-600" /> Estado do Blog
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-widest">Base de Dados</p>
                <p className="text-xs text-slate-500 mt-1 italic">Conectado ao PostgreSQL via Prisma.</p>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-800">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Dica Mori&#39;s</p>
              <div className="p-4 bg-orange-600/5 border border-orange-600/10 rounded-2xl">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  &#34;O blog é a sua melhor ferramenta de SEO em Angola. Publicar 1 artigo por semana aumenta a autoridade da Academia no Google.&#34;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}