"use client";

import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  Clock,
  Compass,
  Database,
  FileText,
  FolderGit2,
  GitBranch,
  Handshake,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
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
    { id: "timeline", label: "Living Memory Timeline", icon: Clock },
    { id: "knowledge-graph", label: "Interactive Memory Graph", icon: GitBranch },
    { id: "content", label: "Content Pipeline", icon: FileText },
    { id: "community", label: "Community Guild", icon: Users },
    { id: "sponsors", label: "Sponsor Deals", icon: Handshake },
    { id: "memory", label: "Memory Studio", icon: Database },
    { id: "analytics", label: "Analytics Insights", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "agents", label: "Multi-Agent Platform", icon: Bot },
  ];

  return (
    <aside className="w-60 border-r border-neutral-800 bg-neutral-950 p-3 flex flex-col justify-between shrink-0 font-sans text-xs">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <p className="px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                    isActive
                      ? "bg-neutral-850 text-neutral-100 font-medium border border-neutral-750 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-neutral-100" : "text-neutral-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions Widget */}
        <div className="pt-3 border-t border-neutral-900">
          <p className="px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
            Quick Actions
          </p>
          <div className="space-y-1">
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition"
            >
              <span className="flex items-center gap-2">
                <Plus className="h-3.5 w-3.5 text-neutral-500" />
                <span>Create Mission</span>
              </span>
            </button>
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition"
            >
              <span className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-neutral-500" />
                <span>Record Memory</span>
              </span>
            </button>
            <button
              onClick={onOpenCommandPalette}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition"
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
      <div className="pt-3 border-t border-neutral-900">
        <button
          onClick={() => onSelectSection("settings")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
            activeSection === "settings"
              ? "bg-neutral-850 text-neutral-100 font-medium"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
          }`}
        >
          <Settings className="h-4 w-4 text-neutral-500" />
          <span>Workspace Settings</span>
        </button>
      </div>
    </aside>
  );
}
