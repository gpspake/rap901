from fastapi import APIRouter

from app.api.routes import (
    artists,
    images,
    items,
    labels,
    login,
    release_artists,
    release_labels,
    releases,
    storage_locations,
    users,
    utils,
)

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(releases.router, prefix="/releases", tags=["releases"])
api_router.include_router(
    storage_locations.router, prefix="/storage_locations", tags=["storage_locations"]
)
api_router.include_router(images.router, prefix="/images", tags=["images"])
api_router.include_router(artists.router, prefix="/artists", tags=["artists"])
api_router.include_router(
    release_artists.router, prefix="/release_artists", tags=["release_artists"]
)
api_router.include_router(labels.router, prefix="/labels", tags=["labels"])
api_router.include_router(
    release_labels.router, prefix="/release_labels", tags=["release_labels"]
)
