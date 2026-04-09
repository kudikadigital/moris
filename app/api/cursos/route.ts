// app/api/cursos/route.ts — API pública de cursos (usada pelo formulário)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: { id: true, title: true, slug: true },
    });
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json({ error: "Erro ao carregar cursos" }, { status: 500 });
  }
}
