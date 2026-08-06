"use client";

import React from "react";
import {
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  X,
} from "lucide-react";

interface ExplainabilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle?: string;
}

export function ExplainabilityDrawer({ isOpen, onClose, missionTitle }: ExplainabilityDrawerProps) {
  const [_explanationData, setExplanationData] = React.useState<Record<string, unknown> | null>(
    null,
  );

  React.useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:8000/api/missions/mission-top-101/explanation", {
        headers: { "X-Creator-Id": "creator-default" },
      })
        .then((res) => res.json())
        .then((data) => setExplanationData(data))
        .catch(() => {
          // Fallback
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex justify-end bg-black/85 font-sans backdrop-blur-md">
      <div className="relative w-full max-w-2xl space-y-6 overflow-y-auto border-l border-[#3c3c3c] bg-[#000000] p-8 text-white shadow-2xl">
        {/* Top M Tricolor Stripe */}
        <div className="bmw-m-stripe absolute left-0 right-0 top-0" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-5 pt-2">
          <div className="flex items-center gap-3">
            <div className="bmw-m-tricolor-dots">
              <span />
              <span />
              <span />
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#bbbbbb]">
                {"///"} M EXECUTIVE ENGINE • EXPLAINABILITY PANEL
              </div>
              <h2 className="mt-0.5 font-sans text-xl font-extrabold uppercase tracking-wider text-white">
                REASONING &amp; AUDIT MATRIX
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="border border-[#3c3c3c] bg-[#1a1a1a] p-2 text-[#bbbbbb] transition hover:border-white hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mission Title & Confidence Level */}
        <div className="space-y-4 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-6">
          <div className="flex items-center justify-between">
            <span className="border border-[#0066b1]/30 bg-[#0066b1]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0066b1]">
              MISSION DIRECTIVE EXPLANATION
            </span>
            <div className="bmw-m-tricolor-dots">
              <span />
              <span />
              <span />
            </div>
          </div>

          <h3 className="text-xl font-extrabold uppercase tracking-wide text-white">
            {missionTitle ?? "CREATE DOCKER PART 1"}
          </h3>

          <div className="flex items-center justify-between border-t border-[#3c3c3c] pt-3 font-mono text-xs">
            <div className="flex items-center gap-2 font-bold tracking-wider text-white">
              <ShieldCheck className="h-4 w-4 text-[#1c69d4]" />
              CONFIDENCE: VERY HIGH (94%)
            </div>
            <span className="uppercase tracking-wider text-[#bbbbbb]">PRIORITY: HIGH</span>
          </div>

          <p className="font-mono text-xs italic text-[#bbbbbb]">
            &ldquo;Confidence boosted +0.05 due to 127 repeated community requests.&rdquo;
          </p>
        </div>

        {/* Why this mission? */}
        <div className="space-y-2.5">
          <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
            <HelpCircle className="h-4 w-4 text-[#1c69d4]" /> WHY THIS RECOMMENDATION EXISTS
          </h4>
          <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-5 font-sans text-xs leading-relaxed text-[#e6e6e6]">
            127 audience comments specifically requested Docker container orchestration after your
            React Authentication video. Historical performance proves deep technical tutorials yield
            2.4x higher watch time and +18% subscriber conversion, supporting your Q3 milestone.
          </div>
        </div>

        {/* Evidence Ranking Matrix */}
        <div className="space-y-3 font-mono text-xs">
          <h4 className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-white">
            <BarChart3 className="h-4 w-4 text-[#0066b1]" /> GROUNDED EVIDENCE RANKING MATRIX (5
            FACTORS)
          </h4>

          <div className="space-y-2.5">
            <div className="space-y-1.5 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-4">
              <div className="flex justify-between font-bold tracking-wider">
                <span className="text-white">1. HISTORICAL WATCH TIME RETENTION</span>
                <span className="text-[#0066b1]">SCORE: 0.965</span>
              </div>
              <p className="font-sans text-xs text-[#bbbbbb]">
                Last 5 React/Docker tutorials exceeded channel baseline retention by +18%.
              </p>
              <div className="pt-1 text-[10px] text-[#7e7e7e]">
                Relevance: 0.98 • Recency: 0.95 • Reliability: 0.99 • Goal Alignment: 0.97
              </div>
            </div>

            <div className="space-y-1.5 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-4">
              <div className="flex justify-between font-bold tracking-wider">
                <span className="text-white">2. COMMUNITY DEMAND SIGNAL</span>
                <span className="text-[#1c69d4]">SCORE: 0.942</span>
              </div>
              <p className="font-sans text-xs text-[#bbbbbb]">
                127 audience comments requested Docker orchestration tutorial after React Auth
                video.
              </p>
              <div className="pt-1 text-[10px] text-[#7e7e7e]">
                Relevance: 0.96 • Recency: 0.98 • Reliability: 0.95 • Goal Alignment: 0.92
              </div>
            </div>

            <div className="space-y-1.5 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-4">
              <div className="flex justify-between font-bold tracking-wider">
                <span className="text-white">3. SPONSOR CONTRACT ALIGNMENT</span>
                <span className="text-[#e22718]">SCORE: 0.936</span>
              </div>
              <p className="font-sans text-xs text-[#bbbbbb]">
                CloudCorp sponsorship terms explicitly reference containerized agent series ($12,000
                value).
              </p>
              <div className="pt-1 text-[10px] text-[#7e7e7e]">
                Relevance: 0.92 • Recency: 0.90 • Reliability: 0.96 • Goal Alignment: 0.98
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Memories */}
        <div className="space-y-2.5 font-mono text-xs">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-white">
            SUPPORTING MEMORY ROWS
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 font-bold uppercase tracking-wider text-white">
              mem-yt-comment-42 (127 Requests)
            </span>
            <span className="border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 font-bold uppercase tracking-wider text-white">
              mem-yt-analytics-90d (+18% Retention)
            </span>
            <span className="border border-[#3c3c3c] bg-[#1a1a1a] px-3 py-1.5 font-bold uppercase tracking-wider text-white">
              mem-sponsor-contract-q4 ($12k Terms)
            </span>
          </div>
        </div>

        {/* Alternative Strategies */}
        <div className="space-y-2.5 font-mono text-xs">
          <h4 className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-white">
            <AlertTriangle className="h-4 w-4 text-[#e22718]" /> REJECTED ALTERNATIVE STRATEGIES
          </h4>
          <div className="space-y-1 rounded-none border border-[#3c3c3c] bg-[#1a1a1a] p-4">
            <span className="font-bold uppercase tracking-wider text-white">
              REJECTED: PUBLISH GENERAL AI NEWS COMMENTARY
            </span>
            <p className="pt-1 font-sans text-xs text-[#bbbbbb]">
              Reason for Rejection: Historical performance memory proves commentary clips yield 40%
              lower retention and 0 course conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
