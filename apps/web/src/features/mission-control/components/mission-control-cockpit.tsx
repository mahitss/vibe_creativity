"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Handshake,
  Inbox,
  Lightbulb,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
  Sun,
  ThumbsUp,
  Zap,
} from "lucide-react";

interface MissionInboxItem {
  id: string;
  title: string;
  category: "COMMUNITY" | "SPONSORSHIP" | "CONTENT";
  status: "PENDING" | "APPROVED" | "WAITING";
  reason: string;
  timestamp: string;
}

export function MissionControlCockpit() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "WAITING">(
    "ALL",
  );

  const inboxItems: MissionInboxItem[] = [
    {
      id: "mission-1",
      title: "Create Docker Containerization Tutorial Part 1",
      category: "COMMUNITY",
      status: "PENDING",
      reason: "127 viewers requested Docker orchestration after React Authentication video.",
      timestamp: "10m ago",
    },
    {
      id: "mission-2",
      title: "CloudCorp Sponsorship Proposal Review",
      category: "SPONSORSHIP",
      status: "APPROVED",
      reason: "CloudCorp replied with a $15,000 contract offer for Q3 sponsorship.",
      timestamp: "1h ago",
    },
    {
      id: "mission-3",
      title: "Containerizing Multi-Agent Systems LinkedIn Post",
      category: "CONTENT",
      status: "WAITING",
      reason: "Technical architecture post ready for review & publishing.",
      timestamp: "2h ago",
    },
    {
      id: "mission-4",
      title: "React Authentication Series Part 5 Script",
      category: "COMMUNITY",
      status: "PENDING",
      reason: "Audience requesting OAuth2 refresh token handling deep-dive.",
      timestamp: "4h ago",
    },
    {
      id: "mission-5",
      title: "VIP Developer Digest #42 Newsletter Draft",
      category: "CONTENT",
      status: "WAITING",
      reason: "Weekly newsletter draft ready for distribution.",
      timestamp: "5h ago",
    },
  ];

  const filteredItems = inboxItems.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.status === activeFilter;
  });

  const pendingCount = inboxItems.filter((i) => i.status === "PENDING").length;
  const approvedCount = inboxItems.filter((i) => i.status === "APPROVED").length;
  const waitingCount = inboxItems.filter((i) => i.status === "WAITING").length;

  return (
    <div className="relative min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-8">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <div className="mx-auto max-w-6xl space-y-6 pt-2">
        {/* Desktop Hub Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA CREATOR DESKTOP HUB
              </h1>
            </div>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-[#bbbbbb]">
              MISSION INBOX &amp; WORKSPACE NAVIGATION • OPERATING SYSTEM ONLINE
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase tracking-widest text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0066b1]" />
              {"///"} M EXECUTIVE MIND: ONLINE
            </div>
          </div>
        </div>

        {/* Main 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Mission Inbox (2/3 width) */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
                <Inbox className="h-4 w-4 text-[#0066b1]" /> {"///"} MISSION INBOX
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "ALL"
                      ? "border border-white bg-white text-black"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  All ({inboxItems.length})
                </button>
                <button
                  onClick={() => setActiveFilter("PENDING")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "PENDING"
                      ? "border border-[#e22718] bg-[#e22718]/20 text-white"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setActiveFilter("APPROVED")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "APPROVED"
                      ? "border border-[#0066b1] bg-[#0066b1]/20 text-white"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  Approved ({approvedCount})
                </button>
                <button
                  onClick={() => setActiveFilter("WAITING")}
                  className={`px-2.5 py-1 font-bold uppercase transition ${
                    activeFilter === "WAITING"
                      ? "border border-[#1c69d4] bg-[#1c69d4]/20 text-white"
                      : "border border-[#3c3c3c] bg-[#0d0d0d] text-[#bbbbbb] hover:text-white"
                  }`}
                >
                  Waiting ({waitingCount})
                </button>
              </div>
            </div>

            {/* Mission Inbox List */}
            <div className="space-y-3 font-mono text-xs">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-4 transition hover:border-white sm:flex-row sm:items-center sm:space-y-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`border px-2 py-0.5 text-[10px] font-bold ${
                          item.status === "PENDING"
                            ? "border-[#e22718]/40 bg-[#e22718]/10 text-white"
                            : item.status === "APPROVED"
                              ? "border-[#0066b1]/40 bg-[#0066b1]/10 text-white"
                              : "border-[#1c69d4]/40 bg-[#1c69d4]/10 text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[10px] font-bold text-[#bbbbbb]">{item.category}</span>
                    </div>

                    <h4 className="font-sans text-sm font-extrabold text-white">{item.title}</h4>
                    <p className="font-sans text-xs text-[#bbbbbb]">{item.reason}</p>
                  </div>

                  <div className="flex items-center gap-3 pt-2 sm:pt-0">
                    <span className="text-[10px] text-[#7e7e7e]">{item.timestamp}</span>
                    <a
                      href="/missions"
                      className="inline-flex items-center gap-1.5 border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-white hover:text-white"
                    >
                      Inspect →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Today's Focus & Quick Actions (1/3 width) */}
          <div className="space-y-6">
            {/* TODAY'S FOCUS CARD */}
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
                <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
                  <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} TODAY&apos;S FOCUS
                </span>
                <span className="text-[10px] font-bold text-[#1c69d4]">PRIORITY 1</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans text-lg font-extrabold uppercase text-white">
                  Create Docker Containerization Tutorial Part 1
                </h3>
                <p className="font-sans text-xs text-[#e6e6e6]">
                  127 viewers requested Docker container orchestration after React Auth video. High
                  retention impact expected.
                </p>
              </div>

              <div className="pt-2 font-mono text-xs">
                <a
                  href="/missions"
                  className="flex w-full items-center justify-center gap-2 border border-white bg-white py-3 font-extrabold uppercase tracking-widest text-black transition hover:bg-[#e6e6e6]"
                >
                  <Compass className="h-4 w-4" /> Open Mission Workspace →
                </a>
              </div>
            </div>

            {/* QUICK ACTIONS GRID */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
              <div className="border-b border-[#3c3c3c] pb-3 font-bold uppercase tracking-widest text-white">
                {"///"} QUICK ACTIONS
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="/content"
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] p-3 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <Plus className="h-3.5 w-3.5 text-[#0066b1]" /> Generate Content
                </a>
                <a
                  href="/community"
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] p-3 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <Bot className="h-3.5 w-3.5 text-[#1c69d4]" /> Import Comments
                </a>
                <a
                  href="/settings"
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] p-3 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <Zap className="h-3.5 w-3.5 text-emerald-400" /> Connect Channel
                </a>
                <a
                  href="/content"
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] p-3 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <Share2 className="h-3.5 w-3.5 text-[#e22718]" /> Publish Draft
                </a>
              </div>
            </div>

            {/* RECENT AI WORK LOG */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
              <div className="border-b border-[#3c3c3c] pb-3 font-bold uppercase tracking-widest text-white">
                {"///"} RECENT AI WORK LOG
              </div>

              <div className="space-y-2.5 text-[#e6e6e6]">
                <div className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066b1]" />
                  <span>Generated Docker Masterclass Script</span>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066b1]" />
                  <span>Clustered 523 YouTube Comments</span>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066b1]" />
                  <span>Drafted CloudCorp $15,000 Sponsorship Offer</span>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066b1]" />
                  <span>Created 60s YouTube Short Outline</span>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066b1]" />
                  <span>Prepared 3-Post X Thread</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
