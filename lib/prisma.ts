// lib/prisma.ts — CORRIGIDO PARA NEON
// 1. Suprime o warning de SSL (correcto para Neon que usa verify-full)
// 2. Adiciona connectionTimeoutMillis para não bloquear indefinidamente
// 3. Mantém o singleton para dev

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const setupPrisma = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
    max: 5,
    // Não é necessário ssl aqui — o sslmode=verify-full na DATABASE_URL
    // já instrui o pg correctamente sem emitir o warning
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
  });
};

export const prisma = globalForPrisma.prisma || setupPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
