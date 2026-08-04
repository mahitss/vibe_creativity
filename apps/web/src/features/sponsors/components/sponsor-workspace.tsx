"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Database,
  DollarSign,
  FileText,
  Filter,
  Flame,
  GitBranch,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  Plus,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";

interface Sponsor {
  id: string;
  company_name: string;
  brand: string;
  industry: string;
  primary_contact: string;
  email: string;
  website: string;
  country: string;
  status:
    | "DISCOVERY"
    | "CONTACTED"
    | "CONVERSATION"
    | "NEGOTIATION"
    | "PROPOSAL"
    | "AGREEMENT"
    | "CAMPAIGN"
    | "DELIVERED"
    | "PAYMENT_PENDING"
    | "COMPLETED"
    | "LONG_TERM_PARTNER";
  relationship_score: number;
  trust_score: number;
  lifetime_value: number;
  negotiation_terms: {
    offered_price: number;
    counter_offer?: number;
    deliverables: string[];
    usage_rights: string;
    exclusivity_days: number;
    payment_terms: string;
    special_requests?: string;
  };
  campaign_history: string[];
  notes: string;
}

interface Opportunity {
  id: string;
  brand_name: string;
  industry: string;
  niche_match_score: number;
  estimated_value: number;
  reason: string;
  suggested_action: string;
}

export function SponsorWorkspace() {
  const [activeTab, setActiveTab] = useState<"PIPELINE" | "OPPORTUNITIES" | "RISKS">("PIPELINE");
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>("spn-cloudcorp-101");
  const [showFollowupModal, setShowFollowupModal] = useState<boolean>(false);

  const [sponsors] = useState<Sponsor[]>([
    {
      id: "spn-cloudcorp-101",
      company_name: "CloudCorp Inc.",
      brand: "CloudCorp Cloud Infrastructure",
      industry: "Cloud Computing & Developer Tools",
      primary_contact: "Sarah Jenkins (VP Partnerships)",
      email: "sarah.j@cloudcorp.io",
      website: "https://cloudcorp.io",
      country: "USA",
      status: "NEGOTIATION",
      relationship_score: 0.92,
      trust_score: 0.95,
      lifetime_value: 27000.0,
      negotiation_terms: {
        offered_price: 15000.0,
        counter_offer: 18000.0,
        deliverables: [
          "60s Dedicated Integration in Docker Video",
          "Pinned YouTube Comment",
          "Discord Sponsor Spotlight",
        ],
        usage_rights: "Digital & Social Media (1 Year)",
        exclusivity_days: 30,
        payment_terms: "Net 30",
        special_requests: "Include CloudCorp live terminal deployment demo.",
      },
      campaign_history: [
        "Q1 Docker Integration ($12,000)",
        "Q3 Multi-Agent Title Sponsorship ($15,000)",
      ],
      notes: "CloudCorp requested updated Q3/Q4 media kit 3 days ago. Highly responsive partner.",
    },
    {
      id: "spn-vercel-102",
      company_name: "Vercel",
      brand: "Vercel Frontend Cloud",
      industry: "Web Hosting & Serverless",
      primary_contact: "Mark Davis (Head of Creator Relations)",
      email: "mark.d@vercel.com",
      website: "https://vercel.com",
      country: "USA",
      status: "LONG_TERM_PARTNER",
      relationship_score: 0.96,
      trust_score: 0.98,
      lifetime_value: 35000.0,
      negotiation_terms: {
        offered_price: 10000.0,
        deliverables: ["Next.js Masterclass Title Partner", "Vercel Deploy Link in Description"],
        usage_rights: "Perpetual",
        exclusivity_days: 14,
        payment_terms: "Net 15",
      },
      campaign_history: [
        "Next.js 14 Launch Sponsor ($15,000)",
        "React Masterclass Series ($20,000)",
      ],
      notes: "Long-term partner. Automatic renewal eligibility for Q4.",
    },
    {
      id: "spn-datadog-103",
      company_name: "Datadog",
      brand: "Datadog APM & Observability",
      industry: "DevOps & Observability",
      primary_contact: "Alex Rivera (Partner Marketing Manager)",
      email: "arivera@datadog.com",
      website: "https://datadog.com",
      country: "USA",
      status: "PROPOSAL",
      relationship_score: 0.85,
      trust_score: 0.9,
      lifetime_value: 10000.0,
      negotiation_terms: {
        offered_price: 10000.0,
        deliverables: ["Dedicated Observability Walkthrough in Docker Video Part 2"],
        usage_rights: "Digital (6 Months)",
        exclusivity_days: 30,
        payment_terms: "Net 30",
      },
      campaign_history: [],
      notes: "Proposal sent for Docker Part 2 observability read.",
    },
  ]);

  const [opportunities] = useState<Opportunity[]>([
    {
      id: "opp-101",
      brand_name: "Supabase",
      industry: "Database & Backend-as-a-Service",
      niche_match_score: 0.96,
      estimated_value: 12500.0,
      reason: "High audience overlap with React & Next.js full-stack masterclass.",
      suggested_action: "Send outreach proposal highlighting Next.js Part 5 viewer stats.",
    },
    {
      id: "opp-102",
      brand_name: "Postman",
      industry: "API Development & Testing",
      niche_match_score: 0.92,
      estimated_value: 9000.0,
      reason: "Multiple audience comments asking for API testing integration in Docker videos.",
      suggested_action: "Prepare API testing sponsorship proposal.",
    },
  ]);

  const selectedSponsor = sponsors.find((s) => s.id === selectedSponsorId);

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans text-neutral-100">
      {/* Header Banner */}
      <header className="flex flex-col justify-between gap-4 border-b border-neutral-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400">
              <Handshake className="h-3 w-3" /> Autonomous Business Development Manager
            </span>
            <span className="font-mono text-xs italic text-neutral-400">
              &quot;Never forget a sponsor conversation.&quot;
            </span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-100">
            Sponsor Intelligence Engine
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-neutral-400">
            Continuously tracks sponsor deals, negotiation memory, contract terms, risk alerts, and
            proactively discovers new brand partnership opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:from-amber-500 hover:to-emerald-500">
            <Plus className="h-3.5 w-3.5" /> Add Sponsor Deal
          </button>
        </div>
      </header>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 gap-4 font-sans text-xs md:grid-cols-4">
        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Active Sponsor Deals
          </span>
          <p className="font-mono text-xl font-bold text-amber-400">3 Active Deals</p>
          <span className="font-mono text-[10px] text-neutral-400">$43,000 Pipeline Value</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Lifetime Sponsor Revenue
          </span>
          <p className="font-mono text-xl font-bold text-emerald-400">$72,000 Realized</p>
          <span className="font-mono text-[10px] text-neutral-400">Across 6 Campaigns</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Outstanding Invoices
          </span>
          <p className="font-mono text-xl font-bold text-rose-400">$15,000 Pending</p>
          <span className="font-mono text-[10px] text-neutral-400">CloudCorp Title Deal</span>
        </div>

        <div className="space-y-1 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            Renewal Conversion Rate
          </span>
          <p className="font-mono text-xl font-bold text-cyan-400">88% Conversion</p>
          <span className="font-mono text-[10px] text-neutral-400">
            Vercel &amp; CloudCorp Long-Term
          </span>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-neutral-850 flex items-center gap-2 border-b pb-2 font-sans text-xs">
        {(
          [
            { id: "PIPELINE", label: "Pipeline Board", count: sponsors.length },
            { id: "OPPORTUNITIES", label: "Opportunity Inbox", count: opportunities.length },
            { id: "RISKS", label: "Deadlines & Risk Alerts", count: 2 },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "PIPELINE" | "OPPORTUNITIES" | "RISKS")}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-medium transition ${
              activeTab === tab.id
                ? "border border-neutral-700 bg-neutral-800 font-semibold text-neutral-100 shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {tab.label}
            <span className="rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 font-mono text-[10px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Pipeline Board View */}
      {activeTab === "PIPELINE" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sponsor List Cards */}
          <div className="space-y-4 lg:col-span-2">
            {sponsors.map((s) => (
              <article
                key={s.id}
                onClick={() => setSelectedSponsorId(s.id)}
                className={`cursor-pointer space-y-4 rounded-2xl border bg-neutral-900 p-5 transition ${
                  selectedSponsorId === s.id
                    ? "border-amber-500 shadow-xl ring-2 ring-amber-500/30"
                    : "hover:border-neutral-750 border-neutral-800"
                }`}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-amber-400">
                        {s.status}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400">{s.industry}</span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-100">{s.company_name}</h3>
                    <p className="text-xs text-neutral-400">
                      {s.primary_contact} • {s.email}
                    </p>
                  </div>

                  <div className="border-neutral-850 flex shrink-0 items-center gap-2 rounded-xl border bg-neutral-950 px-3 py-1.5 font-mono text-xs">
                    <span className="text-[10px] text-neutral-500">Offered</span>
                    <span className="font-bold text-emerald-400">
                      ${s.negotiation_terms.offered_price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-neutral-850 space-y-1.5 rounded-xl border bg-neutral-950 p-3 font-sans text-xs">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Negotiation Memory &amp; Terms
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-neutral-300">
                      Payment: {s.negotiation_terms.payment_terms}
                    </span>
                    <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-neutral-300">
                      Exclusivity: {s.negotiation_terms.exclusivity_days} Days
                    </span>
                    <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-neutral-300">
                      Rights: {s.negotiation_terms.usage_rights}
                    </span>
                  </div>
                </div>

                <div className="border-neutral-850 flex items-center justify-between border-t pt-2 font-sans text-xs">
                  <span className="font-mono text-[11px] text-neutral-400">
                    Trust Score: {(s.trust_score * 100).toFixed(0)}% | Lifetime: $
                    {s.lifetime_value.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFollowupModal(true);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-500"
                  >
                    <Mail className="h-3.5 w-3.5" /> Draft Follow-up
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Selected Sponsor Inspector Sidebar */}
          <aside className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 font-sans text-xs">
            {selectedSponsor ? (
              <>
                <div className="space-y-1 border-b border-neutral-800 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase text-amber-400">
                    {selectedSponsor.status}
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">
                    {selectedSponsor.company_name}
                  </h3>
                  <p className="text-neutral-400">{selectedSponsor.brand}</p>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Deliverables Agreed
                  </span>
                  <div className="space-y-1.5">
                    {selectedSponsor.negotiation_terms.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="border-neutral-850 flex items-center gap-2 rounded-lg border bg-neutral-950 p-2.5 font-mono text-[11px] text-neutral-300"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        {del}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-neutral-850 space-y-2 border-t pt-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Campaign History
                  </span>
                  <div className="space-y-1">
                    {selectedSponsor.campaign_history.map((camp, cIdx) => (
                      <span
                        key={cIdx}
                        className="border-neutral-850 block rounded border bg-neutral-950 px-2.5 py-1 font-mono text-[10px] text-neutral-300"
                      >
                        {camp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-neutral-850 space-y-1 border-t pt-2 font-mono text-[11px] text-neutral-400">
                  <span className="block text-neutral-500">Notes:</span>
                  <p className="border-neutral-850 rounded-lg border bg-neutral-950 p-2.5 text-[10px] leading-relaxed text-neutral-300">
                    {selectedSponsor.notes}
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-2 py-12 text-center font-mono text-xs text-neutral-500">
                <Handshake className="mx-auto h-6 w-6 text-neutral-600" />
                <p>Select any sponsor card to view negotiation terms &amp; history.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Opportunity Inbox View */}
      {activeTab === "OPPORTUNITIES" && (
        <div className="grid grid-cols-1 gap-6 font-sans md:grid-cols-2">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-emerald-400">
                    Match Score: {(opp.niche_match_score * 100).toFixed(0)}%
                  </span>
                  <h3 className="text-base font-bold text-neutral-100">{opp.brand_name}</h3>
                </div>
                <span className="border-neutral-850 rounded border bg-neutral-950 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                  Est. ${opp.estimated_value.toLocaleString()}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-neutral-300">{opp.reason}</p>

              <div className="border-neutral-850 flex items-center justify-between border-t pt-2">
                <span className="font-mono text-[11px] font-semibold text-emerald-400">
                  {opp.suggested_action}
                </span>
                <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500">
                  Send Proposal
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deadlines & Risks View */}
      {activeTab === "RISKS" && (
        <div className="space-y-4 font-sans text-xs">
          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <AlertTriangle className="h-4 w-4 animate-pulse text-rose-400" />
              <h3 className="text-sm font-bold text-neutral-100">Active Sponsor Risk Alerts</h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5 rounded-xl border border-rose-500/30 bg-neutral-950 p-4">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold uppercase text-rose-400">
                    UNANSWERED_REPLY (HIGH SEVERITY)
                  </span>
                  <span className="text-neutral-500">CloudCorp Inc.</span>
                </div>
                <h4 className="font-bold text-neutral-100">
                  CloudCorp requested updated Q3/Q4 media kit 3 days ago. No reply sent.
                </h4>
                <p className="pt-1 font-semibold text-emerald-400">
                  Suggested Action: Approve &amp; send draft media kit email response.
                </p>
              </div>

              <div className="space-y-1.5 rounded-xl border border-amber-500/30 bg-neutral-950 p-4">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold uppercase text-amber-400">
                    DEADLINE_APPROACHING (MEDIUM SEVERITY)
                  </span>
                  <span className="text-neutral-500">Datadog</span>
                </div>
                <h4 className="font-bold text-neutral-100">
                  Datadog proposal decision window expires in 48 hours.
                </h4>
                <p className="pt-1 font-semibold text-emerald-400">
                  Suggested Action: Follow up with Alex Rivera on proposal status.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Follow-up Draft Modal */}
      {showFollowupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-100">
                <Mail className="h-4 w-4 text-amber-400" /> Autonomous Sponsor Follow-up Draft
              </h3>
              <button
                onClick={() => setShowFollowupModal(false)}
                className="text-neutral-500 hover:text-neutral-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div>
                <span className="block text-neutral-500">Recipient:</span>
                <span className="text-neutral-200">sarah.j@cloudcorp.io (Sarah Jenkins)</span>
              </div>
              <div>
                <span className="block text-neutral-500">Subject:</span>
                <span className="text-neutral-200">
                  Re: CloudCorp Inc. &amp; OMNIA Q3 Title Sponsorship Update
                </span>
              </div>
              <div>
                <span className="block text-neutral-500">Draft Message:</span>
                <p className="border-neutral-850 mt-1 rounded-lg border bg-neutral-950 p-3 font-sans text-xs leading-relaxed text-neutral-300">
                  Hi Sarah,
                  {"\n\n"}
                  Following up on our Q3 title sponsorship for CloudCorp Cloud Infrastructure
                  ($15,000). We have prepared the updated Q3/Q4 audience media kit and confirmed the
                  60-second dedicated integration slot in the upcoming Docker Multi-Agent Systems
                  Deep Dive video.
                  {"\n\n"}
                  Please find the attached media kit PDF.
                  {"\n\n"}
                  Best,
                  {"\n"}
                  OMNIA Business Manager
                </p>
              </div>
            </div>

            <div className="border-neutral-850 flex items-center justify-end gap-2 border-t pt-2">
              <button
                onClick={() => setShowFollowupModal(false)}
                className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 font-medium text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFollowupModal(false)}
                className="rounded-lg bg-amber-600 px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-amber-500"
              >
                Approve &amp; Dispatch Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
