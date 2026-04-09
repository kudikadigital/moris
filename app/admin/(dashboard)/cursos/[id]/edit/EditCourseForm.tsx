// app/admin/(dashboard)/cursos/[id]/edit/EditCourseForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  image: string | null;
  icon: string | null;
  tag: string | null;
  duration: string | null;
  ageRange: string | null;
  category: string;
  methodology: string | null;
  order: number;
  published: boolean;
  featured: boolean;
  objectives: unknown;
  modules: unknown;
}

export function EditCourseForm({ course }: { course: Course }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [objectives, setObjectives] = useState<string[]>(
    Array.isArray(course.objectives) ? (course.objectives as string[]) : [""]
  );
  const [modules, setModules] = useState<{ heading: string; body: string }[]>(
    Array.isArray(course.modules)
      ? (course.modules as { heading: string; body: string }[])
      : [{ heading: "", body: "" }]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/cursos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: course.id,
        title: form.get("title"),
        slug: form.get("slug"),
        excerpt: form.get("excerpt"),
        description: form.get("description"),
        image: form.get("image") || null,
        icon: form.get("icon") || null,
        tag: form.get("tag") || null,
        duration: form.get("duration") || null,
        ageRange: form.get("ageRange") || null,
        category: form.get("category"),
        methodology: form.get("methodology") || null,
        order: Number(form.get("order") ?? 0),
        published: form.get("published") === "on",
        featured: form.get("featured") === "on",
        objectives: objectives.filter(Boolean),
        modules: modules.filter((m) => m.heading || m.body),
      }),
    });

    if (res.ok) {
      router.push("/admin/cursos");
      router.refresh();
    } else {
      alert("Erro ao actualizar o curso.");
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
            Editar Curso<span className="text-orange-600">.</span>
          </h1>
          <p className="text-slate-500 text-sm font-light">{course.title}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Informações Básicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Título *</label>
              <input name="title" required defaultValue={course.title} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input name="slug" required defaultValue={course.slug} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Categoria *</label>
              <select name="category" required defaultValue={course.category} className={inputCls + " appearance-none cursor-pointer"}>
                <option value="Oratória">Oratória</option>
                <option value="Liderança">Liderança</option>
                <option value="Família">Família</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Etiqueta">Etiqueta</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Etiqueta (tag)</label>
              <input name="tag" defaultValue={course.tag ?? ""} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Duração</label>
              <input name="duration" defaultValue={course.duration ?? ""} placeholder="Ex: 6 semanas" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Faixa Etária</label>
              <input name="ageRange" defaultValue={course.ageRange ?? ""} placeholder="Ex: 8–17 anos" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ícone (Lucide)</label>
              <input name="icon" defaultValue={course.icon ?? ""} placeholder="Ex: Mic2, ShieldCheck" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ordem</label>
              <input name="order" type="number" defaultValue={course.order} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>URL da Imagem</label>
            <input name="image" type="url" defaultValue={course.image ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Resumo (Excerpt) *</label>
            <textarea name="excerpt" required rows={2} defaultValue={course.excerpt} className={inputCls + " resize-none"} />
          </div>
          <div>
            <label className={labelCls}>Descrição Completa *</label>
            <textarea name="description" required rows={5} defaultValue={course.description} className={inputCls + " resize-none"} />
          </div>
          <div>
            <label className={labelCls}>Metodologia</label>
            <textarea name="methodology" rows={3} defaultValue={course.methodology ?? ""} className={inputCls + " resize-none"} />
          </div>
        </section>

        {/* Objectivos */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-4">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Objectivos
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
              <button type="button" onClick={() => setObjectives(objectives.filter((_, j) => j !== i))} className="p-3 text-slate-600 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setObjectives([...objectives, ""])} className="flex items-center gap-2 text-orange-500 text-xs font-bold hover:text-orange-400 transition-colors">
            <Plus size={14} /> Adicionar objectivo
          </button>
        </section>

        {/* Módulos */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">
            Módulos
          </h2>
          {modules.map((mod, i) => (
            <div key={i} className="space-y-3 p-5 bg-slate-950/50 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-orange-600 font-black uppercase tracking-widest">Módulo {i + 1}</span>
                <button type="button" onClick={() => setModules(modules.filter((_, j) => j !== i))} className="text-slate-600 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <input value={mod.heading} onChange={(e) => { const next = [...modules]; next[i] = { ...next[i], heading: e.target.value }; setModules(next); }} placeholder="Título do módulo" className={inputCls} />
              <textarea value={mod.body} onChange={(e) => { const next = [...modules]; next[i] = { ...next[i], body: e.target.value }; setModules(next); }} placeholder="Descrição" rows={3} className={inputCls + " resize-none"} />
            </div>
          ))}
          <button type="button" onClick={() => setModules([...modules, { heading: "", body: "" }])} className="flex items-center gap-2 text-orange-500 text-xs font-bold hover:text-orange-400 transition-colors">
            <Plus size={14} /> Adicionar módulo
          </button>
        </section>

        {/* Publicação */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-4">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-4">Publicação</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white font-bold">Publicado</p>
              <p className="text-xs text-slate-500">Visível no site público</p>
            </div>
            <input type="checkbox" name="published" defaultChecked={course.published} className="w-5 h-5 accent-orange-600 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white font-bold">Destaque</p>
              <p className="text-xs text-slate-500">Aparece na homepage</p>
            </div>
            <input type="checkbox" name="featured" defaultChecked={course.featured} className="w-5 h-5 accent-orange-600 cursor-pointer" />
          </div>
        </section>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg">
            <Save size={16} /> {saving ? "A guardar..." : "Guardar Alterações"}
          </button>
          <Link href="/admin/cursos" className="flex items-center gap-2 text-slate-500 hover:text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
