"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { StatusBadge, QualityBadge } from "@/components/ui/Badge";
import { useSessions } from "@/context/SessionContext";
import { TASK_TYPES, ENVIRONMENTS, formatDateString } from "@/lib/mock-data";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Clock
} from "lucide-react";

export default function SessionsPage() {
  const { sessions } = useSessions();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedTaskType, setSelectedTaskType] = useState<string>("ALL");
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchesSearch =
        session.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "ALL" || session.status === selectedStatus;

      const matchesTaskType =
        selectedTaskType === "ALL" || session.taskType === selectedTaskType;

      const matchesEnvironment =
        selectedEnvironment === "ALL" || session.environment === selectedEnvironment;

      return matchesSearch && matchesStatus && matchesTaskType && matchesEnvironment;
    });
  }, [sessions, searchQuery, selectedStatus, selectedTaskType, selectedEnvironment]);

  const totalPages = Math.ceil(filteredSessions.length / pageSize) || 1;
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSessions.slice(start, start + pageSize);
  }, [filteredSessions, currentPage, pageSize]);

  const totalFilteredMinutes = useMemo(() => {
    return filteredSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  }, [filteredSessions]);

  const totalFilteredHours = Math.round((totalFilteredMinutes / 60) * 10) / 10;

  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
    setCurrentPage(1);
  };

  const handleTaskTypeChange = (val: string) => {
    setSelectedTaskType(val);
    setCurrentPage(1);
  };

  const handleEnvironmentChange = (val: string) => {
    setSelectedEnvironment(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0A0B0D]">
      <Header 
        title="Data Collection Sessions" 
        subtitle="Operational ledger of human demonstration recordings across all pilot sites"
      />

      <main className="p-8 space-y-6 flex-1">
        <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by operator name or session ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#0E1014] border border-white/[0.08] rounded-md pl-10 pr-4 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              <span>Filters:</span>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-[#0E1014] border border-white/[0.08] rounded-md px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500/50"
            >
              <option value="ALL">All Statuses</option>
              <option value="Recording">Recording</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Discarded">Discarded</option>
            </select>

            <select
              value={selectedTaskType}
              onChange={(e) => handleTaskTypeChange(e.target.value)}
              className="bg-[#0E1014] border border-white/[0.08] rounded-md px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500/50"
            >
              <option value="ALL">All Task Types</option>
              {TASK_TYPES.map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </select>

            <select
              value={selectedEnvironment}
              onChange={(e) => handleEnvironmentChange(e.target.value)}
              className="bg-[#0E1014] border border-white/[0.08] rounded-md px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500/50"
            >
              <option value="ALL">All Sites</option>
              {ENVIRONMENTS.map((env) => (
                <option key={env} value={env}>
                  {env}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-[#16181D] border border-white/[0.08] rounded-lg px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Filtered Sessions:</span>
              <span className="text-zinc-100 font-bold">{filteredSessions.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-zinc-400">Total Duration:</span>
              <span className="text-zinc-100 font-bold">{totalFilteredHours} hrs</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-zinc-400">Approved:</span>
              <span className="text-emerald-400 font-bold">
                {filteredSessions.filter((s) => s.status === "Approved").length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-zinc-400">Pending:</span>
              <span className="text-amber-400 font-bold">
                {filteredSessions.filter((s) => s.status === "Pending Review").length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span className="text-zinc-400">Rejected:</span>
              <span className="text-rose-400 font-bold">
                {filteredSessions.filter((s) => s.status === "Rejected").length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#16181D] border border-white/[0.08] rounded-lg overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#111318]/60 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-3.5 px-5 font-semibold">Session ID</th>
                  <th className="py-3.5 px-5 font-semibold">Operator</th>
                  <th className="py-3.5 px-5 font-semibold">Task Type</th>
                  <th className="py-3.5 px-5 font-semibold">Environment</th>
                  <th className="py-3.5 px-5 font-semibold">Duration</th>
                  <th className="py-3.5 px-5 font-semibold">Quality Flag</th>
                  <th className="py-3.5 px-5 font-semibold">Status</th>
                  <th className="py-3.5 px-5 font-semibold">Recorded Date</th>
                  <th className="py-3.5 px-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs font-sans">
                {paginatedSessions.length > 0 ? (
                  paginatedSessions.map((session) => (
                    <tr 
                      key={session.id} 
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    >
                      <td className="py-3.5 px-5 font-mono text-amber-400/90 font-medium">
                        {session.id}
                      </td>
                      <td className="py-3.5 px-5 text-zinc-200 font-medium">
                        {session.operator}
                      </td>
                      <td className="py-3.5 px-5 text-zinc-300">
                        {session.taskType}
                      </td>
                      <td className="py-3.5 px-5 text-zinc-400 font-mono text-[11px]">
                        {session.environment}
                      </td>
                      <td className="py-3.5 px-5 font-mono text-zinc-300">
                        {session.durationMinutes}m
                      </td>
                      <td className="py-3.5 px-5">
                        <QualityBadge flag={session.qualityFlag} />
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={session.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-5 font-mono text-zinc-400 text-[11px]">
                        {formatDateString(session.recordedAt)}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Link
                          href={`/sessions/${session.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-amber-500/10 text-zinc-300 hover:text-amber-400 border border-white/[0.06] hover:border-amber-500/30 text-xs font-mono transition-all"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-zinc-500 font-mono text-xs">
                      No session records match the selected filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/[0.08] bg-[#111318]/40 flex items-center justify-between">
            <div className="text-xs font-mono text-zinc-400">
              Showing <span className="text-zinc-200">{filteredSessions.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{" "}
              <span className="text-zinc-200">{Math.min(currentPage * pageSize, filteredSessions.length)}</span> of{" "}
              <span className="text-zinc-200">{filteredSessions.length}</span> sessions
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-[#0E1014] border border-white/[0.08] text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-zinc-400 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded bg-[#0E1014] border border-white/[0.08] text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
