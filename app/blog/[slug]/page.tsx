// app/blog/[slug]/page.tsx — VERSÃO CORRIGIDA: lê da base de dados
// ATENÇÃO: renomear/mover de app/blog/[id]/ para app/blog/[slug]/
// e actualizar os links do blog para usar o slug em vez do id

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import { SiWhatsapp, SiFacebook } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: `${post.title} — Vozes da Reforma`,
    description: post.excerpt,
  };
}

// Calcula tempo de leitura estimado
function readTime(text: string) {
  const words = text.split(/\s+/).length;
  return `${Math.ceil(words / 200)} min`;
}

// Formata data para PT
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  // Artigos relacionados da mesma categoria
  const related = await prisma.post.findMany({
    where: { published: true, category: post.category, NOT: { slug } },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: { slug: true, title: true, excerpt: true, category: true, image: true, createdAt: true },
  });

  // Anúncio sidebar activo
  const sidebarAd = await prisma.ad.findFirst({
    where: { active: true, position: "sidebar-blog" },
  });

  const postUrl = `https://academiamorisreforma.com/blog/${slug}`;

  return (
    <main className="min-h-screen bg-white">
      <PageHeader />

      {/* Progress bar de leitura */}
      <div
        id="progress-bar"
        className="fixed top-0 left-0 h-1 bg-orange-500 z-50 transition-all duration-100"
        style={{ width: "0%" }}
      />

      {/* ── Hero do Artigo ──────────────────────────────────────────── */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 text-sm font-bold mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Vozes da Reforma
          </Link>

          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-slate-600 text-xl leading-relaxed mb-8">{post.excerpt}</p>

          {/* Meta do artigo */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-orange-500" />
              <span>{readTime(post.content)} de leitura</span>
            </div>
            <span>{formatDate(post.createdAt)}</span>

            {/* Autor — se existir */}
            {post.authorName && (
              <div className="flex items-center gap-3 ml-auto">
                {post.authorImage && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image src={post.authorImage} alt={post.authorName} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 text-xs">{post.authorName}</p>
                  {post.authorRole && (
                    <p className="text-slate-400 text-[10px]">{post.authorRole}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Imagem de Capa ──────────────────────────────────────────── */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      {/* ── Corpo do artigo + Sidebar ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Artigo */}
          <article className="lg:col-span-8">
            {/* Conteúdo renderizado (suporta parágrafos com \n\n) */}
            <div className="prose prose-slate prose-lg max-w-none">
              {post.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Partilhar */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4 flex-wrap">
              <span className="text-slate-500 text-sm font-bold flex items-center gap-2">
                <Share2 size={14} /> Partilhar:
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold hover:bg-green-600 transition-colors"
              >
                <SiWhatsapp size={14} /> WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                <SiFacebook size={14} /> Facebook
              </a>
            </div>

            {/* Artigos relacionados */}
            {related.length > 0 && (
              <section className="mt-16 pt-12 border-t border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-8">Artigos relacionados</h2>
                <div className="space-y-6">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex gap-5 items-start"
                    >
                      {r.image && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                          {r.category}
                        </span>
                        <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {r.title}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-1">{r.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Receba novidades</h3>
              <p className="text-slate-600 text-sm mb-4">
                Artigos semanais sobre educação, liderança e desenvolvimento infantil.
              </p>
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-2 rounded-xl mb-3 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
              />
              <button className="w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition font-bold text-sm">
                Subscrever
              </button>
            </div>

            {/* Anúncio sidebar da base de dados */}
            {sidebarAd && (
              <SidebarAd
                title={sidebarAd.title}
                description={sidebarAd.description ?? undefined}
                linkUrl={sidebarAd.linkUrl}
                ctaText={sidebarAd.ctaText ?? "Saber Mais"}
                bgColor={sidebarAd.bgColor ?? "#0f172a"}
              />
            )}
          </aside>
        </div>
      </div>

      {/* Script: barra de progresso de leitura */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              var el = document.documentElement;
              var scrollTop = el.scrollTop || document.body.scrollTop;
              var scrollHeight = el.scrollHeight - el.clientHeight;
              var progress = (scrollTop / scrollHeight) * 100;
              var bar = document.getElementById('progress-bar');
              if (bar) bar.style.width = progress + '%';
            });
          `,
        }}
      />

      <Footer />
    </main>
  );
}
