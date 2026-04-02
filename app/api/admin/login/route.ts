import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "mori-secret-key-2026");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const admin = await prisma.admin.findUnique({ where: { email } });
    
    // Compara a password digitada com o hash do banco
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const token = await new SignJWT({ id: admin.id, email: admin.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7200, // 2 horas
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro no servidor." }, { status: 500 });
  }
}