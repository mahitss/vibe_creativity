"use client";

import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  Database,
  Edit3,
  Layers,
  Network,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function MemoryWorkspace() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const memoryNodes = [
    {
      id: "mem-yt-comment-42",
      key: "AUDIENCE_DEMAND_DOCKER",
      content: "127 viewers requested Docker container orchestration after React Auth video.",
      confidence: "0.97 HIGH",
      source: "YouTube API Ingestion",
      updatedAt: "10m ago",
    },
    {
      id: "mem-cloudcorp-deal",
      key: "SPONSOR_TERMS_CLOUDCORP",
      content: "CloudCorp agreed to $15,000 USD title sponsorship for Docker tutorial series.",
      confidence: "0.99 VERIFIED",
      source: "Sponsor Email Parser",
      updatedAt: "45m ago",
    },
    {
      id: "mem-retention-baseline",
      key: "WATCH_TIME_BASELINE_REACT",
      content: "React Authentication Part 4 achieved 48% retention at 3:00 minute mark.",
      confidence: "0.95 HIGH",
      source: "Analytics Engine",
      updatedAt: "2h ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-10">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <div className="mx-auto max-w-7xl space-y-8 pt-2">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} MEMORY STUDIO (PERSISTENT KNOWLEDGE GRAPH)
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              VISUAL KNOWLEDGE SUBSTRATE, GROUNDING PROVENANCE &amp; VECTOR SEARCH
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-3.5 py-1.5 font-bold text-white">
              VECTOR DB: CHROMADB (1536-DIM)
            </span>
            <button className="border border-white bg-white px-5 py-1.5 font-extrabold uppercase text-black hover:bg-[#e6e6e6]">
              SYNC MEMORY SUBSTRATE →
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center border border-[#3c3c3c] bg-[#1a1a1a] p-4 font-mono text-xs">
          <Search className="mr-3 h-4 w-4 text-[#1c69d4]" />
          <input
            type="text"
            placeholder="Search persistent memory substrate by key, provenance source, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-2.5 text-white focus:border-[#1c69d4] focus:outline-none"
          />
        </div>

        {/* VISUAL KNOWLEDGE GRAPH & SUBSTRATE ROWS SPLIT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* VISUAL NODE CANVAS */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl lg:col-span-1">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} GRAPH NODE MAP
              </span>
              <Network className="h-4 w-4 text-[#1c69d4]" />
            </div>

            <div className="relative flex h-64 items-center justify-center border border-[#3c3c3c] bg-[#0d0d0d] p-4">
              <div className="flex flex-col items-center gap-4">
                <div className="border border-[#1c69d4] bg-[#1c69d4]/20 p-3 font-bold text-white shadow-lg">
                  #mem-yt-comment-42
                </div>
                <div className="h-8 w-0.5 bg-[#1c69d4]" />
                <div className="border border-emerald-400 bg-emerald-400/20 p-3 font-bold text-white shadow-lg">
                  #mem-cloudcorp-deal
                </div>
              </div>
            </div>
          </div>

          {/* MEMORY SUBSTRATE ROWS TABLE */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} PERSISTENT MEMORY SUBSTRATE ROWS
              </span>
              <Database className="h-4 w-4 text-[#1c69d4]" />
            </div>

            <div className="space-y-4">
              {memoryNodes.map((node) => (
                <div
                  key={node.id}
                  className="space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-4 transition hover:border-white"
                >
                  <div className="flex items-center justify-between border-b border-[#3c3c3c]/60 pb-2 text-[10px]">
                    <span className="font-bold text-[#1c69d4]">
                      {node.id} ({node.key})
                    </span>
                    <span className="border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-emerald-400">
                      {node.confidence}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#e6e6e6]">{node.content}</p>

                  <div className="flex items-center justify-between border-t border-[#3c3c3c]/60 pt-2 text-[10px] text-[#bbbbbb]">
                    <span>PROVENANCE: {node.source}</span>
                    <span>UPDATED: {node.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
