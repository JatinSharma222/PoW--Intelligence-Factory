"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ListFilter, 
  Grid3X3, 
  Activity, 
  Cpu, 
  Layers 
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Sessions",
      href: "/sessions",
      icon: ListFilter,
    },
    {
      name: "Coverage",
      href: "/coverage",
      icon: Grid3X3,
    },
  ];

  return (
    <aside className="w-64 bg-[#0E1014] border-r border-white/[0.08] flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40">
      <div>
        <div className="p-5 border-b border-white/[0.08] flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-zinc-100 uppercase">
              Intelligence Factory
            </div>
            <div className="text-[10px] font-mono text-zinc-400 tracking-wide uppercase">
              Data Ops Control Tower
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-zinc-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/[0.08] bg-[#0A0B0D]/50 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ingest Stream</span>
          </span>
          <span className="text-emerald-400 font-semibold">Active</span>
        </div>

        <div className="p-2.5 rounded bg-[#14161C] border border-white/[0.05] flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-zinc-200 font-medium">
              System Operational
            </span>
            <span className="text-[9px] font-mono text-zinc-500">
              0 drop frames / 24h
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
