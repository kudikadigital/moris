"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ActionState = {
  message: string;
  error: boolean;
  success?: boolean;
};
export async function createPost(prevState: ActionState, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const published = formData.get("published") === "true";

  // Gerar slug amigável (Ex: "O Guia" -> "o-guia")

  try {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        published,
        // image: logic_for_upload_here
      },
    });
    revalidatePath("/blog");
    return {
      message: "Artigo publicado com sucesso!",
      error: false,
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Erro ao salvar: Verifique se o título é único.",
      error: true,
    };
  }
}
