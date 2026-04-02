import { Lock, User, Globe, Bell, Save, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tighter italic">
          Configurações<span className="text-orange-600">.</span>System
        </h1>
        <p className="text-slate-500 text-sm font-light mt-1">
          Gere a tua conta e as preferências globais da plataforma.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Menu Lateral de Navegação Interna */}
        <aside className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-600/10 text-orange-500 rounded-xl border border-orange-600/20 text-xs font-black uppercase tracking-widest">
            <User size={16} /> Perfil Admin
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-800/50 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
            <Globe size={16} /> Website Geral
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-800/50 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
            <Bell size={16} /> Notificações
          </button>
        </aside>

        {/* Área de Formulários */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Secção: Perfil */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 backdrop-blur-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="p-3 bg-slate-800 rounded-2xl text-orange-600">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-white font-bold">Segurança da Conta</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Alterar credenciais de acesso</p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email de Acesso</label>
                <input 
                  type="email" 
                  disabled
                  value="info@academiamoris.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-400 text-sm outline-none cursor-not-allowed opacity-60"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nova Palavra-passe</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-orange-600 transition-all"
                />
              </div>

              <button className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
                <Save size={14} /> Atualizar Segurança
              </button>
            </form>
          </section>

          {/* Secção: Status Crítico */}
          <section className="bg-orange-600/5 border border-orange-600/20 rounded-[2rem] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-600/10 rounded-2xl text-orange-600">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h2 className="text-white font-bold">Estado das Matrículas</h2>
                <p className="text-[10px] text-orange-600/70 uppercase tracking-widest font-black">Controlo do Formulário Público</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-orange-600/10">
              <span className="text-sm text-slate-300">As inscrições estão atualmente <strong>Abertas</strong></span>
              <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                Fechar Matrículas
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}