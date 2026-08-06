"""FastAPI route handlers for OMNIA Universal Platform Connector Framework."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.connector_framework.domain import (
    ConnectorState,
    PlatformType,
    SyncMode,
    SyncResult,
)
from app.modules.connector_framework.service import ConnectorFrameworkEngine

router = APIRouter(tags=["connectors"])

_connector_engine = ConnectorFrameworkEngine()


def get_connector_engine() -> ConnectorFrameworkEngine:
    return _connector_engine


class InstallConnectorPayload(BaseModel):
    platform: PlatformType = Field(..., description="Target platform type")
    access_token: str = Field(..., description="OAuth access token")
    refresh_token: str = Field(default="", description="OAuth refresh token")
    scopes: list[str] = Field(default_factory=list, description="Granted OAuth scopes")


class SyncConnectorPayload(BaseModel):
    connector_id: str = Field(..., description="Connector ID to sync")
    mode: SyncMode = Field(default=SyncMode.DELTA_CURSOR, description="Sync mode strategy")


def _format_connector(c: ConnectorState) -> dict[str, Any]:
    return {
        "connector_id": c.connector_id,
        "workspace_id": c.workspace_id,
        "platform": c.platform.value,
        "status": c.status.value,
        "scopes": c.scopes,
        "last_sync_checkpoint": c.last_sync_checkpoint,
        "latency_ms": c.latency_ms,
        "error_count": c.error_count,
        "created_at": c.created_at.isoformat(),
        "updated_at": c.updated_at.isoformat(),
    }


def _format_sync_result(r: SyncResult) -> dict[str, Any]:
    return {
        "sync_id": r.sync_id,
        "connector_id": r.connector_id,
        "mode": r.mode.value,
        "records_imported": r.records_imported,
        "checkpoint_cursor": r.checkpoint_cursor,
        "duration_ms": r.duration_ms,
        "status": r.status,
        "timestamp": r.timestamp.isoformat(),
    }


@router.get("/connectors")
async def list_connectors(
    context: CreatorContext = Depends(require_creator_context),
    engine: ConnectorFrameworkEngine = Depends(get_connector_engine),
) -> list[dict[str, Any]]:
    connectors = engine.list_connectors(workspace_id=context.creator_id)
    return [_format_connector(c) for c in connectors]


@router.post("/connectors/install")
async def install_connector(
    payload: InstallConnectorPayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: ConnectorFrameworkEngine = Depends(get_connector_engine),
) -> dict[str, Any]:
    state = engine.install_connector(
        workspace_id=context.creator_id,
        platform=payload.platform,
        access_token=payload.access_token,
        refresh_token=payload.refresh_token,
        scopes=payload.scopes,
    )
    return _format_connector(state)


@router.post("/connectors/sync")
async def sync_connector(
    payload: SyncConnectorPayload,
    engine: ConnectorFrameworkEngine = Depends(get_connector_engine),
) -> dict[str, Any]:
    try:
        res = engine.sync_connector(connector_id=payload.connector_id, mode=payload.mode)
        return _format_sync_result(res)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/connectors/status")
async def get_connector_status(
    context: CreatorContext = Depends(require_creator_context),
    engine: ConnectorFrameworkEngine = Depends(get_connector_engine),
) -> dict[str, Any]:
    return engine.get_status(workspace_id=context.creator_id)
