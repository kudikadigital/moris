"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EnrollmentForm } from "../EnrollmentForm";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ isOpen, onClose }: EnrollmentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-100 cursor-pointer"
          />

          {/* Container do Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-110 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3.5rem] shadow-2xl pointer-events-auto overflow-hidden"
            >
              {/* Botão Fechar */}
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all z-20"
              >
                <X size={20} />
              </button>

              <div className="max-h-[90vh] overflow-y-auto custom-scrollbar p-2">
                <div className="px-8 pt-12 pb-6 text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-2 block">
                    Inscrições Abertas 2026
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tighter">
                    Inicie a Transformação
                  </h2>
                  <p className="text-slate-500 font-light mt-2 italic text-sm">
                    Preencha os dados abaixo e a nossa equipa pedagógica entrará em contacto.
                  </p>
                </div>

                <div className="pb-8 px-4">
                  <EnrollmentForm />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}