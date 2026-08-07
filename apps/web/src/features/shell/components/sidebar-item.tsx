"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { useShell } from "../providers/shell-provider";

interface SidebarItemProps {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export function SidebarItem({ id, label, href, icon: Icon, badge }: SidebarItemProps) {
  const pathname = usePathname();
  const { sidebarCollapsed } = useShell();

  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150 ${
        isActive
          ? "border-y border-l-2 border-r border-[#0066b1] border-[#3c3c3c] bg-[#1a1a1a] font-bold text-white shadow-md"
          : "text-[#bbbbbb] hover:border hover:border-[#3c3c3c] hover:bg-[#0d0d0d] hover:text-white"
      } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
      title={sidebarCollapsed ? label : undefined}
    >
      <Icon
        className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-white" : "text-[#8e8e93]"}`}
      />
      {!sidebarCollapsed && (
        <span className="flex-1 truncate font-sans tracking-wide">{label}</span>
      )}
      {!sidebarCollapsed && badge !== undefined && (
        <span className="rounded border border-[#3c3c3c] bg-[#0d0d0d] px-1.5 py-0.5 font-mono text-[10px] text-[#bbbbbb]">
          {badge}
        </span>
      )}
    </Link>
  );
}
