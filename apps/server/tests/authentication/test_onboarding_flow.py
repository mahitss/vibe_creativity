"""Automated Pytest suite for OMNIA Executive Mind Onboarding Experience."""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.authentication.domain import (
    BrandDNA,
    CreatorGoals,
    CreatorProfile,
    OnboardingSubmission,
    WorkingStyle,
)
from app.modules.authentication.service import AuthWorkspaceEngine

client = TestClient(app)
TEST_CREATOR_HEADER = {"X-Creator-Id": "user-101"}


def test_onboarding_engine_submission() -> None:
    engine = AuthWorkspaceEngine()
    ws = engine.get_workspace("user-101")

    sub = OnboardingSubmission(
        profile=CreatorProfile(
            full_name="Mahit Developer",
            username="mahitss",
            bio="Building autonomous creator OS",
            country="US",
            timezone="America/New_York",
            creator_types=["Developer", "Educator"],
        ),
        goals=CreatorGoals(goals_list=["Reach 100K subscribers", "Earn sponsorships"]),
        brand_dna=BrandDNA(voice="Technical & Direct", audience_type="Software Engineers"),
        working_style=WorkingStyle(preferred_tone="Concise"),
        connected_platforms=["YouTube", "GitHub"],
    )

    updated_ws = engine.submit_onboarding("user-101", sub)
    assert updated_ws.creator_profile is not None
    assert updated_ws.creator_profile.full_name == "Mahit Developer"
    assert updated_ws.executive_mind is not None
    assert "Reach 100K subscribers" in updated_ws.executive_mind.default_goals

    status = engine.get_onboarding_status("user-101")
    assert status["completed"] is True


def test_onboarding_api_endpoints() -> None:
    status_before = client.get("/api/onboarding/status", headers=TEST_CREATOR_HEADER)
    assert status_before.status_code == 200
    assert status_before.json()["completed"] is False

    post_resp = client.post(
        "/api/onboarding",
        headers=TEST_CREATOR_HEADER,
        json={
            "full_name": "Mahit Creator",
            "username": "mahit_ai",
            "bio": "AI Systems Engineer",
            "country": "US",
            "timezone": "America/New_York",
            "creator_types": ["Developer", "Founder"],
            "goals": ["Launch a course", "Build community"],
            "connected_platforms": ["GitHub", "Discord"],
            "brand_voice": "Authoritative",
            "audience_type": "Developers",
            "preferred_tone": "Direct",
        },
    )
    assert post_resp.status_code == 200
    data = post_resp.json()
    assert data["status"] == "COMPLETED"
    assert data["workspace"]["executive_mind"] is not None

    status_after = client.get("/api/onboarding/status", headers=TEST_CREATOR_HEADER)
    assert status_after.status_code == 200
    assert status_after.json()["completed"] is True
