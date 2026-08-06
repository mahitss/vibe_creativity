"use client";

import React, { useState } from "react";
import { MessageSquare, ShieldAlert, Sparkles, Star, Users } from "lucide-react";

interface Member {
  id: string;
  name: string;
  username: string;
  platform: string;
  relationshipScore: number;
  vipStatus: string;
  topics: string[];
}

interface TopicCluster {
  id: string;
  title: string;
  count: number;
  sentiment: string;
}

export function CommunityIntelligenceDashboard() {
  const [members] = useState<Member[]>([
    {
      id: "mem-usr-101",
      name: "DevMaster Alex",
      username: "@devmaster_alex",
      platform: "YouTube",
      relationshipScore: 92.5,
      vipStatus: "MODERATOR_CANDIDATE",
      topics: ["Docker", "Go", "TypeScript"],
    },
    {
      id: "mem-usr-102",
      name: "Sara CloudTech",
      username: "@sara_cloud",
      platform: "Discord",
      relationshipScore: 84.0,
      vipStatus: "TOP_SUPPORTER",
      topics: ["Kubernetes", "Next.js", "Python"],
    },
  ]);

  const [topics] = useState<TopicCluster[]>([
    {
      id: "top-101",
      title: "Docker & Kubernetes Microservice Architecture",
      count: 45,
      sentiment: "POSITIVE",
    },
    {
      id: "top-102",
      title: "Real-time Webhook Integration Support",
      count: 28,
      sentiment: "POSITIVE",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-emerald-400" />
              <h1 className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Community Intelligence Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Relationship memory, VIP advocate discovery, topic clustering, & context-aware
              moderation
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-emerald-400">
            <Sparkles className="h-4 w-4 animate-pulse text-emerald-400" />
            94.5% HEALTH SCORE
          </div>
        </div>

        {/* Member Explorer Grid */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Star className="h-5 w-5 text-amber-400" /> Member Relationship & VIP Advocate Directory
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {members.map((m) => (
              <div
                key={m.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{m.name}</h3>
                    <span className="font-mono text-xs text-slate-400">
                      {m.username} • {m.platform}
                    </span>
                  </div>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-400">
                    {m.vipStatus}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-400">Relationship Score</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {m.relationshipScore}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${m.relationshipScore}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Clusters */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <MessageSquare className="h-5 w-5 text-cyan-400" /> Trending Community Topic Clusters
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {topics.map((top) => (
              <div
                key={top.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">{top.title}</h3>
                  <span className="rounded border border-cyan-800/40 bg-cyan-950/40 px-2.5 py-1 font-mono text-xs font-bold text-cyan-400">
                    {top.count} REQUESTS
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-400">
                  Executive Action: Scheduled for Q3 video production pipeline
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Context-Aware Moderation Assistant */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <ShieldAlert className="h-5 w-5 text-emerald-400" /> Context-Aware Moderation Assistant
          </h2>
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-slate-400">Comment ID: cmt-892 • Author: @devmaster_alex</span>
              <span className="font-bold text-emerald-400">RECOMMENDATION: APPROVE_AND_REPLY</span>
            </div>
            <p className="font-sans text-sm text-slate-200">
              &quot;Hey! Could you do a follow-up video on Docker multi-stage builds? The previous
              episode was super helpful.&quot;
            </p>
            <p className="text-xs text-slate-400">
              Context Notes: Author holds 92.5 relationship score with 14 prior positive
              contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
