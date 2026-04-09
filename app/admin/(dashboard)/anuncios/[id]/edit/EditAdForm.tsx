// app/admin/(dashboard)/anuncios/[id]/edit/EditAdForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Ad {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string;
  position: string;
  bgColor: string | null;
  ctaText: string | null;
  active: boolean;
}

export function EditAdForm({ ad }: { ad: Ad }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [bgColor, setBgColor] = useState(ad.bgColor ?? "#ea580c");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/ads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: ad.id,
        title: form.get("title"),
        description: form.get("description") || null,
        imageUrl: form.get("imageUrl") || null,
        linkUrl: form.get("linkUrl"),
        position: form.get("position"),
        bgColor: form.get("bgColor"),
        ctaText: form.get("ctaText") || "Saber Mais",
        active: form.get("active") === "on",
      }),
    });

    if (res.ok) {
      router.push("/admin/anuncios");
      router.refresh();
    } else {
      alert("Erro ao actualizar o anúncio.");
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
            Editar Anúncio<span className="text-orange-600">.</span>
          </h1>
          <p className="text-slate-500 text-sm font-light">{ad.title}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Título *</label>
              <input name="title" required defaultValue={ad.title} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Posição *</label>
              <select name="position" required defaultValue={ad.position} className={inputCls + " appearance-none cursor-pointer"}>
                <option value="hero-blog">Hero do Blog</option>
                <option value="sidebar-blog">Sidebar do Blog</option>
                <option value="between-posts">Entre Artigos</option>
                <option value="inline-course">Página de Curso</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Descrição</label>
            <textarea name="description" rows={2} defaultValue={ad.description ?? ""} className={inputCls + " resize-none"} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Link de destino *</label>
              <input name="linkUrl" required defaultValue={ad.linkUrl} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Texto CTA</label>
              <input name="ctaText" defaultValue={ad.ctaText ?? "Saber Mais"} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>URL da Imagem</label>
              <input name="imageUrl" type="url" defaultValue={ad.imageUrl ?? ""} className={inputCls} />
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

          <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div>
              <p className="text-sm text-white font-bold">Activo</p>
              <p className="text-xs text-slate-500">Visível no site público</p>
            </div>
            <input type="checkbox" name="active" defaultChecked={ad.active} className="w-5 h-5 accent-orange-600 cursor-pointer" />
          </div>
        </section>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all"
          >
            <Save size={16} /> {saving ? "A guardar..." : "Guardar Alterações"}
          </button>
          <Link href="/admin/anuncios" className="flex items-center gap-2 text-slate-500 hover:text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
