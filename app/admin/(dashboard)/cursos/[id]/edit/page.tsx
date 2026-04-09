// app/admin/(dashboard)/cursos/[id]/edit/page.tsx — Editar Curso
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditCourseForm } from "./EditCourseForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) notFound();

  return <EditCourseForm course={course} />;
}
