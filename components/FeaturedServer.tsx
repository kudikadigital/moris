// components/FeaturedServer.tsx — COM TIMEOUT GUARD
// Neon tem cold starts. Se a DB demorar mais de 5s, usa os dados estáticos
// e não bloqueia a página.

import { Featured } from "./Featured";

const FALLBACK_COURSES = [
  {
    id: "1",
    title: "Oratória e Retórica Infantil",
    description: "Perca o medo de falar e encante audiências com domínio da expressão clara.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    icon: "Mic2" as const,
    tag: "Mais Procurado",
    duration: "6 semanas",
    level: "8–17 anos",
    href: "/cursos/oratoria-retorica-infantil",
  },
  {
    id: "2",
    title: "Programa Líderes do Futuro",
    description: "Liderança, Orientação Vocacional e Etiqueta para adolescentes.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    icon: "ShieldCheck" as const,
    tag: "Adolescentes",
    duration: "10 semanas",
    level: "13–18 anos",
    href: "/cursos/lideres-do-futuro",
  },
  {
    id: "3",
    title: "Conexão Pais e Filhos",
    description: "Comunicação familiar e liderança das relações para famílias modernas.",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800",
    icon: "Heart" as const,
    tag: "Família",
    duration: "8 semanas",
    level: "Pais e filhos",
    href: "/cursos/conexao-pais-filhos",
  },
  {
    id: "4",
    title: "Inteligência Emocional",
    description: "Autocontrolo e ferramentas de gestão de sentimentos para vencer desafios.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    icon: "BrainCircuit" as const,
    tag: "Resiliência",
    duration: "8 semanas",
    level: "Todas as idades",
    href: "/cursos/inteligencia-emocional",
  },
  {
    id: "5",
    title: "Etiqueta e Postura",
    description: "Elegância e comportamento social que abrem portas em qualquer lugar.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    icon: "Palette" as const,
    tag: "Comportamental",
    duration: "4 semanas",
    level: "Todas as idades",
    href: "/cursos/etiqueta-postura",
  },
];

async function fetchCoursesWithTimeout() {
  try {
    // Import dinâmico evita que o prisma seja analisado no bundle do cliente
    const { prisma } = await import("@/lib/prisma");

    // Race: DB vs timeout de 5 segundos
    const dbPromise = prisma.course.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
      take: 6,
      select: {
        id: true,
        title: true,
        excerpt: true,
        image: true,
        icon: true,
        tag: true,
        duration: true,
        ageRange: true,
        slug: true,
      },
    });

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 5000)
    );

    const result = await Promise.race([dbPromise, timeoutPromise]);

    if (!result || result.length === 0) return FALLBACK_COURSES;

    return result.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.excerpt,
      image: c.image ?? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      icon: (c.icon ?? "BookOpen") as string,
      tag: c.tag ?? undefined,
      duration: c.duration ?? undefined,
      level: c.ageRange ?? undefined,
      href: `/cursos/${c.slug}`,
    }));
  } catch (err) {
    console.warn("[FeaturedServer] DB indisponível, usando fallback:", err);
    return FALLBACK_COURSES;
  }
}

export async function FeaturedServer() {
  const courses = await fetchCoursesWithTimeout();
  return <Featured courses={courses} />;
}
