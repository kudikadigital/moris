export function SidebarAd() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900 text-white sticky top-24 border border-white/10">
      <div className="w-12 h-1 bg-orange-600 mb-6" />
      <p className="text-xs uppercase tracking-widest  font-bold mb-2 text-orange-600">Newsletter</p>
      <h4 className="text-xl font-bold mb-4">Receba dicas de educação no seu E-mail</h4>
      <input 
        type="email" 
        placeholder="Seu melhor e-mail"
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl mb-4 text-sm focus:outline-none focus:border-orange-600 transition-colors"
      />
      <button className="w-full py-3 bg-orange-600 rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors">
        Subscrever
      </button>
    </div>
  );
}