import { prisma } from "@/lib/prisma";
import { LeadRow } from "./LeadRow";
import { Users, Filter } from "lucide-react";

export default async function LeadsAdmin() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="p-8 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter italic flex items-center gap-3">
            Gestão de Leads<span className="text-orange-600">.</span>CRM
          </h1>
          <p className="text-slate-500 text-sm font-light mt-1">Monitorize e converta inscrições da Academia Mori&#39;s.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex items-center gap-2">
           <Filter size={14} className="text-slate-500 ml-2" />
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-4">Filtros Ativos</span>
        </div>
      </header>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 border-b border-slate-800">
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Candidato</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contacto</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Interesse</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Registo</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </tbody>
        </table>
        
        {leads.length === 0 && (
          <div className="p-20 text-center text-slate-600 italic">Nenhum lead registado até ao momento.</div>
        )}
      </div>
    </div>
  );
}