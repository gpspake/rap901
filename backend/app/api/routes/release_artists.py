import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import ReleaseArtist
from app.models.models import Message
from app.models.release_artist import (
    ReleaseArtistCreate,
    ReleaseArtistPublic,
    ReleaseArtistsPublic,
    ReleaseArtistUpdate,
)

router = APIRouter()


@router.get("/", response_model=ReleaseArtistsPublic)
def read_release_artists(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve release_artists.
    """

    count_statement = select(func.count()).select_from(ReleaseArtist)
    count = session.exec(count_statement).one()
    statement = select(ReleaseArtist).offset(skip).limit(limit)
    release_artists = session.exec(statement).all()

    return ReleaseArtistsPublic(data=release_artists, count=count)


@router.get("/{id}", response_model=ReleaseArtistPublic)
def read_release_artist(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get release_artist by ID.
    """
    release_artist = session.get(ReleaseArtist, id)
    if not release_artist:
        raise HTTPException(status_code=404, detail="ReleaseArtist not found")
    return release_artist


@router.post("/", response_model=ReleaseArtistPublic)
def create_release_artist(
    *, session: SessionDep, release_artist_in: ReleaseArtistCreate
) -> Any:
    """
    Create new release_artist.
    """
    return crud.create_release_artist(
        session=session, release_artist_in=release_artist_in
    )


@router.put("/{id}", response_model=ReleaseArtistPublic)
def update_release_artist(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    release_artist_in: ReleaseArtistUpdate,
) -> Any:
    """
    Update an release_artist.
    """
    release_artist = session.get(ReleaseArtist, id)
    if not release_artist:
        raise HTTPException(status_code=404, detail="ReleaseArtist not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = release_artist_in.model_dump(exclude_unset=True)
    release_artist.sqlmodel_update(update_dict)
    session.add(release_artist)
    session.commit()
    session.refresh(release_artist)
    return release_artist


@router.delete("/{id}")
def delete_release_artist(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an release_artist.
    """
    release_artist = session.get(ReleaseArtist, id)
    if not release_artist:
        raise HTTPException(status_code=404, detail="ReleaseArtist not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(release_artist)
    session.commit()
    return Message(message="ReleaseArtist deleted successfully")
