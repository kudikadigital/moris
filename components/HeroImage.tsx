"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function HeroImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  // Função para scroll suave até os depoimentos
  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById('depoimentos');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Função para scroll suave até os cursos
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('cursos');
    if (coursesSection) {
      coursesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative w-full min-h-[70vh] overflow-hidden bg-slate-950"
    >
      {/* Container com parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <Image
          src="/bg2.jpg"
          alt="Background decorativo"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </motion.div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full min-h-[70vh] flex items-center justify-center px-6">
        <motion.div 
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-orange-500 uppercase bg-orange-500/10 rounded-full backdrop-blur-sm"
          >
            Transformação Real
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            O Futuro Começa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
              Aqui e Agora
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Mais de 1000 jovens já transformaram suas vidas através dos nossos programas.
            Prepare seu filho para um futuro de sucesso e protagonismo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={scrollToCourses}
              className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-all transform hover:scale-105"
            >
              Conhecer Cursos
            </button>
            <button 
              onClick={scrollToTestimonials}
              className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full transition-all border border-white/20"
            >
              Ver Depoimentos
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}