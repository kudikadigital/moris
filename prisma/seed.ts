import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt'



async function main() {
  const adminEmail = "info@academiamoris.com";
  const hashedPassword = await bcrypt.hash("admin123_moris", 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Administrador Geral",
    },
  });

  console.log({ admin });
  console.log("✅ Admin criado ou já existente.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });