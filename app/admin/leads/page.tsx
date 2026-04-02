export default async function LeadsAdmin() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestão de Leads (CRM)</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Contacto</th>
              <th className="p-4">Origem</th>
              <th className="p-4">Data</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium">{lead.name}</td>
                <td className="p-4 text-slate-500">{lead.email} <br/> {lead.phone}</td>
                <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold">{lead.source}</span></td>
                <td className="p-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                   <select className="bg-transparent font-bold text-orange-600 focus:outline-none">
                     <option>Novo</option>
                     <option>Em Contacto</option>
                     <option>Matriculado</option>
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}