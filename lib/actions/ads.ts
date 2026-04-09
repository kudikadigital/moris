// lib/actions/ads.ts — Server Actions para Anúncios
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface AdInput {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  linkUrl: string;
  position: string;
  bgColor?: string;
  ctaText?: string;
  active?: boolean;
}

export async function createAd(data: AdInput) {
  try {
    await prisma.ad.create({ data });
    revalidatePath("/admin/anuncios");
    revalidatePath("/blog");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}

export async function deleteAd(id: string) {
  try {
    await prisma.ad.delete({ where: { id } });
    revalidatePath("/admin/anuncios");
    revalidatePath("/blog");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}

export async function toggleAd(id: string, active: boolean) {
  try {
    await prisma.ad.update({ where: { id }, data: { active } });
    revalidatePath("/admin/anuncios");
    revalidatePath("/blog");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
