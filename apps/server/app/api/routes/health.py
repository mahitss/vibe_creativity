from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Service health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

