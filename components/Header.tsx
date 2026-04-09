"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";
import { Phone, Mail, MapPin, Menu, X, ChevronDown } from "lucide-react";

// Alturas fixas em CSS — nunca calculadas em JS durante o scroll
const TOP_BAR_H = 40; // px
const HEADER_H  = 64; // px (fixo, não muda com scroll)

export function Header({
  onOpenModal,
  isModalOpen,
}: {
  onOpenModal: () => void;
  isModalOpen: boolean;
}) {
  const [showTopBar,       setShowTopBar]       = useState(true);
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false);
  const [showMobileContact,setShowMobileContact]= useState(false);

  // Ref para o último Y — não causa re-renders
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y > lastScrollY.current && y > 80) {
        setShowTopBar(false);
      } else if (y < lastScrollY.current) {
        setShowTopBar(true);
      }

      setIsScrolled(y > 50);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // sem dependências → sem re-criação do listener

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "A Academia",         href: "/#sobre" },
    { name: "Pilares",            href: "/#pilares" },
    { name: "Cursos",             href: "/#cursos" },
    { name: "Blog",               href: "/blog" },
    { name: "Perguntas Frequentes", href: "/#faq" },
    { name: "Contacto",           href: "/#contacto" },
  ];

  const socialLinks = [
    { icon: <SiFacebook   className="w-4 h-4" />, href: "https://facebook.com",  label: "Facebook" },
    { icon: <SiInstagram  className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <SlSocialLinkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <SlSocialYoutube  className="w-4 h-4" />, href: "https://youtube.com",  label: "YouTube" },
  ];

  return (
    <>
      {/* ── TOP BAR ────────────────────────────────────────────────────
          Usa translateY via CSS transition em vez de framer-motion
          com valores calculados em JS. Evita o "salto" durante o scroll.
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white border-b border-white/10 transition-transform duration-300 ease-in-out"
        style={{
          height: TOP_BAR_H,
          transform: showTopBar ? "translateY(0)" : `translateY(-${TOP_BAR_H}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          {/* Desktop */}
          <div className="hidden md:flex w-full items-center justify-between text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <a href="tel:938460008" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                <Phone className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white">938 460 008</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="tel:942061223" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                <Phone className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white">942 061 223</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="mailto:info@academiamoris.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                <Mail className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white">info@academiamoris.com</span>
              </a>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300">Benfica, Via Expressa</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider">Siga-nos</span>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-orange-400 transition-all hover:scale-110" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden w-full items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <a href="tel:938460008" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300">938 460 008</span>
              </a>
              <span className="text-slate-700 text-[10px]">•</span>
              <a href="mailto:info@academiamoris.com" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300">info@...</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.slice(0, 2).map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-orange-400 transition-all" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
              <button onClick={() => setShowMobileContact(v => !v)} className="text-slate-400 hover:text-orange-400 transition-colors">
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMobileContact ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile expandable */}
        <AnimatePresence>
          {showMobileContact && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-slate-900 border-t border-white/10 px-4 pb-3"
            >
              <div className="space-y-2 text-xs pt-2">
                <a href="tel:942061223" className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>942 061 223</span>
                </a>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Benfica, Via Expressa (Em frente ao Supermercado Ango Delem)</span>
                </div>
                <div className="flex gap-3 pt-1">
                  {socialLinks.slice(2).map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-slate-400 hover:text-orange-400 transition-all" aria-label={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MAIN HEADER ────────────────────────────────────────────────
          top é CSS transition, não calculado em JS a cada scroll event.
          Quando a top bar some, o header desliza suavemente para cima.
      ──────────────────────────────────────────────────────────────── */}
      <header
        className={`
          fixed left-0 right-0 z-40
          transition-[top,background-color,box-shadow,padding] duration-300 ease-in-out
          ${isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-2"
            : "bg-white py-3"
          }
          ${isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
        style={{
          top: showTopBar ? TOP_BAR_H : 0,
          height: HEADER_H,
        }}
      >
        <div className="px-4 md:px-6 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="h-8 flex items-center group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-t.png"
                  alt="Mori's Logo"
                  width={100}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-orange-600 transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-6">
              <a href="tel:938460008" className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors">
                <Phone className="w-4 h-4" />
                938 460 008
              </a>
              <button
                onClick={onOpenModal}
                className="px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-slate-900/10 active:scale-95"
              >
                Matrículas Abertas
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-900 hover:bg-orange-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.28 }}
        className="fixed right-0 bottom-0 w-full max-w-sm z-40 bg-white shadow-2xl md:hidden overflow-y-auto"
        style={{
          top: showTopBar ? TOP_BAR_H + HEADER_H : HEADER_H,
        }}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-slate-800 hover:text-orange-600 transition-colors py-3 border-b border-slate-100"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-100">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-4">Redes Sociais</p>
            <div className="flex gap-4">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all"
                  aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              className="w-full py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-orange-600 transition-all"
              onClick={() => { onOpenModal(); setMobileMenuOpen(false); }}
            >
              Matrículas Abertas
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── ESPAÇADOR ─────────────────────────────────────────────────
          Altura fixa = top bar + header.
          Usa CSS transition para sincronizar com o header.
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="transition-[height] duration-300 ease-in-out"
        style={{ height: showTopBar ? TOP_BAR_H + HEADER_H : HEADER_H }}
        aria-hidden="true"
      />
    </>
  );
}
