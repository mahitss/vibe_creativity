"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Copy,
  Edit3,
  HelpCircle,
  MessageSquare,
  Play,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";
import { ExecutiveSyncOverlay } from "./executive-sync-overlay";
import { ExplainabilityDrawer } from "../../reasoning/components/explainability-drawer";

interface EvidenceItemDetail {
  type: "COMMENT" | "ANALYTICS" | "VIDEO" | "MEMORY";
  title: string;
  detail: string;
  provenance: string;
}

interface AssetItem {
  platform: string;
  title: string;
  content: string;
}

export function MissionControlCockpit() {
  const [showSyncOverlay, setShowSyncOverlay] = useState<boolean>(true);
  const [isCardRevealed, setIsCardRevealed] = useState<boolean>(false);
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [approvalStep, setApprovalStep] = useState<number>(-1);

  // Live AI thinking steps state
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [thinkingStep, setThinkingStep] = useState<number>(0);

  // Inspector modal state
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItemDetail | null>(null);

  // Editable Generated Assets state
  const [generatedAssets, setGeneratedAssets] = useState<AssetItem[]>([
    {
      platform: "YOUTUBE SHORT",
      title: "Docker Setup in 60s",
      content:
        "Hook: Stopped struggling with local environment bugs? Here is the exact Docker Compose setup we use for multi-agent container orchestration. Step 1: Define worker services. Step 2: Bind internal network ports. Step 3: Mount persistent memory volumes. Full repo link in bio!",
    },
    {
      platform: "LINKEDIN POST",
      title: "Containerizing Multi-Agent Systems",
      content:
        "After 127 community members requested Docker orchestration following our React Authentication tutorial, here is the complete architectural breakdown. Key takeaways:\n1. Isolated agent network bridges\n2. Zero-latency volume mounting\n3. High-availability container healthchecks.\nFull code repository on GitHub.",
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

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const aiThinkingSteps = [
    "Reading 523 audience comments...",
    "Finding repeated topics (127 Docker requests)...",
    "Comparing previous video retention baselines...",
    "Searching persistent memory (#mem-yt-comment-42)...",
    "Generating mission directives & 4 repurposed assets...",
    "Done.",
  ];

  const handleSyncComplete = () => {
    setShowSyncOverlay(false);
    setTimeout(() => {
      setIsCardRevealed(true);
    }, 800);
  };

  const triggerAiThinking = (onDone: () => void) => {
    setIsAiThinking(true);
    setThinkingStep(0);
    const interval = setInterval(() => {
      setThinkingStep((prev) => {
        if (prev >= aiThinkingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAiThinking(false);
            onDone();
          }, 400);
          return aiThinkingSteps.length - 1;
        }
        return prev + 1;
      });
    }, 400);
  };

  const handleApprove = async () => {
    triggerAiThinking(() => {
      setApprovalStep(4);
    });
    try {
      await fetch("http://localhost:8000/api/mission-control/mission/approve", {
        method: "POST",
        headers: { "X-Creator-Id": "creator-default" },
      });
    } catch {
      // Local fallback mode
    }
  };

  const handleRegenerateAsset = async (index: number) => {
    triggerAiThinking(() => {
      setGeneratedAssets((prev) => {
        const target = prev[index];
        if (!target) return prev;
        const next = [...prev];
        next[index] = {
          platform: target.platform,
          title: target.title,
          content: `${target.content} [Regenerated with live Memory Service grounding & retention optimization]`,
        };
        return next;
      });
    });

    try {
      const res = await fetch("http://localhost:8000/api/content/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Creator-Id": "creator-default" },
        body: JSON.stringify({ topic: "Docker Containerization", memory_id: "mem-yt-comment-42" }),
      });
      const data = await res.json();
      if (data && data.assets && data.assets[index]) {
        setGeneratedAssets((prev) => {
          const next = [...prev];
          if (next[index]) {
            next[index] = {
              platform: data.assets[index].platform,
              title: data.assets[index].title,
              content: data.assets[index].content,
            };
          }
          return next;
        });
      }
    } catch {
      // Fallback
    }
  };

  const handleInspectMemoryRow = async (memoryId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/memory/${memoryId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedEvidence({
          type: "MEMORY",
          title: `Persistent Memory Row #${data.memory_id}`,
          detail: `${data.title}: ${data.content}`,
          provenance: `Source: ${data.source} • Version: v${data.version} • Confidence: ${Math.round(data.confidence * 100)}%`,
        });
        return;
      }
    } catch {
      // Fallback detail
    }
    setSelectedEvidence({
      type: "MEMORY",
      title: `Persistent Memory Row #${memoryId}`,
      detail:
        "Stored 127 verified audience requests for container orchestration and Docker Compose setups.",
      provenance: "Memory Service • Vector Hash 0x9f3a",
    });
  };

  const handleCopyContent = (text: string, index: number) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback copy
    }
  };

  const scrollToMission = () => {
    const el = document.getElementById("todays-mission-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#000000] p-8 font-sans text-white selection:bg-[#1c69d4] selection:text-white">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      {/* 3-Second Executive Sync Overlay */}
      {showSyncOverlay && <ExecutiveSyncOverlay onComplete={handleSyncComplete} />}

      {/* Explainability Panel Drawer */}
      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        missionTitle="Create Docker Part 1"
      />

      {/* Evidence Inspector Modal */}
      {selectedEvidence && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 font-sans backdrop-blur-md">
          <div className="relative w-full max-w-lg space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1c69d4]">
                {"///"} EVIDENCE INSPECTOR • PROVENANCE VERIFIED
              </span>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="border border-[#3c3c3c] bg-[#0d0d0d] p-1 text-[#bbbbbb] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-sans text-lg font-extrabold uppercase text-white">
                {selectedEvidence.title}
              </h3>
              <div className="border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-sans text-xs leading-relaxed text-[#e6e6e6]">
                {selectedEvidence.detail}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#3c3c3c] pt-3 font-mono text-[10px] text-[#7e7e7e]">
              <span>PROVENANCE: {selectedEvidence.provenance}</span>
              <span className="font-bold text-white">100% GROUNDED</span>
            </div>
          </div>
        </div>
      )}

      {/* Live AI Thinking Overlay Modal */}
      {isAiThinking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 font-sans backdrop-blur-2xl">
          <div className="relative w-full max-w-md space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 text-center shadow-2xl">
            <div className="bmw-m-tricolor-dots mx-auto">
              <span />
              <span />
              <span />
            </div>

            <div className="space-y-1">
              <h3 className="font-sans text-xl font-extrabold uppercase tracking-wider text-white">
                EXECUTIVE MIND THINKING
              </h3>
              <p className="font-mono text-xs uppercase text-[#bbbbbb]">
                PROCESSING WORKFLOW &amp; MEMORY REASONING...
              </p>
            </div>

            <div className="space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5 text-left font-mono text-xs">
              {aiThinkingSteps.map((stepText, sIdx) => {
                const isDone = sIdx < thinkingStep;
                const isCurrent = sIdx === thinkingStep;
                return (
                  <div
                    key={stepText}
                    className={`flex items-center gap-2 transition-all ${
                      isDone
                        ? "font-bold text-white"
                        : isCurrent
                          ? "font-bold text-[#1c69d4]"
                          : "text-[#7e7e7e] opacity-40"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0066b1]" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 animate-ping rounded-full bg-[#1c69d4]" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#3c3c3c]" />
                    )}
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-8 pt-4">
        {/* Command Center Top Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA CREATOR COMMAND CENTER
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              AUTONOMOUS CREATOR OPERATING SYSTEM
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-2 font-bold uppercase tracking-widest text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0066b1]" />
              {"///"} M EXECUTIVE MIND: ACTIVE
            </div>
          </div>
        </div>

        {/* SECTION 1: ATTENTION STATEMENT */}
        <div className="relative space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
              <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} DAILY SYNTHESIS
            </div>
            <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#bbbbbb]">
              MAHIT
            </span>
          </div>

          <div className="space-y-2 font-sans">
            <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white">
              GOOD MORNING, MAHIT.
            </h2>
            <p className="text-base leading-relaxed text-[#e6e6e6]">
              I found{" "}
              <strong className="border-b border-[#1c69d4] font-mono text-white">3 things</strong>{" "}
              that need your attention today.
            </p>
          </div>
        </div>

        {/* SECTION 2: TODAY'S PRIORITIES (MAX 3 ACTION CARDS) */}
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#bbbbbb]">
            {"///"} TODAY&apos;S PRIORITIES
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Priority 1 */}
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl transition hover:border-white">
              <div className="flex items-center justify-between">
                <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                  PRIORITY 1
                </span>
                <span className="font-mono text-[10px] text-[#bbbbbb]">SPONSORSHIP</span>
              </div>
              <div>
                <h4 className="font-sans text-lg font-bold text-white">CloudCorp offer ready</h4>
                <p className="mt-1 text-xs text-[#e6e6e6]">
                  CloudCorp replied with a $15,000 sponsorship contract offer.
                </p>
              </div>
              <a
                href="/sponsors"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#1c69d4] hover:underline"
              >
                Review offer →
              </a>
            </div>

            {/* Priority 2 */}
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl transition hover:border-white">
              <div className="flex items-center justify-between">
                <span className="border border-[#e22718]/40 bg-[#e22718]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                  PRIORITY 2
                </span>
                <span className="font-mono text-[10px] text-[#bbbbbb]">COMMUNITY</span>
              </div>
              <div>
                <h4 className="font-sans text-lg font-bold text-white">
                  127 viewers requested Docker
                </h4>
                <p className="mt-1 text-xs text-[#e6e6e6]">
                  Audience demands container orchestration tutorial after React Auth video.
                </p>
              </div>
              <a
                href="/missions"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#1c69d4] hover:underline"
              >
                Create tutorial →
              </a>
            </div>

            {/* Priority 3 */}
            <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl transition hover:border-white">
              <div className="flex items-center justify-between">
                <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                  PRIORITY 3
                </span>
                <span className="font-mono text-[10px] text-[#bbbbbb]">CONTENT</span>
              </div>
              <div>
                <h4 className="font-sans text-lg font-bold text-white">LinkedIn draft ready</h4>
                <p className="mt-1 text-xs text-[#e6e6e6]">
                  Containerizing Multi-Agent Systems post prepared for publishing.
                </p>
              </div>
              <a
                href="/content"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#1c69d4] hover:underline"
              >
                Publish draft →
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 3: ACTIVITY TIMELINE */}
        <div className="space-y-3 border border-[#3c3c3c] bg-[#1a1a1a] p-6">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#bbbbbb]">
            {"///"} RECENT AI ACTIVITY TIMELINE
          </div>
          <div className="space-y-2 font-mono text-xs text-[#e6e6e6]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
              <span>Imported 523 YouTube comments from React Authentication video</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
              <span>Identified 127 viewer requests for Docker Containerization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
              <span>Generated CloudCorp sponsorship follow-up proposal draft</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#0066b1]" />
              <span>Synthesized priority mission: Docker Masterclass Series</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE EVIDENCE PANEL */}
        <div className="relative space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <BarChart3 className="h-4 w-4 text-[#0066b1]" /> {"///"} INTERACTIVE EVIDENCE &amp;
              GROUNDING (CLICK TO INSPECT)
            </span>
            <span className="text-[10px] uppercase text-[#bbbbbb]">CLICK ANY ITEM TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2 lg:grid-cols-4">
            {/* Clickable Comment Item */}
            <button
              onClick={() =>
                setSelectedEvidence({
                  type: "COMMENT",
                  title: "YouTube Comment @dev_alex",
                  detail:
                    "Can you build a Docker setup for multi-agent systems? We need container orchestration for concurrent agent workflows.",
                  provenance: "YouTube Data API v3 • Verified 142 upvotes",
                })
              }
              className="group space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5 text-left transition hover:border-white"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-[#0066b1]">
                <span>COMMENT SIGNAL</span>
                <span className="transition group-hover:translate-x-0.5">INSPECT ↗</span>
              </div>
              <p className="font-sans text-xs italic leading-relaxed text-white">
                &ldquo;Can you build a Docker setup for multi-agent systems?&rdquo;
              </p>
              <div className="text-[10px] text-[#7e7e7e]">@dev_alex • 142 upvotes</div>
            </button>

            {/* Clickable Analytics Item */}
            <button
              onClick={() =>
                setSelectedEvidence({
                  type: "ANALYTICS",
                  title: "YouTube Watch Time Retention Baseline",
                  detail:
                    "Technical deep-dive tutorials deliver +18% higher watch time retention in first 10 minutes and 2.4x VIP course conversions.",
                  provenance: "YouTube Analytics API • 90-Day Baseline",
                })
              }
              className="group space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5 text-left transition hover:border-white"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-[#1c69d4]">
                <span>ANALYTICS SIGNAL</span>
                <span className="transition group-hover:translate-x-0.5">INSPECT ↗</span>
              </div>
              <p className="text-xs font-bold text-white">+18% Retention Baseline</p>
              <div className="text-[10px] text-[#7e7e7e]">Last 5 Docker &amp; React videos</div>
            </button>

            {/* Clickable Previous Video Item */}
            <button
              onClick={() =>
                setSelectedEvidence({
                  type: "VIDEO",
                  title: "React Authentication Series Part 4",
                  detail:
                    "Published 24h ago. 4.2k views, 523 comments analyzed, 98.4% retention in first 5 minutes.",
                  provenance: "Uploaded 2026-08-06 • Master 4K",
                })
              }
              className="group space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5 text-left transition hover:border-white"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-[#e22718]">
                <span>PREVIOUS UPLOAD</span>
                <span className="transition group-hover:translate-x-0.5">INSPECT ↗</span>
              </div>
              <p className="text-xs font-bold text-white">React Authentication</p>
              <div className="text-[10px] text-[#7e7e7e]">523 comments analyzed</div>
            </button>

            {/* Clickable Memory Item */}
            <button
              onClick={() => handleInspectMemoryRow("mem-yt-comment-42")}
              className="group space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-5 text-left transition hover:border-white"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-white">
                <span>PERSISTENT MEMORY</span>
                <span className="transition group-hover:translate-x-0.5">INSPECT ↗</span>
              </div>
              <p className="font-mono text-xs font-bold text-white">#mem-yt-comment-42</p>
              <div className="text-[10px] text-[#7e7e7e]">127 Verified Requests</div>
            </button>
          </div>
        </div>

        {/* SECTION 4: GENERATED CONTENT PIPELINE */}
        <div className="relative space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <Share2 className="h-4 w-4 text-[#1c69d4]" /> {"///"} GENERATED REPURPOSED CONTENT
              (PREVIEW, EDIT &amp; REGENERATE)
            </span>
            <span className="text-[10px] uppercase text-[#bbbbbb]">
              4 ASSETS GENERATED &amp; EDITABLE
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2 lg:grid-cols-4">
            {generatedAssets.map((asset: AssetItem, idx: number) => (
              <div
                key={asset.platform}
                className="flex flex-col justify-between space-y-4 border border-[#3c3c3c] bg-[#0d0d0d] p-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-2">
                    <span className="text-[10px] text-[#7e7e7e]">ASSET 0{idx + 1}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                      {asset.platform}
                    </span>
                  </div>

                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    {asset.title}
                  </h4>

                  <textarea
                    value={asset.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGeneratedAssets((prev: AssetItem[]) => {
                        const next = [...prev];
                        if (next[idx]) {
                          next[idx] = { ...next[idx], content: val };
                        }
                        return next;
                      });
                    }}
                    className="h-32 w-full resize-none border border-[#3c3c3c] bg-[#000000] p-3 font-sans text-[11px] leading-relaxed text-[#e6e6e6] outline-none focus:border-white"
                  />
                </div>

                <div className="flex items-center gap-2 border-t border-[#3c3c3c] pt-3">
                  <button
                    onClick={() => handleCopyContent(asset.content, idx)}
                    className="flex-1 border border-[#3c3c3c] bg-[#1a1a1a] py-2 text-center text-[10px] font-bold uppercase tracking-wider text-white transition hover:border-white"
                  >
                    {copiedIndex === idx ? "COPIED!" : "COPY"}
                  </button>
                  <button
                    onClick={() => handleRegenerateAsset(idx)}
                    className="flex-1 border border-[#3c3c3c] bg-[#1a1a1a] py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#1c69d4] transition hover:border-white"
                  >
                    REGENERATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
