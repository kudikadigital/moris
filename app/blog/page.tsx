// app/blog/page.tsx
import { BlogListClient } from "@/components/blog/BlogListClient";
import { prisma } from "@/lib/prisma";
// Importamos o componente de animação que criaremos abaixo

export default async function BlogPage() {
  // Buscamos apenas os posts publicados do banco de dados
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          {/* ... seu header aqui (pode ser estático) ... */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6">
            Vozes <span className="text-orange-600">da</span> Reforma
          </h1>
        </header>

        {/* Passamos os dados do Prisma para o componente que lida com o Framer Motion */}
        <BlogListClient initialPosts={JSON.parse(JSON.stringify(posts))} />
      </div>
    </main>
  );
}