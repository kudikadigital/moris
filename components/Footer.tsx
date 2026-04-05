"use client";

import Link from "next/link";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1: Branding */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <div className="h-8 flex items-center">
                <Image
                  src="/logo-t.png"
                  alt="Mori's Logo"
                  width={120}
                  height={32}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Elevando o potencial da nova geração em Angola através da
              comunicação, liderança e ética.
            </p>

            {/* Redes Sociais */}
            {/* <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-600 transition-colors"
              >
                <SiInstagram size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-600 transition-colors"
              >
                <SiFacebook size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-600 transition-colors"
              >
                <SlSocialLinkedin size={18} />
              </Link>
            </div> */}
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">
              Institucional
            </h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link
                  href="/#sobre"
                  className="hover:text-orange-600 transition-colors"
                >
                  A Academia
                </Link>
              </li>
              <li>
                <Link
                  href="/#metodologia"
                  className="hover:text-orange-600 transition-colors"
                >
                  Metodologia
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-orange-600 font-bold text-slate-900"
                >
                  Blog & Pensamento
                </Link>
              </li>
              <li>
                <Link
                  href="/#carreiras"
                  className="hover:text-orange-600 transition-colors"
                >
                  Trabalhe Connosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Cursos Populares */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">
              Formações
            </h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link
                  href="/#cursos"
                  className="hover:text-orange-600 transition-colors"
                >
                  Oratória Infantil
                </Link>
              </li>
              <li>
                <Link
                  href="/#cursos"
                  className="hover:text-orange-600 transition-colors"
                >
                  Liderança Teen
                </Link>
              </li>
              <li>
                <Link
                  href="/#cursos"
                  className="hover:text-orange-600 transition-colors"
                >
                  Etiqueta Social
                </Link>
              </li>
              <li>
                <Link
                  href="/#cursos"
                  className="hover:text-orange-600 transition-colors"
                >
                  Inteligência Emocional
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contacto & Localização */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">
              Onde Estamos
            </h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex gap-3">
                <MapPin size={18} className="text-orange-600 shrink-0" />
                <span>
                  Luanda, Benfica
                  <br />
                  Via Expressa, Próximo ao Kero
                </span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-orange-600 shrink-0" />
                <span>info@academiamoris.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
          <p>
            © {currentYear + " "} Academia Mori&#39;s-Reforma. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="hover:text-slate-900">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-slate-900">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
