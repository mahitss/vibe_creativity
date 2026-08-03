from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Validated runtime configuration for the API service."""

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=(".env", "../../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="OMNIA", alias="NEXT_PUBLIC_APP_NAME")
    app_url: str = Field(default="http://localhost:3000", alias="NEXT_PUBLIC_APP_URL")
    api_url: str = Field(default="http://localhost:8000", alias="NEXT_PUBLIC_API_URL")
    database_url: str = Field(default="postgresql://postgres:postgres@localhost:5432/omnia", alias="DATABASE_URL")
    redis_url: str = Field(default="redis://localhost:6379/0", alias="REDIS_URL")
    supabase_url: str = Field(default="http://localhost:54321", alias="SUPABASE_URL")
    supabase_storage_bucket: str = Field(default="omnia", alias="SUPABASE_STORAGE_BUCKET")
    minds_agent_provider: str = Field(default="local", alias="MINDS_AGENT_PROVIDER")
    minds_agent_model: str = Field(default="omnia-minds-agent", alias="MINDS_AGENT_MODEL")
    llm_default_provider: str = Field(default="openai", alias="LLM_DEFAULT_PROVIDER")
    llm_default_model: str = Field(default="gpt-5", alias="LLM_DEFAULT_MODEL")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()

