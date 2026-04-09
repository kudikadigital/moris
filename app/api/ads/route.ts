// app/api/ads/route.ts — API pública de anúncios por posição
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position");

  try {
    const now = new Date();
    const ads = await prisma.ad.findMany({
      where: {
        active: true,
        ...(position ? { position } : {}),
        OR: [
          { startDate: null },
          { startDate: { lte: now } },
        ],
        AND: [
          {
            OR: [
              { endDate: null },
              { endDate: { gte: now } },
            ],
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(ads);
  } catch {
    return NextResponse.json({ error: "Erro ao carregar anúncios" }, { status: 500 });
  }
}
