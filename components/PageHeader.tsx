// components/PageHeader.tsx
// Header autónomo para páginas Server Component (blog, cursos, etc.)
// Gere o próprio estado do modal — não precisa de receber funções como props.
// Pode ser importado directamente em Server Components.

"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { EnrollmentModal } from "@/components/Modals/EnrollmentModal";

export function PageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
      />
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
