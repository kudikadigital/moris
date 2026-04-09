// prisma/seed.ts — Seed com dados reais dos cursos
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

async function main() {
  // ─── Admin ────────────────────────────────────────────────────────────────
  await prisma.admin.upsert({
    where: { email: "geral@morisforma.com" },
    update: {},
    create: {
      name: "Admin Mori's",
      email: "geral@morisforma.com",
      password: await bcrypt.hash("Morisforma12#", 10),
    },
  });

  // ─── Cursos reais (dados dos documentos) ─────────────────────────────────
  const courses = [
    {
      title: "Oratória e Retórica Infantil",
      slug: "oratoria-retorica-infantil",
      excerpt: "Perca o medo de falar e encante audiências com domínio da expressão clara.",
      description:
        'O curso "A Voz do Futuro" é desenhado para transformar a comunicação de crianças e adolescentes numa ferramenta de expressão criativa e liderança. O foco sai do "medo de errar" e entra no "prazer de partilhar ideias". A nossa metodologia é 70% prática e 30% teórica.',
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
      icon: "Mic2",
      tag: "Mais Procurado",
      duration: "6 semanas",
      ageRange: "8–17 anos",
      category: "Oratória",
      order: 1,
      featured: true,
      objectives: [
        "Vencer a timidez: desenvolver segurança emocional para falar em público",
        "Estruturação de pensamento: organizar ideias com início, meio e fim",
        "Expressão Corporal e Vocal: dominar o uso da voz, gestos e contacto visual",
        "Escuta activa: aprender a ouvir o outro para argumentar melhor",
      ],
      methodology:
        "Gamificação com desafios e recompensas; Storytelling — ensinamos a retórica através da criação de histórias; Teatro e Improviso para lidar com imprevistos; Gravação e Feedback para que a criança veja a sua evolução.",
      modules: [
        {
          heading: "Módulo I — O Poder da Voz e do Corpo",
          body: "Quebra de gelo e diagnóstico de comunicação. Linguagem Não-Verbal: postura, gestos e contacto visual. Vocalização: dicção, projecção de voz e pausas dramáticas.",
        },
        {
          heading: "Módulo II — Estruturação de Pensamento (Retórica)",
          body: "O Roteiro de Sucesso: como iniciar, desenvolver e concluir um discurso. Storytelling: a arte de contar histórias para convencer. Argumentação: como defender ideias com lógica e respeito.",
        },
      ],
    },
    {
      title: "Programa Líderes do Futuro",
      slug: "lideres-do-futuro",
      excerpt: "Liderança, Orientação Vocacional e Etiqueta para adolescentes de 13 a 18 anos.",
      description:
        "Uma jornada de desenvolvimento pessoal desenhada exclusivamente para adolescentes. Combina a autodescoberta da Orientação Vocacional com as ferramentas práticas de Liderança e o polimento da etiqueta moderna, preparando os adolescentes para os desafios do futuro na vida académica, profissional e social.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      icon: "ShieldCheck",
      tag: "Adolescentes",
      duration: "10 semanas",
      ageRange: "13–18 anos",
      category: "Liderança",
      order: 2,
      featured: true,
      objectives: [
        "Autoconhecimento: identificar talentos, paixões e áreas de interesse profissional",
        "Protagonismo: desenvolver a capacidade de influenciar positivamente o ambiente",
        "Civilidade e Imagem: dominar regras de convivência que abrem portas no mundo adulto",
        "Comunicação: expressar ideias com clareza, confiança e respeito",
      ],
      methodology:
        "Metodologia focada na Liderança Influente, não na Liderança Autoritária. Os adolescentes aprendem a reconhecer os seus talentos e a aplicá-los em contextos reais. Sessões práticas de etiqueta moderna e simulação de situações profissionais.",
      modules: [
        {
          heading: "Módulo I — Orientação Vocacional",
          body: "Quem sou eu? Descoberta de talentos e paixões. Testes de perfil vocacional e mapeamento de carreiras do futuro.",
        },
        {
          heading: "Módulo II — Liderança Prática",
          body: "Diferença entre liderança autoritária e liderança influente. Gestão de equipas, tomada de decisão e resolução de conflitos.",
        },
        {
          heading: "Módulo III — Etiqueta e Imagem Pessoal",
          body: "Regras de convivência social e profissional. Como se comportar num jantar, numa entrevista e em ambientes formais.",
        },
      ],
    },
    {
      title: "Programa Conexão Pais e Filhos",
      slug: "conexao-pais-filhos",
      excerpt: "Comunicação familiar e liderança das relações para famílias modernas.",
      description:
        "Vivemos numa era de desconexão familiar, onde pais e filhos habitam na mesma casa mas em mundos diferentes. Este programa foca-se na Liderança Influente — os pais deixam de ser \"chefes\" para se tornarem \"mentores\", usando a comunicação assertiva como ponte.",
      image:
        "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800",
      icon: "Heart",
      tag: "Família",
      duration: "8 semanas",
      ageRange: "Pais e filhos",
      category: "Família",
      order: 3,
      featured: true,
      objectives: [
        "Restaurar o diálogo e o respeito mútuo entre pais e filhos",
        "Capacitar os pais a guiarem os filhos com firmeza e afecto",
        "Filhos aprendem a reconhecer e dominar a natureza de liderança dos pais",
        "Construir uma convivência sadia baseada em empatia e estratégia",
      ],
      methodology:
        "O programa transita entre a Empatia (entender o adolescente) e a Estratégia (capacitar os pais). Sessões conjuntas e separadas, com dinâmicas de grupo e ferramentas de comunicação não-violenta.",
      modules: [
        {
          heading: "Módulo 1 — O Mapa do Adolescente",
          body: "Compreender o cérebro adolescente e as suas necessidades emocionais. Como os pais podem ler os sinais do filho sem invadir o espaço.",
        },
        {
          heading: "Módulo 2 — Comunicação Não-Violenta",
          body: "Técnicas para falar sem gritar e ouvir sem julgar. Como transformar conflitos em conversas produtivas.",
        },
        {
          heading: "Módulo 3 — Liderança e Limites",
          body: "Diferença entre autoridade e autoritarismo. Como estabelecer limites com amor e consistência.",
        },
        {
          heading: "Módulo 4 — Inteligência Espiritual e Valores",
          body: "Transmissão de valores familiares sólidos. Como usar a fé e os princípios como âncora emocional.",
        },
      ],
    },
    {
      title: "Inteligência Emocional",
      slug: "inteligencia-emocional",
      excerpt: "Autocontrolo e ferramentas de gestão de sentimentos para vencer desafios.",
      description:
        "Inteligência emocional não é ser sensível — é a capacidade de identificar, compreender e gerir as próprias emoções e as dos outros. Para as crianças, desenvolver esta competência é transformador: reduz conflitos, melhora o desempenho escolar e fortalece amizades.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
      icon: "BrainCircuit",
      tag: "Resiliência",
      duration: "8 semanas",
      ageRange: "Todas as idades",
      category: "Desenvolvimento",
      order: 4,
      featured: false,
      objectives: [
        "Identificar e nomear as próprias emoções com precisão",
        "Desenvolver técnicas de autorregulação adaptadas à idade",
        "Construir empatia e habilidades de relacionamento interpessoal",
        "Fortalecer a resiliência para enfrentar desafios do quotidiano",
      ],
      methodology:
        "Uso de jogos de papel, histórias interactivas e discussões guiadas. Técnicas de autorregulação — respiração, pausa consciente, reencadramento — adaptadas à faixa etária.",
      modules: [
        {
          heading: "Módulo I — Conhecer as Emoções",
          body: "Mapear o universo emocional: alegria, raiva, medo, tristeza. Exercícios de nomeação e reconhecimento.",
        },
        {
          heading: "Módulo II — Gerir as Emoções",
          body: "Técnicas práticas de autorregulação. O termómetro emocional e estratégias de acalmia.",
        },
        {
          heading: "Módulo III — Empatia e Relações",
          body: "Como ler as emoções dos outros. Resolução de conflitos e comunicação assertiva.",
        },
      ],
    },
    {
      title: "Etiqueta e Postura",
      slug: "etiqueta-postura",
      excerpt: "Elegância e comportamento social que abrem portas em qualquer lugar.",
      description:
        "Saber como se portar num jantar, como liderar um projeto sem ser autoritário, como comunicar com elegância — são competências que as escolas tradicionais raramente ensinam. Este curso preenche essa lacuna.",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      icon: "Palette",
      tag: "Comportamental",
      duration: "4 semanas",
      ageRange: "Todas as idades",
      category: "Etiqueta",
      order: 5,
      featured: false,
      objectives: [
        "Dominar as regras de etiqueta à mesa e em eventos formais",
        "Desenvolver uma imagem pessoal coerente e profissional",
        "Aprender protocolos de comunicação em diferentes contextos",
        "Construir confiança através da postura e presença física",
      ],
      methodology:
        "Aulas práticas com simulações de situações reais: jantares formais, entrevistas, apresentações. Feedback individual e trabalho de postura corporal.",
      modules: [
        {
          heading: "Módulo I — Etiqueta Social",
          body: "Regras de convivência em diferentes contextos: escola, família, eventos. O poder do cumprimento e da apresentação.",
        },
        {
          heading: "Módulo II — Imagem e Postura",
          body: "Linguagem corporal e o que comunica sem palavras. Vestuário e imagem pessoal para cada ocasião.",
        },
      ],
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }

  // ─── Anúncios de seed ─────────────────────────────────────────────────────
  const ads = [
    {
      title: "Matrículas Abertas 2026",
      description: "Garanta a vaga do seu filho hoje e receba 15% de desconto na primeira propina.",
      linkUrl: "/#contacto",
      position: "hero-blog",
      bgColor: "#ea580c",
      ctaText: "Inscrever Agora",
      active: true,
    },
    {
      title: "Curso de Oratória Infantil",
      description: "Vagas limitadas para Maio. Turmas de 8 a 17 anos.",
      linkUrl: "/cursos/oratoria-retorica-infantil",
      position: "sidebar-blog",
      bgColor: "#0f172a",
      ctaText: "Ver Curso",
      active: true,
    },
    {
      title: "Programa Famílias — Inscrições Abertas",
      description: "Conexão Pais e Filhos. Metodologia exclusiva da Academia Mori's.",
      linkUrl: "/cursos/conexao-pais-filhos",
      position: "between-posts",
      bgColor: "#1e3a5f",
      ctaText: "Saber Mais",
      active: true,
    },
  ];

  for (const ad of ads) {
    const existing = await prisma.ad.findFirst({ where: { title: ad.title } });
    if (!existing) {
      await prisma.ad.create({ data: ad });
    }
  }

  console.log("✅ Seed concluído: admin, cursos e anúncios criados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
