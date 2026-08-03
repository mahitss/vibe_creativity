"use client";

import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  Clock,
  Compass,
  Cpu,
  Database,
  FileText,
  FolderGit2,
  GitBranch,
  Handshake,
  Layers,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
  Video,
} from "lucide-react";

interface LeftSidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
}

export function LeftSidebar({
  activeSection,
  onSelectSection,
  onOpenCommandPalette,
}: LeftSidebarProps) {
  const mainNav = [
    { id: "mission-control", label: "Mission Control", icon: Compass },
    { id: "search", label: "Memory Search Engine", icon: Search },
    { id: "youtube", label: "YouTube Connector", icon: Video },
    { id: "cognition", label: "Cognitive Loop Engine", icon: Cpu },
    { id: "reviews", label: "Executive COO Review", icon: Brain },
    { id: "timeline", label: "Living Memory Timeline", icon: Clock },
    { id: "knowledge-graph", label: "Interactive Memory Graph", icon: GitBranch },
    { id: "ingestion", label: "Ingestion Pipeline", icon: Layers },
    { id: "content", label: "Content Pipeline", icon: FileText },
    { id: "community", label: "Community Guild", icon: Users },
    { id: "sponsors", label: "Sponsor Deals", icon: Handshake },
    { id: "memory", label: "Memory Studio", icon: Database },
    { id: "analytics", label: "Analytics Insights", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "agents", label: "Multi-Agent Platform", icon: Bot },
  ];

  return (
    <aside className="flex w-60 shrink-0 flex-col justify-between border-r border-neutral-800 bg-neutral-950 p-3 font-sans text-xs">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Workspace
          </p>
          <nav className="space-y-0.5">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                    isActive
                      ? "bg-neutral-850 border-neutral-750 border font-medium text-neutral-100 shadow-sm"
                      : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? "text-neutral-100" : "text-neutral-500"}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions Widget */}
        <div className="border-t border-neutral-900 pt-3">
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Quick Actions
          </p>
          <div className="space-y-1">
            <button
              onClick={onOpenCommandPalette}
              className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200"
            >
              <span className="flex items-center gap-2">
                <Plus className="h-3.5 w-3.5 text-neutral-500" />
                <span>Create Mission</span>
              </span>
            </button>
            <button
              onClick={onOpenCommandPalette}
              className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200"
            >
              <span className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-neutral-500" />
                <span>Record Memory</span>
              </span>
            </button>
            <button
              onClick={onOpenCommandPalette}
              className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-200"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-neutral-500" />
                <span>Capture Idea</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="border-t border-neutral-900 pt-3">
        <button
          onClick={() => onSelectSection("settings")}
          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
            activeSection === "settings"
              ? "bg-neutral-850 font-medium text-neutral-100"
              : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
          }`}
        >
          <Settings className="h-4 w-4 text-neutral-500" />
          <span>Workspace Settings</span>
        </button>
      </div>
    </aside>
  );
}
