"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  Database,
  Eye,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Maximize2,
  Minus,
  Move,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface UniverseNode {
  id: string;
  title: string;
  entity_type: string;
  description: string;
  importance: number;
  confidence: number;
  x: number;
  y: number;
}

interface UniverseEdge {
  id: string;
  source: string;
  target: string;
  relationship_type: string;
  strength: number;
  description: string;
}

const MOCK_NODES: UniverseNode[] = [
  {
    id: "ent-docker-idea",
    title: "Docker Multi-Agent Concept",
    entity_type: "IDEA",
    description: "Initial concept for containerized multi-agent system architecture.",
    importance: 0.85,
    confidence: 0.9,
    x: 80,
    y: 100,
  },
  {
    id: "ent-docker-video",
    title: "Video: Docker Deep Dive",
    entity_type: "VIDEO",
    description: "YouTube video walkthrough (18.4k views, +18% retention).",
    importance: 0.95,
    confidence: 0.96,
    x: 280,
    y: 160,
  },
  {
    id: "ent-docker-series",
    title: "Series: Autonomous Systems",
    entity_type: "SERIES",
    description: "4-part video series on multi-agent software engineering.",
    importance: 0.9,
    confidence: 0.92,
    x: 480,
    y: 80,
  },
  {
    id: "ent-agent-course",
    title: "Course: Multi-Agent Masterclass",
    entity_type: "COURSE",
    description: "Full VIP creator course with 4 modules & code repo.",
    importance: 0.96,
    confidence: 0.95,
    x: 680,
    y: 220,
  },
  {
    id: "ent-cloudcorp-sponsor",
    title: "Sponsor: CloudCorp Inc.",
    entity_type: "SPONSOR",
    description: "Signed $15,000 title sponsorship contract.",
    importance: 0.95,
    confidence: 0.98,
    x: 280,
    y: 380,
  },
  {
    id: "ent-cloudcorp-brand",
    title: "Brand: CloudCorp Cloud Infra",
    entity_type: "BRAND",
    description: "CloudCorp enterprise developer platform.",
    importance: 0.88,
    confidence: 0.91,
    x: 80,
    y: 400,
  },
  {
    id: "ent-devmaster-user",
    title: "Audience: DevMaster99 (VIP)",
    entity_type: "AUDIENCE_MEMBER",
    description: "Top community contributor with 42 upvoted tutorial requests.",
    importance: 0.82,
    confidence: 0.89,
    x: 500,
    y: 350,
  },
  {
    id: "ent-discord-community",
    title: "Community: Discord Guild",
    entity_type: "COMMUNITY",
    description: "1,400 active developers & course students.",
    importance: 0.92,
    confidence: 0.94,
    x: 700,
    y: 380,
  },
  {
    id: "ent-docker-proj",
    title: "Project: Docker Starter Kit",
    entity_type: "PROJECT",
    description: "GitHub open-source starter template for multi-agent setups.",
    importance: 0.89,
    confidence: 0.93,
    x: 480,
    y: 200,
  },
  {
    id: "ent-revenue-goal",
    title: "Goal: Q3 $25,000 Revenue",
    entity_type: "GOAL",
    description: "Primary Q3 business goal combining course & sponsor revenue.",
    importance: 0.98,
    confidence: 0.97,
    x: 900,
    y: 280,
  },
  {
    id: "ent-alex-collab",
    title: "Collaborator: Alex (DevOps Lead)",
    entity_type: "COLLABORATOR",
    description: "Guest co-author for Docker course Module 3.",
    importance: 0.8,
    confidence: 0.85,
    x: 680,
    y: 70,
  },
  {
    id: "ent-vip-product",
    title: "Product: Masterclass Pass",
    entity_type: "PRODUCT",
    description: "Premium course pass sold on Gumroad/Stripe.",
    importance: 0.9,
    confidence: 0.92,
    x: 900,
    y: 130,
  },
  {
    id: "ent-sponsor-revenue",
    title: "Revenue: $15,000 Sponsorship",
    entity_type: "REVENUE",
    description: "Realized sponsorship payment for Docker video integration.",
    importance: 0.95,
    confidence: 0.98,
    x: 480,
    y: 450,
  },
  {
    id: "ent-milestone-10k",
    title: "Milestone: 100k Subscribers",
    entity_type: "MILESTONE",
    description: "YouTube creator silver play button milestone achieved.",
    importance: 0.91,
    confidence: 0.95,
    x: 900,
    y: 420,
  },
  {
    id: "ent-youtube-platform",
    title: "Platform: YouTube Channel",
    entity_type: "PLATFORM",
    description: "Main content distribution platform (124,000 Subscribers).",
    importance: 0.95,
    confidence: 0.99,
    x: 80,
    y: 240,
  },
];

const MOCK_EDGES: UniverseEdge[] = [
  {
    id: "edg-1",
    source: "ent-docker-idea",
    target: "ent-docker-video",
    relationship_type: "INSPIRED",
    strength: 0.95,
    description: "Idea inspired video script",
  },
  {
    id: "edg-2",
    source: "ent-docker-video",
    target: "ent-docker-series",
    relationship_type: "BELONGS_TO",
    strength: 0.9,
    description: "Video is part 1 of series",
  },
  {
    id: "edg-3",
    source: "ent-docker-video",
    target: "ent-cloudcorp-sponsor",
    relationship_type: "SPONSORED_BY",
    strength: 0.98,
    description: "Video sponsored by CloudCorp",
  },
  {
    id: "edg-4",
    source: "ent-cloudcorp-sponsor",
    target: "ent-cloudcorp-brand",
    relationship_type: "BELONGS_TO",
    strength: 0.9,
    description: "Sponsor represents CloudCorp Brand",
  },
  {
    id: "edg-5",
    source: "ent-devmaster-user",
    target: "ent-docker-video",
    relationship_type: "REQUESTED_BY",
    strength: 0.88,
    description: "DevMaster requested Docker video",
  },
  {
    id: "edg-6",
    source: "ent-devmaster-user",
    target: "ent-discord-community",
    relationship_type: "BELONGS_TO",
    strength: 0.92,
    description: "DevMaster is member of Discord Guild",
  },
  {
    id: "edg-7",
    source: "ent-docker-video",
    target: "ent-docker-proj",
    relationship_type: "LEADS_TO",
    strength: 0.91,
    description: "Video led to GitHub starter repo project",
  },
  {
    id: "edg-8",
    source: "ent-docker-proj",
    target: "ent-agent-course",
    relationship_type: "DERIVED_FROM",
    strength: 0.94,
    description: "Project expanded into Masterclass course",
  },
  {
    id: "edg-9",
    source: "ent-alex-collab",
    target: "ent-agent-course",
    relationship_type: "COLLABORATES_WITH",
    strength: 0.85,
    description: "Alex co-authored course module 3",
  },
  {
    id: "edg-10",
    source: "ent-agent-course",
    target: "ent-vip-product",
    relationship_type: "SUPPORTS",
    strength: 0.92,
    description: "Course powers VIP Pass product",
  },
  {
    id: "edg-11",
    source: "ent-cloudcorp-sponsor",
    target: "ent-sponsor-revenue",
    relationship_type: "LEADS_TO",
    strength: 0.96,
    description: "Sponsorship generated $15k revenue",
  },
  {
    id: "edg-12",
    source: "ent-sponsor-revenue",
    target: "ent-revenue-goal",
    relationship_type: "SUPPORTS",
    strength: 0.95,
    description: "Sponsorship revenue supports Q3 Goal",
  },
  {
    id: "edg-13",
    source: "ent-docker-video",
    target: "ent-youtube-platform",
    relationship_type: "CREATED",
    strength: 0.95,
    description: "Published on YouTube platform",
  },
];

export function KnowledgeUniverseCanvas() {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>("ent-docker-video");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilterType, setSelectedFilterType] = useState<string>("ALL");
  const [showPathExplorer, setShowPathExplorer] = useState<boolean>(false);
  const [showAIInsights, setShowAIInsights] = useState<boolean>(true);

  const selectedNode = MOCK_NODES.find((n) => n.id === selectedEntityId);

  const filteredNodes = MOCK_NODES.filter((node) => {
    const matchesSearch =
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilterType === "ALL" || node.entity_type === selectedFilterType;
    return matchesSearch && matchesType;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "SPONSOR":
      case "BRAND":
      case "REVENUE":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "VIDEO":
      case "SERIES":
      case "PLATFORM":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "GOAL":
      case "MILESTONE":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "COMMUNITY":
      case "AUDIENCE_MEMBER":
        return "bg-violet-500/10 text-violet-400 border-violet-500/30";
      case "COURSE":
      case "PRODUCT":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
              <Globe className="h-3 w-3" /> Central Intelligence Topology
            </span>
            <span className="font-mono text-xs text-neutral-400">
              Living Creator Brain • 15 Connected Entities
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Creator Knowledge Universe
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            A living 2D topology connecting every idea, video, series, course, sponsor deal,
            community signal, revenue goal, and milestone. Every Executive AI decision references
            this universe.
          </p>
        </div>

        {/* Canvas Toolbar Controls */}
        <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-1.5 font-mono text-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
            className="rounded-lg p-2 text-neutral-300 transition hover:bg-neutral-800"
            title="Zoom Out"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-2 font-bold text-cyan-400">{(zoomLevel * 100).toFixed(0)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="rounded-lg p-2 text-neutral-300 transition hover:bg-neutral-800"
            title="Zoom In"
          >
            <Plus className="h-4 w-4" />
          </button>
          <div className="mx-1 h-4 w-[1px] bg-neutral-800" />
          <button
            onClick={() => setZoomLevel(1)}
            className="rounded-lg p-2 text-neutral-300 transition hover:bg-neutral-800"
            title="Reset Canvas"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowPathExplorer(!showPathExplorer)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-semibold transition ${
              showPathExplorer
                ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                : "border-neutral-850 bg-neutral-950 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <GitBranch className="h-3.5 w-3.5" /> Path Explorer
          </button>
        </div>
      </header>

      {/* AI Graph Topology Insights Banner */}
      {showAIInsights && (
        <section className="relative space-y-3 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 p-5 font-sans shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-neutral-100">AI Knowledge Topology Insights</h3>
              <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                Continuous Graph Analytics
              </span>
            </div>
            <button
              onClick={() => setShowAIInsights(false)}
              className="text-neutral-500 hover:text-neutral-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-4">
            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Most Influential Entity
              </span>
              <p className="font-semibold text-cyan-300">Video: Docker Deep Dive</p>
              <span className="font-mono text-[10px] text-neutral-400">
                Centrality Score: 95% (6 Connected Edges)
              </span>
            </div>

            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Fastest Growing Topic
              </span>
              <p className="font-semibold text-emerald-300">Docker Multi-Agent Systems</p>
              <span className="font-mono text-[10px] text-emerald-400">
                +18% Retention over channel average
              </span>
            </div>

            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Weakest Relationship
              </span>
              <p className="font-semibold text-amber-300">Alex → Course Module 3</p>
              <span className="font-mono text-[10px] text-amber-400">
                Low collaboration activity detected
              </span>
            </div>

            <div className="border-neutral-850 space-y-1 rounded-xl border bg-neutral-950 p-3">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Hidden Opportunity
              </span>
              <p className="font-semibold text-violet-300">Discord Q&amp;A Paid Pass</p>
              <span className="font-mono text-[10px] text-violet-400">
                Est. MRR Opportunity: +$3,500/mo
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Path Explorer Overlay Panel */}
      {showPathExplorer && (
        <section className="space-y-3 rounded-2xl border border-cyan-500/40 bg-neutral-900 p-4 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-300">
              <GitBranch className="h-3.5 w-3.5" /> Multi-Hop Intelligence Path Explorer
            </span>
            <span className="font-mono text-[10px] text-neutral-400">
              Traced Hop Distance: 3 Hops
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1 font-mono text-xs">
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
              Course: Multi-Agent Masterclass
            </span>
            <ArrowRight className="h-4 w-4 text-neutral-500" />
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-300">
              Video: Docker Deep Dive
            </span>
            <ArrowRight className="h-4 w-4 text-neutral-500" />
            <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-300">
              Sponsor: CloudCorp Inc. ($15k)
            </span>
            <ArrowRight className="h-4 w-4 text-neutral-500" />
            <span className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-rose-300">
              Goal: Q3 $25k Revenue Milestone
            </span>
          </div>
        </section>
      )}

      {/* Filter Pills & Search Input */}
      <div className="flex flex-col justify-between gap-4 font-sans text-xs sm:flex-row sm:items-center">
        <div className="relative flex w-full items-center sm:w-80">
          <Search className="absolute left-3 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entities or topics..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 pl-9 pr-3 text-xs text-neutral-100 placeholder-neutral-500 transition focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-[11px]">
          <span className="text-neutral-500">Filter:</span>
          {["ALL", "VIDEO", "SPONSOR", "GOAL", "COMMUNITY", "COURSE", "IDEA", "PROJECT"].map(
            (ft) => (
              <button
                key={ft}
                onClick={() => setSelectedFilterType(ft)}
                className={`rounded-lg border px-2.5 py-1 transition ${
                  selectedFilterType === ft
                    ? "border border-neutral-700 bg-neutral-800 font-semibold text-neutral-100"
                    : "border-neutral-850 bg-neutral-950 text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {ft}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Main 2D Canvas Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Topology View Area (2 Cols) */}
        <div className="relative flex min-h-[540px] flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl lg:col-span-2">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] opacity-10 [background-size:16px_16px]" />

          {/* SVG Directed Edges Overlay */}
          <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
            {MOCK_EDGES.map((edge) => {
              const srcNode = MOCK_NODES.find((n) => n.id === edge.source);
              const tgtNode = MOCK_NODES.find((n) => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const isSelected = selectedEntityId === srcNode.id || selectedEntityId === tgtNode.id;

              return (
                <g key={edge.id}>
                  <line
                    x1={srcNode.x * zoomLevel + 60}
                    y1={srcNode.y * zoomLevel + 25}
                    x2={tgtNode.x * zoomLevel + 60}
                    y2={tgtNode.y * zoomLevel + 25}
                    stroke={isSelected ? "#38bdf8" : "#404040"}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? "none" : "4 4"}
                    opacity={isSelected ? 0.9 : 0.4}
                  />
                </g>
              );
            })}
          </svg>

          {/* Render Entity Node Cards */}
          <div className="relative z-10 h-full min-h-[460px] w-full">
            {filteredNodes.map((node) => {
              const isSelected = selectedEntityId === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedEntityId(node.id)}
                  style={{
                    transform: `translate(${node.x * zoomLevel}px, ${node.y * zoomLevel}px)`,
                  }}
                  className={`absolute max-w-[180px] cursor-pointer rounded-xl border p-3 shadow-lg transition-all duration-200 ${
                    isSelected
                      ? "scale-105 border-cyan-500 bg-neutral-950 ring-2 ring-cyan-500/30"
                      : "hover:scale-102 border-neutral-800 bg-neutral-950/90 hover:border-neutral-700"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-1">
                    <span
                      className={`rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold ${getBadgeColor(node.entity_type)}`}
                    >
                      {node.entity_type}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500">
                      {(node.importance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <h4 className="truncate text-xs font-bold text-neutral-100">{node.title}</h4>
                  <p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-neutral-400">
                    {node.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-neutral-850 z-10 flex items-center justify-between border-t pt-4 font-mono text-[11px] text-neutral-500">
            <span>
              Showing {filteredNodes.length} Nodes &amp; {MOCK_EDGES.length} Relationships
            </span>
            <span>Obsidian &amp; Linear Inspired Canvas</span>
          </div>
        </div>

        {/* Entity Inspector Side Drawer (1 Col) */}
        <aside className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans text-xs">
          {selectedNode ? (
            <>
              <div className="space-y-1 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold ${getBadgeColor(selectedNode.entity_type)}`}
                  >
                    {selectedNode.entity_type}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-400">
                    Confidence: {(selectedNode.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <h3 className="mt-1 text-base font-bold text-neutral-100">{selectedNode.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  {selectedNode.description}
                </p>
              </div>

              {/* Connected Neighbors */}
              <div className="space-y-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  Connected Topology Neighbors
                </span>
                <div className="space-y-2">
                  {MOCK_EDGES.filter(
                    (e) => e.source === selectedNode.id || e.target === selectedNode.id,
                  ).map((edge) => {
                    const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                    const otherNode = MOCK_NODES.find((n) => n.id === otherId);
                    if (!otherNode) return null;

                    return (
                      <div
                        key={edge.id}
                        onClick={() => setSelectedEntityId(otherNode.id)}
                        className="border-neutral-850 hover:border-neutral-750 cursor-pointer space-y-1 rounded-xl border bg-neutral-950 p-3 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-200">{otherNode.title}</span>
                          <span className="font-mono text-[9px] text-cyan-400">
                            {(edge.strength * 100).toFixed(0)}%
                          </span>
                        </div>
                        <span className="block font-mono text-[10px] text-neutral-400">
                          Relationship: {edge.relationship_type} ({otherNode.entity_type})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Connected Goals & History */}
              <div className="border-neutral-850 space-y-2 border-t pt-2 font-mono text-[11px]">
                <span className="block text-neutral-500">Connected Business Goals:</span>
                <span className="block rounded border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-rose-300">
                  Goal: Q3 $25,000 Revenue Milestone
                </span>
                <span className="block pt-1 text-neutral-500">Recent Intelligence History:</span>
                <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2 text-[10px] leading-relaxed text-neutral-400">
                  Entity linked via YouTube sync. Continuous observation confirms 95% executive
                  centrality.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-2 py-12 text-center font-mono text-xs text-neutral-500">
              <Globe className="mx-auto h-6 w-6 text-neutral-600" />
              <p>Select any entity node on the canvas to inspect topology relationships.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
