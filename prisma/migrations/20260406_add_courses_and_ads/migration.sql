-- Migration: Adicionar tabelas Course e Ad, e colunas author* ao Post
-- Ficheiro: prisma/migrations/20260406_add_courses_and_ads/migration.sql

-- Colunas de autor no Post (colunistas)
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "authorName"  TEXT;
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "authorRole"  TEXT;
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "authorImage" TEXT;

-- Tabela Course
CREATE TABLE IF NOT EXISTS "Course" (
  "id"          TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title"       TEXT NOT NULL,
  "slug"        TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "excerpt"     TEXT NOT NULL,
  "image"       TEXT,
  "icon"        TEXT,
  "tag"         TEXT,
  "duration"    TEXT,
  "ageRange"    TEXT,
  "category"    TEXT NOT NULL,
  "modules"     JSONB,
  "objectives"  JSONB,
  "methodology" TEXT,
  "order"       INTEGER NOT NULL DEFAULT 0,
  "published"   BOOLEAN NOT NULL DEFAULT true,
  "featured"    BOOLEAN NOT NULL DEFAULT false,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Ad (Anúncios)
CREATE TABLE IF NOT EXISTS "Ad" (
  "id"          TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title"       TEXT NOT NULL,
  "description" TEXT,
  "imageUrl"    TEXT,
  "linkUrl"     TEXT NOT NULL,
  "position"    TEXT NOT NULL,
  "bgColor"     TEXT DEFAULT '#ea580c',
  "ctaText"     TEXT DEFAULT 'Saiba Mais',
  "active"      BOOLEAN NOT NULL DEFAULT true,
  "startDate"   TIMESTAMP(3),
  "endDate"     TIMESTAMP(3),
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
