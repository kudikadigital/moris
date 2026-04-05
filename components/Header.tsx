"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";
import { Phone, Mail, MapPin, Menu, X, ChevronDown } from "lucide-react";

export function Header({
  onOpenModal,
  isModalOpen,
}: {
  onOpenModal: () => void;
  isModalOpen: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileContact, setShowMobileContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Top bar desaparece ao rolar para baixo e aparece ao rolar para cima
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowTopBar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowTopBar(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevenir scroll do body quando menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "A Academia", href: "/#sobre" },
    { name: "Pilares", href: "/#pilares" },
    { name: "Cursos", href: "/#cursos" },
    { name: "Blog", href: "/blog" },
    { name: "Perguntas Frequentes", href: "/#faq" },
    { name: "Contacto", href: "/#contacto" },
  ];

  const socialLinks = [
    { icon: <SiFacebook className="w-4 h-4" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <SiInstagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <SlSocialLinkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <SlSocialYoutube className="w-4 h-4" />, href: "https://youtube.com", label: "YouTube" },
  ];

  const topBarHeight = showTopBar ? 40 : 0;
  const headerHeight = isScrolled ? 56 : 64;

  return (
    <>
      {/* TOP BAR - Informações de Contato e Redes Sociais - AGORA VISÍVEL NO MOBILE */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ 
          y: showTopBar ? 0 : -100,
          opacity: showTopBar ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-2 text-xs">
            {/* Informações de Contato - Esquerda */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="tel:938460008" 
                className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white">938 460 008</span>
              </a>
              <span className="text-slate-700">|</span>
              <a 
                href="tel:942061223" 
                className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white">942 061 223</span>
              </a>
              <span className="text-slate-700">|</span>
              <a 
                href="mailto:info@academiamoris.com" 
                className="flex items-center gap-2 hover:text-orange-400 transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300 group-hover:text-white">info@academiamoris.com</span>
              </a>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300">Benfica, Via Expressa</span>
              </div>
            </div>

            {/* Redes Sociais - Direita */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider">Siga-nos</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-orange-400 transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Layout - Top Bar simplificada */}
          <div className="flex md:hidden items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              <a 
                href="tel:938460008" 
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300">938 460 008</span>
              </a>
              <span className="text-slate-700 text-[10px]">•</span>
              <a 
                href="mailto:info@academiamoris.com" 
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300 truncate max-w-[150px]">info@...</span>
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              {socialLinks.slice(0, 2).map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-orange-400 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
              <button
                onClick={() => setShowMobileContact(!showMobileContact)}
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMobileContact ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mobile Expandable Contact Info */}
          {showMobileContact && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-2 pt-2 border-t border-white/10"
            >
              <div className="space-y-2 text-xs">
                <a 
                  href="tel:942061223" 
                  className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>942 061 223</span>
                </a>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Benfica, Via Expressa (Em frente ao Supermercado Ango Delem)</span>
                </div>
                <div className="flex gap-3 pt-1">
                  {socialLinks.slice(2).map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-orange-400 transition-all"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* MAIN NAVIGATION */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: isModalOpen ? -100 : 0, 
          opacity: isModalOpen ? 0 : 1 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "py-3 bg-white"
        }`}
        style={{ 
          top: `${topBarHeight}px`,
        }}
      >
        <div className="px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
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

            {/* Desktop Navigation */}
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

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="tel:938460008"
                className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                938 460 008
              </Link>
              <button
                className="px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-slate-900/10 active:scale-95"
                onClick={onOpenModal}
              >
                Matrículas Abertas
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-900 hover:bg-orange-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-40 bg-white shadow-2xl md:hidden overflow-y-auto"
        style={{ top: `${topBarHeight + headerHeight}px`, height: `calc(100% - ${topBarHeight + headerHeight}px)` }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Navigation Links */}
          <nav className="flex-1 p-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-orange-600 transition-colors py-3 border-b border-slate-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Social Links */}
          <div className="p-6 border-t border-slate-100">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-4">Redes Sociais</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-orange-500 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile CTA Button */}
          <div className="p-6 pt-0">
            <button
              className="w-full py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-orange-600 transition-all"
              onClick={() => {
                onOpenModal();
                setMobileMenuOpen(false);
              }}
            >
              Matrículas Abertas
            </button>
          </div>
        </div>
      </motion.div>

      {/* Espaçador para compensar o header fixo */}
      <div style={{ height: `${topBarHeight + headerHeight}px` }} className="transition-all duration-300" />
    </>
  );
}