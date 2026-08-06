"use client";

import React, { useState } from "react";
import {
  Building2,
  CreditCard,
  FileCheck,
  HardDrive,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Sliders,
} from "lucide-react";

interface OrgPolicy {
  id: string;
  name: string;
  value: string;
  enabled: boolean;
}

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  details: string;
  timestamp: string;
}

export function EnterpriseGovernanceDashboard() {
  const [policies, setPolicies] = useState<OrgPolicy[]>([
    { id: "pol-1", name: "MEMORY_RETENTION_DAYS", value: "365 Days", enabled: true },
    { id: "pol-2", name: "REQUIRE_PUBLISH_APPROVAL", value: "Strict Gate Active", enabled: true },
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: "aud-101",
      actor: "creator-alex-101",
      action: "ORG_CREATED",
      details: "Initialized Acro Media Enterprise Network.",
      timestamp: "2026-08-06 23:20:00",
    },
    {
      id: "aud-102",
      actor: "admin-sam",
      action: "POLICY_UPDATE",
      details: "Enforced strict publishing approval gate across all child workspaces.",
      timestamp: "2026-08-06 23:15:00",
    },
  ]);

  const togglePolicy = (id: string) => {
    setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Enterprise Governance Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Multi-workspace administration — organization hierarchy, compliance policies, audit
              trail, & SSO readiness
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            ENTERPRISE TENANT ISOLATION ACTIVE
          </div>
        </div>

        {/* Organization Overview */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-100">Acro Media Enterprise Network</h2>
              <p className="font-mono text-xs text-slate-400">
                Org ID: org-a8b9c0 • Plan: ENTERPRISE TIER
              </p>
            </div>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-bold text-cyan-400">
              2 CHILD WORKSPACES ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
            <div className="space-y-1 rounded border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-slate-400">Child Workspace 1</span>
              <p className="font-bold text-slate-100">Primary Creator Studio (ws-101)</p>
            </div>
            <div className="space-y-1 rounded border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-slate-400">Child Workspace 2</span>
              <p className="font-bold text-slate-100">Shorts & Derivatives Lab (ws-102)</p>
            </div>
          </div>
        </div>

        {/* Governance Policy Engine */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Sliders className="h-5 w-5 text-indigo-400" /> Organization Governance Policies
          </h2>
          <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            {policies.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{p.name}</h4>
                  <span className="font-mono text-xs text-slate-400">Value: {p.value}</span>
                </div>
                <button
                  onClick={() => togglePolicy(p.id)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition ${
                    p.enabled
                      ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                      : "border border-slate-700 bg-slate-800 text-slate-400"
                  }`}
                >
                  {p.enabled ? "ENFORCED" : "DISABLED"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Audit Stream */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <FileCheck className="h-5 w-5 text-cyan-400" /> Immutable Compliance Audit Stream
          </h2>
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="space-y-1 rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400">{log.action}</span>
                  <span className="text-slate-500">{log.timestamp}</span>
                </div>
                <p className="font-sans text-sm text-slate-200">{log.details}</p>
                <span className="text-[10px] text-slate-400">Actor: {log.actor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
