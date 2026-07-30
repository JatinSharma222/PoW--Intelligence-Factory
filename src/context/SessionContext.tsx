"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Session, SessionStatus } from "@/lib/types";
import { MOCK_SESSIONS } from "@/lib/mock-data";

interface ToastInfo {
  id: number;
  message: string;
  type: "success" | "warning" | "info" | "error";
}

interface SessionContextType {
  sessions: Session[];
  updateSessionStatus: (id: string, status: SessionStatus, reviewerNotes?: string) => void;
  getSessionById: (id: string) => Session | undefined;
  toasts: ToastInfo[];
  addToast: (message: string, type?: "success" | "warning" | "info" | "error") => void;
  removeToast: (id: number) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const addToast = (message: string, type: "success" | "warning" | "info" | "error" = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSessionStatus = (id: string, status: SessionStatus, reviewerNotes?: string) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) => {
        if (session.id === id) {
          return {
            ...session,
            status,
            reviewerNotes: reviewerNotes !== undefined ? reviewerNotes : session.reviewerNotes,
          };
        }
        return session;
      })
    );

    let toastType: "success" | "warning" | "info" | "error" = "info";
    if (status === "Approved") toastType = "success";
    if (status === "Rejected") toastType = "error";
    if (status === "Discarded") toastType = "warning";

    addToast(`Session ${id} status updated to ${status}`, toastType);
  };

  const getSessionById = (id: string) => {
    return sessions.find((s) => s.id === id);
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        updateSessionStatus,
        getSessionById,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessions() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessions must be used within a SessionProvider");
  }
  return context;
}
