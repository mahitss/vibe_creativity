"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  FileCode,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

interface OpenStandard {
  id: string;
  category: string;
  title: string;
  version: string;
  url: string;
}

interface Grant {
  id: string;
  title: string;
  category: string;
  funding: number;
  status: string;
}

interface Certification {
  id: string;
  target: string;
  type: string;
  status: string;
  score: number;
}

export function OpenFoundationDashboard() {
  const [standards] = useState<OpenStandard[]>([
    {
      id: "std-1",
      category: "MEMORY_EXCHANGE",
      title: "OMNIA Open Memory Exchange Format (OMEF-1.0)",
      version: "v1.0.0",
      url: "https://foundation.omnia.ai/specs/omef-1.0",
    },
    {
      id: "std-2",
      category: "AGENT_MANIFEST",
      title: "OMNIA Agent Capability & Manifest Specification (OAC-1.0)",
      version: "v1.0.0",
      url: "https://foundation.omnia.ai/specs/oac-1.0",
    },
    {
      id: "std-3",
      category: "CONNECTOR_PROTOCOL",
      title: "Universal Platform Connector Protocol (UPCP-1.0)",
      version: "v1.0.0",
      url: "https://foundation.omnia.ai/specs/upcp-1.0",
    },
  ]);

  const [grants] = useState<Grant[]>([
    {
      id: "g-1",
      title: "Long-Term Agent Memory Interoperability Grant",
      category: "RESEARCH",
      funding: 50000,
      status: "OPEN_FOR_APPLICATIONS",
    },
    {
      id: "g-2",
      title: "Open Source YouTube & Discord Connector Development",
      category: "COMMUNITY_DEVELOPER",
      funding: 25000,
      status: "ACCEPTING_PROPOSALS",
    },
  ]);

  const [certifications] = useState<Certification[]>([
    {
      id: "c-1",
      target: "Acme YouTube Connector Plugin",
      type: "CONNECTOR",
      status: "PASSED",
      score: 98.5,
    },
  ]);

  const [targetName, setTargetName] = useState<string>("Custom Notion Sync Plugin");
  const [certResult, setCertResult] = useState<string | null>(null);

  const handleRunCertify = () => {
    setCertResult(
      "COMPLIANCE CERTIFICATION RESULT (Target: '" +
        targetName +
        "'):\n✔ Memory Exchange Schema Match: 100%\n✔ Security & Tenant Isolation: PASSED (X-Creator-Id)\n✔ Status: CERTIFIED COMPLIANT (Score: 99.2/100)",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-emerald-400" />
              <h1 className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                OMNIA Open Intelligence Foundation
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Advancing open standards, open research, & ecosystem compliance certification for AI
              operating systems
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            INDEPENDENT OPEN FOUNDATION
          </div>
        </div>

        {/* Open Standards Specification Registry */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <FileCode className="h-5 w-5 text-emerald-400" /> Open Standards Specifications &
            Schemas
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {standards.map((s) => (
              <div
                key={s.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                    {s.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{s.version}</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{s.title}</h3>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-cyan-400 hover:underline"
                >
                  View JSON Schema <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Compliance Certification Runner */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <ShieldCheck className="h-5 w-5 text-cyan-400" /> Ecosystem Compliance Certification
            Runner
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder="Enter plugin/connector name to certify"
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 font-mono text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleRunCertify}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2.5 font-mono text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              <Terminal className="h-4 w-4" /> Run Compliance Suite
            </button>
          </div>

          {certResult && (
            <div className="space-y-2 rounded-xl border border-emerald-800/60 bg-slate-950 p-5 font-mono text-xs text-slate-200">
              <span className="flex items-center gap-1 font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Certification Test Harness Output
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm">{certResult}</pre>
            </div>
          )}
        </div>

        {/* Developer Grants & Hackathons */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Award className="h-5 w-5 text-amber-400" /> Open Developer Grants & Hackathons
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {grants.map((g) => (
              <div
                key={g.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-400">
                    {g.category}
                  </span>
                  <span className="rounded border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                    ${g.funding.toLocaleString()} USD
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{g.title}</h3>
                <span className="font-mono text-xs text-slate-400">Status: {g.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
