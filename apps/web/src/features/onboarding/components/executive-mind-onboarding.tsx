"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Brain, Sparkles, ChevronLeft, ShieldCheck, Zap } from "lucide-react";

export function ExecutiveMindOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [fullName, setFullName] = useState("Mahit");
  const [username, setUsername] = useState("mahitss");
  const [bio, setBio] = useState("Building autonomous creator operating systems.");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("America/New_York");
  const [language, setLanguage] = useState("English");

  const [creatorTypes, setCreatorTypes] = useState<string[]>(["Developer", "Educator"]);
  const [goals, setGoals] = useState<string[]>(["Reach 100K subscribers", "Earn sponsorships"]);
  const [customGoal, setCustomGoal] = useState("");
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>(["YouTube", "GitHub"]);

  const [brandVoice, setBrandVoice] = useState("Technical & Direct");
  const [audienceType, setAudienceType] = useState("Software Engineers & AI Builders");
  const [topics, setTopics] = useState("TypeScript, Python, Autonomous AI Agents");
  const [contentStyle, setContentStyle] = useState("Architectural Walkthroughs");
  const [thingsToAvoid, setThingsToAvoid] = useState("Clickbait & Fluff");

  const [workingHours, setWorkingHours] = useState("9am - 6pm EST");
  const [publishingFrequency, setPublishingFrequency] = useState("Weekly");
  const [planningStyle, setPlanningStyle] = useState("Structured");
  const [preferredTone, setPreferredTone] = useState("Direct & Concise");

  // Executive Mind Animation items
  const [creationStepIndex, setCreationStepIndex] = useState(0);

  const creationTasks = [
    "Creating Memory Namespace (omnia.creator.mind)...",
    "Initializing Knowledge Graph Substrate...",
    "Preparing Long-Term Identity Memory...",
    "Registering Executive Agent Registry...",
    "Building Creator Profile & Brand DNA...",
    "Executive Mind Initialized Successfully!",
  ];

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem("omnia_onboarding_step");
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (parsed >= 1 && parsed <= 8) setStep(parsed);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveProgress = (nextStep: number) => {
    setStep(nextStep);
    try {
      localStorage.setItem("omnia_onboarding_step", String(nextStep));
    } catch {
      // Ignore storage errors
    }
  };

  // Step 8: Executive Mind creation animation handler
  useEffect(() => {
    if (step !== 8) return;

    const interval = setInterval(() => {
      setCreationStepIndex((prev) => {
        if (prev < creationTasks.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(() => {
          try {
            localStorage.removeItem("omnia_onboarding_step");
          } catch {
            // Ignore storage errors
          }
          router.push("/dashboard");
        }, 800);
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [step, router]);

  const toggleArrayItem = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const allCreatorTypes = [
    "YouTuber",
    "Streamer",
    "Developer",
    "Educator",
    "Designer",
    "Musician",
    "Writer",
    "Agency",
    "Founder",
    "Other",
  ];

  const allGoals = [
    "Reach 100K subscribers",
    "Launch a course",
    "Earn sponsorships",
    "Grow newsletter",
    "Build community",
    "Become full-time creator",
  ];

  const allPlatforms = [
    "YouTube",
    "GitHub",
    "LinkedIn",
    "Discord",
    "Instagram",
    "TikTok",
    "Twitter/X",
    "Newsletter",
  ];

  return (
    <div className="flex min-h-screen w-screen select-none flex-col justify-between bg-neutral-950 p-6 font-sans text-neutral-100">
      {/* Top Bar */}
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-md">
            Ω
          </div>
          <span className="text-sm font-bold tracking-tight text-neutral-100">
            OMNIA Executive Mind
          </span>
        </div>

        {step > 1 && step < 8 && (
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-500">
            <span>Step {step} of 8</span>
            <div className="h-1 w-20 overflow-hidden rounded-full bg-neutral-900">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${(step / 8) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Centered Content */}
      <main className="mx-auto my-auto w-full max-w-xl py-8">
        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-600/10 text-indigo-400">
              <Brain className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
                Welcome to OMNIA
              </h1>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-400">
                Let&apos;s build your long-term creator intelligence. OMNIA is a persistent
                operating system designed to learn your style, goals, and workflow.
              </p>
            </div>

            <button
              onClick={() => saveProgress(2)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 text-xs font-semibold text-white shadow-lg transition hover:from-indigo-500 hover:to-violet-500"
            >
              <span>Begin Setup</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2: CREATOR PROFILE */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-100">About You</h2>
              <p className="text-xs text-neutral-400">
                Establish your core identity in the Executive Mind memory layer.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-neutral-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-neutral-400">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-neutral-400">
                  Creator Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-neutral-400">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-neutral-400">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => saveProgress(1)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <button
                onClick={() => saveProgress(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CREATOR TYPE */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-100">Creator Profile Type</h2>
              <p className="text-xs text-neutral-400">Select all roles that describe your craft.</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {allCreatorTypes.map((type) => {
                const isSelected = creatorTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayItem(type, creatorTypes, setCreatorTypes)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-600/10 text-indigo-200"
                        : "border-neutral-850 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    <span>{type}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => saveProgress(2)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <button
                onClick={() => saveProgress(4)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GOALS */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-100">Primary Goals</h2>
              <p className="text-xs text-neutral-400">
                What are you striving to achieve with OMNIA?
              </p>
            </div>

            <div className="space-y-2">
              {allGoals.map((goal) => {
                const isSelected = goals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleArrayItem(goal, goals, setGoals)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-600/10 text-indigo-200"
                        : "border-neutral-850 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    <span>{goal}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                  </button>
                );
              })}

              <div className="pt-2">
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="Add custom goal..."
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => saveProgress(3)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <button
                onClick={() => saveProgress(5)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONNECTED PLATFORMS */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-100">Connected Platforms</h2>
              <p className="text-xs text-neutral-400">
                Select channels OMNIA should monitor and optimize.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {allPlatforms.map((platform) => {
                const isSelected = connectedPlatforms.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() =>
                      toggleArrayItem(platform, connectedPlatforms, setConnectedPlatforms)
                    }
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-600/10 text-indigo-200"
                        : "border-neutral-850 bg-neutral-900 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    <span>{platform}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => saveProgress(4)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <button
                onClick={() => saveProgress(6)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: BRAND DNA */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-100">Brand DNA</h2>
              <p className="text-xs text-neutral-400">
                Teach OMNIA your voice, audience, and creative standards.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-neutral-400">
                  Brand Voice
                </label>
                <input
                  type="text"
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-neutral-400">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audienceType}
                  onChange={(e) => setAudienceType(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-neutral-400">
                  Things to Avoid
                </label>
                <input
                  type="text"
                  value={thingsToAvoid}
                  onChange={(e) => setThingsToAvoid(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => saveProgress(5)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <button
                onClick={() => saveProgress(7)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: WORKING STYLE */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-100">Working Style</h2>
              <p className="text-xs text-neutral-400">
                Configure how OMNIA communicates and coordinates with you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-sans text-xs">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-neutral-400">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-neutral-400">
                  Publishing Cadence
                </label>
                <input
                  type="text"
                  value={publishingFrequency}
                  onChange={(e) => setPublishingFrequency(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-mono text-[10px] uppercase text-neutral-400">
                Preferred Communication Tone
              </label>
              <input
                type="text"
                value={preferredTone}
                onChange={(e) => setPreferredTone(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-neutral-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => saveProgress(6)}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              <button
                onClick={() => saveProgress(8)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:from-indigo-500 hover:to-violet-500"
              >
                <span>Initialize Executive Mind</span>
                <Sparkles className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: EXECUTIVE MIND ANIMATION */}
        {step === 8 && (
          <div className="animate-fade-in space-y-6 py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-indigo-500/40 bg-indigo-600/20 text-indigo-400 shadow-xl">
              <Brain className="h-8 w-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-neutral-100">Provisioning Executive Mind</h2>
              <p className="font-mono text-xs text-indigo-400">
                {creationTasks[creationStepIndex]}
              </p>
            </div>

            <div className="border-neutral-850 mx-auto max-w-md space-y-2 rounded-2xl border bg-neutral-900 p-4 text-left font-mono text-[11px] text-neutral-400">
              {creationTasks.slice(0, creationStepIndex + 1).map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center gap-2 py-4 text-center font-mono text-[11px] text-neutral-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>OMNIA Persistent Executive Mind Substrate</span>
      </footer>
    </div>
  );
}
