// lib/actions/courses.ts — Server Actions para Cursos
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/admin/cursos");
    revalidatePath("/cursos");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}

export async function toggleCoursePublished(id: string, published: boolean) {
  try {
    await prisma.course.update({ where: { id }, data: { published } });
    revalidatePath("/admin/cursos");
    revalidatePath("/cursos");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
