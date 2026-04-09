// app/admin/(dashboard)/anuncios/page.tsx — Gestão de Anúncios
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit3, ToggleLeft, ToggleRight } from "lucide-react";
import { DeleteAdBtn } from "./DeleteAdBtn";
import { ToggleAdBtn } from "./ToggleAdBtn";

const positionLabels: Record<string, string> = {
  "hero-blog": "Hero do Blog",
  "sidebar-blog": "Sidebar do Blog",
  "between-posts": "Entre Artigos",
  "inline-course": "Página de Curso",
};

export default async function AdminAnunciosPage() {
  const ads = await prisma.ad.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic">
            Anúncios<span className="text-orange-600">.</span>Gestão
          </h1>
          <p className="text-slate-500 text-sm font-light mt-1">
            Gere os banners e publicidades do website Mori&apos;s.
          </p>
        </div>
        <Link
          href="/admin/anuncios/new"
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20"
        >
          <Plus size={16} /> Novo Anúncio
        </Link>
      </header>

      {/* Por posição */}
      {Object.entries(positionLabels).map(([pos, label]) => {
        const posAds = ads.filter((a) => a.position === pos);
        return (
          <div key={pos} className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{label}</h2>
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[10px] text-slate-600 font-bold">{posAds.length} anúncio(s)</span>
            </div>

            {posAds.length === 0 && (
              <p className="text-slate-700 text-xs italic p-4">
                Nenhum anúncio para esta posição.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex items-start gap-4"
                >
                  {/* Cor preview */}
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: ad.bgColor ?? "#ea580c" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{ad.title}</p>
                    {ad.description && (
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{ad.description}</p>
                    )}
                    <p className="text-[10px] text-slate-600 mt-1 truncate">→ {ad.linkUrl}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <ToggleAdBtn id={ad.id} active={ad.active} />
                    <Link
                      href={`/admin/anuncios/${ad.id}/edit`}
                      className="p-2 text-slate-500 hover:text-orange-500 transition-colors"
                    >
                      <Edit3 size={15} />
                    </Link>
                    <DeleteAdBtn id={ad.id} title={ad.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
