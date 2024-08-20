import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import Track
from app.models.models import Message
from app.models.track import TrackCreate, TrackPublic, TracksPublic, TrackUpdate

router = APIRouter()


@router.get("/", response_model=TracksPublic)
def read_tracks(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve tracks.
    """

    count_statement = select(func.count()).select_from(Track)
    count = session.exec(count_statement).one()
    statement = select(Track).offset(skip).limit(limit)
    tracks = session.exec(statement).all()

    return TracksPublic(data=tracks, count=count)


@router.get("/{id}", response_model=TrackPublic)
def read_track(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get track by ID.
    """
    track = session.get(Track, id)
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    return track


@router.post("/", response_model=TrackPublic)
def create_track(*, session: SessionDep, track_in: TrackCreate) -> Any:
    """
    Create new track.
    """
    return crud.create_track(session=session, track_in=track_in)


@router.put("/{id}", response_model=TrackPublic)
def update_track(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    track_in: TrackUpdate,
) -> Any:
    """
    Update a track.
    """
    track = session.get(Track, id)
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = track_in.model_dump(exclude_unset=True)
    track.sqlmodel_update(update_dict)
    session.add(track)
    session.commit()
    session.refresh(track)
    return track


@router.delete("/{id}")
def delete_track(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete a track.
    """
    track = session.get(Track, id)
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(track)
    session.commit()
    return Message(message="Track deleted successfully")
