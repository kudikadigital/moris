export function AdBannerInline() {
  return (
    <div className="my-12 p-8 rounded-[2.5rem] bg-orange-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="z-10">
        <h4 className="text-2xl font-bold mb-2">Vagas Limitadas para Abril</h4>
        <p className="text-orange-100 font-light text-sm">Matricule o seu filho hoje e garanta 15% de desconto na primeira propina.</p>
      </div>
      <button className="whitespace-nowrap px-8 py-4 bg-white text-orange-600 font-black rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95 z-10">
        RESERVAR AGORA
      </button>
    </div>
  );
}