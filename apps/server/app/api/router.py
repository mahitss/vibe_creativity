from fastapi import APIRouter

from app.api.routes.cognition import router as cognition_router
from app.api.routes.demo import router as demo_router
from app.api.routes.health import router as health_router
from app.api.routes.ingestion import router as ingestion_router
from app.api.routes.reasoning import router as reasoning_router
from app.api.routes.reviews import router as reviews_router
from app.api.routes.search import router as search_router
from app.api.routes.timeline import router as timeline_router
from app.api.routes.youtube import router as youtube_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(timeline_router)
api_router.include_router(reviews_router)
api_router.include_router(demo_router)
api_router.include_router(reasoning_router)
api_router.include_router(ingestion_router)
api_router.include_router(cognition_router)
api_router.include_router(youtube_router)
api_router.include_router(search_router)









