"use client";

import React, { useState } from "react";
import { Calendar, Film, Layers, Play, RefreshCw, Sparkles, TrendingUp, Video } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  series: string;
  status: string;
  views: number;
}

interface IdeaItem {
  id: string;
  title: string;
  reasoning: string;
  impact: string;
}

export function ContentWorkspaceDashboard() {
  const [items] = useState<ContentItem[]>([
    {
      id: "cnt-101",
      title: "Docker Multi-Agent System Architecture Deep Dive",
      platform: "YouTube",
      contentType: "VIDEO",
      series: "Production AI Infrastructure",
      status: "SCHEDULED",
      views: 18400,
    },
    {
      id: "cnt-102",
      title: "5 Docker Security Best Practices for 2026",
      platform: "Instagram",
      contentType: "SHORT",
      series: "Quick Tech Tips",
      status: "PUBLISHED",
      views: 32000,
    },
  ]);

  const [ideas] = useState<IdeaItem[]>([
    {
      id: "idea-101",
      title: "Docker & Kubernetes Production Microservice Setup",
      reasoning: "45 community requests logged across YouTube & Discord.",
      impact: "+18,000 views & +450 subscriber conversions",
    },
    {
      id: "idea-102",
      title: "Building Autonomous AI Agents in TypeScript with OMNIA",
      reasoning: "Trending developer topic in GitHub repos & tech Twitter.",
      impact: "+12,000 views & high sponsor alignment",
    },
  ]);

  const [repurposedOutput, setRepurposedOutput] = useState<string | null>(null);

  const handleRepurpose = () => {
    setRepurposedOutput(
      "HOOK: Docker multi-stage builds reduce image size by 75%!\nCLIP 1: 02:15 - 03:00 (Builder pattern)\nCLIP 2: 05:40 - 06:20 (Production alpine deployment)",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Film className="h-8 w-8 text-cyan-400" />
              <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Content Intelligence Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Content ecosystem operating system — lifecycle management, cross-platform AI
              repurposing, & performance feedback
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-cyan-400">
            <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
            CROSS-PLATFORM REPURPOSING ACTIVE
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Total Assets</span>
            <p className="font-mono text-2xl font-bold text-slate-100">14 Content Items</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Derivative Shorts/Carousels</span>
            <p className="font-mono text-2xl font-bold text-purple-400">24 Derivative Assets</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Avg Viewer Retention</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">64.2% Retention</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Total Views</span>
            <p className="font-mono text-2xl font-bold text-cyan-400">50,400 Views</p>
          </div>
        </div>

        {/* Content Library */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Layers className="h-5 w-5 text-cyan-400" /> Content Ecosystem & Series Library
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                    <span className="font-mono text-xs text-slate-400">
                      {item.platform} • Series: {item.series}
                    </span>
                  </div>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-cyan-400">
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
                  <span className="text-slate-400">
                    Views:{" "}
                    <strong className="font-mono text-slate-100">
                      {item.views.toLocaleString()}
                    </strong>
                  </span>
                  <button
                    onClick={handleRepurpose}
                    className="flex items-center gap-1 font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    <RefreshCw className="h-3 w-3" /> Repurpose to Short
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Repurposing Output Banner */}
        {repurposedOutput && (
          <div className="space-y-2 rounded-xl border border-purple-800/60 bg-slate-950 p-5 font-mono text-xs">
            <span className="flex items-center gap-1 font-bold text-purple-400">
              <Sparkles className="h-4 w-4" /> AI Cross-Platform Derivative Short Output (Source:
              cnt-101)
            </span>
            <pre className="whitespace-pre-wrap pt-2 font-sans text-sm text-slate-200">
              {repurposedOutput}
            </pre>
          </div>
        )}

        {/* Content Ideas */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Sparkles className="h-5 w-5 text-purple-400" /> Evidence-Grounded Idea Inbox
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">{idea.title}</h3>
                  <span className="rounded border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                    {idea.impact}
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-400">Reasoning: {idea.reasoning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
