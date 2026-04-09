// INSTRUÇÃO DE MIGRAÇÃO: app/blog/[id]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// 1. Apaga a pasta:  app/blog/[id]/
// 2. Cria a pasta:   app/blog/[slug]/
// 3. Copia o ficheiro app/blog/[slug]/page.tsx (já entregue)
//
// ACTUALIZAR também os links do blog nos seguintes ficheiros:
//   - components/blog/BlogListClient.tsx  → href={`/blog/${post.slug}`}
//   - app/blog/page.tsx                  → já actualizado na nova versão
//
// Esta nota serve de guia de migração — não é um ficheiro de código.
// ─────────────────────────────────────────────────────────────────────────────
export {};
