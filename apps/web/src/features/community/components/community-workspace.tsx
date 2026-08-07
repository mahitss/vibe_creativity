"use client";

import React, { useState } from "react";
import {
  Bot,
  Brain,
  CheckCircle2,
  Filter,
  Flame,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export function CommunityWorkspace() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const demandClusters = [
    {
      id: "cluster-1",
      topic: "Docker Container Orchestration & Compose Setup",
      requestCount: 127,
      sentiment: "94% Positive",
      topComment:
        "Can you please do a deep dive on production Docker Compose setups after React Auth?",
      memoryId: "#mem-yt-comment-42",
      status: "TOP DEMAND",
    },
    {
      id: "cluster-2",
      topic: "OAuth2 Refresh Tokens & HTTP-Only Cookies",
      requestCount: 84,
      sentiment: "91% Positive",
      topComment: "How do we handle JWT token rotation safely without losing session state?",
      memoryId: "#mem-yt-comment-89",
      status: "HIGH DEMAND",
    },
    {
      id: "cluster-3",
      topic: "React Hook Form Validation & Zod Schemas",
      requestCount: 42,
      sentiment: "88% Positive",
      topComment: "Loved the auth series! Would love a video on complex Zod nested object schemas.",
      memoryId: "#mem-yt-comment-104",
      status: "ROUTINE",
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
                {"///"} COMMUNITY INTELLIGENCE ROOM
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              AUDIENCE DEMAND CLUSTERS, SENTIMENT HEATMAPS &amp; VIDEO IDEA SYNTHESIS
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-3.5 py-1.5 font-bold text-white">
              523 COMMENTS CLUSTERED
            </span>
            <button className="border border-white bg-white px-5 py-1.5 font-extrabold uppercase text-black hover:bg-[#e6e6e6]">
              SYNC YOUTUBE COMMENTS →
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col gap-4 border border-[#3c3c3c] bg-[#1a1a1a] p-4 font-mono text-xs md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#1c69d4]" />
            <input
              type="text"
              placeholder="Search demand clusters by keyword, topic or memory ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#3c3c3c] bg-[#0d0d0d] py-2.5 pl-10 pr-4 text-white focus:border-[#1c69d4] focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-2.5 font-bold uppercase text-white hover:border-white">
            <Filter className="h-4 w-4 text-[#1c69d4]" /> FILTER BY SENTIMENT
          </button>
        </div>

        {/* DEMAND CLUSTERS GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold uppercase tracking-widest text-white">
              {"///"} TOP AUDIENCE DEMAND CLUSTERS
            </span>
            <span className="text-[11px] text-[#bbbbbb]">UPDATED 25m AGO</span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {demandClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="flex flex-col justify-between space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl transition hover:-translate-y-0.5 hover:border-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-2 font-mono text-[10px]">
                    <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2 py-0.5 font-bold text-white">
                      {cluster.status}
                    </span>
                    <span className="font-bold text-emerald-400">{cluster.sentiment}</span>
                  </div>

                  <h3 className="font-sans text-base font-extrabold text-white">{cluster.topic}</h3>

                  <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3 font-mono text-xs">
                    <span className="text-[10px] text-[#7e7e7e]">TOP AUDIENCE COMMENT:</span>
                    <p className="font-sans text-xs italic text-[#e6e6e6]">
                      &quot;{cluster.topComment}&quot;
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#3c3c3c] pt-4">
                  <div className="flex justify-between font-mono text-[11px] text-[#bbbbbb]">
                    <span>
                      REQUEST COUNT:{" "}
                      <strong className="text-white">{cluster.requestCount} VIEWER REQUESTS</strong>
                    </span>
                  </div>

                  <a
                    href="/missions"
                    className="block border border-white bg-white py-2 text-center font-mono text-xs font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
                  >
                    Convert into Mission Directive →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
