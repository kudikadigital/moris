"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Type, FileText, Tag } from "lucide-react";
import Link from "next/link";
import { ActionState, createPost } from "@/lib/actions/blog";

const initialState: ActionState = {
  message: "",
  error: false,
};

export default function NewPostPage() {
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header de Navegação */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/admin/blog" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Voltar ao Blog
          </Link>
          <div className="h-px flex-1 bg-slate-900 mx-8" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Editor Mori&#39;s</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl"
        >
          <form action={formAction} className="space-y-8">
            
            {/* Feedback de Estado */}
            {state.message && (
              <div className={`p-4 rounded-2xl text-sm font-bold border ${state.error ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                {state.message}
              </div>
            )}

            {/* Título */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">
                <Type size={12} className="text-orange-600" /> Título do Artigo
              </label>
              <input 
                name="title"
                required
                placeholder="Ex: A Arte de Falar em Público no Benfica"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 transition-all text-xl font-bold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Categoria */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">
                  <Tag size={12} className="text-orange-600" /> Categoria
                </label>
                <select name="category" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 appearance-none cursor-pointer font-bold">
                  <option value="Educação">Educação</option>
                  <option value="Liderança">Liderança</option>
                  <option value="Comportamental">Comportamental</option>
                </select>
              </div>

              {/* Status de Publicação */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">
                  <FileText size={12} className="text-orange-600" /> Visibilidade
                </label>
                <select name="published" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 appearance-none cursor-pointer font-bold">
                  <option value="false">Rascunho (Privado)</option>
                  <option value="true">Publicar Agora</option>
                </select>
              </div>
            </div>

            {/* Resumo */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Breve Resumo (Excerpt)</label>
              <textarea 
                name="excerpt"
                rows={2}
                placeholder="Uma pequena introdução para atrair o leitor..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 resize-none italic font-light"
              />
            </div>

            {/* Conteúdo Principal */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Corpo do Artigo (Markdown)</label>
              <textarea 
                name="content"
                required
                rows={12}
                placeholder="Escreva aqui o seu pensamento..."
                className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-6 py-6 outline-none focus:border-orange-600 font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Botão de Submissão */}
            <button 
              type="submit"
              disabled={isPending}
              className="group w-full py-5 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black rounded-full transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-600/10 active:scale-95"
            >
              {isPending ? (
                <span className="animate-pulse lowercase tracking-widest">A processar em Luanda...</span>
              ) : (
                <>
                  <Save size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>FINALIZAR E PUBLICAR</span>
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </main>
  );
}