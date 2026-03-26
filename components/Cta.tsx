"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-slate-900 rounded-[3rem] p-8 md:p-20 overflow-hidden">
          {/* Elemento Visual de Fundo */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-orange-600/20 to-transparent opacity-50" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                O seu filho está preparado para <span className="text-orange-500">liderar</span> o futuro?
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-md">
                Não ensinamos apenas matérias, formamos protagonistas. Pequenos grandes líderes, grandes transformações.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/244938460008" 
                  className="flex items-center gap-3 px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inscrever no WhatsApp
                </a>
                <a 
                  href="tel:938460008" 
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5" />
                  Ligar Agora
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Onde nos encontrar
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Localização</p>
                  <p className="text-white text-lg">Benfica, Via Expressa</p>
                  <p className="text-slate-400 text-sm italic">De fronte ao Supermercado Ango Delem</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-bold">Terminais</p>
                  <p className="text-white text-lg">938 460 008 / 942 061 223</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-orange-500 font-medium italic">&#34;A reforma do mundo começa pela educação.&#34;</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}