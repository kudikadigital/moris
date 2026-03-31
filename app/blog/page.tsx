"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Importante para a navegação

const posts = [
  {
    id: "impacto-da-oratoria", // Usaremos o ID para a rota
    title: "Como a oratória pode transformar a confiança do seu filho",
    excerpt: "Descubra por que a capacidade de se expressar é o maior ativo de um futuro líder...",
    date: "25 Mar, 2026",
    category: "Educação",
    image: "/blog-1.jpg"
  },
  {
    id: "lideranca-na-escola",
    title: "Liderança na escola: O papel dos pais no protagonismo infantil",
    excerpt: "A liderança não nasce, cultiva-se. Saiba como incentivar a tomada de decisão...",
    date: "28 Mar, 2026",
    category: "Liderança",
    image: "/blog-2.jpg"
  },
];

export default function BlogPage() {
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
            Pensamento <span className="text-orange-600">&</span> Reforma
          </motion.h1>
          <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">
            Explora artigos sobre pedagogia moderna, liderança infantil e o impacto da educação comportamental no futuro de Angola.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-72 mb-8 overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-600/10">
                  {/* Overlay de gradiente */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-100/50 to-slate-200 group-hover:scale-110 transition-transform duration-700 ease-out" />
                  
                  {/* Badge de Categoria */}
                  <span className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="px-2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-light leading-relaxed italic">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]">
                    <span>Ler Artigo Completo</span>
                    <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all duration-300">
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