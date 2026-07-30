"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/Badge";
import { useSessions } from "@/context/SessionContext";
import { 
  getAggregateStats, 
  getDailyMetrics, 
  getTaskTypeMetrics 
} from "@/lib/mock-data";
import { 
  Video, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";

export default function DashboardPage() {
  const { sessions } = useSessions();
  const stats = getAggregateStats(sessions);
  const dailyData = getDailyMetrics(sessions);
  const taskTypeData = getTaskTypeMetrics(sessions);
  const recentSessions = sessions.slice(0, 8);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0A0B0D]">
      <Header 
        title="Operations Control Tower" 
        subtitle="Real-time teleoperation telemetry & human demo-data collection monitoring"
      />

      <main className="p-8 space-y-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Sessions This Week"
            value={stats.sessionsThisWeekCount}
            subtext="Across 4 site environments"
            trend={{ value: "+14.2%", positive: true }}
            icon={<Video className="w-5 h-5" />}
          />
          <StatCard
            label="Hours Captured"
            value={`${stats.hoursCaptured}h`}
            subtext="30-day cumulative total"
            trend={{ value: "+8.4%", positive: true }}
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard
            label="Pending Review"
            value={stats.pendingReviewCount}
            subtext="Awaiting QA triage"
            trend={{ value: "-4 items", positive: true }}
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <StatCard
            label="Approval Rate"
            value={`${stats.approvalRate}%`}
            subtext="Reviewed session compliance"
            trend={{ value: "+2.1%", positive: true }}
            icon={<CheckCircle className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#16181D] border border-white/[0.08] rounded-lg p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-mono font-bold tracking-wider text-zinc-100 uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  Hours Captured Per Day (Last 14 Days)
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Daily demonstration recording volume in hours
                </p>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                14D Aggregate
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#71717A" 
                    fontSize={11} 
                    fontFamily="var(--font-jetbrains-mono)" 
                    tickLine={false} 
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  />
                  <YAxis 
                    stroke="#71717A" 
                    fontSize={11} 
                    fontFamily="var(--font-jetbrains-mono)" 
                    tickLine={false} 
                    axisLine={false}
                    unit="h"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#16181D", 
                      borderColor: "rgba(255,255,255,0.12)",
                      borderRadius: "6px",
                      fontSize: "12px"
                    }}
                    formatter={(value: number) => [`${value} hours`, "Captured"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#amberGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#16181D] border border-white/[0.08] rounded-lg p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-mono font-bold tracking-wider text-zinc-100 uppercase flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-500" />
                  Coverage by Task Type
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Total capture volume per manipulation task
                </p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={taskTypeData} 
                  margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis 
                    type="number" 
                    stroke="#71717A" 
                    fontSize={10} 
                    fontFamily="var(--font-jetbrains-mono)" 
                    tickLine={false} 
                    axisLine={false}
                    unit="h"
                  />
                  <YAxis 
                    type="category" 
                    dataKey="taskType" 
                    stroke="#A1A1AA" 
                    fontSize={11} 
                    fontFamily="var(--font-inter)" 
                    tickLine={false} 
                    axisLine={false}
                    width={90}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#16181D", 
                      borderColor: "rgba(255,255,255,0.12)",
                      borderRadius: "6px",
                      fontSize: "12px"
                    }}
                    formatter={(value: number) => [`${value} hrs`, "Hours"]}
                  />
                  <Bar dataKey="hours" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-[#16181D] border border-white/[0.08] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold tracking-wider text-zinc-100 uppercase">
                Recent Recording Sessions
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Latest data collection streams awaiting or completed QA triage
              </p>
            </div>

            <Link
              href="/sessions"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View All Sessions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#111318]/60 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-3 px-5 font-semibold">Session ID</th>
                  <th className="py-3 px-5 font-semibold">Operator</th>
                  <th className="py-3 px-5 font-semibold">Task Type</th>
                  <th className="py-3 px-5 font-semibold">Environment</th>
                  <th className="py-3 px-5 font-semibold">Duration</th>
                  <th className="py-3 px-5 font-semibold">Status</th>
                  <th className="py-3 px-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs font-sans">
                {recentSessions.map((session) => (
                  <tr 
                    key={session.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3.5 px-5 font-mono text-zinc-300 font-medium">
                      {session.id}
                    </td>
                    <td className="py-3.5 px-5 text-zinc-200 font-medium">
                      {session.operator}
                    </td>
                    <td className="py-3.5 px-5 text-zinc-400">
                      {session.taskType}
                    </td>
                    <td className="py-3.5 px-5 text-zinc-400 font-mono text-[11px]">
                      {session.environment}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-zinc-300">
                      {session.durationMinutes}m
                    </td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={session.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        href={`/sessions/${session.id}`}
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
