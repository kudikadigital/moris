"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CourseCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tag?: string;
  icon?: React.ReactNode;
  duration?: string;
  level?: string;
  students?: number;
  href: string;
  variant?: "default" | "compact" | "featured";
}

export function CourseCard({
  id,
  title,
  description,
  image,
  tag,
  icon,
  duration = "8 semanas",
  level = "Iniciante",
  students,
  href,
  variant = "default",
}: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link href={href} className="block group/card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-slate-900 cursor-pointer"
      >
        {/* Imagem de fundo */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
          />
          
          {/* Overlay escuro para contraste do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          {/* Tag no topo (se existir) */}
          {tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full shadow-lg">
                {tag}
              </span>
            </div>
          )}

          {/* Ícone no topo direito (se existir) */}
          {icon && (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-orange-500">
                {icon}
              </div>
            </div>
          )}

          {/* Conteúdo principal sempre visível */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover/card:text-orange-500 transition-colors">
              {title}
            </h3>
            <p className="text-slate-300 text-sm line-clamp-2">{description}</p>
          </div>

          {/* Conteúdo expandido no hover (blur no bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-6 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300"
          >
            {/* Métricas do curso */}
            <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
              {duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{duration}</span>
                </div>
              )}
              {level && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span>{level}</span>
                </div>
              )}
              {students && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{students}+ alunos</span>
                </div>
              )}
            </div>

            {/* Botão de inscrição */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = href;
              }}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
            >
              Inscrever-se agora
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}