"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Bell,
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
  User,
  Zap,
} from "lucide-react";
import { ExplainabilityDrawer } from "../../reasoning/components/explainability-drawer";
import { CommandPalette } from "./command-palette";
import { SystemBootOverlay } from "./system-boot-overlay";

interface RecentWorkAsset {
  id: string;
  type: "SCRIPT" | "THUMBNAIL" | "LINKEDIN" | "NEWSLETTER";
  title: string;
  subtitle: string;
  content: string;
  timestamp: string;
}

export function MissionControlCockpit() {
  const [booting, setBooting] = useState<boolean>(true);
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const recentWorkAssets: RecentWorkAsset[] = [
    {
      id: "asset-1",
      type: "SCRIPT",
      title: "Docker Containerization Masterclass",
      subtitle: "YouTube Full Script Draft",
      content:
        "Hook: Stop struggling with local environment bugs! Here is the exact Docker Compose setup we use for multi-agent container orchestration. Step 1: Define worker services. Step 2: Bind internal network ports. Step 3: Mount persistent memory volumes. Full repo link in bio!",
      timestamp: "25m ago",
    },
    {
      id: "asset-2",
      type: "THUMBNAIL",
      title: "Multi-Agent System Architecture Diagram",
      subtitle: "4K Render Concept",
      content:
        "Visual Concept: High-contrast Dark Command Center diagram displaying Docker container bridges, persistent memory substrate sockets, and low-latency agent routing pipelines.",
      timestamp: "45m ago",
    },
    {
      id: "asset-3",
      type: "LINKEDIN",
      title: "Containerizing Multi-Agent Systems",
      subtitle: "Executive Thought Leadership",
      content:
        "After 127 community members requested Docker orchestration following our React Authentication tutorial, here is the complete architectural breakdown. Key takeaways:\n1. Isolated agent network bridges\n2. Zero-latency volume mounting\n3. High-availability container healthchecks.",
      timestamp: "1h ago",
    },
    {
      id: "asset-4",
      type: "NEWSLETTER",
      title: "VIP Developer Digest #42",
      subtitle: "Weekly Subscriber Edition",
      content:
        "Welcome to VIP Developer Digest #42. Based on your feedback from our React Authentication series, this week we dive deep into production Docker Compose setups for AI agent execution.",
      timestamp: "2h ago",
    },
  ];

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
    <div className="relative min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-10">
      {/* System Boot Overlay */}
      {booting && <SystemBootOverlay onComplete={() => setBooting(false)} />}

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

      <div className="mx-auto max-w-6xl space-y-10 pt-2">
        {/* TOP NAVIGATION HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA V2 CREATOR DESKTOP
              </h1>
            </div>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-[#bbbbbb]">
              AI CHIEF OF STAFF OPERATING SYSTEM • INTENTIONAL, CALM &amp; ALIVE
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-[#222222] focus:outline-none focus:ring-1 focus:ring-[#1c69d4]"
            >
              <Search className="h-3.5 w-3.5 text-[#1c69d4]" /> SEARCH (⌘K)
            </button>

            <button
              className="relative border border-[#3c3c3c] bg-[#1a1a1a] p-2 text-white transition hover:border-white"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e22718] font-mono text-[9px] font-bold text-white">
                2
              </span>
            </button>

            <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase tracking-widest text-white shadow-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {"///"} M EXECUTIVE MIND: ONLINE
            </div>
          </div>
        </div>

        {/* WELCOME AREA: EXECUTIVE MIND DIRECTIVE */}
        <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs text-[#e6e6e6] shadow-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[#1c69d4]">
                <Sparkles className="h-4 w-4 text-[#1c69d4]" /> {"///"} EXECUTIVE MIND DIRECTIVE
              </div>
              <h2 className="font-sans text-xl font-extrabold text-white">
                &quot;Your AI worked while you were away.&quot;
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#bbbbbb]">
                <span>• Completed 6 autonomous tasks.</span>
                <span>• Prepared today&apos;s work.</span>
                <span>• Found 2 opportunities.</span>
                <span>• Waiting for your decisions.</span>
              </div>
            </div>

            <a
              href="/missions"
              className="inline-flex items-center gap-2 border border-white bg-white px-6 py-3 font-mono text-xs font-extrabold uppercase tracking-widest text-black shadow-md transition hover:bg-[#e6e6e6]"
            >
              Open Workspace →
            </a>
          </div>
        </div>

        {/* MAIN WORKSPACE SPLIT (PRIMARY HERO 2/3 + SECONDARY SLACK-LIKE FEED 1/3) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* PRIMARY WORKSPACE: ONE MISSION ONLY (HERO) */}
          <div className="relative space-y-6 border border-[#1c69d4]/60 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-8 shadow-2xl transition-all duration-200 hover:border-[#1c69d4] lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="flex items-center gap-2 font-extrabold uppercase tracking-widest text-white">
                <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} TODAY&apos;S MISSION (PRIMARY
                WORKSPACE)
              </span>
              <span className="border border-[#e22718]/40 bg-[#e22718]/10 px-2.5 py-0.5 font-bold text-white">
                STATUS: READY FOR APPROVAL
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white md:text-4xl">
                Create Docker Containerization Tutorial Part 1
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#e6e6e6]">
                <strong>Why:</strong> 127 viewers requested Docker container orchestration after
                your React Authentication video (
                <strong className="border-b border-[#1c69d4] font-mono text-white">
                  +18% retention baseline expected
                </strong>
                ).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5 text-[#bbbbbb]">
                  ESTIMATED TIME: <strong className="text-white">~45 minutes</strong>
                </span>
                <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1.5 text-[#bbbbbb]">
                  DIRECTIVE ID: <strong className="text-white">#mission-docker-01</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowExplainability(true)}
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-5 py-3 font-bold uppercase text-white hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <Brain className="h-4 w-4 text-[#1c69d4]" /> View Evidence
                </button>

                <a
                  href="/missions"
                  className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 font-extrabold uppercase tracking-widest text-black shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-white active:scale-[0.98]"
                >
                  <Compass className="h-4 w-4" /> Approve Mission →
                </a>
              </div>
            </div>
          </div>

          {/* SECONDARY COLUMN: VERTICAL SLACK-LIKE ACTIVITY STREAM */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} AI WORK FEED (SLACK STREAM)
              </span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-3.5 text-[#e6e6e6]">
              <div className="flex items-start gap-3 border-b border-[#3c3c3c]/40 pb-3 text-[11px]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div className="space-y-0.5">
                  <p className="font-sans font-bold text-white">
                    ✓ Sponsor replied (CloudCorp $15k offer ready)
                  </p>
                  <p className="text-[10px] text-[#7e7e7e]">10m ago • Sponsor CRM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-[#3c3c3c]/40 pb-3 text-[11px]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div className="space-y-0.5">
                  <p className="font-sans font-bold text-white">
                    ✓ 523 YouTube comments imported &amp; clustered
                  </p>
                  <p className="text-[10px] text-[#7e7e7e]">25m ago • Community Intelligence</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-[#3c3c3c]/40 pb-3 text-[11px]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0066b1]" />
                <div className="space-y-0.5">
                  <p className="font-sans font-bold text-white">
                    ✓ LinkedIn architecture post draft generated
                  </p>
                  <p className="text-[10px] text-[#7e7e7e]">1h ago • Content Studio</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-[#3c3c3c]/40 pb-3 text-[11px]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1c69d4]" />
                <div className="space-y-0.5">
                  <p className="font-sans font-bold text-white">
                    ✓ Persistent memory substrate updated (#mem-yt-42)
                  </p>
                  <p className="text-[10px] text-[#7e7e7e]">2h ago • Executive Substrate</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[11px]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div className="space-y-0.5">
                  <p className="font-sans font-bold text-white">
                    ✓ Community trend detected (+32% Docker requests)
                  </p>
                  <p className="text-[10px] text-[#7e7e7e]">3h ago • Trend Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM AREA: RECENT WORK HORIZONTAL STRIP (PREVIEW, OPEN, CONTINUE) */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl md:p-8">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <Share2 className="h-4 w-4 text-[#1c69d4]" /> {"///"} RECENT COMPLETED WORK (ALWAYS
              WORK, NEVER KPIS)
            </span>
            <a
              href="/content"
              className="text-[11px] font-bold uppercase text-[#1c69d4] hover:underline"
            >
              Open Content Studio →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recentWorkAssets.map((asset, idx) => (
              <div
                key={asset.id}
                className="flex flex-col justify-between space-y-4 border border-[#3c3c3c] bg-[#0d0d0d] p-5 font-mono text-xs shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:border-white/80"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#3c3c3c]/60 pb-2 text-[10px]">
                    <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2 py-0.5 font-bold text-white">
                      {asset.type}
                    </span>
                    <span className="text-[#7e7e7e]">{asset.timestamp}</span>
                  </div>

                  <h4 className="font-sans text-sm font-extrabold text-white">{asset.title}</h4>
                  <p className="font-mono text-[10px] text-[#bbbbbb]">{asset.subtitle}</p>
                </div>

                <p className="h-20 overflow-hidden font-sans text-xs leading-relaxed text-[#bbbbbb]">
                  {asset.content}
                </p>

                <div className="flex items-center justify-between border-t border-[#3c3c3c]/60 pt-3 text-[10px]">
                  <button
                    onClick={() => handleCopyContent(asset.content, idx)}
                    className="border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 font-bold uppercase text-white hover:border-white"
                  >
                    {copiedIndex === idx ? "Copied!" : "Preview"}
                  </button>
                  <a
                    href="/content"
                    className="border border-white bg-white px-4 py-1.5 font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
                  >
                    Open →
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
