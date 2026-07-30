import React, { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  icon?: ReactNode;
  accentColor?: string;
}

export function StatCard({ label, value, subtext, trend, icon }: StatCardProps) {
  return (
    <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-5 flex flex-col justify-between relative overflow-hidden group hover:border-white/[0.15] transition-all">
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono tracking-wider uppercase text-zinc-400 font-medium">
          {label}
        </span>
        {icon && (
          <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05] text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-500/20 transition-all">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-3xl font-mono font-bold tracking-tight text-zinc-100">
          {value}
        </div>
        {trend && (
          <div
            className={`text-xs font-mono font-medium flex items-center gap-0.5 ${
              trend.positive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            <span>{trend.positive ? "▲" : "▼"}</span>
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {subtext && (
        <div className="mt-2 text-xs font-sans text-zinc-500 font-normal">
          {subtext}
        </div>
      )}

      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/5 to-transparent pointer-events-none rounded-bl-full"></div>
    </div>
  );
}
