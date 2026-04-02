"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar o scroll e mudar a aparência do Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "A Academia", href: "/#sobre" },
    { name: "Pilares", href: "/#pilares" },
    { name: "Cursos", href: "/#cursos" },
    { name: "Blog", href: "/blog" }, // Novo Link
    { name: "Contacto", href: "/#contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 ${
        isScrolled
          ? "py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Placeholder - Mantendo a identidade visual */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl">M</span>
            {/* <Image src="/logo.jpeg" alt="Logo" className="w-10 h-10" width={20} height={20} /> */}
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Mori&#39;s<span className="text-orange-600">.</span>
          </span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-orange-600 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA e Contacto Rápido */}
        <div className="flex items-center gap-6">
          <Link
            href="tel:938460008"
            className="hidden lg:block text-sm font-semibold text-slate-900"
          >
            938 460 008
          </Link>
          <button
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-slate-900/10"
            onClick={onOpenModal}
          >
            Matrículas Abertas
          </button>
        </div>
      </div>
    </motion.header>
  );
}
