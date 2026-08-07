"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Command,
  Compass,
  Copy,
  Edit3,
  FileText,
  Handshake,
  Inbox,
  Lightbulb,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Sun,
  ThumbsUp,
  TrendingUp,
  Zap,
} from "lucide-react";
import { ExplainabilityDrawer } from "../../reasoning/components/explainability-drawer";
import { CommandPalette } from "./command-palette";

interface MissionInboxItem {
  id: string;
  title: string;
  category: "COMMUNITY" | "SPONSORSHIP" | "CONTENT";
  priority: "P1" | "P2" | "P3";
  source: string;
  status: "PENDING" | "APPROVED" | "WAITING";
  reason: string;
  impact: string;
  timestamp: string;
}

interface AssetItem {
  platform: string;
  title: string;
  content: string;
}

export function MissionControlCockpit() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "WAITING">(
    "ALL",
  );
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const inboxItems: MissionInboxItem[] = [
    {
      id: "mission-1",
      title: "Create Docker Containerization Tutorial Part 1",
      category: "COMMUNITY",
      priority: "P1",
      source: "YOUTUBE DATA API",
      status: "PENDING",
      reason: "127 viewers requested Docker orchestration after React Authentication video.",
      impact: "+18% Watch Time Retention",
      timestamp: "10m ago",
    },
    {
      id: "mission-2",
      title: "CloudCorp Sponsorship Proposal Review",
      category: "SPONSORSHIP",
      priority: "P1",
      source: "SPONSOR CRM",
      status: "APPROVED",
      reason: "CloudCorp replied with a $15,000 contract offer for Q3 sponsorship.",
      impact: "$15,000 Q3 Contract Revenue",
      timestamp: "1h ago",
    },
    {
      id: "mission-3",
      title: "Containerizing Multi-Agent Systems LinkedIn Post",
      category: "CONTENT",
      priority: "P2",
      source: "CONTENT PIPELINE",
      status: "WAITING",
      reason: "Technical architecture post ready for review & publishing.",
      impact: "2.4x Executive Conversion",
      timestamp: "2h ago",
    },
    {
      id: "mission-4",
      title: "React Authentication Series Part 5 Script",
      category: "COMMUNITY",
      priority: "P2",
      source: "YOUTUBE COMMENTS",
      status: "PENDING",
      reason: "Audience requesting OAuth2 refresh token handling deep-dive.",
      impact: "+12% Subscriber Conversion",
      timestamp: "4h ago",
    },
    {
      id: "mission-5",
      title: "VIP Developer Digest #42 Newsletter Draft",
      category: "CONTENT",
      priority: "P3",
      source: "NEWSLETTER SUBSTRATE",
      status: "WAITING",
      reason: "Weekly newsletter draft ready for distribution.",
      impact: "94% VIP Open Rate",
      timestamp: "5h ago",
    },
  ];

  const [generatedAssets, setGeneratedAssets] = useState<AssetItem[]>([
    {
      platform: "YOUTUBE SCRIPT",
      title: "Docker Containerization Masterclass",
      content:
        "Hook: Stop struggling with local environment bugs! Here is the exact Docker Compose setup we use for multi-agent container orchestration. Step 1: Define worker services. Step 2: Bind internal network ports. Step 3: Mount persistent memory volumes. Full repo link in description!",
    },
    {
      platform: "LINKEDIN POST",
      title: "Containerizing Multi-Agent Systems",
      content:
        "After 127 community members requested Docker orchestration following our React Authentication tutorial, here is the complete architectural breakdown:\n1. Isolated agent network bridges\n2. Zero-latency volume mounting\n3. High-availability container healthchecks.\nFull code repository on GitHub.",
    },
    {
      platform: "X THREAD",
      title: "3-Post Docker Breakdown",
      content:
        "1/3 Why Docker containerization is mandatory for multi-agent AI systems in 2026 🧵\n\n2/3 Without container bridges, concurrent agents clash on shared memory sockets. Here is the docker-compose schema that fixes this.\n\n3/3 Full tutorial code available now on YouTube!",
    },
    {
      platform: "NEWSLETTER",
      title: "VIP Developer Digest #42",
      content:
        "Welcome to VIP Developer Digest #42. Based on your feedback from our React Authentication series, this week we dive deep into production Docker Compose setups for AI agent execution.",
    },
  ]);

  const filteredItems = inboxItems.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.status === activeFilter;
  });

  const pendingCount = inboxItems.filter((i) => i.status === "PENDING").length;
  const approvedCount = inboxItems.filter((i) => i.status === "APPROVED").length;
  const waitingCount = inboxItems.filter((i) => i.status === "WAITING").length;

  const handleCopyContent = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-8">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      {/* Explainability Drawer */}
      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        missionTitle="Create Docker Containerization Tutorial Part 1"
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <div className="mx-auto max-w-6xl space-y-8 pt-2">
        {/* Desktop Hub Header & Executive Status */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA CREATOR OPERATING SYSTEM
              </h1>
            </div>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-[#bbbbbb]">
              COMPLETE CREATOR WORKSPACE • OPERATING SYSTEM ONLINE
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase tracking-wider text-white transition hover:border-white"
            >
              <Command className="h-3.5 w-3.5 text-[#1c69d4]" /> COMMAND PALETTE (⌘K)
            </button>

            <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase tracking-widest text-white shadow-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {"///"} M EXECUTIVE MIND: ONLINE
            </div>
          </div>
        </div>

        {/* MODULE 1: EXECUTIVE BRIEF (COMPACT STATUS BAR) */}
        <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-5 font-mono text-xs text-[#e6e6e6] shadow-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <span className="text-xl">👋</span>
              <div>
                <span className="font-bold uppercase text-white">Good evening Mahit.</span>
                <span className="ml-2 text-[#bbbbbb]">
                  OMNIA completed 6 autonomous background tasks today.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="border border-[#e22718]/40 bg-[#e22718]/10 px-2.5 py-1 font-bold text-white">
                2 ITEMS REQUIRE ATTENTION
              </span>
              <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-2.5 py-1 font-bold text-white">
                1 DRAFT READY FOR REVIEW
              </span>
            </div>
          </div>
        </div>

        {/* MODULE 2: TODAY'S FOCUS HERO DIRECTIVE (50% VISUAL WEIGHT) */}
        <div className="relative space-y-6 border border-[#1c69d4]/60 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 shadow-2xl transition-all duration-200 hover:border-[#1c69d4]">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <div className="flex items-center gap-2 font-extrabold uppercase tracking-widest text-white">
              <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} TODAY&apos;S FOCUS (PRIMARY
              DIRECTIVE)
            </div>
            <div className="flex items-center gap-3">
              <span className="border border-[#e22718]/40 bg-[#e22718]/10 px-2.5 py-0.5 font-bold text-white">
                P1 HIGH PRIORITY
              </span>
              <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-2.5 py-0.5 font-bold text-white">
                STEP 2 OF 4: OUTLINE SYNTHESIZED
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white md:text-4xl">
              Create Docker Containerization Tutorial Part 1
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#e6e6e6]">
              127 viewers requested Docker container orchestration after your React Authentication
              video. High retention impact expected (
              <strong className="border-b border-[#1c69d4] font-mono text-white">
                +18% watch time retention baseline
              </strong>
              ). Time estimate: ~45 mins execution.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExplainability(true)}
                className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-5 py-2.5 font-bold uppercase text-white hover:border-white"
              >
                <Brain className="h-4 w-4 text-[#1c69d4]" /> View Evidence
              </button>
            </div>

            <a
              href="/missions"
              className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 font-extrabold uppercase tracking-widest text-black shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e6e6e6] active:scale-[0.98]"
            >
              <Compass className="h-4 w-4" /> Approve Mission →
            </a>
          </div>
        </div>

        {/* MODULE 3: MISSION INBOX & AI ACTIVITY FEED */}
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

            <div className="space-y-3 font-mono text-xs">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group space-y-3 border border-[#3c3c3c] bg-[#0d0d0d] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-white/80 hover:shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3c3c3c]/60 pb-2.5">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span
                        className={`border px-2 py-0.5 font-bold ${
                          item.priority === "P1"
                            ? "border-[#e22718]/60 bg-[#e22718]/20 text-white"
                            : "border-[#1c69d4]/60 bg-[#1c69d4]/20 text-white"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="font-bold text-[#bbbbbb]">{item.source}</span>
                      <span
                        className={`border px-2 py-0.5 font-bold ${
                          item.status === "PENDING"
                            ? "border-[#e22718]/40 bg-[#e22718]/10 text-white"
                            : item.status === "APPROVED"
                              ? "border-[#0066b1]/40 bg-[#0066b1]/10 text-white"
                              : "border-[#1c69d4]/40 bg-[#1c69d4]/10 text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#7e7e7e]">{item.timestamp}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-sans text-base font-extrabold text-white">{item.title}</h4>
                    <p className="font-sans text-xs text-[#bbbbbb]">{item.reason}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#3c3c3c]/60 pt-2.5">
                    <span className="text-[10px] font-bold text-[#1c69d4]">
                      EXPECTED IMPACT: {item.impact}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href="/missions"
                        className="inline-flex items-center gap-1 border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 text-[10px] font-bold uppercase text-white transition hover:border-white"
                      >
                        Approve
                      </a>
                      <a
                        href="/missions"
                        className="inline-flex items-center gap-1.5 border border-white bg-white px-3.5 py-1.5 text-[10px] font-extrabold uppercase text-black transition hover:bg-[#e6e6e6]"
                      >
                        Inspect →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Activity Feed & Quick Commands (1/3 width) */}
          <div className="space-y-6">
            {/* AI ACTIVITY FEED */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
                <span className="font-bold uppercase tracking-widest text-white">
                  {"///"} LIVE AI ACTIVITY FEED
                </span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-3 text-[#e6e6e6]">
                <div className="flex items-start gap-2.5 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Imported 523 YouTube comments from React Auth</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px]">
                  <RefreshCw className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-[#1c69d4]" />
                  <span>Building Docker Masterclass technical script...</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Persistent memory substrate updated (#mem-yt-42)</span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066b1]" />
                  <span>Sponsor contract offer detected ($15,000 CloudCorp)</span>
                </div>
              </div>
            </div>

            {/* QUICK COMMANDS */}
            <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
                <span className="font-bold uppercase tracking-widest text-white">
                  {"///"} QUICK COMMANDS
                </span>
                <span className="text-[10px] text-[#bbbbbb]">KEYCAPS</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/content"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-2.5 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <span>Content</span>
                  <span className="text-[9px] text-[#bbbbbb]">⌘G</span>
                </a>
                <a
                  href="/community"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-2.5 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <span>Comments</span>
                  <span className="text-[9px] text-[#bbbbbb]">⌘I</span>
                </a>
                <a
                  href="/settings"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-2.5 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <span>Channel</span>
                  <span className="text-[9px] text-[#bbbbbb]">⌘K</span>
                </a>
                <a
                  href="/content"
                  className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-2.5 text-[11px] font-bold text-white transition hover:border-white"
                >
                  <span>Publish</span>
                  <span className="text-[9px] text-[#bbbbbb]">⌘P</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 4: GENERATED ASSETS GRID */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <Share2 className="h-4 w-4 text-[#1c69d4]" /> {"///"} READY GENERATED ASSETS (PREVIEW,
              EDIT, PUBLISH)
            </span>
            <a
              href="/content"
              className="text-[11px] font-bold uppercase text-[#1c69d4] hover:underline"
            >
              Open Content Studio →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {generatedAssets.map((asset, idx) => (
              <div
                key={asset.platform}
                className="space-y-3 border border-[#3c3c3c] bg-[#0d0d0d] p-5 font-mono text-xs shadow-md"
              >
                <div className="flex items-center justify-between border-b border-[#3c3c3c]/60 pb-2">
                  <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2 py-0.5 font-bold text-white">
                    {asset.platform}
                  </span>
                  <span className="font-bold text-white">{asset.title}</span>
                </div>

                <textarea
                  value={asset.content}
                  onChange={(e) => {
                    const val = e.target.value;
                    setGeneratedAssets((prev) => {
                      const next = [...prev];
                      if (next[idx]) next[idx] = { ...next[idx], content: val };
                      return next;
                    });
                  }}
                  className="h-28 w-full resize-none border border-[#3c3c3c] bg-[#000000] p-3 font-sans text-xs leading-relaxed text-[#e6e6e6] outline-none focus:border-white"
                />

                <div className="flex items-center justify-end gap-2 text-[10px]">
                  <button
                    onClick={() => handleCopyContent(asset.content, idx)}
                    className="border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1 font-bold uppercase text-white hover:border-white"
                  >
                    {copiedIndex === idx ? "Copied!" : "Copy"}
                  </button>
                  <a
                    href="/content"
                    className="border border-white bg-white px-4 py-1 font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
                  >
                    Publish →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODULE 5 & 6: COMMUNITY INTELLIGENCE & SPONSOR UPDATES */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* COMMUNITY INTELLIGENCE */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
                <Bot className="h-4 w-4 text-[#0066b1]" /> {"///"} COMMUNITY INTELLIGENCE
              </span>
              <a
                href="/community"
                className="text-[10px] font-bold uppercase text-[#0066b1] hover:underline"
              >
                Open Workspace →
              </a>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="border border-[#3c3c3c] bg-[#0d0d0d] p-4">
                <span className="font-bold text-white">TOP REQUESTED TOPIC</span>
                <p className="mt-1 font-sans text-sm text-[#e6e6e6]">
                  Docker Compose multi-agent container orchestration (127 requests)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                  <span className="text-[#bbbbbb]">AUDIENCE SENTIMENT</span>
                  <p className="mt-1 font-bold text-emerald-400">94% POSITIVE</p>
                </div>
                <div className="border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                  <span className="text-[#bbbbbb]">COMMENT CLUSTERS</span>
                  <p className="mt-1 font-bold text-white">523 PROCESSED</p>
                </div>
              </div>
            </div>
          </div>

          {/* SPONSOR UPDATES */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
                <Handshake className="h-4 w-4 text-[#1c69d4]" /> {"///"} ACTIONABLE SPONSOR UPDATES
              </span>
              <a
                href="/sponsors"
                className="text-[10px] font-bold uppercase text-[#1c69d4] hover:underline"
              >
                Open CRM →
              </a>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">CloudCorp</span>
                    <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-2 py-0.5 text-[10px] font-bold text-white">
                      OFFER RECEIVED
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-[#bbbbbb]">
                    $15,000 contract offer for Q3 multi-agent tutorial series
                  </p>
                </div>
                <a
                  href="/sponsors"
                  className="border border-white bg-white px-4 py-2 font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
                >
                  Open →
                </a>
              </div>

              <div className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">NVIDIA</span>
                    <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2 py-0.5 text-[10px] font-bold text-white">
                      CONTRACT WAITING
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-[#bbbbbb]">
                    GPU infrastructure partnership agreement pending final review
                  </p>
                </div>
                <a
                  href="/sponsors"
                  className="border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-2 font-bold uppercase text-white hover:border-white"
                >
                  Review →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 7: RECENT ACTIVITY TIMELINE */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
          <div className="border-b border-[#3c3c3c] pb-3 font-bold uppercase tracking-widest text-white">
            {"///"} RECENT AUTONOMOUS AI ACTIVITY LOG
          </div>

          <div className="space-y-3 text-[#e6e6e6]">
            <div className="flex items-center justify-between border-b border-[#3c3c3c]/40 pb-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
                <span className="font-sans font-bold text-white">
                  Imported 523 YouTube comments from React Authentication
                </span>
              </div>
              <span className="text-[10px] text-[#7e7e7e]">10m ago</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#3c3c3c]/40 pb-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
                <span className="font-sans font-bold text-white">
                  Generated Docker Containerization Masterclass Mission Directive
                </span>
              </div>
              <span className="text-[10px] text-[#7e7e7e]">25m ago</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#3c3c3c]/40 pb-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
                <span className="font-sans font-bold text-white">
                  Drafted CloudCorp $15,000 Sponsorship Offer Response
                </span>
              </div>
              <span className="text-[10px] text-[#7e7e7e]">1h ago</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
                <span className="font-sans font-bold text-white">
                  Persistent memory substrate updated (#mem-yt-comment-42)
                </span>
              </div>
              <span className="text-[10px] text-[#7e7e7e]">2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
