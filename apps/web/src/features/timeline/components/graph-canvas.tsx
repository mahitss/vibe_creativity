"use client";

import { useState, useRef } from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  Compass,
  Database,
  FileText,
  Filter,
  GitBranch,
  Handshake,
  Info,
  Layers,
  Maximize2,
  Minimize2,
  Move,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  node_type: string;
  importance: number;
  x?: number;
  y?: number;
}

interface EdgeData {
  source_id: string;
  target_id: string;
  relationship: string;
  description: string;
}

interface GraphCanvasProps {
  nodes?: NodeData[];
  edges?: EdgeData[];
  onSelectNode?: (nodeId: string) => void;
}

export function GraphCanvas({ nodes: propNodes, edges: propEdges, onSelectNode }: GraphCanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("node-video-docker");
  const [highlightPath, setHighlightPath] = useState<string[]>(["node-idea-docker", "node-script-docker", "node-video-docker", "node-course-agent"]);

  // Default interactive graph dataset if props not provided
  const initialNodes: NodeData[] = propNodes || [
    { id: "node-comment-docker", name: "Audience Request: Kubernetes vs Docker", node_type: "COMMENT", importance: 0.8, x: 100, y: 150 },
    { id: "node-idea-docker", name: "Docker Multi-Agent Deep Dive", node_type: "IDEA", importance: 0.9, x: 280, y: 150 },
    { id: "node-script-docker", name: "Script: Docker Architecture Hook", node_type: "IDEA", importance: 0.85, x: 460, y: 150 },
    { id: "node-video-docker", name: "Video: Building Multi-Agent Systems in Docker", node_type: "VIDEO", importance: 0.95, x: 650, y: 180 },
    { id: "node-sponsor-cloudcorp", name: "CloudCorp Enterprise Sponsor", node_type: "SPONSOR", importance: 0.9, x: 650, y: 50 },
    { id: "node-course-agent", name: "Multi-Agent Systems Masterclass", node_type: "COURSE", importance: 0.92, x: 850, y: 180 },
    { id: "node-goal-q3", name: "Q3 Creator Revenue Milestone ($25k)", node_type: "GOAL", importance: 0.95, x: 850, y: 320 },
    { id: "node-mission-release", name: "OMNIA Framework Launch Mission", node_type: "MISSION", importance: 0.9, x: 460, y: 320 },
  ];

  const initialEdges: EdgeData[] = propEdges || [
    { source_id: "node-comment-docker", target_id: "node-idea-docker", relationship: "INSPIRED", description: "Audience request inspired Docker idea" },
    { source_id: "node-idea-docker", target_id: "node-script-docker", relationship: "GENERATED", description: "Idea developed into video script" },
    { source_id: "node-script-docker", target_id: "node-video-docker", relationship: "CREATED", description: "Script produced published video" },
    { source_id: "node-sponsor-cloudcorp", target_id: "node-video-docker", relationship: "SPONSORED_BY", description: "CloudCorp sponsored Docker video" },
    { source_id: "node-video-docker", target_id: "node-course-agent", relationship: "REPURPOSED", description: "Video expanded into Masterclass course" },
    { source_id: "node-video-docker", target_id: "node-goal-q3", relationship: "CONNECTED_TO", description: "Video views contributed to Q3 revenue goal" },
    { source_id: "node-mission-release", target_id: "node-idea-docker", relationship: "DEPENDS_ON", description: "Mission depends on Docker deep dive" },
  ];

  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const getNodePos = (id: string) => {
    const n = nodes.find((item) => item.id === id);
    return n ? { x: n.x || 300, y: n.y || 200 } : { x: 300, y: 200 };
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "VIDEO":
        return "border-cyan-500 bg-cyan-950 text-cyan-300";
      case "SPONSOR":
        return "border-purple-500 bg-purple-950 text-purple-300";
      case "GOAL":
        return "border-emerald-500 bg-emerald-950 text-emerald-300";
      case "MISSION":
        return "border-rose-500 bg-rose-950 text-rose-300";
      case "COURSE":
        return "border-amber-500 bg-amber-950 text-amber-300";
      case "COMMENT":
        return "border-indigo-500 bg-indigo-950 text-indigo-300";
      default:
        return "border-blue-500 bg-blue-950 text-blue-300";
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden font-sans select-none shadow-2xl">
      {/* Top Canvas Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 backdrop-blur rounded-xl p-1.5 shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.15, 1.8))}
          className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition"
          title="Zoom In"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.15, 0.6))}
          className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition"
          title="Zoom Out"
        >
          <Minimize2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setHighlightPath(["node-idea-docker", "node-script-docker", "node-video-docker", "node-course-agent"]);
          }}
          className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition"
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Legend Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 backdrop-blur rounded-xl px-3 py-1.5 text-xs text-neutral-300 shadow-lg">
        <GitBranch className="h-4 w-4 text-cyan-400" />
        <span className="font-medium">Living Memory Graph</span>
        <span className="font-mono text-[10px] text-neutral-500 font-normal">8 Nodes • 7 Relationships</span>
      </div>

      {/* SVG Connections & Nodes Layer */}
      <div
        className="w-full h-full relative transition-transform duration-300 origin-center"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {initialEdges.map((edge, idx) => {
            const src = getNodePos(edge.source_id);
            const tgt = getNodePos(edge.target_id);
            const isHighlighted =
              highlightPath.includes(edge.source_id) && highlightPath.includes(edge.target_id);

            return (
              <g key={idx}>
                <line
                  x1={src.x + 80}
                  y1={src.y + 25}
                  x2={tgt.x + 80}
                  y2={tgt.y + 25}
                  stroke={isHighlighted ? "#22d3ee" : "#334155"}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isHighlighted ? "none" : "4 4"}
                />
                <text
                  x={(src.x + tgt.x) / 2 + 80}
                  y={(src.y + tgt.y) / 2 + 18}
                  fill={isHighlighted ? "#38bdf8" : "#64748b"}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {edge.relationship}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Nodes Grid */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isHighlighted = highlightPath.includes(node.id);
          const colorClass = getNodeColor(node.node_type);

          return (
            <div
              key={node.id}
              onClick={() => {
                setSelectedNodeId(node.id);
                if (onSelectNode) onSelectNode(node.id);
              }}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              className={`absolute cursor-pointer w-44 border-2 rounded-xl p-3 shadow-xl transition transform hover:scale-105 ${colorClass} ${
                isSelected ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-neutral-950" : ""
              } ${isHighlighted ? "shadow-cyan-500/20" : ""}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold opacity-80">
                  {node.node_type}
                </span>
                <span className="h-2 w-2 rounded-full bg-current opacity-60" />
              </div>

              <p className="text-xs font-bold leading-snug line-clamp-2 text-neutral-100">{node.name}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-neutral-900/95 border border-neutral-800 backdrop-blur rounded-xl p-4 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans text-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                {selectedNode.node_type} NODE
              </span>
              <span className="font-mono text-[10px] text-neutral-500">ID: {selectedNode.id}</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-100">{selectedNode.name}</h4>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setHighlightPath(["node-comment-docker", "node-idea-docker", "node-script-docker", "node-video-docker", "node-course-agent", "node-goal-q3"])
              }
              className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-700 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Highlight Story Path
            </button>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-1 text-neutral-400 hover:text-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
