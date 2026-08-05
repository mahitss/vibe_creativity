"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light" | "system";
export type AgentStatusMode = "IDLE" | "PROCESSING" | "SYNCING" | "ERROR";

interface ShellContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  rightPanelTitle: string;
  rightPanelContent: React.ReactNode | null;
  openRightPanel: (title: string, content: React.ReactNode) => void;
  closeRightPanel: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  agentStatus: AgentStatusMode;
  setAgentStatus: (status: AgentStatusMode) => void;
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsedState] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidthState] = useState<number>(240);
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(false);
  const [rightPanelTitle, setRightPanelTitle] = useState<string>("");
  const [rightPanelContent, setRightPanelContent] = useState<React.ReactNode | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [agentStatus, setAgentStatus] = useState<AgentStatusMode>("IDLE");
  const [workspaceName, setWorkspaceName] = useState<string>("OMNIA Creator Studio");

  // Load persistent preferences from localStorage
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem("omnia_shell_sidebar_collapsed");
      if (savedCollapsed !== null) {
        setSidebarCollapsedState(savedCollapsed === "true");
      }

      const savedWidth = localStorage.getItem("omnia_shell_sidebar_width");
      if (savedWidth !== null) {
        const parsed = parseInt(savedWidth, 10);
        if (!isNaN(parsed) && parsed >= 180 && parsed <= 380) {
          setSidebarWidthState(parsed);
        }
      }

      const savedTheme = localStorage.getItem("omnia_shell_theme") as ThemeMode;
      if (savedTheme && ["dark", "light", "system"].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch {
      // Fallback to default state if localStorage is unavailable
    }
  }, []);

  // Update DOM theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  // Command palette keyboard shortcut listener (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setSidebarCollapsed = (collapsed: boolean | ((prev: boolean) => boolean)) => {
    setSidebarCollapsedState((prev) => {
      const next = typeof collapsed === "function" ? collapsed(prev) : collapsed;
      try {
        localStorage.setItem("omnia_shell_sidebar_collapsed", String(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const setSidebarWidth = (width: number) => {
    const clamped = Math.min(Math.max(width, 180), 380);
    setSidebarWidthState(clamped);
    try {
      localStorage.setItem("omnia_shell_sidebar_width", String(clamped));
    } catch {
      // Ignore storage errors
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("omnia_shell_theme", newTheme);
    } catch {
      // Ignore storage errors
    }
  };

  const openRightPanel = (title: string, content: React.ReactNode) => {
    setRightPanelTitle(title);
    setRightPanelContent(content);
    setRightPanelOpen(true);
  };

  const closeRightPanel = () => {
    setRightPanelOpen(false);
    setRightPanelContent(null);
  };

  return (
    <ShellContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        sidebarWidth,
        setSidebarWidth,
        rightPanelOpen,
        setRightPanelOpen,
        rightPanelTitle,
        rightPanelContent,
        openRightPanel,
        closeRightPanel,
        commandPaletteOpen,
        setCommandPaletteOpen,
        theme,
        setTheme,
        agentStatus,
        setAgentStatus,
        workspaceName,
        setWorkspaceName,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = useContext(ShellContext);
  if (!context) {
    throw new Error("useShell must be used within a ShellProvider");
  }
  return context;
}
