"use client";

import React, { useState } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Database,
  Edit3,
  FileText,
  Layers,
  Play,
  RefreshCw,
  Share2,
  Sparkles,
  Sun,
  Terminal,
  ThumbsUp,
  X,
  Zap,
} from "lucide-react";
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
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [approvalStep, setApprovalStep] = useState<number>(-1);
  const [isDevMode, setIsDevMode] = useState<boolean>(false);

  // Live AI thinking state
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

  const creatorProgressTasks = [
    {
      label: "Importing YouTube comments",
      detail: "523 comments processed from React Authentication",
      status: "DONE",
    },
    {
      label: "Generating Docker Masterclass outline",
      detail: "Structuring 3-part tutorial curriculum",
      status: "IN_PROGRESS",
    },
    {
      label: "Drafting LinkedIn architecture post",
      detail: "Preparing technical breakdown for tech leaders",
      status: "PENDING",
    },
    {
      label: "Preparing thumbnail ideas & title variations",
      detail: "Formulating high-CTR thumbnail hooks",
      status: "PENDING",
    },
    {
      label: "Preparing publishing queue",
      detail: "Scheduling multi-platform publishing slots",
      status: "PENDING",
    },
  ];

  const aiThinkingSteps = [
    "Reading 523 audience comments...",
    "Finding repeated topics (127 Docker requests)...",
    "Comparing previous video retention baselines...",
    "Searching persistent memory (#mem-yt-comment-42)...",
    "Generating mission directives & 4 repurposed assets...",
    "Done.",
  ];

  const triggerAiThinking = (onDone: () => void) => {
    setIsAiThinking(true);
    setThinkingStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < aiThinkingSteps.length) {
        setThinkingStep(step);
      } else {
        clearInterval(interval);
        setIsAiThinking(false);
        onDone();
      }
    }, 400);
  };

  const handleApprove = () => {
    triggerAiThinking(() => {
      setApprovalStep(1);
    });
  };

  const handleInspectMemoryRow = (memoryId: string) => {
    setSelectedEvidence({
      type: "MEMORY",
      title: `Memory Grounding Provider (${memoryId})`,
      detail:
        "Persisted memory record from PersistentMemoryService substrate. Contains 127 verified community request rows.",
      provenance: `Memory Substrate DB • ID: ${memoryId}`,
    });
  };

  const handleCopyContent = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleRegenerateAsset = (index: number) => {
    triggerAiThinking(() => {
      setGeneratedAssets((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = {
            ...next[index],
            content: `${next[index].content}\n\n[REGENERATED BY AI CHIEF OF STAFF AT ${new Date().toLocaleTimeString()}]`,
          };
        }
        return next;
      });
    });
  };

  return (
    <div className="relative min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-8">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

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
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="font-bold uppercase tracking-widest text-[#1c69d4]">
                {"///"} EVIDENCE INSPECTOR PROVIDER
              </span>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="text-[#bbbbbb] transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#e22718]">
                {selectedEvidence.type}
              </span>
              <h3 className="font-sans text-lg font-extrabold uppercase tracking-wider text-white">
                {selectedEvidence.title}
              </h3>
              <p className="font-sans text-xs leading-relaxed text-[#e6e6e6]">
                {selectedEvidence.detail}
              </p>
            </div>

            <div className="border-t border-[#3c3c3c] pt-3 font-mono text-[10px] text-[#bbbbbb]">
              PROVENANCE: {selectedEvidence.provenance}
            </div>

            <div className="flex justify-end pt-2 font-mono text-xs">
              <button
                onClick={() => setSelectedEvidence(null)}
                className="border border-white bg-white px-5 py-2 font-extrabold uppercase tracking-wider text-black transition hover:bg-[#e6e6e6]"
              >
                CLOSE INSPECTOR
              </button>
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

      <div className="mx-auto max-w-6xl space-y-6 pt-2">
        {/* Workspace Top Header & Optional Developer Mode Toggle */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} OMNIA CREATOR WORKSPACE
              </h1>
            </div>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-[#bbbbbb]">
              AUTONOMOUS CREATOR OPERATING SYSTEM • ONLINE
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setIsDevMode(!isDevMode)}
              className={`flex items-center gap-2 border px-3.5 py-1.5 font-bold uppercase tracking-wider transition ${
                isDevMode
                  ? "border-[#1c69d4] bg-[#1c69d4]/20 text-white"
                  : "border-[#3c3c3c] bg-[#1a1a1a] text-[#bbbbbb] hover:border-white hover:text-white"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              DEVELOPER MODE: {isDevMode ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* DEVELOPER MODE ONLY PANEL */}
        {isDevMode && (
          <div className="animate-fade-in space-y-3 border border-[#1c69d4] bg-[#0d0d0d] p-5 font-mono text-xs text-[#e6e6e6]">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-2 font-bold text-[#1c69d4]">
              <span>{"///"} SYSTEM TELEMETRY &amp; AGENT HEALTH (DEVELOPER MODE)</span>
              <span>TASK BUS: ACTIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px] md:grid-cols-4">
              <div>EXECUTIVE MIND: ONLINE</div>
              <div>CLUSTERING: BUSY</div>
              <div>MEMORY SYNC: 100%</div>
              <div>LATENCY: 42ms</div>
            </div>
          </div>
        )}

        {/* MODULE 1: TODAY'S MISSION (HERO DIRECTIVE) */}
        <div className="relative space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
            <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-3 py-1 font-bold uppercase tracking-widest text-white">
              {"///"} TODAY&apos;S MISSION (HERO DIRECTIVE)
            </span>
            <span className="text-[10px] font-bold uppercase text-[#1c69d4]">
              PRIMARY ACTION ITEM
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white">
              Create Docker Containerization Tutorial Part 1
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#e6e6e6]">
              127 viewers requested Docker container orchestration after your React Authentication
              video. High retention impact expected (+18% watch time retention baseline).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
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

            <button
              onClick={() => setApprovalStep(-1)}
              className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-6 py-3.5 font-bold uppercase tracking-widest text-[#bbbbbb] transition hover:text-white"
            >
              DISMISS
            </button>
          </div>
        </div>

        {/* MODULE 2: CREATOR-FACING AI PROGRESS STREAM */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <Sparkles className="h-4 w-4 text-[#0066b1]" /> {"///"} REAL-TIME AI WORKFLOW PROGRESS
            </span>
            <span className="text-[10px] text-[#bbbbbb]">AUTONOMOUS CREATOR PIPELINE</span>
          </div>

          <div className="space-y-2.5 pt-1 text-[#e6e6e6]">
            {creatorProgressTasks.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between border border-[#3c3c3c] bg-[#0d0d0d] p-3"
              >
                <div className="flex items-center gap-3">
                  {task.status === "DONE" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : task.status === "IN_PROGRESS" ? (
                    <RefreshCw className="h-4 w-4 shrink-0 animate-spin text-[#1c69d4]" />
                  ) : (
                    <span className="ml-1 mr-1 h-2 w-2 shrink-0 rounded-full bg-[#3c3c3c]" />
                  )}
                  <span className="font-bold text-white">{task.label}</span>
                </div>
                <span className="hidden text-[11px] text-[#bbbbbb] sm:inline">{task.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MODULE 3: READY TO REVIEW (GENERATED CONTENT ASSETS) */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
              <Share2 className="h-4 w-4 text-[#1c69d4]" /> {"///"} READY TO REVIEW (GENERATED
              CONTENT ASSETS)
            </span>
            <span className="text-[10px] uppercase text-[#bbbbbb]">
              4 ASSETS READY FOR PUBLISHING
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 font-mono text-xs md:grid-cols-2 lg:grid-cols-4">
            {generatedAssets.map((asset: AssetItem, idx: number) => (
              <div
                key={asset.platform}
                className="flex flex-col justify-between space-y-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-2">
                    <span className="text-[10px] text-[#7e7e7e]">ASSET 0{idx + 1}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                      {asset.platform}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold uppercase text-white">{asset.title}</h4>
                  <textarea
                    value={asset.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGeneratedAssets((prev: AssetItem[]) => {
                        const next = [...prev];
                        if (next[idx]) next[idx] = { ...next[idx], content: val };
                        return next;
                      });
                    }}
                    className="h-28 w-full resize-none border border-[#3c3c3c] bg-[#000000] p-2.5 font-sans text-[11px] leading-relaxed text-[#e6e6e6] outline-none focus:border-white"
                  />
                </div>

                <div className="flex items-center gap-2 border-t border-[#3c3c3c] pt-2">
                  <button
                    onClick={() => handleCopyContent(asset.content, idx)}
                    className="flex-1 border border-[#3c3c3c] bg-[#1a1a1a] py-1.5 text-center text-[10px] font-bold uppercase text-white hover:border-white"
                  >
                    {copiedIndex === idx ? "COPIED!" : "COPY"}
                  </button>
                  <button
                    onClick={() => handleRegenerateAsset(idx)}
                    className="flex-1 border border-[#3c3c3c] bg-[#1a1a1a] py-1.5 text-center text-[10px] font-bold uppercase text-[#1c69d4] hover:border-white"
                  >
                    REGENERATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODULE 4: RECENT ACTIVITY TIMELINE */}
        <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-xl">
          <div className="border-b border-[#3c3c3c] pb-3 font-bold uppercase tracking-widest text-white">
            {"///"} RECENT AUTONOMOUS AI ACTIVITY
          </div>

          <div className="space-y-3 text-[#e6e6e6]">
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
