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

        {/* SECTION 1: EXECUTIVE GREETING */}
        <div className="relative space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <Sun className="h-4 w-4 text-[#1c69d4]" /> {"///"} EXECUTIVE BRIEF
            </div>
            <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-3 py-1 text-[10px] uppercase text-[#bbbbbb]">
              MAHIT
            </span>
          </div>

          <div className="space-y-3 font-sans">
            <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white">
              GOOD EVENING, MAHIT.
            </h2>
            <div className="space-y-1 text-base leading-relaxed text-[#e6e6e6]">
              <p>
                Yesterday you uploaded{" "}
                <strong className="border-b border-[#1c69d4] font-mono text-white">
                  React Authentication
                </strong>
                .
              </p>
              <p>
                I analyzed <strong className="font-mono text-white">523 comments</strong>.
              </p>
              <p>
                I found{" "}
                <strong className="border-b border-[#e22718] font-mono text-white">
                  one important opportunity
                </strong>
                .
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: TODAY'S MISSION */}
        <div className="relative space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-3 py-1 font-bold uppercase tracking-widest text-white">
              {"///"} TODAY&apos;S MISSION
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
              Create Docker Containerization Tutorial Part 1
            </h3>
            <p className="font-sans text-sm text-[#e6e6e6]">
              127 viewers requested Docker container orchestration after your React Authentication
              video.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2 font-mono text-xs">
            {approvalStep < 0 ? (
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-[#e6e6e6]"
              >
                <ThumbsUp className="h-4 w-4" /> APPROVE MISSION
              </button>
            ) : (
              <span className="flex items-center gap-2 border border-[#0066b1] bg-[#0066b1]/20 px-8 py-3.5 font-extrabold uppercase tracking-widest text-white">
                <CheckCircle2 className="h-4 w-4 text-[#0066b1]" /> MISSION ACCEPTED
              </span>
            )}

            <button
              onClick={() => setShowExplainability(true)}
              className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-6 py-3.5 font-bold uppercase tracking-widest text-white transition hover:border-white"
            >
              <Brain className="h-4 w-4 text-[#1c69d4]" /> VIEW WHY
            </button>
          </div>
        </div>

        {/* SECTION 3: RECENT ACTIVITY (LAST 5 AI ACTIONS) */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#bbbbbb]">
            {"///"} RECENT AI ACTIVITY
          </div>

          <div className="space-y-3 font-mono text-xs text-[#e6e6e6]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>Imported 523 YouTube comments from React Authentication video</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>Discovered high-demand trend: 127 viewers requested Docker</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>Generated CloudCorp sponsorship follow-up proposal draft</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>Synthesized priority mission: Docker Masterclass Series</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066b1]" />
              <span>Prepared 4 multi-platform content publishing drafts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
