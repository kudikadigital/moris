"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { redirect } from "next/navigation";
import { ActionState } from "./blog";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "mori-secret-key-2026");

export async function loginAdmin(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Procura o admin pelo email exato do banco
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return { message: "Credenciais inválidas.", error: true };
    }

    // 2. Compara a password plana com o hash do DB
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return { message: "Credenciais inválidas.", error: true };
    }

    // 3. Gerar Token JWT
    const token = await new SignJWT({ id: admin.id, email: admin.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET_KEY);

    // 4. Salvar Cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7200,
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return { message: "Erro de conexão com o servidor.", error: true };
  }

  // Redirecionar fora do try/catch para evitar erros internos do Next.js
  redirect("/admin");
}