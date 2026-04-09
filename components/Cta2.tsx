"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Quote, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA2() {
  // Função para gerar link do WhatsApp com mensagem pré-preenchida
  const getWhatsAppLink = () => {
    const phoneNumber = "244938460008";
    const message = encodeURIComponent(
      "Olá! Vi o site da Academia Moris-Reforma e gostaria de mais informações sobre os cursos para meu filho(a). Podem me ajudar?"
    );
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <section id="contacto" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-linear-to-br from-slate-50 to-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          {/* Elementos Decorativos de Fundo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
          
          {/* Padrão de Pontos Sutil */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            {/* Frase de Destaque - Citação */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
                <Quote className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 max-w-4xl mx-auto leading-relaxed">
                <span className="text-orange-600">&quot;</span>
                A reforma do mundo começa pela educação das nossas crianças.
                <span className="text-orange-600">&quot;</span>
              </h3>
              <p className="text-slate-500 text-lg mt-4 font-medium">
                — Academia Moris-Reforma
              </p>
            </motion.div>

            {/* Linha Divisória Decorativa */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-20 bg-linear-to-r from-transparent to-orange-300" />
              <Sparkles className="w-5 h-5 text-orange-400" />
              <div className="h-px w-20 bg-linear-to-l from-transparent to-orange-300" />
            </div>

            {/* Conteúdo Principal em Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Lado Esquerdo - Título e Descrição */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  O SEU FILHO ESTÁ PREPARADO PARA{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-500">
                    LIDERAR O FUTURO?
                  </span>
                </h2>
                
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Não ensinamos apenas matérias, formamos protagonistas. 
                  Pequenos grandes líderes, grandes transformações começam aqui.
                </p>

                {/* Features */}
                <div className="space-y-4 mb-10">
                  {[
                    "Metodologia ativa e vivencial",
                    "Mentores especializados em desenvolvimento infantil",
                    "Ambiente seguro e acolhedor",
                    "Resultados comprovados em 3 meses"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Botões CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={getWhatsAppLink()}
                    target="_blank"
                    className="group relative px-8 py-4 bg-linear-to-r from-orange-600 to-orange-500 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Quero formar meu filho
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="tel:938460008"
                    target="_blank"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    <Phone className="w-5 h-5" />
                    Ligar Agora
                  </Link>
                </div>

                {/* Indicador de mensagem pré-preenchida */}
                <p className="text-xs text-slate-400 mt-4 text-center sm:text-left">
                  💬 Clique e já enviamos uma mensagem pronta para você
                </p>
              </motion.div>

              {/* Lado Direito - Informações de Contato */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    Venha nos Conhecer
                  </h3>

                  <div className="space-y-6">
                    {/* Localização */}
                    <div className="group">
                      <div className="text-slate-500 text-sm mb-2 uppercase tracking-wider font-semibold flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-500" />
                        Localização
                      </div>
                      <p className="text-slate-800 text-lg font-medium">
                        Benfica, Via Expressa
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        Em frente ao Supermercado Ango Delem
                      </p>
                    </div>

                    {/* Contato */}
                    <div className="group">
                      <div className="text-slate-500 text-sm mb-2 uppercase tracking-wider font-semibold flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-500" />
                        Contactos
                      </div>
                      <div className="space-y-2">
                        <a 
                          href="tel:938460008" 
                          className="block text-slate-800 text-lg font-medium hover:text-orange-600 transition-colors"
                        >
                          938 460 008
                        </a>
                        <a 
                          href="tel:942061223" 
                          className="block text-slate-800 text-lg font-medium hover:text-orange-600 transition-colors"
                        >
                          942 061 223
                        </a>
                      </div>
                    </div>

                    {/* Horário */}
                    <div className="group">
                      <div className="text-slate-500 text-sm mb-2 uppercase tracking-wider font-semibold flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-500" />
                        Horário de Funcionamento
                      </div>
                      <p className="text-slate-800">
                        Segunda a Sexta: 8h às 18h
                      </p>
                      <p className="text-slate-800">
                        Sábado: 9h às 13h
                      </p>
                    </div>

                    {/* WhatsApp Direto com mensagem */}
                    {/* <div className="pt-6 mt-4 border-t border-slate-100">
                      <Link
                        href={getWhatsAppLink()}
                        target="_blank"
                        className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 hover:from-green-100 hover:to-emerald-100 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Fale conosco</p>
                            <p className="text-xs text-slate-500">Resposta rápida via WhatsApp</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div> */}

                    {/* Badge de Diferencial */}
                    <div className="pt-2">
                      <div className="bg-linear-to-r from-orange-50 to-transparent rounded-xl p-4">
                        <p className="text-orange-700 font-medium italic text-sm leading-relaxed">
                          💡 &quot;Não apenas ensinamos, inspiramos. Cada criança sai daqui preparada para transformar o mundo.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}