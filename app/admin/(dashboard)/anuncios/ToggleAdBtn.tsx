// app/admin/(dashboard)/anuncios/ToggleAdBtn.tsx
"use client";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { toggleAd } from "@/lib/actions/ads";

export function ToggleAdBtn({ id, active }: { id: string; active: boolean }) {
  return (
    <button
      onClick={() => toggleAd(id, !active)}
      className={`p-2 transition-colors ${active ? "text-emerald-500 hover:text-slate-400" : "text-slate-600 hover:text-emerald-500"}`}
      title={active ? "Desactivar" : "Activar"}
    >
      {active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
    </button>
  );
}
