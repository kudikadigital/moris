"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { SiWhatsapp, SiFacebook } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

// Content map for each article
const articleContent: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  lead: string;
  sections: { heading: string; body: string }[];
}> = {
  "impacto-da-oratoria": {
    title: "Como a oratória pode transformar a confiança do seu filho",
    category: "Educação",
    readTime: "5 min",
    date: "25 Mar, 2026",
    lead: "Vivemos num mercado cada vez mais competitivo, onde o conhecimento técnico já não é o único factor determinante para o sucesso. Em Angola, a nova geração enfrenta o desafio de se destacar numa economia globalizada — e a comunicação é a chave.",
    sections: [
      {
        heading: "A Barreira do Silêncio",
        body: "Muitas vezes, alunos brilhantes perdem oportunidades por não conseguirem articular os seus pensamentos de forma clara. Seja numa entrevista de emprego, numa apresentação escolar ou numa conversa de negócios, a incapacidade de se expressar cria uma barreira invisível que limita o potencial real de uma pessoa. A Academia Mori's-Reforma foca-se precisamente na quebra desta barreira — com metodologias práticas e progressivas, adaptadas à idade de cada aluno.",
      },
      {
        heading: "Liderança é Comunicação",
        body: "Não existe líder silencioso. Os grandes líderes da história — políticos, empreendedores, activistas — foram, antes de tudo, grandes comunicadores. Na Academia Mori's-Reforma, acreditamos que ensinar uma criança a falar em público é dar-lhe uma ferramenta de poder, ética e influência positiva. As nossas aulas de oratória não ensinam apenas técnicas de discurso — ensinam as crianças a pensar com clareza, a organizar ideias e a transmiti-las com convicção.",
      },
      {
        heading: "O Que Acontece em Cada Aula",
        body: "As sessões de Oratória e Retórica na Mori's combinam teoria e prática em proporções iguais. Os alunos aprendem técnicas de respiração, postura, contacto visual e modulação de voz. Mas também simulam cenários reais: apresentações de projeto, debates, improvisação e storytelling. O resultado, que os pais notam em poucas semanas, é uma criança que entra numa sala com a cabeça erguida e fala com uma naturalidade que surpreende.",
      },
    ],
  },
  "lideranca-na-escola": {
    title: "Liderança na escola: O papel dos pais no protagonismo infantil",
    category: "Liderança",
    readTime: "4 min",
    date: "28 Mar, 2026",
    lead: "A liderança não nasce — cultiva-se. E o primeiro laboratório onde se cultiva é a família. Saiba como os pais podem ser o maior catalisador do protagonismo dos seus filhos.",
    sections: [
      {
        heading: "O Erro Que Muitos Pais Cometem",
        body: "Por amor e protecção, muitos pais resolvem todos os problemas dos filhos antes que eles tenham a oportunidade de os enfrentar. O resultado? Crianças que chegam à adolescência sem capacidade de decisão, sem tolerância à frustração e sem iniciativa própria. A liderança infantil começa com pequenas responsabilidades em casa — escolher o que vestir, decidir como organizar o tempo de estudo, resolver conflitos com irmãos sem a intervenção imediata dos pais.",
      },
      {
        heading: "O Que os Melhores Pais Fazem de Diferente",
        body: "Os pais que criam líderes não são aqueles que nunca dizem não. São aqueles que fazem perguntas em vez de dar respostas. 'O que achas que deverias fazer?' é uma das frases mais poderosas que um pai pode dizer. Ela transfere a responsabilidade da decisão para a criança, enquanto mantém o adulto como guia e rede de segurança. Na Academia Mori's, ensinamos os pais a serem aliados neste processo, com materiais e estratégias para aplicar em casa.",
      },
      {
        heading: "A Escola Como Segundo Laboratório",
        body: "A escola pode ser um excelente espaço de desenvolvimento de liderança — mas só se a criança tiver as ferramentas certas. Participar em grupos, propor ideias, aceitar críticas e liderar projetos são competências que se treinam. Os nossos alunos chegam à escola mais preparados para estes desafios, o que se traduz em melhores notas, mais amigos e uma relação mais saudável com professores.",
      },
    ],
  },
  "inteligencia-emocional-criancas": {
    title: "Inteligência emocional: a competência que as escolas ainda não ensinam",
    category: "Desenvolvimento",
    readTime: "6 min",
    date: "01 Abr, 2026",
    lead: "Os estudos mais recentes em psicologia do desenvolvimento confirmam o que os melhores educadores já sabiam: o sucesso na vida adulta está mais relacionado com inteligência emocional do que com QI académico.",
    sections: [
      {
        heading: "O Que É Realmente a Inteligência Emocional",
        body: "Inteligência emocional não é ser sensível ou chorar facilmente. É a capacidade de identificar, compreender e gerir as próprias emoções — e as dos outros. É saber quando estamos irritados e por quê. É perceber que o colega está triste antes de ele dizer qualquer coisa. É escolher como reagir em vez de simplesmente reagir. Para as crianças, desenvolver esta competência é transformador: reduz conflitos, melhora o desempenho escolar e fortalece amizades.",
      },
      {
        heading: "Por Que as Escolas Falham Aqui",
        body: "O currículo escolar tradicional foca-se em conteúdos académicos. Português, Matemática, Ciências — tudo essencial, mas incompleto. Nenhuma disciplina ensina uma criança a lidar com a rejeição, a gerir a ansiedade antes de um teste, a resolver um conflito com um colega sem escalá-lo. Estas competências ficam ao acaso — ou são aprendidas em casa, se os pais souberem como ensinar, ou simplesmente não são aprendidas.",
      },
      {
        heading: "Como Trabalhamos Isto na Mori's",
        body: "No nosso programa de Inteligência Emocional, usamos jogos de papel, histórias interativas e discussões guiadas para ajudar as crianças a nomear e compreender as suas emoções. Ensinamos técnicas de autorregulação — respiração, pausa consciente, reencadramento — adaptadas à idade de cada aluno. O resultado são crianças mais calmas, mais empáticas e mais resilientes. Crianças que, quando a vida fica difícil, têm ferramentas para continuar.",
      },
    ],
  },
};

const defaultContent = {
  title: "Artigo da Academia Mori's",
  category: "Educação",
  readTime: "5 min",
  date: "Abr, 2026",
  lead: "Este artigo explora um dos temas centrais da nossa pedagogia: o desenvolvimento integral de crianças e adolescentes para os desafios do mundo moderno.",
  sections: [
    {
      heading: "A Nossa Abordagem",
      body: "Na Academia Mori's-Reforma, acreditamos que a educação verdadeira vai muito além das matérias escolares. Cada programa que desenvolvemos é desenhado com rigor pedagógico e profundo respeito pelo desenvolvimento natural de cada criança.",
    },
  ],
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const content = articleContent[params.id] || defaultContent;

  return (
    <main className="relative min-h-screen bg-white pb-20">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-32">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Voltar ao Blog
        </Link>

        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6 text-[10px] uppercase font-black tracking-[0.2em] text-orange-600"
          >
            <span>{content.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1 text-slate-400 font-normal normal-case tracking-normal">
              <Clock size={12} /> {content.readTime} de leitura
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-400 font-normal normal-case tracking-normal">{content.date}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-8"
          >
            {content.title}
          </motion.h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">
                MM
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Academia Mori&#39;s</p>
                <p className="text-xs text-slate-500 font-light">Equipa Pedagógica</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                <SiWhatsapp size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                <SlSocialLinkedin size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-orange-600 transition-colors">
                <SiFacebook size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-[2rem] overflow-hidden mb-16 bg-slate-950"
        >
          <div className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, #ea580c55 0%, transparent 70%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[120px] font-black text-white opacity-5">
              {content.category.charAt(0)}
            </span>
          </div>
          <div className="absolute bottom-8 left-8">
            <span className="text-white font-bold text-sm opacity-50 uppercase tracking-widest">
              Academia Mori&#39;s-Reforma
            </span>
          </div>
        </motion.div>

        {/* Article Content */}
        <article>
          <p className="text-2xl text-slate-600 font-light italic leading-relaxed mb-12 border-l-4 border-orange-200 pl-6">
            {content.lead}
          </p>

          {content.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-5">
                {section.heading}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg font-light">
                {section.body}
              </p>
            </motion.div>
          ))}

          {/* CTA inline */}
          <div className="my-16 bg-slate-950 rounded-[2rem] p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, #ea580c 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-3">Academia Mori&#39;s-Reforma</p>
              <h3 className="text-2xl font-bold mb-4">
                O seu filho está pronto para este desafio?
              </h3>
              <p className="text-slate-400 mb-6 font-light">
                Inscreva-o hoje e veja a transformação acontecer em poucas semanas.
              </p>
              <a
                href="https://wa.me/244938460008"
                className="inline-flex items-center gap-2 px-7 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 transition-all"
              >
                Falar no WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>

        {/* Footer share */}
        <footer className="mt-16 pt-10 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
            Partilhe este pensamento
          </p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 text-slate-900 font-bold hover:bg-orange-50 hover:text-orange-600 transition-all">
              <SiWhatsapp /> WhatsApp
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 text-slate-900 font-bold hover:bg-orange-50 hover:text-orange-600 transition-all">
              <SiFacebook /> Facebook
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
