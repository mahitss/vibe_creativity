from fastapi import APIRouter

from app.api.routes.authentication import router as auth_router
from app.api.routes.cognition import router as cognition_router
from app.api.routes.community import router as community_router
from app.api.routes.content import router as content_router
from app.api.routes.context import router as context_router
from app.api.routes.demo import router as demo_router
from app.api.routes.evaluation import router as evaluation_router
from app.api.routes.events import router as events_router
from app.api.routes.executive import router as executive_router
from app.api.routes.followup import router as followup_router
from app.api.routes.health import router as health_router
from app.api.routes.ingestion import router as ingestion_router
from app.api.routes.mission_control import router as mission_control_router
from app.api.routes.observability import router as observability_router
from app.api.routes.personalization import router as personalization_router
from app.api.routes.reasoning import router as reasoning_router
from app.api.routes.reflection import router as reflection_router
from app.api.routes.registry import router as registry_router
from app.api.routes.reviews import router as reviews_router
from app.api.routes.runtime import router as runtime_router
from app.api.routes.scheduler import router as scheduler_router
from app.api.routes.search import router as search_router
from app.api.routes.sponsors import router as sponsors_router
from app.api.routes.timeline import router as timeline_router
from app.api.routes.tools import router as tools_router
from app.api.routes.universe import router as universe_router
from app.api.routes.workflow_engine import router as workflow_engine_router
from app.api.routes.workflows import router as workflows_router
from app.api.routes.youtube import router as youtube_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(auth_router)
api_router.include_router(runtime_router)
api_router.include_router(events_router)
api_router.include_router(registry_router)
api_router.include_router(context_router)
api_router.include_router(tools_router)
api_router.include_router(workflow_engine_router)
api_router.include_router(scheduler_router)
api_router.include_router(reflection_router)
api_router.include_router(observability_router)
api_router.include_router(mission_control_router)
api_router.include_router(timeline_router)
api_router.include_router(reviews_router)
api_router.include_router(demo_router)
api_router.include_router(reasoning_router)
api_router.include_router(ingestion_router)
api_router.include_router(cognition_router)
api_router.include_router(youtube_router)
api_router.include_router(search_router)
api_router.include_router(followup_router)
api_router.include_router(universe_router)
api_router.include_router(personalization_router)
api_router.include_router(content_router)
api_router.include_router(sponsors_router)
api_router.include_router(community_router)
api_router.include_router(executive_router)
api_router.include_router(evaluation_router)
api_router.include_router(workflows_router)













