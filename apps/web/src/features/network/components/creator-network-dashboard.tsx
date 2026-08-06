"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Download,
  Globe,
  Handshake,
  Network,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

interface CreatorMatch {
  id: string;
  name: string;
  handle: string;
  topics: string[];
  overlap: number;
  reasoning: string;
  score: number;
}

interface Playbook {
  id: string;
  title: string;
  type: string;
  author: string;
  downloads: number;
  rating: number;
}

export function CreatorNetworkDashboard() {
  const [matches] = useState<CreatorMatch[]>([
    {
      id: "ws-102",
      name: "DevOps Jordan",
      handle: "jordan_dev",
      topics: ["Docker", "Kubernetes", "AI Infrastructure"],
      overlap: 42.5,
      reasoning:
        "High audience overlap with @jordan_dev and shared sponsor interest in Cloud Infrastructure.",
      score: 94.0,
    },
  ]);

  const [playbooks] = useState<Playbook[]>([
    {
      id: "pb-101",
      title: "Long-form Video to 5 Multi-Platform Shorts Pipeline",
      type: "WORKFLOW",
      author: "@alextech",
      downloads: 340,
      rating: 4.9,
    },
    {
      id: "pb-102",
      title: "Sponsor Pitch Email Automation Template",
      type: "TEMPLATE",
      author: "@alextech",
      downloads: 210,
      rating: 4.8,
    },
  ]);

  const [campaignCreated, setCampaignCreated] = useState<boolean>(false);

  const handleProposeCampaign = () => {
    setCampaignCreated(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Network className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                AI Creator Network
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Executive Mind collaboration network — privacy-preserving discovery, joint campaigns,
              playbooks, & reputation scoring
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            REPUTATION SCORE: 96.5 / 100
          </div>
        </div>

        {/* Executive Collaboration Discovery Matches */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Sparkles className="h-5 w-5 text-cyan-400" /> Executive Mind Collaboration
            Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {matches.map((m) => (
              <div
                key={m.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 font-bold text-cyan-400">
                      DJ
                    </div>
                    <div>
                      <h3 className="flex items-center gap-1.5 text-base font-bold text-slate-100">
                        {m.name} <CheckCircle className="inline h-4 w-4 text-cyan-400" />
                      </h3>
                      <span className="font-mono text-xs text-slate-400">
                        @{m.handle} • Rep: {m.score}/100
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="rounded border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 text-xs font-bold text-emerald-400">
                      {m.overlap}% Audience Overlap
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {m.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="rounded border border-slate-800 bg-slate-950/60 p-3 font-mono text-xs text-slate-400">
                  Executive Mind Alignment: {m.reasoning}
                </p>

                <div className="flex items-center justify-end border-t border-slate-800 pt-2">
                  {campaignCreated ? (
                    <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-400">
                      <Handshake className="h-4 w-4" /> JOINT CAMPAIGN PROPOSED
                    </span>
                  ) : (
                    <button
                      onClick={handleProposeCampaign}
                      className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 font-mono text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
                    >
                      <Handshake className="h-4 w-4" /> Propose Joint Campaign
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creator Playbooks & Knowledge Sharing */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <BookOpen className="h-5 w-5 text-purple-400" /> Community Playbooks & Shared Workflow
            Recipes
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {playbooks.map((pb) => (
              <div
                key={pb.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-400">
                    {pb.type}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" /> {pb.rating}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{pb.title}</h3>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2 font-mono text-xs text-slate-400">
                  <span>Author: {pb.author}</span>
                  <span className="flex items-center gap-1 text-slate-200">
                    <Download className="h-3.5 w-3.5" /> {pb.downloads} Downloads
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
