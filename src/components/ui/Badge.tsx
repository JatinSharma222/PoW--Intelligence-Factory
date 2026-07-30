import React from "react";
import { SessionStatus, QualityFlag } from "@/lib/types";

interface StatusBadgeProps {
  status: SessionStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-mono font-medium";

  if (status === "Approved") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        Approved
      </span>
    );
  }

  if (status === "Pending Review") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Pending Review
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        Rejected
      </span>
    );
  }

  if (status === "Discarded") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
        Discarded
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 pulse-dot"></span>
      Recording
    </span>
  );
}

interface QualityBadgeProps {
  flag: QualityFlag;
}

export function QualityBadge({ flag }: QualityBadgeProps) {
  if (flag === "Good") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
        Good
      </span>
    );
  }

  if (flag === "Needs Review") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-amber-950/40 text-amber-300 border border-amber-800/40">
        Needs Review
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-rose-950/40 text-rose-300 border border-rose-800/40">
      Corrupted Frame Detected
    </span>
  );
}
