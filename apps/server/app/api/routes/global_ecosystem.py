"""FastAPI route handlers for OMNIA Global Intelligence Ecosystem Platform."""

from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.core.security import CreatorContext, require_creator_context
from app.modules.global_ecosystem.domain import (
    EcosystemMessage,
    PlatformMigrationResult,
    PortableMemoryPackage,
    ProtocolType,
)
from app.modules.global_ecosystem.service import GlobalEcosystemEngine

router = APIRouter(prefix="/global-ecosystem", tags=["global_ecosystem"])

_global_ecosystem_engine = GlobalEcosystemEngine()


def get_global_ecosystem_engine() -> GlobalEcosystemEngine:
    return _global_ecosystem_engine


class DispatchMessagePayload(BaseModel):
    protocol_type: ProtocolType = Field(..., description="Target protocol type")
    sender_runtime: str = Field(..., description="Sender runtime node URI")
    receiver_runtime: str = Field(..., description="Receiver runtime node URI")
    payload: dict[str, Any] = Field(default_factory=dict, description="Protocol payload")


class ImportPackagePayload(BaseModel):
    package_id: str = Field(..., description="Portable memory package ID")
    source_platform: str = Field(..., description="Source platform name e.g. Open AI OS")


def _format_message(m: EcosystemMessage) -> dict[str, Any]:
    return {
        "msg_id": m.msg_id,
        "protocol_type": m.protocol_type.value,
        "sender_runtime": m.sender_runtime,
        "receiver_runtime": m.receiver_runtime,
        "payload": m.payload,
        "signature": m.signature,
        "timestamp": m.timestamp.isoformat(),
    }


def _format_package(p: PortableMemoryPackage) -> dict[str, Any]:
    return {
        "package_id": p.package_id,
        "creator_id": p.creator_id,
        "memory_count": p.memory_count,
        "schema_version": p.schema_version,
        "checksum": p.checksum,
        "exported_at": p.exported_at.isoformat(),
    }


def _format_migration(mig: PlatformMigrationResult) -> dict[str, Any]:
    return {
        "migration_id": mig.migration_id,
        "creator_id": mig.creator_id,
        "source_platform": mig.source_platform,
        "target_platform": mig.target_platform,
        "transferred_memories": mig.transferred_memories,
        "transferred_workflows": mig.transferred_workflows,
        "status": mig.status.value,
    }


@router.post("/protocol/dispatch")
async def dispatch_protocol_message(
    payload: DispatchMessagePayload,
    engine: GlobalEcosystemEngine = Depends(get_global_ecosystem_engine),
) -> dict[str, Any]:
    msg = engine.dispatch_message(
        protocol_type=payload.protocol_type,
        sender_runtime=payload.sender_runtime,
        receiver_runtime=payload.receiver_runtime,
        payload=payload.payload,
    )
    return _format_message(msg)


@router.post("/migrate/export")
async def export_portable_memories(
    context: CreatorContext = Depends(require_creator_context),
    engine: GlobalEcosystemEngine = Depends(get_global_ecosystem_engine),
) -> dict[str, Any]:
    pkg = engine.export_memories(creator_id=context.creator_id)
    return _format_package(pkg)


@router.post("/migrate/import")
async def import_portable_memories(
    payload: ImportPackagePayload,
    context: CreatorContext = Depends(require_creator_context),
    engine: GlobalEcosystemEngine = Depends(get_global_ecosystem_engine),
) -> dict[str, Any]:
    res = engine.import_memories(
        package_id=payload.package_id,
        creator_id=context.creator_id,
        source_platform=payload.source_platform,
    )
    return _format_migration(res)


@router.get("/nodes")
async def list_ecosystem_nodes(
    engine: GlobalEcosystemEngine = Depends(get_global_ecosystem_engine),
) -> list[dict[str, Any]]:
    return engine.list_nodes()
