"""Domain models for OMNIA Demo Mode & Presenter Mode."""

from dataclasses import dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


class TargetView(StrEnum):
    MISSION_CONTROL = "MISSION_CONTROL"
    TIMELINE = "TIMELINE"
    REVIEWS = "REVIEWS"
    GRAPH = "GRAPH"
    SUMMARY = "SUMMARY"


@dataclass(slots=True)
class DemoScene:
    """A single guided scene in OMNIA's 2-minute product demonstration."""

    scene_number: int
    title: str
    subtitle: str
    duration_seconds: int
    target_view: TargetView
    talking_points: list[str] = field(default_factory=list)
    memory_references: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "scene_number": self.scene_number,
            "title": self.title,
            "subtitle": self.subtitle,
            "duration_seconds": self.duration_seconds,
            "target_view": self.target_view.value,
            "talking_points": self.talking_points,
            "memory_references": self.memory_references,
        }


@dataclass(slots=True)
class DemoStorySession:
    """Deterministic demo session state containing creator profile and 7 demo scenes."""

    creator_name: str = "Mahit"
    creator_handle: str = "@mahit_ai"
    tenure_months: int = 18
    current_scene_index: int = 0
    is_playing: bool = False
    presenter_mode_active: bool = False
    scenes: list[DemoScene] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        current_scene = (
            self.scenes[self.current_scene_index].to_dict()
            if 0 <= self.current_scene_index < len(self.scenes)
            else None
        )
        return {
            "creator_name": self.creator_name,
            "creator_handle": self.creator_handle,
            "tenure_months": self.tenure_months,
            "current_scene_index": self.current_scene_index,
            "current_scene": current_scene,
            "total_scenes": len(self.scenes),
            "is_playing": self.is_playing,
            "presenter_mode_active": self.presenter_mode_active,
            "scenes": [s.to_dict() for s in self.scenes],
        }
