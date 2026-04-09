// app/admin/(dashboard)/blog/new/page.tsx — VERSÃO ACTUALIZADA
// Adiciona: campos de autor (authorName, authorRole, authorImage) ao formulário
// O artigo é guardado na DB com slug gerado automaticamente

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Save, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { createPost } from "@/lib/actions/blog";

type BlogState = {
  message: string;
  error: boolean;
  success?: boolean;
};

const initialState: BlogState = { message: "", error: false };

// Gera slug a partir do título
function toSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPost, initialState);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  if (state.success) {
    router.push("/admin/blog");
  }

  const inputCls =
    "w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-orange-600 transition-all placeholder:text-slate-700";
  const labelCls =
    "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block mb-2";

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <header className="flex items-center gap-4">
        <Link href="/admin/blog" className="p-2 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Novo Artigo<span className="text-orange-600">.</span>
          </h1>
          <p className="text-slate-500 text-sm font-light">Cria um novo artigo para Vozes da Reforma.</p>
        </div>
      </header>

      <form action={formAction} className="space-y-8">
        {/* Informações do Artigo */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Conteúdo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelCls}>Título do Artigo *</label>
              <input
                name="title"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(toSlug(e.target.value));
                }}
                placeholder="Ex: Como a Oratória transforma a confiança do seu filho"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Slug (URL gerado automaticamente)</label>
              <input
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="ex: como-a-oratoria-transforma"
                className={inputCls + " font-mono text-orange-400"}
              />
            </div>

            <div>
              <label className={labelCls}>Categoria *</label>
              <select name="category" required className={inputCls + " appearance-none cursor-pointer"}>
                <option value="">Seleccionar</option>
                <option value="Educação">Educação</option>
                <option value="Liderança">Liderança</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Oratória">Oratória</option>
                <option value="Família">Família</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>URL da Imagem de Capa</label>
            <input
              name="image"
              type="url"
              placeholder="https://images.unsplash.com/..."
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Resumo (Excerpt) *</label>
            <textarea
              name="excerpt"
              required
              rows={2}
              placeholder="Frase de introdução que aparece na listagem do blog"
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className={labelCls}>Conteúdo Completo *</label>
            <textarea
              name="content"
              required
              rows={14}
              placeholder="Escreva o artigo completo aqui. Use parágrafos separados por linha em branco."
              className={inputCls + " resize-none font-light leading-relaxed"}
            />
            <p className="text-[10px] text-slate-600 mt-2 ml-1">
              Separe os parágrafos com uma linha em branco. O sistema formata automaticamente.
            </p>
          </div>
        </section>

        {/* Colunista / Autor */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <User size={16} className="text-orange-600" />
            <h2 className="text-white font-bold text-sm uppercase tracking-widest">
              Colunista / Autor
            </h2>
            <span className="text-[10px] text-slate-600 font-bold">(opcional)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelCls}>Nome do Autor</label>
              <input
                name="authorName"
                placeholder="Ex: Clémos Epalanga"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Cargo / Role</label>
              <input
                name="authorRole"
                placeholder="Ex: Director Pedagógico"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Foto do Autor (URL)</label>
              <input
                name="authorImage"
                type="url"
                placeholder="https://..."
                className={inputCls}
              />
            </div>
          </div>
        </section>

        {/* Publicação */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-4">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Publicação
          </h2>
          <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div>
              <p className="text-sm text-white font-bold">Publicar imediatamente</p>
              <p className="text-xs text-slate-500">Se desactivado, fica como rascunho</p>
            </div>
            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="w-5 h-5 accent-orange-600 cursor-pointer"
            />
          </div>
        </section>

        {state.error && (
          <p className="text-red-500 text-xs font-bold italic ml-4">{state.message}</p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg"
          >
            <Save size={16} /> {isPending ? "A publicar..." : "Publicar Artigo"}
          </button>
          <Link
            href="/admin/blog"
            className="flex items-center gap-2 text-slate-500 hover:text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
