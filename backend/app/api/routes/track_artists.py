import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import TrackArtist
from app.models.models import Message
from app.models.track_artist import (
    TrackArtistCreate,
    TrackArtistPublic,
    TrackArtistsPublic,
    TrackArtistUpdate,
)

router = APIRouter()


@router.get("/", response_model=TrackArtistsPublic)
def read_track_artists(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve track_artists.
    """

    count_statement = select(func.count()).select_from(TrackArtist)
    count = session.exec(count_statement).one()
    statement = select(TrackArtist).offset(skip).limit(limit)
    track_artists = session.exec(statement).all()

    return TrackArtistsPublic(data=track_artists, count=count)


@router.get("/{id}", response_model=TrackArtistPublic)
def read_track_artist(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get track_artist by ID.
    """
    track_artist = session.get(TrackArtist, id)
    if not track_artist:
        raise HTTPException(status_code=404, detail="TrackArtist not found")
    return track_artist


@router.post("/", response_model=TrackArtistPublic)
def create_track_artist(
    *, session: SessionDep, track_artist_in: TrackArtistCreate
) -> Any:
    """
    Create new track_artist.
    """
    return crud.create_track_artist(session=session, track_artist_in=track_artist_in)


@router.put("/{id}", response_model=TrackArtistPublic)
def update_track_artist(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    track_artist_in: TrackArtistUpdate,
) -> Any:
    """
    Update an track_artist.
    """
    track_artist = session.get(TrackArtist, id)
    if not track_artist:
        raise HTTPException(status_code=404, detail="TrackArtist not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = track_artist_in.model_dump(exclude_unset=True)
    track_artist.sqlmodel_update(update_dict)
    session.add(track_artist)
    session.commit()
    session.refresh(track_artist)
    return track_artist


@router.delete("/{id}")
def delete_track_artist(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an track_artist.
    """
    track_artist = session.get(TrackArtist, id)
    if not track_artist:
        raise HTTPException(status_code=404, detail="TrackArtist not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(track_artist)
    session.commit()
    return Message(message="TrackArtist deleted successfully")
