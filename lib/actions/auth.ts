"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ActionState } from "./blog"; // Reutilizando o tipo que criamos

export async function loginAdmin(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const admin = await prisma.admin.findUnique({
    where: { email }
  });

  // Validação simples (Substitua por bcrypt.compare em prod)
  if (!admin || admin.password !== password) {
    return { message: "Credenciais inválidas.", error: true };
  }

  // Aqui você configuraria o Cookie de Sessão ou JWT
  redirect("/admin/dashboard");
}