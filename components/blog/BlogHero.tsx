"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function BlogHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="inline-block mb-4 px-4 py-1 bg-orange-100 rounded-full">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Blog Academia Moris
        </span>
      </div>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 mb-6">
        Vozes <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">da</span> Reforma
      </h1>
      
      <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-8">
        Reflexões, metodologias e histórias reais sobre a formação de pequenos grandes líderes
      </p>

      {/* Barra de Pesquisa */}
      <div className="max-w-md mx-auto relative">
        <input 
          type="text" 
          placeholder="Buscar artigos..."
          className="w-full px-6 py-3 pl-12 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>
    </motion.div>
  );
}

export function AdBanner({ ad, variant = "hero" }: { ad: any; variant?: "hero" | "sidebar" | "between" }) {
  const variants = {
    hero: "w-full h-32 md:h-40",
    sidebar: "w-full h-64",
    between: "w-full h-24"
  };

  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className={`${variants[variant]} relative rounded-xl overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 hover:shadow-lg transition-shadow`}>
        {ad.imageUrl ? (
          <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-slate-400 text-sm">Publicidade</span>
          </div>
        )}
        <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">
          Anúncio
        </span>
      </div>
    </a>
  );
}