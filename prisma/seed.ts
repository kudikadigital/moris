import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt'



async function main() {
  const adminEmail = "info@academiamoris.com"; // Alterar para o email real do admin 
  const rawPassword = "admin123_moris"; // Altera para a tua password real

  console.log("🚀 A iniciar o processo de Seed Seguro...");

  // Gerar o hash da password (12 rounds é o padrão de equilíbrio entre segurança/velocidade)
  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword, // Atualiza se mudares no seed
    },
    create: {
      email: adminEmail,
      name: "Administrador Geral",
      password: hashedPassword,
    },
  });

  console.log(`✅ Admin [${admin.name}] configurado com sucesso.`);
  console.log(`🔐 Password encriptada com bcrypt no banco de dados.`);
}

main()
  .catch((e) => {
    console.error("❌ Erro no Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });