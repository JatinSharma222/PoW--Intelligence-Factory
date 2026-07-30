"use client";

import React, { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { useSessions } from "@/context/SessionContext";
import { getCoverageMatrix, getCoverageGaps, TASK_TYPES, ENVIRONMENTS } from "@/lib/mock-data";
import { AlertTriangle, ShieldAlert, Layers, CheckCircle2 } from "lucide-react";

export default function CoveragePage() {
  const { sessions } = useSessions();

  const matrixCells = useMemo(() => getCoverageMatrix(sessions), [sessions]);
  const coverageGaps = useMemo(() => getCoverageGaps(matrixCells), [matrixCells]);

  const getCellData = (taskType: string, environment: string) => {
    return matrixCells.find(
      (c) => c.taskType === taskType && c.environment === environment
    ) || {
      taskType,
      environment,
      hoursCaptured: 0,
      targetHours: 40,
      sessionCount: 0,
    };
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0A0B0D]">
      <Header 
        title="Coverage & Diversity Matrix" 
        subtitle="Tracking data volume & task diversity distribution across operational environments"
      />

      <main className="p-8 space-y-8 flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Priority Data Coverage Gaps (Action Required)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coverageGaps.map((gap, idx) => (
              <div
                key={idx}
                className="bg-[#1C1616] border border-rose-500/30 rounded-lg p-4 flex items-start gap-3 shadow-lg"
              >
                <div className="p-2 rounded bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-zinc-100 uppercase">
                    {gap.taskType}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    {gap.environment}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-mono">
                    <span className="text-rose-400 font-bold">{gap.currentHours}h</span>
                    <span className="text-zinc-500">/ {gap.targetHours}h target</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      {Math.round((gap.currentHours / gap.targetHours) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold tracking-wider text-zinc-100 uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                Task Type × Environment Coverage Grid
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Heatmap density indicator reflecting captured demonstration hours per domain pair
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500/40"></span>
                <span className="text-zinc-400">&lt; 20h (Critical Gap)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/40"></span>
                <span className="text-zinc-400">20h - 35h (Moderate)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40"></span>
                <span className="text-zinc-400">&gt; 35h (Sufficient)</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#0E1014]/80 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-4 px-4 w-48 font-semibold">Task Type</th>
                  {ENVIRONMENTS.map((env) => (
                    <th key={env} className="py-4 px-4 font-semibold text-center">
                      {env}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs font-sans">
                {TASK_TYPES.map((task) => (
                  <tr key={task} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-zinc-200 uppercase bg-[#0E1014]/40">
                      {task}
                    </td>

                    {ENVIRONMENTS.map((env) => {
                      const cell = getCellData(task, env);
                      const percent = Math.min(
                        Math.round((cell.hoursCaptured / cell.targetHours) * 100),
                        100
                      );

                      let bgStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                      let barStyle = "bg-emerald-500";

                      if (cell.hoursCaptured < 20) {
                        bgStyle = "bg-rose-500/15 border-rose-500/40 text-rose-300";
                        barStyle = "bg-rose-500";
                      } else if (cell.hoursCaptured < 35) {
                        bgStyle = "bg-amber-500/15 border-amber-500/40 text-amber-300";
                        barStyle = "bg-amber-500";
                      }

                      return (
                        <td key={env} className="p-3 text-center">
                          <div className={`p-3.5 rounded-lg border flex flex-col justify-between h-24 group hover:scale-[1.02] transition-transform ${bgStyle}`}>
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="font-bold text-sm">{cell.hoursCaptured}h</span>
                              <span className="text-[10px] text-zinc-400 font-normal">
                                / {cell.targetHours}h
                              </span>
                            </div>

                            <div className="text-[10px] font-mono text-zinc-400 text-left">
                              {cell.sessionCount} sessions recorded
                            </div>

                            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-1">
                              <div
                                className={`h-full rounded-full ${barStyle}`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENVIRONMENTS.map((env) => {
            const envCells = matrixCells.filter((c) => c.environment === env);
            const totalHours = envCells.reduce((acc, c) => acc + c.hoursCaptured, 0);
            const targetTotal = envCells.reduce((acc, c) => acc + c.targetHours, 0);
            const progressPct = Math.round((totalHours / targetTotal) * 100);

            return (
              <div key={env} className="bg-[#16181D] border border-white/[0.08] rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-zinc-200 uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>{env}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {totalHours}h / {targetTotal}h ({progressPct}%)
                  </span>
                </div>

                <div className="w-full bg-[#0E1014] h-2 rounded-full overflow-hidden border border-white/[0.05]">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
