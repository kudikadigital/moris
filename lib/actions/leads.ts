"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type LeadState = {
  message: string;
  error: boolean;
  success?: boolean;
};

export async function registerLead(prevState: LeadState, formData: FormData): Promise<LeadState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const course = formData.get("course") as string; // Ex: Oratória, Liderança
  const message = formData.get("message") as string;

  if (!name || !email || !phone) {
    return { message: "Por favor, preencha todos os campos obrigatórios.", error: true };
  }

  try {
    await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        source: `Inscrição: ${course}`,
        message,
        status: "Novo",
      },
    });

    revalidatePath("/admin/leads");
    return { 
      message: "Inscrição enviada com sucesso! Entraremos em contacto em breve.", 
      error: false, 
      success: true 
    };
  } catch (e) {
    console.error(e);
    return { message: "Ocorreu um erro ao processar a sua inscrição. Tente novamente.", error: true };
  }
}