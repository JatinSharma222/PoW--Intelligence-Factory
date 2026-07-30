"use client";

import React from "react";
import { Clock, RefreshCw, Radio } from "lucide-react";
import { useSessions } from "@/context/SessionContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { sessions } = useSessions();
  const recordingCount = sessions.filter((s) => s.status === "Recording").length;

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0E1014]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-base font-mono font-bold tracking-tight text-zinc-100 uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs font-sans text-zinc-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {recordingCount > 0 && (
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{recordingCount} Live Sessions</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#16181D] px-3 py-1.5 rounded border border-white/[0.06]">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Last sync: 2m ago</span>
          <RefreshCw className="w-3 h-3 text-zinc-500 ml-1 cursor-pointer hover:text-zinc-300 transition-colors" />
        </div>
      </div>
    </header>
  );
}
