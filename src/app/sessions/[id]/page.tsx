"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { StatusBadge, QualityBadge } from "@/components/ui/Badge";
import { useSessions } from "@/context/SessionContext";
import { formatDateString } from "@/lib/mock-data";
import { SessionStatus } from "@/lib/types";
import { 
  ChevronLeft, 
  Video, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Clock, 
  MapPin, 
  User, 
  Cpu, 
  Sliders, 
  FileText,
  Activity,
  Check,
  X
} from "lucide-react";

export default function SessionDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getSessionById, updateSessionStatus } = useSessions();

  const session = getSessionById(id);
  const [notes, setNotes] = useState(session?.reviewerNotes || "");

  if (!session) {
    return (
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0B0D]">
        <Header title="Session Detail" />
        <main className="p-8 flex flex-col items-center justify-center flex-1 text-center">
          <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
            <XCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-mono font-bold text-zinc-100 uppercase">
            Session Not Found
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-6">
            The requested session identifier &quot;{id}&quot; does not exist in the recorded telemetry stream.
          </p>
          <Link
            href="/sessions"
            className="px-4 py-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono hover:bg-amber-500/20 transition-all"
          >
            Back to Sessions List
          </Link>
        </main>
      </div>
    );
  }

  const handleAction = (status: SessionStatus) => {
    updateSessionStatus(session.id, status, notes);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0A0B0D]">
      <Header 
        title={`QA Review — ${session.id}`} 
        subtitle="Tactile glove telemetry and visual recording stream validation"
      />

      <main className="p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/sessions"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-amber-500" />
            <span>Return to Sessions Ledger</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">Current Status:</span>
            <StatusBadge status={session.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#16181D] border border-white/[0.08] rounded-lg overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/[0.08] bg-[#111318] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Video className="w-4 h-4 text-amber-500" />
                  <span>Recording Stream Preview (Simulated Dual Camera + Haptic Sync)</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    60 FPS
                  </span>
                  <span>1080p Telemetry</span>
                </div>
              </div>

              <div className="relative aspect-video bg-gradient-to-b from-[#0F1116] to-[#0A0B0D] flex flex-col items-center justify-center p-6 border-b border-white/[0.05] overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="absolute top-4 left-4 border-l-2 border-t-2 border-amber-500/40 w-4 h-4 pointer-events-none"></div>
                <div className="absolute top-4 right-4 border-r-2 border-t-2 border-amber-500/40 w-4 h-4 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-amber-500/40 w-4 h-4 pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-amber-500/40 w-4 h-4 pointer-events-none"></div>

                <div className="z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl group-hover:scale-105 transition-transform">
                    <Video className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-mono font-semibold text-zinc-200 uppercase tracking-wider">
                      Recording Stream Placeholder
                    </div>
                    <div className="text-xs font-mono text-zinc-400 mt-1">
                      {session.taskType} • {session.durationMinutes} Minutes Stream Duration
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-10 text-[11px] font-mono text-zinc-400 bg-black/40 backdrop-blur-md px-4 py-2 rounded border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">00:14:22 / 00:{session.durationMinutes}:00</span>
                    <span className="text-zinc-500">|</span>
                    <span>IMU Data Sync: 99.8%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pressure Array Locked</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#12141A] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Operator</span>
                  <span className="text-zinc-200 font-medium flex items-center gap-1.5 mt-0.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    {session.operator}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Environment</span>
                  <span className="text-zinc-200 font-medium flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {session.environment}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Duration</span>
                  <span className="text-zinc-200 font-medium flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    {session.durationMinutes} minutes
                  </span>
                </div>

                <div>
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block">Task Type</span>
                  <span className="text-amber-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" />
                    {session.taskType}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-100">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Reviewer Notes & Observations</span>
              </div>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add observations regarding glove calibration, grasp posture, or sensor frame dropouts..."
                className="w-full bg-[#0E1014] border border-white/[0.08] rounded-md p-3 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-6 space-y-5">
              <h3 className="text-xs font-mono font-bold tracking-wider text-zinc-100 uppercase border-b border-white/[0.06] pb-3">
                Telemetry & Capture QA Flags
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1.5">
                    Glove Hardware Device IDs
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {session.gloveDeviceIds.map((deviceId) => (
                      <span
                        key={deviceId}
                        className="px-2.5 py-1 rounded bg-[#0E1014] border border-white/[0.08] text-amber-400 font-semibold text-xs flex items-center gap-1"
                      >
                        <Cpu className="w-3 h-3 text-zinc-400" />
                        {deviceId}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1.5">
                    Capture Frame Integrity
                  </span>
                  <QualityBadge flag={session.qualityFlag} />
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1.5">
                    Demonstration Task Result
                  </span>
                  {session.taskSuccess ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Task Execution Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-medium">
                      <X className="w-3.5 h-3.5" />
                      Task Execution Failed / Aborted
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1">
                    Recorded Timestamp
                  </span>
                  <span className="text-zinc-300 font-mono text-xs">
                    {formatDateString(session.recordedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-wider text-zinc-100 uppercase border-b border-white/[0.06] pb-3">
                QA Review Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleAction("Approved")}
                  className={`w-full py-2.5 px-4 rounded-md font-mono text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                    session.status === "Approved"
                      ? "bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20"
                      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve Session</span>
                </button>

                <button
                  onClick={() => handleAction("Rejected")}
                  className={`w-full py-2.5 px-4 rounded-md font-mono text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                    session.status === "Rejected"
                      ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20"
                      : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Session</span>
                </button>

                <button
                  onClick={() => handleAction("Discarded")}
                  className={`w-full py-2.5 px-4 rounded-md font-mono text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                    session.status === "Discarded"
                      ? "bg-zinc-600 text-white border-zinc-500 shadow-lg shadow-zinc-600/20"
                      : "bg-zinc-500/10 hover:bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Discard Session</span>
                </button>
              </div>

              <p className="text-[11px] font-mono text-zinc-500 text-center pt-2">
                Actions immediately modify session status state in memory.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
