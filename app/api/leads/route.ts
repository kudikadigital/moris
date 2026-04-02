import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, source, message } = body;

    const lead = await prisma.lead.create({
      data: { name, email, phone, source, message },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar lead" }, { status: 500 });
  }
}