"use client";

import React, { useState } from "react";
import { Briefcase, DollarSign, FileText, Send, Sparkles, TrendingUp } from "lucide-react";

interface Sponsor {
  id: string;
  company: string;
  brand: string;
  stage: string;
  dealValue: number;
  contact: string;
  relationshipScore: number;
}

interface Opportunity {
  id: string;
  brand: string;
  industry: string;
  value: number;
  confidence: number;
  reason: string;
}

export function SponsorWorkspaceDashboard() {
  const [sponsors] = useState<Sponsor[]>([
    {
      id: "sp-101",
      company: "Acme Corporation",
      brand: "Acme Cloud",
      stage: "NEGOTIATION",
      dealValue: 7500,
      contact: "Sarah Jenkins",
      relationshipScore: 88.5,
    },
    {
      id: "sp-102",
      company: "Vercel",
      brand: "Vercel Hosting",
      stage: "CAMPAIGN",
      dealValue: 22000,
      contact: "Mark Thorne",
      relationshipScore: 94.0,
    },
  ]);

  const [opportunities] = useState<Opportunity[]>([
    {
      id: "opp-101",
      brand: "CloudCorp Hosting",
      industry: "Cloud Infrastructure",
      value: 8500,
      confidence: 0.92,
      reason: "Matches high Docker & Kubernetes tutorial viewer retention.",
    },
    {
      id: "opp-102",
      brand: "DevTool IDE",
      industry: "Developer Tools",
      value: 6000,
      confidence: 0.88,
      reason: "High alignment with developer community discussions in Discord.",
    },
  ]);

  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  const handleGenerateDraft = () => {
    setGeneratedDraft(
      "Subject: OMNIA x Acme Cloud: Updated Proposal & Q3 Mid-Roll Deliverables\n\nHi Sarah,\n\nFollowing up on our recent call regarding the Q3 Cloud tutorial series. We have reserved 60-second mid-roll integrations for the upcoming Docker release.\n\nBest regards,\nOMNIA Autonomous AI Manager",
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-amber-400" />
              <h1 className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Sponsor Intelligence Platform
              </h1>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              AI business manager — complete sponsor lifecycle CRM, pipeline, revenue tracking, & AI
              follow-up assistant
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-amber-400">
            <DollarSign className="h-4 w-4 text-amber-400" />
            $37,000 TOTAL REVENUE
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Pipeline Value</span>
            <p className="font-mono text-2xl font-bold text-slate-100">$29,500</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Active Campaigns</span>
            <p className="font-mono text-2xl font-bold text-amber-400">2 Brand Deals</p>
          </div>
          <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <span className="text-xs font-medium text-slate-400">Predicted Renewal Rate</span>
            <p className="font-mono text-2xl font-bold text-emerald-400">94.0%</p>
          </div>
        </div>

        {/* Sponsor Kanban Deals */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <TrendingUp className="h-5 w-5 text-amber-400" /> Active Sponsor CRM Deals & Pipelines
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sponsors.map((sp) => (
              <div
                key={sp.id}
                className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur transition hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{sp.company}</h3>
                    <span className="font-mono text-xs text-slate-400">
                      {sp.brand} • Contact: {sp.contact}
                    </span>
                  </div>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-400">
                    {sp.stage}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
                  <span className="text-slate-400">
                    Deal Value:{" "}
                    <strong className="font-mono text-slate-100">
                      ${sp.dealValue.toLocaleString()}
                    </strong>
                  </span>
                  <span className="text-slate-400">
                    Health:{" "}
                    <strong className="font-mono text-cyan-400">{sp.relationshipScore}%</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Brand Opportunities */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
            <Sparkles className="h-5 w-5 text-amber-400" /> AI Opportunity Inbox & Matching Brands
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">{opp.brand}</h3>
                  <span className="rounded border border-amber-800/40 bg-amber-950/40 px-2.5 py-1 font-mono text-xs font-bold text-amber-400">
                    Est. ${opp.value.toLocaleString()}
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-400">{opp.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Follow-up Assistant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
              <Send className="h-5 w-5 text-cyan-400" /> AI Follow-up Assistant
            </h2>
            <button
              onClick={handleGenerateDraft}
              className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
            >
              Generate Acme Follow-up Draft
            </button>
          </div>

          {generatedDraft && (
            <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <FileText className="h-4 w-4" /> AI Grounded Email Draft
              </span>
              <pre className="whitespace-pre-wrap pt-2 font-sans text-sm text-slate-200">
                {generatedDraft}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
