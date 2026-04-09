// app/blog/page.tsx
import { Suspense } from "react";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { prisma } from "@/lib/prisma";
import { AdBannerInline } from "@/components/ads/AdBannerInline";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Vozes da Reforma — Academia Mori's",
  description: "Artigos sobre educação, liderança e desenvolvimento infantil.",
};

const CATEGORIES = ["Educação", "Liderança", "Desenvolvimento", "Oratória", "Família"];

export default async function BlogPage() {
  const now = new Date();

  const [posts, heroAds, sidebarAds, betweenAds] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        category: true, createdAt: true, image: true,
        authorName: true, authorImage: true,
      },
    }),
    prisma.ad.findMany({
      where: {
        active: true, position: "hero-blog",
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
      take: 1,
    }),
    prisma.ad.findMany({
      where: {
        active: true, position: "sidebar-blog",
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
    }),
    prisma.ad.findMany({
      where: {
        active: true, position: "between-posts",
        OR: [{ startDate: null }, { startDate: { lte: now } }],
        AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
      },
    }),
  ]);

  const heroAd = heroAds[0] ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="mb-12">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Academia Mori's — Editorial
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-4">
            Vozes da<br />
            <span className="text-orange-600">Reforma</span>
          </h1>
          <p className="text-slate-500 max-w-xl text-lg leading-relaxed">
            Artigos e reflexões sobre educação transformadora, liderança infantil
            e desenvolvimento humano em Angola.
          </p>
        </div>

        {/* Anúncio hero */}
        {heroAd && (
          <AdBannerInline
            title={heroAd.title}
            description={heroAd.description ?? undefined}
            linkUrl={heroAd.linkUrl}
            ctaText={heroAd.ctaText ?? "Saber Mais"}
            bgColor={heroAd.bgColor ?? "#ea580c"}
          />
        )}

        {/* Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">

          <div className="lg:col-span-8">
            <Suspense fallback={
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 rounded-2xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            }>
              <BlogListClient
                initialPosts={posts}
                betweenAds={betweenAds.map((ad) => ({
                  id: ad.id,
                  title: ad.title,
                  description: ad.description ?? undefined,
                  linkUrl: ad.linkUrl,
                  ctaText: ad.ctaText ?? "Saber Mais",
                  bgColor: ad.bgColor ?? "#ea580c",
                }))}
              />
            </Suspense>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 sticky top-32">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Receba novidades</h3>
              <p className="text-slate-600 text-sm mb-4">
                Inscreva-se para receber artigos directamente no seu email.
              </p>
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-2 rounded-lg mb-3 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm"
              />
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-bold text-sm">
                Subscrever
              </button>
            </div>

            {sidebarAds.map((ad) => (
              <SidebarAd
                key={ad.id}
                title={ad.title}
                description={ad.description ?? undefined}
                linkUrl={ad.linkUrl}
                ctaText={ad.ctaText ?? "Saber Mais"}
                bgColor={ad.bgColor ?? "#0f172a"}
              />
            ))}

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Categorias</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <p key={cat} className="text-slate-600 text-sm py-1 border-b border-slate-50 last:border-0">
                    {cat}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
