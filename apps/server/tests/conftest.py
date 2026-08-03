"""Pytest configuration and environment fixtures for OMNIA server tests."""

import os
import pytest

# Ensure dummy environment variables for testing before Settings initializes
os.environ.setdefault("DATABASE_URL", "postgresql://user:pass@localhost:5432/omnia_test")
os.environ.setdefault("REDIS_URL", "redis://localhost:6379/0")
os.environ.setdefault("SUPABASE_URL", "https://example.supabase.co")
os.environ.setdefault("SUPABASE_SERVICE_ROLE_KEY", "test-key")
os.environ.setdefault("JWT_SECRET", "test-jwt-secret-key-32-characters-min")


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"
