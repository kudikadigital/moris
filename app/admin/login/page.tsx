"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/lib/actions/auth";

const initialState = { message: "", error: false };

export default function LoginAdmin() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      {/* Elementos Visuais de Fundo (Cyber Style) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-orange-600/10 rounded-2xl mb-4 border border-orange-600/20">
            <ShieldCheck className="text-orange-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tighter italic">
            Mori&#39;s<span className="text-orange-600">.</span>Admin
          </h1>
          <p className="text-slate-500 text-xs uppercase tracking-[0.3em] font-bold mt-2">
            Acesso Restrito
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {state.message && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs font-bold text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20"
            >
              {state.message}
            </motion.p>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-600 transition-colors" size={18} />
              <input 
                name="email"
                type="email"
                placeholder="Email Institucional"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-orange-600 transition-all text-white placeholder:text-slate-700"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-600 transition-colors" size={18} />
              <input 
                name="password"
                type="password"
                placeholder="Palavra-passe"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-orange-600 transition-all text-white placeholder:text-slate-700"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-800 text-white font-black rounded-full transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-lg shadow-orange-600/10"
          >
            {isPending ? (
              <span className="animate-pulse">A VALIDAR...</span>
            ) : (
              <>
                ENTRAR NO PAINEL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-600 text-[10px] uppercase tracking-widest mt-8 font-bold">
          Sistema de Gestão Interna • Luanda 2026
        </p>
      </motion.div>
    </main>
  );
}