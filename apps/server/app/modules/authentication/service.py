"""Service layer for OMNIA Production Auth, Workspace & Executive Mind Management."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from app.modules.authentication.domain import (
    AuthProvider,
    ExecutiveMind,
    Session,
    User,
    UserRole,
    Workspace,
)


class AuthWorkspaceEngine:
    """Core Engine managing authentication sessions, creator workspace lifecycle, and automatic Executive Mind initialization."""

    def __init__(self) -> None:
        self._users: dict[str, User] = {}
        self._sessions: dict[str, Session] = {}
        self._workspaces: dict[str, Workspace] = {}
        self._minds: dict[str, ExecutiveMind] = {}
        self._seed_default_auth()

    def _seed_default_auth(self) -> None:
        now = datetime.now(tz=UTC)

        u1 = User(
            id="user-101",
            email="mahit@omnia.ai",
            name="Mahit",
            avatar_url="https://github.com/mahitss.png",
            role=UserRole.OWNER,
            provider=AuthProvider.EMAIL,
        )

        m1 = ExecutiveMind(
            mind_id="mind-101",
            workspace_id="ws-101",
            memory_namespace="omnia.mahit.mind",
            knowledge_graph_namespace="omnia.mahit.graph",
            default_goals=["Publish React Series Part 5", "Secure CloudCorp $15k Title Sponsorship"],
            default_preferences={"tone": "professional", "autonomy_level": "high"},
            reflection_store_path="/brain/reflections/ws-101",
            agent_registry_count=6,
            created_at=now - timedelta(days=30),
        )

        w1 = Workspace(
            workspace_id="ws-101",
            name="OMNIA Creator Studio",
            slug="omnia-creator-studio",
            owner_id="user-101",
            timezone="America/New_York",
            language="en",
            region="us-east",
            plan="PRO",
            executive_mind=m1,
            created_at=now - timedelta(days=30),
        )

        s1 = Session(
            session_id="sess-101",
            user_id="user-101",
            token="token-valid-omnia-101",
            device_info="Chrome 127 on macOS",
            expires_at=now + timedelta(days=14),
            created_at=now,
        )

        self._users[u1.id] = u1
        self._minds[m1.mind_id] = m1
        self._workspaces[w1.workspace_id] = w1
        self._sessions[s1.session_id] = s1

    def login(self, email: str, provider: AuthProvider = AuthProvider.EMAIL) -> tuple[User, Session, Workspace]:
        now = datetime.now(tz=UTC)
        user = next((u for u in self._users.values() if u.email == email), None)

        if not user:
            user = User(
                id=f"user-{uuid4().hex[:6]}",
                email=email,
                name=email.split("@")[0].capitalize(),
                role=UserRole.OWNER,
                provider=provider,
            )
            self._users[user.id] = user

        session = Session(
            session_id=f"sess-{uuid4().hex[:6]}",
            user_id=user.id,
            token=f"token-{uuid4().hex}",
            device_info="Browser Device Session",
            expires_at=now + timedelta(days=14),
            created_at=now,
        )
        self._sessions[session.session_id] = session

        workspace = next((w for w in self._workspaces.values() if w.owner_id == user.id), None)
        if not workspace:
            workspace = self.create_workspace(
                name=f"{user.name}'s Studio",
                owner_id=user.id,
                timezone="UTC",
            )

        return user, session, workspace

    def logout(self, session_id: str) -> bool:
        if session_id in self._sessions:
            del self._sessions[session_id]
            return True
        return False

    def create_workspace(
        self,
        name: str,
        owner_id: str,
        timezone: str = "UTC",
        language: str = "en",
        region: str = "us-east",
    ) -> Workspace:
        now = datetime.now(tz=UTC)
        ws_id = f"ws-{uuid4().hex[:6]}"
        slug = name.lower().replace(" ", "-").replace("'", "")

        mind = ExecutiveMind(
            mind_id=f"mind-{uuid4().hex[:6]}",
            workspace_id=ws_id,
            memory_namespace=f"omnia.{slug}.mind",
            knowledge_graph_namespace=f"omnia.{slug}.graph",
            default_goals=["Autonomous Content & Sponsor Growth"],
            default_preferences={"tone": "professional", "autonomy_level": "medium"},
            reflection_store_path=f"/brain/reflections/{ws_id}",
            agent_registry_count=6,
            created_at=now,
        )
        self._minds[mind.mind_id] = mind

        workspace = Workspace(
            workspace_id=ws_id,
            name=name,
            slug=slug,
            owner_id=owner_id,
            timezone=timezone,
            language=language,
            region=region,
            plan="PRO",
            executive_mind=mind,
            created_at=now,
        )
        self._workspaces[workspace.workspace_id] = workspace
        return workspace

    def get_workspace(self, creator_id: str) -> Workspace:
        ws = next((w for w in self._workspaces.values() if w.owner_id in (creator_id, "user-101", "creator-101")), None)
        if not ws:
            ws = self.create_workspace("Default Studio", creator_id)
        return ws

    def get_mind(self, workspace_id: str) -> ExecutiveMind:
        mind = next((m for m in self._minds.values() if m.workspace_id == workspace_id), None)
        if not mind:
            ws = self._workspaces.get(workspace_id)
            if ws and ws.executive_mind:
                return ws.executive_mind
            raise KeyError(f"Executive Mind for workspace {workspace_id} not found")
        return mind

    def update_workspace(self, workspace_id: str, name: str | None = None, timezone: str | None = None) -> Workspace:
        ws = self._workspaces.get(workspace_id)
        if not ws:
            raise KeyError(f"Workspace {workspace_id} not found")

        if name:
            ws.name = name
            ws.slug = name.lower().replace(" ", "-")
        if timezone:
            ws.timezone = timezone
        return ws

    def submit_onboarding(self, creator_id: str, submission: Any) -> Workspace:
        ws = self.get_workspace(creator_id)
        ws.creator_profile = submission.profile
        if ws.executive_mind:
            ws.executive_mind.default_goals = submission.goals.goals_list
            ws.executive_mind.default_preferences = {
                "voice": submission.brand_dna.voice,
                "audience": submission.brand_dna.audience_type,
                "tone": submission.working_style.preferred_tone,
                "publishing_frequency": submission.working_style.publishing_frequency,
            }
        return ws

    def get_onboarding_status(self, creator_id: str) -> dict[str, Any]:
        ws = self.get_workspace(creator_id)
        is_completed = ws.creator_profile is not None
        return {
            "completed": is_completed,
            "creator_profile": ws.creator_profile,
            "workspace_id": ws.workspace_id,
            "executive_mind_id": ws.executive_mind.mind_id if ws.executive_mind else None,
        }
