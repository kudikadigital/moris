"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Mori&#39;s<span className="text-orange-600">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6">
              Instituição educacional de vanguarda dedicada ao desenvolvimento
              integral de crianças e adolescentes Moldando os líderes do amanhã,
              hoje.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-slate-50 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {/* <Instagram className="w-5 h-5" /> */}
              </a>
              <a
                href="#"
                className="p-2 bg-slate-50 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {/* <Facebook className="w-5 h-5" /> */}
              </a>
              <a
                href="#"
                className="p-2 bg-slate-50 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {/* <Linkedin className="w-5 h-5" /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-[10px] tracking-[0.2em]">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 font-medium">
              <li>
                <a
                  href="#sobre"
                  className="hover:text-orange-600 transition-colors"
                >
                  A Academia
                </a>
              </li>
              <li>
                <a
                  href="#pilares"
                  className="hover:text-orange-600 transition-colors"
                >
                  Pilares da Formação
                </a>
              </li>
              <li>
                <a
                  href="#cursos"
                  className="hover:text-orange-600 transition-colors"
                >
                  Cursos em Destaque
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="hover:text-orange-600 transition-colors"
                >
                  Matrículas
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-[10px] tracking-[0.2em]">
              Contactos
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="leading-relaxed">
                Benfica, Via Expressa .<br />
                Fronte ao Supermercado Ango Delem .
              </li>
              <li className="font-bold text-slate-900">
                (+244) 938 460 008 <br />
                (+244) 942 061 223
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400">
            © 2026 Academia Mori&#39;s-Reforma. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-widest hover:text-orange-600 transition-colors"
          >
            Voltar ao topo
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-orange-600 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
