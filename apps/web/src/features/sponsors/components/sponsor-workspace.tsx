"use client";

import { useEffect, useState } from "react";
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
  memory_references?: string[];
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

  const [sponsors, setSponsors] = useState<Sponsor[]>([
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
        payment_terms: "Net-30 upon publication",
        special_requests: "Include code snippet repository link",
      },
      campaign_history: ["React Series Part 2 Sponsor"],
      notes: "High interest in developer tooling audience.",
      memory_references: ["mem-cloudcorp-deal"],
    },
  ]);

  useEffect(() => {
    fetch("/api/sponsors/pipeline", {
      headers: { "X-Creator-Id": "creator-default" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.pipeline_stages) {
          const all: Sponsor[] = [];
          Object.values(data.pipeline_stages).forEach((stageObj: unknown) => {
            const sObj = stageObj as { sponsors?: Record<string, unknown>[] };
            if (sObj && Array.isArray(sObj.sponsors)) {
              sObj.sponsors.forEach((item: Record<string, unknown>) => {
                all.push({
                  id: item.id as string,
                  company_name: item.company_name as string,
                  brand: item.brand as string,
                  industry: item.industry as string,
                  primary_contact: item.primary_contact as string,
                  email: item.email as string,
                  website: (item.website as string) || "https://example.com",
                  country: (item.country as string) || "USA",
                  status: (
                    (item.status as string) || "PROSPECT"
                  ).toUpperCase() as unknown as Sponsor["status"],
                  relationship_score: (item.relationship_score as number) ?? 0.9,
                  trust_score: (item.trust_score as number) ?? 0.95,
                  lifetime_value: (item.lifetime_value as number) ?? 15000,
                  negotiation_terms: (item.negotiation_terms as Sponsor["negotiation_terms"]) || {
                    offered_price: 15000,
                    counter_offer: 18000,
                    deliverables: ["60s Integration"],
                    usage_rights: "Digital 1 Year",
                    exclusivity_days: 30,
                    payment_terms: "Net-30",
                    special_requests: "GitHub Link",
                  },
                  campaign_history: (item.campaign_history as string[]) || [],
                  notes: (item.notes as string) || "",
                  memory_references: (item.memory_references as string[]) || [
                    "#mem-cloudcorp-deal",
                  ],
                });
              });
            }
          });
          if (all.length > 0) {
            setSponsors(all);
          }
        }
      })
      .catch(() => {
        // Fallback
      });
  }, []);

  const [opportunities] = useState<Opportunity[]>([
    {
      id: "spn-vercel-102",
      brand_name: "Vercel Frontend Cloud",
      industry: "Web Hosting & Serverless",
      niche_match_score: 0.96,
      estimated_value: 35000.0,
      reason: "High alignment with Next.js and frontend cloud content.",
      suggested_action: "Send automated Q4 sponsorship proposal draft.",
    },
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
            <span className="flex items-center gap-1 border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400">
              <Handshake className="h-3 w-3" /> Sponsor Inbox
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
            Sponsor Conversations
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Which conversation needs action right now?
          </p>
        </div>
      </header>

      {/* Clean Inbox List */}
      <div className="space-y-3">
        {sponsors.length === 0 ? (
          <div className="border border-[#3c3c3c] bg-[#1a1a1a] p-8 text-center text-xs text-[#bbbbbb]">
            No active sponsorship deals in pipeline. Click &apos;Add Sponsor Deal&apos; to start.
          </div>
        ) : (
          sponsors.map((s) => (
            <div
              key={s.id}
              className="flex flex-col justify-between gap-4 border border-[#3c3c3c] bg-[#1a1a1a] p-5 transition hover:border-white md:flex-row md:items-center"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{s.company_name}</span>
                  <span className="border border-[#3c3c3c] bg-[#0d0d0d] px-2 py-0.5 font-mono text-[10px] uppercase text-[#1c69d4]">
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-[#bbbbbb]">
                  Primary Contact: {s.primary_contact} • {s.email}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right font-mono text-xs">
                  <p className="font-bold text-emerald-400">
                    $
                    {(
                      s.negotiation_terms?.offered_price ||
                      s.lifetime_value ||
                      15000
                    ).toLocaleString()}{" "}
                    OFFER
                  </p>
                  <p className="text-[10px] text-[#bbbbbb]">Needs reply today</p>
                </div>
                <button
                  onClick={() => setSelectedSponsorId(s.id)}
                  className="flex items-center gap-1 border border-white bg-white px-4 py-2 text-xs font-bold uppercase text-black hover:bg-[#e6e6e6]"
                >
                  Review →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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
