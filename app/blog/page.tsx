"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export const posts = [
  {
    id: "impacto-da-oratoria",
    title: "Como a oratória pode transformar a confiança do seu filho",
    excerpt: "Descubra por que a capacidade de se expressar é o maior ativo de um futuro líder. Quando uma criança aprende a articular os seus pensamentos com clareza, o mundo abre-se de uma forma completamente diferente.",
    date: "25 Mar, 2026",
    readTime: "5 min",
    category: "Educação",
    featured: true,
  },
  {
    id: "lideranca-na-escola",
    title: "Liderança na escola: O papel dos pais no protagonismo infantil",
    excerpt: "A liderança não nasce, cultiva-se. Saiba como incentivar a tomada de decisão saudável nas crianças e porque o ambiente em casa é o primeiro palco de formação.",
    date: "28 Mar, 2026",
    readTime: "4 min",
    category: "Liderança",
    featured: false,
  },
  {
    id: "inteligencia-emocional-criancas",
    title: "Inteligência emocional: a competência que as escolas ainda não ensinam",
    excerpt: "Notas altas não chegam. As empresas do futuro procuram profissionais que saibam gerir emoções, trabalhar em equipa e resolver conflitos. A preparação começa na infância.",
    date: "01 Abr, 2026",
    readTime: "6 min",
    category: "Desenvolvimento",
    featured: false,
  },
  {
    id: "empreendedorismo-infantil",
    title: "Por que ensinar empreendedorismo às crianças é mais urgente do que nunca",
    excerpt: "O mercado de trabalho do futuro será radicalmente diferente. Crianças que entendem valor, criatividade e gestão de projetos saem na frente. Aqui fica a razão.",
    date: "03 Abr, 2026",
    readTime: "5 min",
    category: "Empreendedorismo",
    featured: false,
  },
  {
    id: "etiqueta-social",
    title: "Etiqueta social: muito mais do que boas maneiras à mesa",
    excerpt: "A etiqueta moderna é uma ferramenta de comunicação poderosa. Crianças que aprendem protocolo social desenvolvem confiança, empatia e adaptabilidade em qualquer contexto.",
    date: "07 Abr, 2026",
    readTime: "4 min",
    category: "Comportamento",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Educação: "bg-orange-100 text-orange-700",
  Liderança: "bg-slate-100 text-slate-700",
  Desenvolvimento: "bg-emerald-100 text-emerald-700",
  Empreendedorismo: "bg-amber-100 text-amber-700",
  Comportamento: "bg-purple-100 text-purple-700",
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-10 h-px bg-orange-600" />
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">
              Conteúdo Exclusivo
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6"
          >
            Pensamento <span className="text-orange-600 italic font-serif">&amp;</span> Reforma
          </motion.h1>
          <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">
            Artigos sobre pedagogia moderna, liderança infantil e o impacto da educação comportamental no futuro de Angola.
          </p>
        </header>

        {/* Featured Post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <Link href={`/blog/${featured.id}`} className="group block">
              <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden p-12 md:p-20 min-h-[380px] flex flex-col justify-end">
                <div className="absolute inset-0 opacity-30"
                  style={{ background: "radial-gradient(ellipse 70% 60% at 80% 30%, #ea580c55 0%, transparent 70%)" }}
                />
                <div className="absolute top-8 left-8">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>
                <div className="absolute top-8 right-8">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    Artigo em Destaque
                  </span>
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-orange-400 transition-colors max-w-3xl">
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 text-lg font-light max-w-2xl mb-8 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-widest">
                      Ler Artigo
                      <div className="w-8 h-8 rounded-full border border-orange-500 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 transition-all">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {featured.readTime} de leitura
                    </div>
                    <span className="text-slate-600 text-xs">{featured.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {rest.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-60 mb-8 overflow-hidden rounded-[2rem] bg-slate-50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-600/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-slate-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <span className="text-9xl font-black text-slate-900">{post.category.charAt(0)}</span>
                  </div>
                  <span className={`absolute top-6 left-6 z-10 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${categoryColors[post.category] || "bg-slate-100 text-slate-700"}`}>
                    {post.category}
                  </span>
                  <div className="absolute bottom-6 right-6 flex items-center gap-1 text-slate-400 text-xs bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <div className="px-1">
                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3">{post.date}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-light leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]">
                    <span>Ler Artigo Completo</span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
