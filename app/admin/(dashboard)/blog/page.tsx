import { prisma } from "@/lib/prisma";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar,
  Tag
} from "lucide-react";
import Link from "next/link";

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header da Secção */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Gestão de Conteúdo<span className="text-orange-600">.</span>CMS
          </h1>
          <p className="text-slate-500 text-sm font-light">
            Administra os artigos e notícias da Academia Mori&#39;s.
          </p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20"
        >
          <Plus size={16} /> Criar Novo Artigo
        </Link>
      </header>

      {/* Barra de Ferramentas (Filtros Similares a Cyber Security) */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/40 border border-slate-800 p-4 rounded-3xl backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input 
            placeholder="Procurar artigo por título..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-orange-600 transition-all text-sm text-white placeholder:text-slate-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2">Status:</span>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors">Todos</button>
          <button className="px-4 py-2 text-slate-500 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors">Publicados</button>
          <button className="px-4 py-2 text-slate-500 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors">Rascunhos</button>
        </div>
      </div>

      {/* Tabela de Artigos */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/20">
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Artigo</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Categoria</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Data</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-800/20 transition-colors group">
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                      {post.title}
                    </span>
                    <span className="text-[10px] text-slate-600 mt-1 italic font-light truncate max-w-xs">
                      {post.slug}
                    </span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Tag size={12} className="text-orange-600" /> {post.category}
                  </span>
                </td>
                <td className="p-6">
                  <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    post.published 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : 'bg-orange-600/10 text-orange-500 border-orange-600/20'
                  }`}>
                    {post.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      target="_blank"
                      className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                      title="Visualizar Live"
                    >
                      <Eye size={16} />
                    </Link>
                    <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all" title="Editar">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {posts.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-slate-500 italic text-sm">Nenhum artigo encontrado. Começa por criar o teu primeiro post!</p>
          </div>
        )}
      </div>
    </div>
  );
}