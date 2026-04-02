"use client";

import { updateLeadStatus } from "@/lib/actions/leads";
import { Phone, Mail, MessageCircle } from "lucide-react";

export function LeadRow({ lead }: { lead: any }) {
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateLeadStatus(lead.id, e.target.value);
  };

  const whatsappLink = `https://wa.me/${lead.phone?.replace(/\D/g, "")}`;

  return (
    <tr className="hover:bg-slate-800/30 transition-colors group border-b border-slate-800/50">
      <td className="p-5">
        <div className="font-bold text-white group-hover:text-orange-500 transition-colors">{lead.name}</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1 italic">ID: {lead.id.slice(-6)}</div>
      </td>
      <td className="p-5 text-slate-400">
        <div className="flex items-center gap-2 text-xs mb-1">
          <Mail size={12} className="text-slate-600" /> {lead.email}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone size={12} className="text-slate-600" /> {lead.phone}
        </div>
      </td>
      <td className="p-5">
        <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest">
          {lead.source}
        </span>
      </td>
      <td className="p-5 text-slate-500 text-xs font-medium">
        {new Date(lead.createdAt).toLocaleDateString('pt-AO')}
      </td>
      <td className="p-5">
        <select 
          defaultValue={lead.status}
          onChange={handleStatusChange}
          className={`bg-slate-950 border border-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl focus:outline-none focus:border-orange-600 cursor-pointer transition-all ${
            lead.status === 'Novo' ? 'text-orange-500' : lead.status === 'Matriculado' ? 'text-emerald-500' : 'text-slate-400'
          }`}
        >
          <option value="Novo">Novo</option>
          <option value="Em Contacto">Em Contacto</option>
          <option value="Matriculado">Matriculado</option>
          <option value="Arquivado">Arquivado</option>
        </select>
      </td>
      <td className="p-5 text-right">
        <a 
          href={whatsappLink} 
          target="_blank"
          className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white p-2 rounded-lg transition-all"
          title="Falar no WhatsApp"
        >
          <MessageCircle size={16} />
        </a>
      </td>
    </tr>
  );
}