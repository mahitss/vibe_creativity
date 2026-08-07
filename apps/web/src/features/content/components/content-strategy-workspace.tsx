"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Edit3,
  FileText,
  Globe,
  Layers,
  Lightbulb,
  Play,
  RefreshCw,
  Share2,
  Sparkles,
} from "lucide-react";

export function ContentStrategyWorkspace() {
  const [activeTab, setActiveTab] = useState<
    "YOUTUBE" | "LINKEDIN" | "NEWSLETTER" | "X_THREAD" | "INSTAGRAM"
  >("YOUTUBE");
  const [scriptText, setScriptText] = useState<string>(
    `# Docker Containerization Masterclass Part 1\n\n## Hook (0:00 - 0:45)\nStop struggling with local environment bugs! In this video, we build the exact Docker Compose setup used for multi-agent container orchestration.\n\n## Step 1: Define Worker Services\nFirst, configure your docker-compose.yml file with isolated container bridges:\n\`\`\`yaml\nversion: '3.8'\nservices:\n  executive_mind:\n    image: omnia/agent-router:latest\n    ports:\n      - "8000:8000"\n\`\`\`\n\n## Step 2: Bind Internal Volumes\nMount your persistent memory substrate volume to guarantee zero-latency state recovery.`,
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

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
                {"///"} CONTENT STUDIO (MULTI-PLATFORM EDITOR)
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              AI CO-WRITER, MULTI-CHANNEL REPURPOSING &amp; PUBLISHING PIPELINE
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-2 border border-[#3c3c3c] bg-[#1a1a1a] px-3.5 py-1.5 font-bold uppercase text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> AUTO-SAVE: ON
            </span>
            <button
              onClick={handleCopy}
              className="border border-[#3c3c3c] bg-[#1a1a1a] px-4 py-1.5 font-bold uppercase text-white hover:border-white"
            >
              {copied ? "COPIED!" : "COPY CONTENT"}
            </button>
            <button className="border border-white bg-white px-5 py-1.5 font-extrabold uppercase text-black hover:bg-[#e6e6e6]">
              PUBLISH TO CHANNEL →
            </button>
          </div>
        </div>

        {/* PLATFORM TABS */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#3c3c3c] pb-4 font-mono text-xs">
          {[
            { id: "YOUTUBE", label: "YOUTUBE SCRIPT" },
            { id: "LINKEDIN", label: "LINKEDIN POST" },
            { id: "NEWSLETTER", label: "NEWSLETTER #42" },
            { id: "X_THREAD", label: "X THREAD" },
            { id: "INSTAGRAM", label: "INSTAGRAM REEL" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`border px-4 py-2 font-bold uppercase transition ${
                activeTab === tab.id
                  ? "border-[#1c69d4] bg-[#1c69d4]/10 text-white"
                  : "border-[#3c3c3c] bg-[#0d0d0d] text-[#7e7e7e] hover:border-white hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SPLIT VIEW (LEFT: LIVE EDITOR | RIGHT: PLATFORM PREVIEW) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* LEFT: LIVE MARKDOWN EDITOR */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} LIVE MARKDOWN EDITOR (AI CO-WRITER ACTIVE)
              </span>
              <Edit3 className="h-4 w-4 text-[#1c69d4]" />
            </div>

            <textarea
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              className="h-96 w-full resize-none border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-mono text-xs leading-relaxed text-white focus:border-[#1c69d4] focus:outline-none focus:ring-1 focus:ring-[#1c69d4]"
            />

            <div className="flex items-center justify-between font-mono text-xs text-[#bbbbbb]">
              <span>WORD COUNT: 142 WORDS</span>
              <button className="flex items-center gap-2 text-[#1c69d4] hover:underline">
                <Sparkles className="h-3.5 w-3.5" /> AI Suggest Hook Rewrite
              </button>
            </div>
          </div>

          {/* RIGHT: PLATFORM PREVIEW & SPECS */}
          <div className="space-y-6 border border-[#3c3c3c] bg-[#1a1a1a] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 font-mono text-xs">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} PLATFORM PREVIEW ({activeTab})
              </span>
              <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2.5 py-0.5 font-bold text-white">
                READY TO PUBLISH
              </span>
            </div>

            <div className="space-y-4 border border-[#3c3c3c] bg-[#0d0d0d] p-6 font-sans text-xs text-[#e6e6e6] shadow-inner">
              <div className="flex items-center gap-3 border-b border-[#3c3c3c] pb-3 font-mono text-[11px]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c69d4] font-bold text-white">
                  O
                </div>
                <div>
                  <p className="font-bold text-white">OMNIA Creator Channel</p>
                  <p className="text-[10px] text-[#7e7e7e]">Target Platform: {activeTab}</p>
                </div>
              </div>

              <div className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#e6e6e6]">
                {scriptText}
              </div>
            </div>

            <div className="space-y-2 border border-[#3c3c3c] bg-[#0d0d0d] p-4 font-mono text-xs">
              <span className="font-bold text-white">AI OPTIMIZATION CHECKLIST:</span>
              <div className="space-y-1 text-[11px] text-[#bbbbbb]">
                <p className="text-emerald-400">
                  ✓ Grounded in 127 community comments (#mem-yt-comment-42)
                </p>
                <p className="text-emerald-400">
                  ✓ CloudCorp sponsorship disclaimer included ($15k deal terms)
                </p>
                <p className="text-emerald-400">✓ Includes github repository link in bio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
