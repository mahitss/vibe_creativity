"use client";

import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  DollarSign,
  FileText,
  Handshake,
  Mail,
  Send,
  Sparkles,
  User,
} from "lucide-react";

export function SponsorWorkspace() {
  const [activeDeal, setActiveDeal] = useState<"CLOUDCORP" | "NVIDIA">("CLOUDCORP");

  return (
    <div className="min-h-screen bg-[#000000] p-6 font-sans text-white selection:bg-[#1c69d4] selection:text-white md:p-10">
      {/* Top BMW M Tricolor Bar */}
      <div className="bmw-m-stripe fixed left-0 right-0 top-0 z-40" />

      <div className="mx-auto max-w-7xl space-y-8 pt-2">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#3c3c3c] pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bmw-m-tricolor-dots">
                <span />
                <span />
                <span />
              </div>
              <h1 className="font-sans text-2xl font-extrabold uppercase tracking-wider text-white">
                {"///"} SPONSOR CRM (SUPERHUMAN MEETS NOTION)
              </h1>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[#bbbbbb]">
              BRAND DEAL INBOX, AI CONTRACT NEGOTIATION &amp; REVENUE TRACKING
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-3.5 py-1.5 font-bold text-white">
              PIPELINE REVENUE: $27,000 USD
            </span>
            <button className="border border-white bg-white px-5 py-1.5 font-extrabold uppercase text-black hover:bg-[#e6e6e6]">
              NEW BRAND DEAL +
            </button>
          </div>
        </div>

        {/* 3-PANE WORKSPACE SPLIT (DEAL INBOX | THREAD INSPECTOR | AI NEGOTIATION ASSISTANT) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT 1/3: DEAL INBOX LIST */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} PRIORITY DEAL INBOX
              </span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-3">
              <div
                onClick={() => setActiveDeal("CLOUDCORP")}
                className={`cursor-pointer border p-4 transition ${
                  activeDeal === "CLOUDCORP"
                    ? "border-[#1c69d4] bg-[#1c69d4]/10"
                    : "border-[#3c3c3c] bg-[#0d0d0d] hover:border-white"
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#3c3c3c]/60 pb-2 text-[10px]">
                  <span className="border border-[#e22718]/40 bg-[#e22718]/10 px-2 py-0.5 font-bold text-white">
                    OFFER RECEIVED
                  </span>
                  <span className="text-[#7e7e7e]">10m ago</span>
                </div>
                <h4 className="mt-2 font-sans text-sm font-extrabold text-white">
                  CloudCorp Systems
                </h4>
                <p className="font-mono text-xs font-bold text-[#1c69d4]">
                  $15,000 USD Title Sponsor
                </p>
              </div>

              <div
                onClick={() => setActiveDeal("NVIDIA")}
                className={`cursor-pointer border p-4 transition ${
                  activeDeal === "NVIDIA"
                    ? "border-[#1c69d4] bg-[#1c69d4]/10"
                    : "border-[#3c3c3c] bg-[#0d0d0d] hover:border-white"
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#3c3c3c]/60 pb-2 text-[10px]">
                  <span className="border border-[#1c69d4]/40 bg-[#1c69d4]/10 px-2 py-0.5 font-bold text-white">
                    CONTRACT PENDING
                  </span>
                  <span className="text-[#7e7e7e]">2h ago</span>
                </div>
                <h4 className="mt-2 font-sans text-sm font-extrabold text-white">
                  NVIDIA AI Developer Program
                </h4>
                <p className="font-mono text-xs font-bold text-[#1c69d4]">
                  $12,000 USD GPU Hardware Deal
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE 1/3: CONVERSATION & CONTRACT THREAD */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} CONVERSATION THREAD ({activeDeal})
              </span>
              <Mail className="h-4 w-4 text-[#1c69d4]" />
            </div>

            <div className="space-y-3 border border-[#3c3c3c] bg-[#0d0d0d] p-4">
              <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-2 text-[11px]">
                <span className="font-bold text-white">Sponsorship Director (CloudCorp)</span>
                <span className="text-[#7e7e7e]">Today 09:30 AM</span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-[#e6e6e6]">
                &quot;Hi Mahit, we loved your React Authentication video. We would like to sponsor
                your upcoming Docker Containerization Masterclass for $15,000 USD. Please confirm if
                Friday publishing works.&quot;
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white">AI DRAFT REPLY:</span>
              <textarea
                readOnly
                value="Hi CloudCorp Team,\n\nThank you for the $15,000 title sponsorship offer. Based on our expected +18% audience retention baseline for the Docker series, we recommend a $18,000 package that includes a dedicated 60s integration plus a newsletter slot.\n\nBest regards,\nMahit"
                className="h-36 w-full resize-none border border-[#3c3c3c] bg-[#0d0d0d] p-3 font-mono text-xs text-[#e6e6e6] focus:outline-none"
              />
            </div>
          </div>

          {/* RIGHT 1/3: AI NEGOTIATION ASSISTANT */}
          <div className="space-y-4 border border-[#3c3c3c] bg-[#1a1a1a] p-6 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3">
              <span className="font-bold uppercase tracking-widest text-white">
                {"///"} AI NEGOTIATION ASSISTANT
              </span>
              <Brain className="h-4 w-4 text-[#1c69d4]" />
            </div>

            <div className="space-y-3 text-[#e6e6e6]">
              <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                <span className="text-[10px] font-bold text-emerald-400">
                  RECOMMENDED COUNTER OFFER
                </span>
                <p className="font-sans font-bold text-white">$18,000 USD (+$3,000 Upsell)</p>
                <p className="text-[11px] text-[#bbbbbb]">
                  Based on 127 verified viewer requests for Docker Compose.
                </p>
              </div>

              <div className="space-y-1 border border-[#3c3c3c] bg-[#0d0d0d] p-3">
                <span className="text-[10px] font-bold text-[#1c69d4]">CONTRACT TERMS CHECK</span>
                <p className="font-sans font-bold text-white">Exclusivity: Cloud Category Only</p>
                <p className="text-[11px] text-[#bbbbbb]">
                  No conflicts with current active sponsors.
                </p>
              </div>

              <button className="w-full border border-white bg-white py-3 font-extrabold uppercase text-black hover:bg-[#e6e6e6]">
                SEND COUNTER PROPOSAL →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
