// components/HomeClient.tsx
// Client Component que gere o estado do modal de inscrição.
// Passa callbacks via context/props para Header e Hero.
// Isola o "use client" da homepage, permitindo que page.tsx seja Server Component.

"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Essence } from "@/components/Essence";
import { EnrollmentModal } from "@/components/Modals/EnrollmentModal";

interface HomeClientProps {
  children: React.ReactNode;
}

export function HomeClient({ children }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Header e Hero precisam de onOpenModal → ficam aqui no Client */}
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
      />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Essence />

      {/* Resto da página (Server Components passados como children) */}
      {children}

      {/* Modal de inscrição */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
