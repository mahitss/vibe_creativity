"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Copy,
  Edit3,
  RefreshCw,
  Share2,
  Sparkles,
  ThumbsUp,
  X,
} from "lucide-react";
import { ExplainabilityDrawer } from "../../reasoning/components/explainability-drawer";

type GuidedStep = "GREETING" | "SCANNING" | "MISSION_REVEAL" | "GENERATING" | "ASSETS_READY";

interface AssetItem {
  platform: string;
  title: string;
  content: string;
}

export function MissionControlCockpit() {
  const [step, setStep] = useState<GuidedStep>("GREETING");
  const [scanIndex, setScanIndex] = useState<number>(0);
  const [generationIndex, setGenerationIndex] = useState<number>(0);
  const [showExplainability, setShowExplainability] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const scanMessages = [
    "Scanning 523 audience comments from React Authentication...",
    "Comparing previous watch time retention baselines (+18% impact)...",
    "Searching persistent memory substrate (#mem-yt-comment-42)...",
    "Synthesizing high-demand topic (127 Docker requests)...",
    "Building mission directive...",
  ];

  const generationMessages = [
    "Synthesizing YouTube Masterclass Outline...",
    "Drafting YouTube Technical Script...",
    "Creating 60s YouTube Short Script...",
    "Writing LinkedIn Architecture Post...",
    "Crafting 3-Post X Thread...",
  ];

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

  const handleStartReview = () => {
    setStep("SCANNING");
    setScanIndex(0);

    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      if (idx < scanMessages.length) {
        setScanIndex(idx);
      } else {
        clearInterval(interval);
        setStep("MISSION_REVEAL");
      }
    }, 600);
  };

  const handleApproveMission = () => {
    setStep("GENERATING");
    setGenerationIndex(0);

    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      if (idx < generationMessages.length) {
        setGenerationIndex(idx);
      } else {
        clearInterval(interval);
        setStep("ASSETS_READY");
      }
    }, 700);
  };

  const handleCopyContent = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleRegenerateAsset = (idx: number) => {
    setStep("GENERATING");
    setGenerationIndex(0);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i < generationMessages.length) {
        setGenerationIndex(i);
      } else {
        clearInterval(interval);
        setGeneratedAssets((prev) => {
          const next = [...prev];
          if (next[idx]) {
            next[idx] = {
              ...next[idx],
              content: `${next[idx].content}\n\n[REGENERATED WITH MEMORY GROUNDING AT ${new Date().toLocaleTimeString()}]`,
            };
          }
          return next;
        });
        setStep("ASSETS_READY");
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-12">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      {/* Explainability Panel Drawer */}
      <ExplainabilityDrawer
        isOpen={showExplainability}
        onClose={() => setShowExplainability(false)}
        missionTitle="Create Docker Part 1"
      />

      <main className="mx-auto max-w-3xl space-y-10 pt-6">
        {/* Command Center Header Identifier */}
        <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="bmw-m-tricolor-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="font-extrabold uppercase tracking-widest text-white">
              {"///"} OMNIA CREATOR OPERATING SYSTEM
            </span>
          </div>
          <div className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1 text-[11px] font-bold uppercase text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#0066b1]" />M EXECUTIVE MIND:
            ONLINE
          </div>
        </div>

        {/* STEP 1: INITIAL GREETING (SINGLE FOCAL POINT) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👋</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#bbbbbb]">
              EXECUTIVE MIND DIRECTIVE
            </span>
          </div>

          <div className="space-y-3 font-sans text-xl font-medium leading-relaxed text-[#e6e6e6] md:text-2xl">
            <p className="text-[#8e8e93]">Good evening Mahit.</p>
            <p>I worked while you were away.</p>
            <p>
              I analyzed your{" "}
              <strong className="border-b border-[#1c69d4] font-mono text-white">
                React Authentication
              </strong>{" "}
              video comments and found{" "}
              <strong className="border-b border-[#e22718] font-mono text-white">
                something important
              </strong>
              .
            </p>
            <p className="text-base text-[#bbbbbb]">Would you like to review it?</p>
          </div>

          {step === "GREETING" && (
            <div className="pt-2">
              <button
                onClick={handleStartReview}
                className="group flex items-center gap-3 border border-white bg-white px-8 py-4 font-mono text-xs font-extrabold uppercase tracking-widest text-black shadow-2xl transition hover:bg-[#e6e6e6]"
              >
                <Sparkles className="h-4 w-4 text-[#e22718]" />
                Review Opportunity
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        {/* STEP 2: AI SCANNING REASONING ANIMATION */}
        {step === "SCANNING" && (
          <div className="animate-fade-in space-y-3 border-l-2 border-[#1c69d4] py-2 pl-6 font-mono text-xs text-[#bbbbbb]">
            {scanMessages.slice(0, scanIndex + 1).map((msg, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                {i === scanIndex ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#1c69d4]" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0066b1]" />
                )}
                <span>{msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: MISSION REVEAL (SINGLE DECISION HERO) */}
        {(step === "MISSION_REVEAL" || step === "GENERATING" || step === "ASSETS_READY") && (
          <div className="animate-fade-in space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-4 font-mono text-xs">
              <span className="border border-[#0066b1]/40 bg-[#0066b1]/10 px-3 py-1 font-bold uppercase tracking-widest text-white">
                {"///"} TODAY&apos;S MISSION (HERO DIRECTIVE)
              </span>
              <span className="text-[10px] font-bold uppercase text-[#1c69d4]">
                CONFIDENCE: HIGH
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold uppercase tracking-wider text-white md:text-3xl">
                Create Docker Containerization Tutorial Part 1
              </h2>
              <div className="space-y-1 font-sans text-sm text-[#e6e6e6]">
                <p>
                  <strong>Reason:</strong> 127 viewers requested Docker container orchestration
                  after your React Authentication video.
                </p>
                <p>
                  <strong>Expected Impact:</strong> Higher watch time retention baseline (+18%)
                  &amp; subscriber growth.
                </p>
              </div>
            </div>

            {step === "MISSION_REVEAL" && (
              <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
                <button
                  onClick={handleApproveMission}
                  className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 font-extrabold uppercase tracking-widest text-black transition hover:bg-[#e6e6e6]"
                >
                  <ThumbsUp className="h-4 w-4" /> Approve Mission
                </button>

                <button
                  onClick={() => setShowExplainability(true)}
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-6 py-3.5 font-bold uppercase tracking-widest text-white transition hover:border-white"
                >
                  <Brain className="h-4 w-4 text-[#1c69d4]" /> View Why
                </button>

                <button
                  onClick={() => setStep("GREETING")}
                  className="flex items-center gap-2 border border-[#3c3c3c] bg-[#0d0d0d] px-6 py-3.5 font-bold uppercase tracking-widest text-[#bbbbbb] transition hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: LIVE ASSET GENERATION ANIMATION STREAM */}
        {step === "GENERATING" && (
          <div className="animate-fade-in space-y-4 border-l-2 border-[#e22718] py-2 pl-6 font-mono text-xs text-[#bbbbbb]">
            <p className="font-bold text-white">
              Executive Mind: &quot;Preparing all multi-platform content assets now...&quot;
            </p>
            {generationMessages.slice(0, generationIndex + 1).map((msg, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                {i === generationIndex ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#e22718]" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                )}
                <span>{msg}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 5: REVIEW & PUBLISH GENERATED ASSETS */}
        {step === "ASSETS_READY" && (
          <div className="animate-fade-in space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-white">
                <Share2 className="h-4 w-4 text-[#1c69d4]" /> {"///"} READY TO REVIEW (4 ASSETS
                GENERATED)
              </span>
              <span className="text-[10px] text-[#bbbbbb]">PREVIEW, EDIT &amp; PUBLISH</span>
            </div>

            <div className="space-y-4">
              {generatedAssets.map((asset, idx) => (
                <div
                  key={asset.platform}
                  className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
                    <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2.5 py-0.5 font-bold text-white">
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
                    className="h-36 w-full resize-none border border-[#3c3c3c] bg-[#000000] p-4 font-sans text-xs leading-relaxed text-[#e6e6e6] outline-none focus:border-white"
                  />

                  <div className="flex items-center justify-end gap-3 font-mono text-xs">
                    <button
                      onClick={() => handleRegenerateAsset(idx)}
                      className="border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-2 font-bold uppercase text-[#1c69d4] hover:border-white"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={() => handleCopyContent(asset.content, idx)}
                      className="border border-[#3c3c3c] bg-[#0d0d0d] px-4 py-2 font-bold uppercase text-white hover:border-white"
                    >
                      {copiedIndex === idx ? "Copied!" : "Copy"}
                    </button>
                    <a
                      href="/content"
                      className="border border-white bg-white px-5 py-2 font-extrabold uppercase text-black hover:bg-[#e6e6e6]"
                    >
                      Publish →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
