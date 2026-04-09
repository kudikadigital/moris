// app/admin/(dashboard)/anuncios/DeleteAdBtn.tsx
"use client";
import { Trash2 } from "lucide-react";
import { deleteAd } from "@/lib/actions/ads";

export function DeleteAdBtn({ id, title }: { id: string; title: string }) {
  async function handleDelete() {
    if (!confirm(`Eliminar o anúncio "${title}"?`)) return;
    await deleteAd(id);
  }
  return (
    <button
      onClick={handleDelete}
      className="p-2 text-slate-500 hover:text-red-500 transition-colors"
    >
      <Trash2 size={15} />
    </button>
  );
}
