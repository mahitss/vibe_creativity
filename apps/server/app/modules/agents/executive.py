"""Executive Minds Agent domain types."""

from dataclasses import dataclass, field
from datetime import UTC, datetime

from app.modules.agents.domain import AgentFinding


@dataclass(slots=True)
class CycleOutcome:
    creator_id: str
    focus: str
    findings: list[AgentFinding] = field(default_factory=list)
    lifecycle: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(tz=UTC))
