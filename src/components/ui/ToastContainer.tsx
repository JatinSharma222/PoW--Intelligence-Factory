"use client";

import React from "react";
import { useSessions } from "@/context/SessionContext";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useSessions();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = "border-zinc-800 bg-[#16181D]";
        let icon = <Info className="w-4 h-4 text-sky-400" />;

        if (toast.type === "success") {
          borderClass = "border-emerald-500/30 bg-[#121E17]";
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        } else if (toast.type === "error") {
          borderClass = "border-rose-500/30 bg-[#221417]";
          icon = <XCircle className="w-4 h-4 text-rose-400" />;
        } else if (toast.type === "warning") {
          borderClass = "border-amber-500/30 bg-[#221C12]";
          icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-md border shadow-2xl transition-all duration-200 animate-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-200">
              {icon}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-white/[0.05]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
