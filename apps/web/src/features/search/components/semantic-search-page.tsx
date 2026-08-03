"use client";

import { useState } from "react";
import { Brain, ChevronRight, GitBranch, RefreshCw, Search, Sparkles } from "lucide-react";

interface GraphNeighbor {
  node_id: string;
  label: string;
  node_type: string;
  relationship: string;
  hop_distance: number;
}

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  memory_type: string;
  confidence: number;
  importance: number;
  source: string;
  rank_score: number;
  timestamp: string;
  decay_score: number;
  business_impact: string;
  related_memories: string[];
  related_projects: string[];
  related_goals: string[];
  timeline_position: number;
  graph_neighbors: GraphNeighbor[];
}

const PRESET_QUERIES = [
  "What did my audience ask last month?",
  "What promises have I not fulfilled?",
  "Show every sponsor interaction.",
  "What content performed best?",
  "Find memories related to React.",
  "Which community members ask about Docker?",
  "What goals are blocked?",
];

export function SemanticSearchPage() {
  const [query, setQuery] = useState("Docker multi-agent retention and sponsor performance");
  const [activeSearchType, setActiveSearchType] = useState<
    "HYBRID" | "VECTOR" | "KEYWORD" | "GRAPH"
  >("HYBRID");
  const [activeHopDepth, setActiveHopDepth] = useState<1 | 2 | 3>(2);
  const [selectedMemoryType, setSelectedMemoryType] = useState<string>("ALL");
  const [isSearching, setIsSearching] = useState(false);
  const [expandedResultId, setExpandedResultId] = useState<string | null>("mem-101");
  const [showContextPackage, setShowContextPackage] = useState(true);

  const mockResults: SearchResult[] = [
    {
      id: "mem-101",
      title: "Community Signal: Docker Tutorial Request Cluster",
      summary:
        "14 repeated Discord comments & 42 video likes requested a step-by-step Docker multi-agent walkthrough.",
      memory_type: "COMMUNITY",
      confidence: 0.95,
      importance: 0.92,
      source: "YouTube Intelligence / Discord",
      rank_score: 0.945,
      timestamp: "2026-08-01T14:30:00Z",
      decay_score: 0.98,
      business_impact: "HIGH",
      related_memories: ["mem-102", "mem-104"],
      related_projects: ["proj-docker-course"],
      related_goals: ["goal-q3-revenue"],
      timeline_position: 1,
      graph_neighbors: [
        {
          node_id: "node-1",
          label: "Docker Deep Dive Video",
          node_type: "EPISODE",
          relationship: "PRODUCED_FROM",
          hop_distance: 1,
        },
        {
          node_id: "node-2",
          label: "CloudCorp $15k Deal",
          node_type: "SPONSOR",
          relationship: "SPONSORED_BY",
          hop_distance: 2,
        },
      ],
    },
    {
      id: "mem-104",
      title: "Performance Benchmark: Docker Video +18% Retention",
      summary:
        "Docker Multi-Agent System Deep Dive video reached 18,400 views with +18% retention over channel average.",
      memory_type: "PERFORMANCE",
      confidence: 0.97,
      importance: 0.94,
      source: "YouTube Intelligence",
      rank_score: 0.932,
      timestamp: "2026-08-02T09:15:00Z",
      decay_score: 0.99,
      business_impact: "HIGH",
      related_memories: ["mem-101", "mem-102"],
      related_projects: ["proj-docker-course"],
      related_goals: ["goal-q3-revenue"],
      timeline_position: 4,
      graph_neighbors: [
        {
          node_id: "node-1",
          label: "Docker Deep Dive Video",
          node_type: "EPISODE",
          relationship: "ANALYZED_BY",
          hop_distance: 1,
        },
      ],
    },
    {
      id: "mem-102",
      title: "CloudCorp Title Sponsorship Agreement",
      summary:
        "Signed CloudCorp sponsorship ($15,000) with placement commitment in Docker multi-agent series.",
      memory_type: "RELATIONSHIP",
      confidence: 0.98,
      importance: 0.96,
      source: "Sponsor Agent / Email Sync",
      rank_score: 0.918,
      timestamp: "2026-07-29T11:00:00Z",
      decay_score: 0.95,
      business_impact: "HIGH",
      related_memories: ["mem-101", "mem-103"],
      related_projects: ["proj-docker-course"],
      related_goals: ["goal-q3-revenue"],
      timeline_position: 2,
      graph_neighbors: [
        {
          node_id: "node-2",
          label: "CloudCorp $15k Deal",
          node_type: "SPONSOR",
          relationship: "CONTRACTED",
          hop_distance: 1,
        },
        {
          node_id: "node-3",
          label: "VIP Course (500 Students)",
          node_type: "PROJECT",
          relationship: "FUNDED_BY",
          hop_distance: 2,
        },
      ],
    },
    {
      id: "mem-103",
      title: "Unfulfilled Promise: Weekly Student Q&A Newsletter",
      summary:
        "Promised 500 course students a weekly Q&A digest summarizing community architecture questions.",
      memory_type: "MISSION",
      confidence: 0.89,
      importance: 0.85,
      source: "Executive Minds Agent / Course Portal",
      rank_score: 0.884,
      timestamp: "2026-07-22T16:00:00Z",
      decay_score: 0.88,
      business_impact: "MEDIUM",
      related_memories: ["mem-101"],
      related_projects: ["proj-docker-course"],
      related_goals: ["goal-audience-retention"],
      timeline_position: 3,
      graph_neighbors: [
        {
          node_id: "node-3",
          label: "VIP Course (500 Students)",
          node_type: "PROJECT",
          relationship: "DELIVERABLE_FOR",
          hop_distance: 1,
        },
      ],
    },
  ];

  const filteredResults = mockResults.filter((r) => {
    if (selectedMemoryType === "ALL") return true;
    return r.memory_type === selectedMemoryType;
  });

  const handleSearch = (newQuery?: string) => {
    if (newQuery) setQuery(newQuery);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 350);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
              <Brain className="h-3 w-3" /> Contextual Neural Search
            </span>
            <span className="font-mono text-xs text-neutral-500">
              9-Factor Vector &amp; Graph Expansion Engine
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Semantic Memory Search Engine
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Query OMNIA&apos;s living memory graph using natural language. Retrieves contextually
            grounded memories with 1–3 hop relationship expansion for executive reasoning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowContextPackage(!showContextPackage)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs transition ${
              showContextPackage
                ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {showContextPackage ? "AI Context Package Active" : "View Context Package"}
          </button>
        </div>
      </header>

      {/* Main Search Input & Presets */}
      <section className="relative space-y-4 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Ask OMNIA anything e.g. 'What promises have I not fulfilled?' or 'Show every sponsor interaction'..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3.5 pl-12 pr-28 font-sans text-sm text-neutral-100 placeholder-neutral-500 transition focus:border-cyan-500 focus:outline-none"
          />
          <button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="absolute right-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-cyan-500 hover:to-emerald-500"
          >
            {isSearching ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            Search
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1">
          <span className="whitespace-nowrap font-mono text-[11px] text-neutral-500">
            Suggested Prompts:
          </span>
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(q)}
              className="whitespace-nowrap rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-cyan-300"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Search Controls & Filters Bar */}
        <div className="border-neutral-850 flex flex-wrap items-center justify-between gap-4 border-t pt-3 font-sans text-xs">
          {/* Search Strategy */}
          <div className="border-neutral-850 flex items-center gap-1 rounded-xl border bg-neutral-950 p-1">
            {(
              [
                { id: "HYBRID", label: "Hybrid Vector + Keyword" },
                { id: "VECTOR", label: "Dense Vector" },
                { id: "KEYWORD", label: "Exact Keyword" },
                { id: "GRAPH", label: "Graph Topology" },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveSearchType(st.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeSearchType === st.id
                    ? "border border-neutral-700 bg-neutral-800 text-neutral-100 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Hop Depth Selector */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
              <GitBranch className="h-3.5 w-3.5 text-emerald-400" /> Graph Hop Depth:
            </span>
            <div className="border-neutral-850 flex items-center gap-1 rounded-xl border bg-neutral-950 p-1 font-mono text-xs">
              {([1, 2, 3] as const).map((depth) => (
                <button
                  key={depth}
                  onClick={() => setActiveHopDepth(depth)}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    activeHopDepth === depth
                      ? "border border-emerald-500/40 bg-emerald-500/20 font-bold text-emerald-300"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {depth}-Hop
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structured AI Context Package Banner */}
      {showContextPackage && (
        <section className="relative space-y-3 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 p-5 font-sans shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-neutral-100">
                Synthesized Executive AI Context Package
              </h3>
              <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                Ready for Executive Minds Agent
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-400">Est. Tokens: ~540</span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Detected Intent
              </span>
              <p className="font-semibold text-cyan-300">SPONSOR_INTERACTION &amp; PERFORMANCE</p>
              <span className="font-mono text-[10px] text-neutral-400">
                Confidence: 96% | Keywords: [sponsor, docker, retention]
              </span>
            </div>

            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Open Missions &amp; Goals
              </span>
              <p className="font-medium text-neutral-200">
                Q3 Revenue Milestone ($25k) &amp; Finalize Docker Module 4
              </p>
              <span className="font-mono text-[10px] text-emerald-400">
                2 Goals Grounded in Memory
              </span>
            </div>

            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Graph Hop Connections
              </span>
              <p className="font-medium text-neutral-200">
                Docker Video → CloudCorp $15k Deal → VIP Course
              </p>
              <span className="font-mono text-[10px] text-cyan-400">
                3 Hop Topology Neighbors Included
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Memory Type Filter Pills */}
      <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1 font-sans text-xs">
        <span className="font-mono text-[11px] text-neutral-500">Memory Filter:</span>
        {[
          "ALL",
          "COMMUNITY",
          "PERFORMANCE",
          "RELATIONSHIP",
          "MISSION",
          "PROJECT",
          "REFLECTION",
        ].map((mt) => (
          <button
            key={mt}
            onClick={() => setSelectedMemoryType(mt)}
            className={`rounded-lg border px-3 py-1.5 font-medium transition ${
              selectedMemoryType === mt
                ? "border border-neutral-700 bg-neutral-800 text-neutral-100 shadow-sm"
                : "border-neutral-850 bg-neutral-950 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {mt}
          </button>
        ))}
      </div>

      {/* Search Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1 font-mono text-xs text-neutral-400">
          <span>Found {filteredResults.length} Grounded Memories</span>
          <span>Ranked by 9-Factor Neural Weighting</span>
        </div>

        {filteredResults.map((result) => {
          const isExpanded = expandedResultId === result.id;

          return (
            <article
              key={result.id}
              className={`space-y-4 rounded-2xl border bg-neutral-900 p-5 transition ${
                isExpanded
                  ? "border-cyan-500/50 shadow-xl"
                  : "hover:border-neutral-750 border-neutral-800"
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-300">
                      {result.memory_type}
                    </span>
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                      Confidence {(result.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-400">
                      Impact: {result.business_impact}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Position #{result.timeline_position} in Timeline
                    </span>
                  </div>

                  <h2 className="flex items-center gap-2 text-base font-bold text-neutral-100">
                    {result.title}
                  </h2>
                </div>

                {/* Rank Score Meter */}
                <div className="border-neutral-850 flex shrink-0 items-center gap-3 rounded-xl border bg-neutral-950 px-3.5 py-2 font-mono">
                  <div className="text-right">
                    <span className="block text-[10px] uppercase text-neutral-500">Rank Score</span>
                    <span className="text-sm font-bold text-cyan-400">
                      {(result.rank_score * 100).toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 w-12 overflow-hidden rounded-full bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                      style={{ width: `${result.rank_score * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="border-neutral-850 rounded-xl border bg-neutral-950 p-3.5 font-sans text-xs leading-relaxed text-neutral-300">
                {result.summary}
              </p>

              {/* 9-Factor Rank Score Breakdown */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] sm:grid-cols-4 md:grid-cols-6">
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2">
                  <span className="block text-neutral-500">Similarity (30%)</span>
                  <span className="font-semibold text-neutral-200">96.2%</span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2">
                  <span className="block text-neutral-500">Importance (15%)</span>
                  <span className="font-semibold text-neutral-200">
                    {(result.importance * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2">
                  <span className="block text-neutral-500">Recency (15%)</span>
                  <span className="font-semibold text-neutral-200">
                    {(result.decay_score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2">
                  <span className="block text-neutral-500">Rel. Strength (10%)</span>
                  <span className="font-semibold text-neutral-200">92.0%</span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2">
                  <span className="block text-neutral-500">Biz Impact (10%)</span>
                  <span className="font-semibold text-neutral-200">95.0%</span>
                </div>
                <div className="border-neutral-850 rounded-lg border bg-neutral-950 p-2">
                  <span className="block text-neutral-500">Decay Score (2%)</span>
                  <span className="font-semibold text-neutral-200">
                    {(result.decay_score * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Expanded Graph Hop Topology Preview */}
              {isExpanded && (
                <div className="space-y-3 border-t border-neutral-800 pt-3 font-sans text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-neutral-200">
                      <GitBranch className="h-3.5 w-3.5 text-cyan-400" /> Expanded {activeHopDepth}
                      -Hop Graph Neighbors
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Source Provenance: {result.source}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {result.graph_neighbors.map((neighbor, nIdx) => (
                      <div
                        key={nIdx}
                        className="border-neutral-850 flex items-start justify-between space-y-1 rounded-xl border bg-neutral-950 p-3"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                              {neighbor.hop_distance}-Hop
                            </span>
                            <span className="font-semibold text-neutral-200">{neighbor.label}</span>
                          </div>
                          <span className="mt-1 block font-mono text-[10px] text-neutral-400">
                            Relationship: {neighbor.relationship} ({neighbor.node_type})
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-neutral-600" />
                      </div>
                    ))}
                  </div>

                  {/* Related Goals & Projects */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[11px]">
                    <span className="text-neutral-500">Related Goals:</span>
                    {result.related_goals.map((g, gIdx) => (
                      <span
                        key={gIdx}
                        className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300"
                      >
                        {g}
                      </span>
                    ))}
                    <span className="ml-2 text-neutral-500">Related Projects:</span>
                    {result.related_projects.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Expand Toggle */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setExpandedResultId(isExpanded ? null : result.id)}
                  className="flex items-center gap-1 font-mono text-xs text-cyan-400 transition hover:text-cyan-300"
                >
                  {isExpanded
                    ? "Collapse Neighbors & Metadata"
                    : "Expand Graph Neighbors & Neural Weighting"}
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
