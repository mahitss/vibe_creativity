"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Compass,
  Link,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { CommandPalette } from "./command-palette";

interface MissionSummaryData {
  greeting?: string;
  primary_mission?: {
    mission_id: string;
    title: string;
    reason: string;
    status: string;
    estimated_effort_mins?: number;
  };
  autonomous_work?: Array<{
    action_id: string;
    title: string;
    timestamp: string;
  }>;
}

export function MissionControlCockpit() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [data, setData] = useState<MissionSummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/mission-control/summary", {
      headers: { "X-Creator-Id": "creator-default" },
    })
      .then((res) => res.json())
      .then((payload: MissionSummaryData) => {
        setData(payload);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const primaryMission = data?.primary_mission;
  const autonomousTasks = data?.autonomous_work || [];

  return (
    <div className="min-h-screen bg-[#000000] p-8 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-14">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <div className="mx-auto max-w-4xl space-y-12 pt-4">
        {/* TOP NAVIGATION HEADER */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-6">
          <div className="flex items-center gap-3">
            <div className="bmw-m-tricolor-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="font-sans text-lg font-extrabold uppercase tracking-widest text-white">
              OMNIA
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-[#bbbbbb]">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2 border border-[#262626] bg-[#0d0d0d] px-3.5 py-1.5 font-medium text-[#bbbbbb] transition hover:border-white hover:text-white"
            >
              <Search className="h-3.5 w-3.5 text-[#1c69d4]" /> Search (⌘K)
            </button>
            <span className="flex items-center gap-2 font-mono text-[11px] text-[#bbbbbb]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> ONLINE
            </span>
          </div>
        </div>

        {/* WELCOME HEADING */}
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[#1c69d4]">
            {"///"} EXECUTIVE BRIEFING
          </p>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {data?.greeting || "Good morning."}
          </h1>
          <p className="font-sans text-lg text-[#bbbbbb]">
            Your AI worked while you were away. Here is what requires your attention.
          </p>
        </div>

        {/* 1. WHAT DID MY AI ACCOMPLISH? */}
        <div className="space-y-4 border-t border-[#262626] pt-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#bbbbbb]">
            1. What did my AI accomplish?
          </h2>

          {loading ? (
            <div className="h-16 animate-pulse bg-[#1a1a1a]" />
          ) : autonomousTasks.length > 0 ? (
            <div className="space-y-3 font-mono text-xs text-[#e6e6e6]">
              {autonomousTasks.map((task) => (
                <div
                  key={task.action_id}
                  className="flex items-center gap-3 border-b border-[#1a1a1a] pb-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="font-sans text-sm text-white">{task.title}</span>
                  <span className="ml-auto text-[10px] text-[#7e7e7e]">{task.timestamp}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 border border-[#262626] bg-[#0d0d0d] p-6 font-mono text-xs text-[#bbbbbb]">
              <p className="font-sans text-sm font-semibold text-white">
                No background tasks logged yet.
              </p>
              <p className="text-xs">
                Connect your YouTube channel to enable autonomous audience demand synthesis.
              </p>
            </div>
          )}
        </div>

        {/* 2. WHAT NEEDS MY DECISION NOW? */}
        <div className="space-y-4 border-t border-[#262626] pt-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#bbbbbb]">
            2. What needs my decision now?
          </h2>

          {primaryMission ? (
            <div className="space-y-6 border border-[#1c69d4]/60 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 shadow-xl">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1c69d4]">
                  TODAYS HERO MISSION
                </span>
                <h3 className="font-sans text-2xl font-extrabold text-white">
                  {primaryMission.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#e6e6e6]">
                  {primaryMission.reason}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="/missions"
                  className="inline-flex items-center gap-2 border border-white bg-white px-6 py-3 font-mono text-xs font-extrabold uppercase tracking-wider text-black transition hover:bg-[#e6e6e6]"
                >
                  Approve Mission →
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4 border border-[#262626] bg-[#0d0d0d] p-8 text-center font-mono text-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1c69d4]/10 text-[#1c69d4]">
                <Link className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-base font-bold text-white">
                  Connect Your YouTube Channel
                </h3>
                <p className="mx-auto max-w-md text-xs text-[#bbbbbb]">
                  Link your YouTube creator channel to let OMNIA automatically ingest comments,
                  detect trends, and prepare daily video missions.
                </p>
              </div>
              <a
                href="/settings"
                className="inline-block border border-white bg-white px-6 py-2.5 font-mono text-xs font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
              >
                Connect Channel →
              </a>
            </div>
          )}
        </div>

        {/* 3. WHAT SHOULD I DO NEXT? */}
        <div className="space-y-4 border-t border-[#262626] pb-12 pt-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#bbbbbb]">
            3. What should I do next?
          </h2>

          <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2">
            <a
              href="/content"
              className="flex items-center justify-between border border-[#262626] bg-[#0d0d0d] p-5 text-white transition hover:border-white"
            >
              <div className="space-y-1">
                <p className="font-sans font-bold">Open Content Studio</p>
                <p className="text-[11px] text-[#7e7e7e]">
                  Write &amp; repurpose scripts for YouTube, LinkedIn &amp; Newsletter.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#1c69d4]" />
            </a>

            <a
              href="/community"
              className="flex items-center justify-between border border-[#262626] bg-[#0d0d0d] p-5 text-white transition hover:border-white"
            >
              <div className="space-y-1">
                <p className="font-sans font-bold">Inspect Audience Signals</p>
                <p className="text-[11px] text-[#7e7e7e]">
                  View real comment clusters and topic demand.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#1c69d4]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
