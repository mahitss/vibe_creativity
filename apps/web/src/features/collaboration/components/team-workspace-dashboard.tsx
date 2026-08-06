"use client";

import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  GitBranch,
  Shield,
  Sparkles,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Mission {
  id: string;
  title: string;
  assignee: string;
  priority: string;
  reasoning: string;
}

export function TeamWorkspaceDashboard() {
  const [members] = useState<Member[]>([
    {
      id: "mem-101",
      name: "Alex Creator",
      email: "alex@omnia.creator",
      role: "OWNER",
      status: "ONLINE",
    },
    {
      id: "mem-102",
      name: "Sam Video Editor",
      email: "sam@omnia.creator",
      role: "EDITOR",
      status: "ONLINE",
    },
  ]);

  const [missions] = useState<Mission[]>([
    {
      id: "miss-101",
      title: "Edit Docker Tutorial Mid-Roll Integration",
      assignee: "Sam Video Editor",
      priority: "HIGH",
      reasoning:
        "Assigned to Video Editor based on upcoming sponsor deadline & channel release window.",
    },
  ]);

  const [approvalDecided, setApprovalDecided] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Team Collaboration Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Multi-user workspace — team RBAC roles, shared mission delegation, high-risk approval
              gates, & activity feed
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <Zap className="h-4 w-4 animate-pulse text-cyan-400" />2 TEAM MEMBERS ONLINE
          </div>
        </div>

        {/* Team Members Roster */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Shield className="h-5 w-5 text-indigo-400" /> Workspace Team Members & RBAC Roles
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {members.map((m) => (
              <div
                key={m.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{m.name}</h3>
                    <span className="font-mono text-xs text-slate-400">{m.email}</span>
                  </div>
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-indigo-400">
                    {m.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-t border-slate-800 pt-2 font-mono text-xs">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                  <span className="text-emerald-400">{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Missions */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <GitBranch className="h-5 w-5 text-cyan-400" /> Shared Missions & Executive Workload
            Delegation
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {missions.map((miss) => (
              <div
                key={miss.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                    <UserCheck className="h-4 w-4 text-cyan-400" /> {miss.title}
                  </h3>
                  <span className="rounded border border-amber-800/40 bg-amber-950/40 px-2.5 py-1 font-mono text-xs font-bold text-amber-400">
                    PRIORITY: {miss.priority}
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-300">Assignee: {miss.assignee}</p>
                <p className="rounded border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400">
                  Executive Mind Reasoning: {miss.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* High-Risk Approval Gate Queue */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" /> High-Risk Action Approval Queue
          </h2>
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-slate-400">
                Action: SPONSOR_CONTRACT_SIGN • Requester: Alex Creator
              </span>
              {approvalDecided ? (
                <span className="font-bold text-emerald-400">STATUS: {approvalDecided}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setApprovalDecided("APPROVED")}
                    className="rounded bg-emerald-500 px-3 py-1 font-bold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setApprovalDecided("REJECTED")}
                    className="rounded bg-rose-500 px-3 py-1 font-bold text-slate-950 transition hover:bg-rose-400"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <p className="font-sans text-sm text-slate-300">
              Payload: Acme Cloud Q3 Sponsorship Agreement ($15,000 value, 2 mid-roll integrations).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
