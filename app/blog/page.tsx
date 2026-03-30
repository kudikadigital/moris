"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Como a oratória pode transformar a confiança do seu filho",
    excerpt: "Descubra por que a capacidade de se expressar é o maior ativo de um futuro líder...",
    date: "25 Mar, 2026",
    category: "Educação",
    image: "/blog-1.jpg"
  },
  // Adicione mais posts aqui
];

export default function BlogPage() {
  return (
    <main className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6"
          >
            Pensamento <span className="text-orange-600">&</span> Reforma
          </motion.h1>
          <p className="text-slate-500 text-lg max-w-2xl font-light">
            Artigos sobre pedagogia moderna, liderança infantil e o futuro da educação em Angola.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.article 
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-[2rem] bg-slate-100">
                {/* Fallback caso não tenha imagem */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-100 to-slate-200 group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-light italic">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest">
                Ler Artigo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}