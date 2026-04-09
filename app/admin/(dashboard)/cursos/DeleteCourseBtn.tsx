// app/admin/(dashboard)/cursos/DeleteCourseBtn.tsx
"use client";
import { Trash2 } from "lucide-react";
import { deleteCourse } from "@/lib/actions/courses";

export function DeleteCourseBtn({ id, title }: { id: string; title: string }) {
  async function handleDelete() {
    if (!confirm(`Eliminar o curso "${title}"? Esta acção é irreversível.`)) return;
    await deleteCourse(id);
  }
  return (
    <button
      onClick={handleDelete}
      className="p-2 text-slate-500 hover:text-red-500 transition-colors"
      title="Eliminar"
    >
      <Trash2 size={16} />
    </button>
  );
}
