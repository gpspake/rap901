import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.artist import (
    ArtistCreate,
    ArtistPublic,
    ArtistsPublic,
    ArtistUpdate,
)
from app.models.database_models import Artist
from app.models.models import Message

router = APIRouter()


@router.get("/", response_model=ArtistsPublic)
def read_artists(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve artists.
    """

    count_statement = select(func.count()).select_from(Artist)
    count = session.exec(count_statement).one()
    statement = select(Artist).offset(skip).limit(limit)
    artists = session.exec(statement).all()

    return ArtistsPublic(data=artists, count=count)


@router.get("/{id}", response_model=ArtistPublic)
def read_artist(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get artist by ID.
    """
    artist = session.get(Artist, id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist


@router.post("/", response_model=ArtistPublic)
def create_artist(
    *, session: SessionDep, current_user: CurrentUser, artist_in: ArtistCreate
) -> Any:
    """
    Create new artist.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    return crud.create_artist(session=session, artist_in=artist_in)


@router.put("/{id}", response_model=ArtistPublic)
def update_artist(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    artist_in: ArtistUpdate,
) -> Any:
    """
    Update an artist.
    """
    artist = session.get(Artist, id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = artist_in.model_dump(exclude_unset=True)
    artist.sqlmodel_update(update_dict)
    session.add(artist)
    session.commit()
    session.refresh(artist)
    return artist


@router.delete("/{id}")
def delete_artist(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an artist.
    """
    artist = session.get(Artist, id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(artist)
    session.commit()
    return Message(message="Artist deleted successfully")
