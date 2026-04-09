"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AdBannerInline } from "@/components/ads/AdBannerInline";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  createdAt: Date | string;
  image?: string | null;
  authorName?: string | null;
  authorImage?: string | null;
}

interface BetweenAd {
  id: string;
  title: string;
  description?: string;
  linkUrl: string;
  ctaText?: string;
  bgColor?: string;
}

interface BlogListClientProps {
  initialPosts: Post[];
  betweenAds?: BetweenAd[];
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(date));
}

const AD_INTERVAL = 4;

export function BlogListClient({ initialPosts, betweenAds = [] }: BlogListClientProps) {
  const categories = Array.from(new Set(initialPosts.map((p) => p.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? initialPosts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
    : initialPosts;

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
            !activeCategory ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
              activeCategory?.toLowerCase() === cat.toLowerCase()
                ? "bg-orange-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-8">
        {filtered.length === 0 && (
          <p className="text-slate-500 italic text-center py-12">Nenhum artigo nesta categoria ainda.</p>
        )}

        {filtered.map((post, index) => (
          <div key={post.id}>
            {index > 0 && index % AD_INTERVAL === 0 && betweenAds.length > 0 && (
              <AdBannerInline
                {...betweenAds[Math.floor(index / AD_INTERVAL - 1) % betweenAds.length]}
              />
            )}

            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all">
                {post.image && (
                  <div className="relative w-full md:w-48 h-40 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image} alt={post.title} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">{post.category}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[10px] text-slate-400">{formatDate(post.createdAt)}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    {post.authorName && (
                      <div className="flex items-center gap-2">
                        {post.authorImage && (
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image src={post.authorImage} alt={post.authorName} fill className="object-cover" />
                          </div>
                        )}
                        <span className="text-xs text-slate-500 font-medium">{post.authorName}</span>
                      </div>
                    )}
                    <span className="ml-auto flex items-center gap-1 text-xs font-black text-orange-600 group-hover:gap-2 transition-all">
                      Ler artigo <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
