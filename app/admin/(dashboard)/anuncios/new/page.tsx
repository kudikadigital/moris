// app/admin/(dashboard)/anuncios/new/page.tsx — Criar novo anúncio
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createAd } from "@/lib/actions/ads";

export default function NewAdPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [bgColor, setBgColor] = useState("#ea580c");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const result = await createAd({
      title: form.get("title") as string,
      description: (form.get("description") as string) || null,
      imageUrl: (form.get("imageUrl") as string) || null,
      linkUrl: form.get("linkUrl") as string,
      position: form.get("position") as string,
      bgColor: form.get("bgColor") as string,
      ctaText: (form.get("ctaText") as string) || "Saber Mais",
      active: form.get("active") === "on",
    });

    if (result.success) {
      router.push("/admin/anuncios");
    } else {
      alert("Erro ao guardar o anúncio.");
      setSaving(false);
    }
  }

  const inputCls =
    "w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-orange-600 transition-all placeholder:text-slate-700";
  const labelCls =
    "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block mb-2";

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <header className="flex items-center gap-4">
        <Link href="/admin/anuncios" className="p-2 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Novo Anúncio<span className="text-orange-600">.</span>
          </h1>
          <p className="text-slate-500 text-sm font-light">Cria um novo banner para o website.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Título do Anúncio *</label>
              <input name="title" required placeholder="Ex: Matrículas Abertas 2026" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Posição no site *</label>
              <select name="position" required className={inputCls + " appearance-none cursor-pointer"}>
                <option value="">Seleccionar posição</option>
                <option value="hero-blog">Hero do Blog (topo)</option>
                <option value="sidebar-blog">Sidebar do Blog (lateral)</option>
                <option value="between-posts">Entre Artigos do Blog</option>
                <option value="inline-course">Página de Curso</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Descrição (opcional)</label>
            <textarea
              name="description"
              rows={2}
              placeholder="Texto complementar que aparece no banner"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Link de destino *</label>
              <input name="linkUrl" required placeholder="https://... ou /cursos/..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Texto do botão CTA</label>
              <input name="ctaText" placeholder="Ex: Inscrever Agora" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>URL da Imagem (opcional)</label>
              <input name="imageUrl" type="url" placeholder="https://..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Cor de Fundo</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  name="bgColor"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-slate-800 cursor-pointer bg-transparent"
                />
                <span className="text-sm text-slate-400 font-mono">{bgColor}</span>
              </div>
            </div>
          </div>

          {/* Pré-visualização do banner */}
          <div>
            <label className={labelCls}>Pré-visualização</label>
            <div
              className="p-6 rounded-2xl text-white flex items-center justify-between gap-4"
              style={{ backgroundColor: bgColor }}
            >
              <div>
                <p className="font-bold text-lg">(Título do anúncio)</p>
                <p className="text-white/70 text-sm">(Descrição aqui)</p>
              </div>
              <span className="px-6 py-2 bg-white text-slate-900 font-black rounded-full text-xs whitespace-nowrap">
                CTA
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div>
              <p className="text-sm text-white font-bold">Activo</p>
              <p className="text-xs text-slate-500">O anúncio aparece imediatamente no site</p>
            </div>
            <input type="checkbox" name="active" defaultChecked className="w-5 h-5 accent-orange-600 cursor-pointer" />
          </div>
        </section>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg"
          >
            <Save size={16} /> {saving ? "A guardar..." : "Guardar Anúncio"}
          </button>
          <Link
            href="/admin/anuncios"
            className="flex items-center gap-2 text-slate-500 hover:text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
