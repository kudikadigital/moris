// app/api/admin/ads/route.ts — CRUD de Anúncios (protegido)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "moris-secret-key-change-in-production"
);

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const ads = await prisma.ad.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(ads);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const ad = await prisma.ad.create({ data: body });
    return NextResponse.json(ad, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao criar anúncio" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const ad = await prisma.ad.update({ where: { id }, data });
    return NextResponse.json(ad);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao actualizar anúncio" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    await prisma.ad.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao eliminar anúncio" }, { status: 500 });
  }
}
