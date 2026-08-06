"""FastAPI route handlers for OMNIA Platform SDK & Admin Extension Layer."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.platform_sdk.domain import PluginState, WorkspaceBackup
from app.modules.platform_sdk.service import PlatformSdkEngine

router = APIRouter(tags=["platform_sdk"])

_platform_engine = PlatformSdkEngine()


def get_platform_engine() -> PlatformSdkEngine:
    return _platform_engine


class InstallPluginPayload(BaseModel):
    plugin_id: str = Field(..., description="Developer plugin ID")
    version: str = Field(default="1.0.0", description="Plugin version string")
    author: str = Field(..., description="Plugin author")
    description: str = Field(..., description="Plugin description")
    permissions: list[str] = Field(default_factory=list, description="Requested permissions")


class ImportWorkspacePayload(BaseModel):
    backup_id: str = Field(..., description="Backup snapshot ID to restore")


def _format_plugin(p: PluginState) -> dict[str, Any]:
    return {
        "plugin_id": p.plugin_id,
        "version": p.version,
        "author": p.author,
        "description": p.description,
        "permissions": p.permissions,
        "status": p.status,
        "installed_at": p.installed_at.isoformat(),
    }


def _format_backup(b: WorkspaceBackup) -> dict[str, Any]:
    return {
        "backup_id": b.backup_id,
        "workspace_id": b.workspace_id,
        "memory_count": b.memory_count,
        "knowledge_nodes": b.knowledge_nodes,
        "checksum": b.checksum,
        "created_at": b.created_at.isoformat(),
    }


@router.get("/admin/workspaces")
async def list_admin_workspaces(
    engine: PlatformSdkEngine = Depends(get_platform_engine),
) -> list[dict[str, Any]]:
    return engine.get_workspaces()


@router.get("/admin/runtime")
async def get_admin_runtime_health(
    engine: PlatformSdkEngine = Depends(get_platform_engine),
) -> dict[str, Any]:
    return engine.get_runtime_health()


@router.get("/plugins")
async def list_plugins(
    engine: PlatformSdkEngine = Depends(get_platform_engine),
) -> list[dict[str, Any]]:
    plugins = engine.list_plugins()
    return [_format_plugin(p) for p in plugins]


@router.post("/plugins/install")
async def install_plugin(
    payload: InstallPluginPayload,
    engine: PlatformSdkEngine = Depends(get_platform_engine),
) -> dict[str, Any]:
    p = engine.install_plugin(
        plugin_id=payload.plugin_id,
        version=payload.version,
        author=payload.author,
        description=payload.description,
        permissions=payload.permissions,
    )
    return _format_plugin(p)


@router.post("/workspace/export")
async def export_workspace(
    context: CreatorContext = Depends(require_creator_context),
    engine: PlatformSdkEngine = Depends(get_platform_engine),
) -> dict[str, Any]:
    backup = engine.backup_engine.export_workspace(workspace_id=context.creator_id)
    return _format_backup(backup)


@router.post("/workspace/import")
async def import_workspace(
    payload: ImportWorkspacePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: PlatformSdkEngine = Depends(get_platform_engine),
) -> dict[str, Any]:
    success = engine.backup_engine.import_workspace(
        backup_id=payload.backup_id,
        workspace_id=context.creator_id,
    )
    return {"status": "SUCCESS" if success else "FAILED", "workspace_id": context.creator_id}
