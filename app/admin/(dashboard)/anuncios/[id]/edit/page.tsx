// app/admin/(dashboard)/anuncios/[id]/edit/page.tsx — Editar anúncio
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditAdForm } from "./EditAdForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditAdPage({ params }: Props) {
  const { id } = await params;
  const ad = await prisma.ad.findUnique({ where: { id } });
  if (!ad) notFound();

  return <EditAdForm ad={ad} />;
}
