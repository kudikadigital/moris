"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlogListClient({ initialPosts }: { initialPosts: any[] }) {
  if (initialPosts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 italic">Ainda não foram publicados artigos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {initialPosts.map((post, index) => (
        <motion.article 
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          {/* Agora o link usa o slug real do banco de dados */}
          <Link href={`/blog/${post.slug}`}>
            <div className="relative h-72 mb-8 overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-600/10">
              <div className="absolute inset-0 bg-linear-to-br from-orange-100/50 to-slate-200 group-hover:scale-110 transition-transform duration-700 ease-out" />
              <span className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                {post.category}
              </span>
            </div>

            <div className="px-2">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-light italic">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]">
                <span>Ler Artigo Completo</span>
                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}