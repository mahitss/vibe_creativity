"""Demo Story Service for OMNIA Platform (Deterministic Presenter Mode)."""

from typing import Any

from app.modules.demo.domain import DemoScene, DemoStorySession, TargetView


class DemoStoryService:
    """Manages deterministic demo dataset, 7 demo scenes, presenter mode, and scene navigation."""

    def __init__(self) -> None:
        self._session = DemoStorySession()
        self._build_scenes()

    def _build_scenes(self) -> None:
        scenes = [
            DemoScene(
                scene_number=1,
                title="Scene 1: Welcome Back",
                subtitle="Autonomous Work Completed ('While You Were Away')",
                duration_seconds=15,
                target_view=TargetView.MISSION_CONTROL,
                talking_points=[
                    "Notice OMNIA doesn't wait for user prompts — it operates continuously in the background.",
                    "While the creator was away, 9 specialized agents executed 28 tasks automatically.",
                    "Community Agent triaged 420 comments; Sponsor Agent drafted CloudCorp renewal terms.",
                ],
                memory_references=[
                    "Episode Memory: 420 Discord comments triaged",
                    "Relationship Memory: CloudCorp $12k renewal draft prepared",
                ],
            ),
            DemoScene(
                scene_number=2,
                title="Scene 2: Today's Priority Mission",
                subtitle="Autonomous Reasoning & Grounded First Step",
                duration_seconds=20,
                target_view=TargetView.MISSION_CONTROL,
                talking_points=[
                    "Executive Minds Agent prioritized the Docker Multi-Agent Deep Dive video.",
                    "Rationale is grounded in 14 audience comments and 90-day retention data.",
                    "OMNIA provides a concrete first step: Review Content Agent's 3-minute script hook.",
                ],
                memory_references=[
                    "Community Memory: 14 audience requests for Docker orchestration",
                    "Performance Memory: Deep dive videos yield +18% retention window",
                ],
            ),
            DemoScene(
                scene_number=3,
                title="Scene 3: Living Memory Timeline",
                subtitle="Cause-and-Effect Journey Replay",
                duration_seconds=20,
                target_view=TargetView.TIMELINE,
                talking_points=[
                    "This is OMNIA's signature feature: The Living Memory Timeline.",
                    "Every event connects to past decisions: Audience Request → Script → Published Video → Sponsor Deal → Masterclass Course.",
                    "Memory evolves cleanly (Idea → Draft → Published → Repurposed) without duplication.",
                ],
                memory_references=[
                    "Event #101: Discord request (Jul 15)",
                    "Event #102: Script draft (Jul 20)",
                    "Event #103: CloudCorp video release (Jul 25)",
                    "Event #104: VIP course conversion ($25k goal hit, Aug 01)",
                ],
            ),
            DemoScene(
                scene_number=4,
                title="Scene 4: Executive Review (COO Engine)",
                subtitle="Strategic Recommendations Grounded in Memory",
                duration_seconds=20,
                target_view=TargetView.REVIEWS,
                talking_points=[
                    "OMNIA behaves like a Chief Operating Officer (COO), never simply summarizing data.",
                    "Recommendation 1: Increase React/Docker content frequency to 2x per week (96% confidence).",
                    "Recommendation 2: Initiate Q4 title sponsorship renewal with CloudCorp (92% confidence).",
                ],
                memory_references=[
                    "Analytics Memory: Technical deep dives yield 2.4x higher watch time",
                    "Business Memory: Q4 renewal converts at 85% rate 30 days prior",
                ],
            ),
            DemoScene(
                scene_number=5,
                title="Scene 5: Autonomous Follow-Up Triggers",
                subtitle="Multi-Agent Follow-Up & Proactive Reminders",
                duration_seconds=15,
                target_view=TargetView.MISSION_CONTROL,
                talking_points=[
                    "Sponsor Reminder: CloudCorp agreement expiration is 14 days away.",
                    "Audience Promise: Docker code repository release promised to Discord VIPs.",
                    "Content Recommendation: Repurpose Docker tutorial into weekly newsletter.",
                ],
                memory_references=[
                    "Sponsor Contract Memory: Expiration Aug 15, 2026",
                    "Community Promise Memory: GitHub code link promised in Discord",
                ],
            ),
            DemoScene(
                scene_number=6,
                title="Scene 6: Interactive Memory Graph",
                subtitle="Connected Entity Topology (Content, Sponsor, Goal, Mission)",
                duration_seconds=15,
                target_view=TargetView.GRAPH,
                talking_points=[
                    "Every entity exists as a node in OMNIA's connected memory graph.",
                    "Relationships (INSPIRED, CREATED, SPONSORED_BY, REPURPOSED) show true cause-and-effect.",
                    "Presenters can zoom, drag nodes, and highlight story paths.",
                ],
                memory_references=[
                    "Node: Docker Multi-Agent System (VIDEO)",
                    "Node: CloudCorp Enterprise (SPONSOR)",
                    "Node: Q3 Revenue $25k (GOAL)",
                ],
            ),
            DemoScene(
                scene_number=7,
                title="Scene 7: Final Executive Summary",
                subtitle="OMNIA remembers. OMNIA plans. OMNIA acts.",
                duration_seconds=15,
                target_view=TargetView.SUMMARY,
                talking_points=[
                    "OMNIA remembers: 18 months of creator history, audience signals, and sponsor deals.",
                    "OMNIA plans: Executive COO strategy and daily priority missions.",
                    "OMNIA acts: 9 specialized agents collaborating on tasks 24/7.",
                    "Next 30-Day Strategy: Scale Masterclass course to 1,000 VIP students & close Q4 CloudCorp tier.",
                ],
                memory_references=[
                    "Executive Summary: 30-Day Roadmap synthesized",
                    "Final Statement: OMNIA is the persistent autonomous operating system for creators.",
                ],
            ),
        ]
        self._session.scenes = scenes

    def get_session(self) -> dict[str, Any]:
        return self._session.to_dict()

    def set_scene(self, scene_index: int) -> dict[str, Any]:
        if 0 <= scene_index < len(self._session.scenes):
            self._session.current_scene_index = scene_index
        return self._session.to_dict()

    def toggle_play(self) -> dict[str, Any]:
        self._session.is_playing = not self._session.is_playing
        return self._session.to_dict()

    def toggle_presenter_mode(self) -> dict[str, Any]:
        self._session.presenter_mode_active = not self._session.presenter_mode_active
        return self._session.to_dict()

    def reset_session(self) -> dict[str, Any]:
        self._session.current_scene_index = 0
        self._session.is_playing = False
        return self._session.to_dict()

    def get_scenes(self) -> list[dict[str, Any]]:
        return [s.to_dict() for s in self._session.scenes]

    def get_story(self) -> dict[str, Any]:
        return {
            "creator_profile": {
                "name": "Mahit",
                "handle": "@mahit_ai",
                "tenure_months": 18,
                "history_highlights": [
                    "18 months of continuous creator history",
                    "Multiple YouTube tech series (React, Docker, Agentic Systems)",
                    "CloudCorp enterprise sponsorship partnership",
                    "Community Guild with 4,200 active Discord developers",
                    "Q3 Revenue milestone hit ($25,000)",
                ],
            },
            "scenes": self.get_scenes(),
        }
