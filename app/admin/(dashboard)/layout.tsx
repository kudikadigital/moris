"use client";

import LogoutBtn from "@/components/admin/Logout";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Leads (CRM)", icon: Users, href: "/admin/leads" },
  { label: "Blog (CMS)", icon: FileText, href: "/admin/blog" },
  { label: "Configurações", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar Lateral */}
      <aside className="w-72 bg-slate-900/50 border-r border-slate-800 flex flex-col sticky top-0 h-screen">
        {/* Logo Section */}
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600 rounded-xl shadow-lg shadow-orange-600/20">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tighter italic">
                Mori&#39;s<span className="text-orange-600">.</span>Admin
              </h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                Controlo Total
              </p>
            </div>
          </div>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 p-6 space-y-2">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 ml-2">
            Menu Principal
          </p>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/10"
                    : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"
                }`}
              >
                <item.icon
                  size={18}
                  className={
                    isActive
                      ? "text-white"
                      : "group-hover:text-orange-600 transition-colors"
                  }
                />
                <span className="text-sm font-bold">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </Link>
            );
          })}

          <div className="pt-8 space-y-2">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 ml-2">
              Ações Rápidas
            </p>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-orange-600 transition-colors text-sm font-bold"
            >
              <PlusCircle size={18} /> Novo Artigo
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-orange-600 transition-colors text-sm font-bold"
            >
              <ExternalLink size={18} /> Ver Site (Live)
            </Link>
          </div>
        </nav>

        {/* Footer Sidebar / Logout */}
        <div className="p-6 border-t border-slate-800">
         <LogoutBtn />
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 h-screen overflow-y-auto bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
