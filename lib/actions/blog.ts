// lib/actions/blog.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type BlogState = {
  message: string;
  error: boolean;
  success?: boolean;
};

// Alias para compatibilidade com auth.ts que importa ActionState
export type ActionState = BlogState;

export async function createPost(
  prevState: BlogState,
  formData: FormData
): Promise<BlogState> {
  const title      = formData.get("title")    as string;
  const slug       = formData.get("slug")     as string;
  const content    = formData.get("content")  as string;
  const excerpt    = formData.get("excerpt")  as string;
  const category   = formData.get("category") as string;
  const image      = (formData.get("image")       as string) || null;
  const published  = formData.get("published") === "on";
  const authorName = (formData.get("authorName")  as string) || null;
  const authorRole = (formData.get("authorRole")  as string) || null;
  const authorImage= (formData.get("authorImage") as string) || null;

  if (!title || !slug || !content || !excerpt || !category) {
    return { message: "Preencha todos os campos obrigatórios.", error: true };
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return { message: `O slug "${slug}" já está em uso. Escolha outro.`, error: true };
  }

  try {
    await prisma.post.create({
      data: { title, slug, content, excerpt, category, image, published, authorName, authorRole, authorImage },
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { message: "Artigo publicado com sucesso!", error: false, success: true };
  } catch (e) {
    console.error(e);
    return { message: "Erro ao publicar o artigo. Tente novamente.", error: true };
  }
}

export async function updatePost(
  id: string,
  data: {
    title?: string; slug?: string; content?: string; excerpt?: string;
    category?: string; image?: string | null; published?: boolean;
    authorName?: string | null; authorRole?: string | null; authorImage?: string | null;
  }
): Promise<BlogState> {
  try {
    await prisma.post.update({ where: { id }, data });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { message: "Artigo actualizado.", error: false, success: true };
  } catch (e) {
    console.error(e);
    return { message: "Erro ao actualizar o artigo.", error: true };
  }
}

export async function deletePost(id: string): Promise<BlogState> {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { message: "Artigo eliminado.", error: false, success: true };
  } catch (e) {
    console.error(e);
    return { message: "Erro ao eliminar o artigo.", error: true };
  }
}

export async function togglePublished(id: string, published: boolean): Promise<BlogState> {
  try {
    await prisma.post.update({ where: { id }, data: { published } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { message: "Estado actualizado.", error: false, success: true };
  } catch (e) {
    console.error(e);
    return { message: "Erro ao actualizar o estado.", error: true };
  }
}
