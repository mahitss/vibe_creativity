"use client";

import React, { useRef } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Database,
  FileText,
  FolderGit2,
  GitBranch,
  Globe,
  Handshake,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Search,
  Settings,
  Sliders,
  TrendingUp,
  Users,
  Video,
  Workflow,
} from "lucide-react";
import { useShell } from "../providers/shell-provider";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, sidebarWidth, setSidebarWidth } = useShell();
  const isResizing = useRef(false);

  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return;
      setSidebarWidth(moveEvent.clientX);
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const navSections = [
    {
      title: "Workspace",
      items: [
        { id: "home", label: "Home", href: "/", icon: LayoutDashboard },
        { id: "missions", label: "Missions", href: "/missions", icon: Compass },
        { id: "content", label: "Content", href: "/content", icon: Lightbulb },
        { id: "sponsors", label: "Sponsors", href: "/sponsors", icon: Handshake },
        { id: "memory", label: "Memory", href: "/memory", icon: Database },
      ],
    },
    {
      title: "System",
      items: [{ id: "settings", label: "Settings", href: "/settings", icon: Settings }],
    },
  ];

  return (
    <aside
      className="border-neutral-850 relative z-10 flex select-none flex-col border-r bg-neutral-950 transition-all duration-150"
      style={{ width: sidebarCollapsed ? "56px" : `${sidebarWidth}px` }}
    >
      {/* Sidebar Header Toggle */}
      <div className="border-neutral-850 flex h-10 items-center justify-between border-b px-3">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-300">
              OMNIA OS
            </span>
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="hover:bg-neutral-850 mx-auto rounded-lg border border-neutral-800 bg-neutral-900 p-1 text-neutral-400 transition hover:text-neutral-200"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation Items */}
      <div className="scrollbar-none flex-1 space-y-4 overflow-y-auto px-2 py-3">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            {!sidebarCollapsed && (
              <span className="block px-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                {sec.title}
              </span>
            )}
            {sec.items.map((item) => (
              <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Sidebar Footer User Info */}
      <div className="border-neutral-850 border-t p-2">
        <div className="border-neutral-850 flex items-center gap-2.5 rounded-xl border bg-neutral-900 p-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-[10px] font-bold text-neutral-300">
            M
          </div>
          {!sidebarCollapsed && (
            <div className="truncate text-xs">
              <p className="truncate font-semibold text-neutral-200">Mahit</p>
              <p className="truncate font-mono text-[10px] text-neutral-500">Pro Creator</p>
            </div>
          )}
        </div>
      </div>

      {/* Resize Handle */}
      {!sidebarCollapsed && (
        <div
          onMouseDown={startResizing}
          className="absolute bottom-0 right-0 top-0 w-1 cursor-col-resize transition hover:bg-indigo-500/50"
        />
      )}
    </aside>
  );
}
