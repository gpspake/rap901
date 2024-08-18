import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import Release
from app.models.models import Message
from app.models.release import (
    ReleaseCreate,
    ReleasePublic,
    ReleasesPublic,
    ReleaseUpdate,
)

router = APIRouter()


@router.get("/", response_model=ReleasesPublic)
def read_releases(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve releases.
    """

    count_statement = select(func.count()).select_from(Release)
    count = session.exec(count_statement).one()
    statement = select(Release).offset(skip).limit(limit)
    releases = session.exec(statement).all()

    return ReleasesPublic(data=releases, count=count)


@router.get("/{id}", response_model=ReleasePublic)
def read_release(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get release by ID.
    """
    release = session.get(Release, id)
    if not release:
        raise HTTPException(status_code=404, detail="Release not found")
    return release


@router.post("/", response_model=ReleasePublic)
def create_release(*, session: SessionDep, release_in: ReleaseCreate) -> Any:
    """
    Create new release.
    """
    return crud.create_release(session=session, release_in=release_in)


@router.put("/{id}", response_model=ReleasePublic)
def update_release(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    release_in: ReleaseUpdate,
) -> Any:
    """
    Update a release.
    """
    release = session.get(Release, id)
    if not release:
        raise HTTPException(status_code=404, detail="Release not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = release_in.model_dump(exclude_unset=True)
    release.sqlmodel_update(update_dict)
    session.add(release)
    session.commit()
    session.refresh(release)
    return release


@router.delete("/{id}")
def delete_release(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an release.
    """
    release = session.get(Release, id)
    if not release:
        raise HTTPException(status_code=404, detail="Release not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(release)
    session.commit()
    return Message(message="Release deleted successfully")
