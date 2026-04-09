// app/admin/(dashboard)/cursos/new/page.tsx — Criar novo curso
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function NewCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [objectives, setObjectives] = useState<string[]>([""]);
  const [modules, setModules] = useState([{ heading: "", body: "" }]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      excerpt: form.get("excerpt"),
      description: form.get("description"),
      image: form.get("image"),
      icon: form.get("icon"),
      tag: form.get("tag"),
      duration: form.get("duration"),
      ageRange: form.get("ageRange"),
      category: form.get("category"),
      methodology: form.get("methodology"),
      order: Number(form.get("order") ?? 0),
      published: form.get("published") === "on",
      featured: form.get("featured") === "on",
      objectives: objectives.filter(Boolean),
      modules: modules.filter((m) => m.heading || m.body),
    };

    const res = await fetch("/api/admin/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/cursos");
    } else {
      alert("Erro ao guardar o curso. Tente novamente.");
      setSaving(false);
    }
  }

  const inputCls =
    "w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-orange-600 transition-all placeholder:text-slate-700";
  const labelCls =
    "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block mb-2";

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <header className="flex items-center gap-4">
        <Link href="/admin/cursos" className="p-2 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Novo Curso<span className="text-orange-600">.</span>
          </h1>
          <p className="text-slate-500 text-sm font-light">Cria um novo programa de formação.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ── Informações Básicas ─────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Informações Básicas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Título do Curso *</label>
              <input name="title" required placeholder="Ex: Oratória e Retórica Infantil" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input name="slug" required placeholder="Ex: oratoria-retorica-infantil" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Categoria *</label>
              <select name="category" required className={inputCls + " appearance-none cursor-pointer"}>
                <option value="">Seleccionar</option>
                <option value="Oratória">Oratória</option>
                <option value="Liderança">Liderança</option>
                <option value="Família">Família</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Etiqueta">Etiqueta</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Etiqueta (tag)</label>
              <input name="tag" placeholder="Ex: Mais Procurado, Novo" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Duração</label>
              <input name="duration" placeholder="Ex: 6 semanas" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Faixa Etária</label>
              <input name="ageRange" placeholder="Ex: 8–17 anos" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ícone (nome Lucide)</label>
              <input name="icon" placeholder="Ex: Mic2, ShieldCheck, Heart" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ordem de Exibição</label>
              <input name="order" type="number" defaultValue={0} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>URL da Imagem de Capa</label>
            <input name="image" type="url" placeholder="https://..." className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Resumo (Excerpt) *</label>
            <textarea
              name="excerpt"
              required
              rows={2}
              placeholder="Frase curta que aparece nos cards e na listagem"
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className={labelCls}>Descrição Completa *</label>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Descrição detalhada do curso para a página individual"
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className={labelCls}>Metodologia</label>
            <textarea
              name="methodology"
              rows={3}
              placeholder="Como o curso é ministrado, ferramentas e abordagem pedagógica"
              className={inputCls + " resize-none"}
            />
          </div>
        </section>

        {/* ── Objectivos ─────────────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-4">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            O que vão aprender (Objectivos)
          </h2>
          {objectives.map((obj, i) => (
            <div key={i} className="flex gap-3">
              <input
                value={obj}
                onChange={(e) => {
                  const next = [...objectives];
                  next[i] = e.target.value;
                  setObjectives(next);
                }}
                placeholder={`Objectivo ${i + 1}`}
                className={inputCls + " flex-1"}
              />
              <button
                type="button"
                onClick={() => setObjectives(objectives.filter((_, j) => j !== i))}
                className="p-3 text-slate-600 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setObjectives([...objectives, ""])}
            className="flex items-center gap-2 text-orange-500 text-xs font-bold hover:text-orange-400 transition-colors"
          >
            <Plus size={14} /> Adicionar objectivo
          </button>
        </section>

        {/* ── Módulos do Programa ─────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Módulos do Programa
          </h2>
          {modules.map((mod, i) => (
            <div key={i} className="space-y-3 p-5 bg-slate-950/50 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-orange-600 font-black uppercase tracking-widest">
                  Módulo {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setModules(modules.filter((_, j) => j !== i))}
                  className="text-slate-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                value={mod.heading}
                onChange={(e) => {
                  const next = [...modules];
                  next[i] = { ...next[i], heading: e.target.value };
                  setModules(next);
                }}
                placeholder="Título do módulo"
                className={inputCls}
              />
              <textarea
                value={mod.body}
                onChange={(e) => {
                  const next = [...modules];
                  next[i] = { ...next[i], body: e.target.value };
                  setModules(next);
                }}
                placeholder="Descrição do módulo"
                rows={3}
                className={inputCls + " resize-none"}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setModules([...modules, { heading: "", body: "" }])}
            className="flex items-center gap-2 text-orange-500 text-xs font-bold hover:text-orange-400 transition-colors"
          >
            <Plus size={14} /> Adicionar módulo
          </button>
        </section>

        {/* ── Publicação ─────────────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-4">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Publicação
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white font-bold">Publicado</p>
              <p className="text-xs text-slate-500">Visível no site público</p>
            </div>
            <input type="checkbox" name="published" defaultChecked className="w-5 h-5 accent-orange-600 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white font-bold">Destaque</p>
              <p className="text-xs text-slate-500">Aparece na secção "Cursos em Destaque" da homepage</p>
            </div>
            <input type="checkbox" name="featured" className="w-5 h-5 accent-orange-600 cursor-pointer" />
          </div>
        </section>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg"
          >
            <Save size={16} /> {saving ? "A guardar..." : "Guardar Curso"}
          </button>
          <Link
            href="/admin/cursos"
            className="flex items-center gap-2 text-slate-500 hover:text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
