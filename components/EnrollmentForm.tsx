// components/EnrollmentForm.tsx — VERSÃO ACTUALIZADA
// Carrega cursos dinamicamente da base de dados
// Aceita preselectedCourse para pré-seleccionar a partir da página do curso

"use client";

import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, BookOpen, Send, CheckCircle2 } from "lucide-react";
import { LeadState, registerLead } from "@/lib/actions/leads";

const initialState: LeadState = { message: "", error: false };

interface Course {
  id: string;
  title: string;
}

interface EnrollmentFormProps {
  preselectedCourse?: string;
}

export function EnrollmentForm({ preselectedCourse }: EnrollmentFormProps) {
  const [state, formAction, isPending] = useActionState(registerLead, initialState);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Carrega os cursos disponíveis da API
  useEffect(() => {
    fetch("/api/cursos")
      .then((r) => r.json())
      .then((data: Course[]) => {
        setCourses(data);
        setLoadingCourses(false);
      })
      .catch(() => {
        // Fallback se a API falhar
        setCourses([
          { id: "1", title: "Oratória e Retórica Infantil" },
          { id: "2", title: "Programa Líderes do Futuro" },
          { id: "3", title: "Conexão Pais e Filhos" },
          { id: "4", title: "Inteligência Emocional" },
          { id: "5", title: "Etiqueta e Postura" },
        ]);
        setLoadingCourses(false);
      });
  }, []);

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 text-center bg-emerald-50 rounded-[2.5rem] border border-emerald-100"
      >
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Inscrição Recebida!</h3>
        <p className="text-slate-600 font-light italic">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome Completo */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
            <User size={12} className="text-orange-600" /> Nome do Encarregado / Aluno
          </label>
          <input
            name="name"
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
            <Mail size={12} className="text-orange-600" /> E-mail de Contacto
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900"
          />
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
            <Phone size={12} className="text-orange-600" /> Telefone / WhatsApp
          </label>
          <input
            name="phone"
            required
            placeholder="+244"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900"
          />
        </div>

        {/* Seleção de Curso — dinâmico da DB */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
            <BookOpen size={12} className="text-orange-600" /> Curso de Interesse
          </label>
          <select
            name="course"
            disabled={loadingCourses}
            defaultValue={preselectedCourse ?? ""}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900 appearance-none cursor-pointer font-bold disabled:opacity-50"
          >
            <option value="" disabled>
              {loadingCourses ? "A carregar cursos..." : "Seleccione um curso"}
            </option>
            {courses.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
          Observações ou Dúvidas
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:border-orange-600 focus:bg-white transition-all text-slate-900 resize-none"
        />
      </div>

      {state.error && (
        <p className="text-red-500 text-xs font-bold ml-4 italic">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending || loadingCourses}
        className="w-full py-5 bg-slate-900 hover:bg-orange-600 disabled:bg-slate-200 text-white font-black rounded-full transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 uppercase tracking-[0.2em] text-xs"
      >
        {isPending ? "A enviar..." : (
          <>
            Confirmar Pré-Inscrição <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
}
