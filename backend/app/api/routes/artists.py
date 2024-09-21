import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.api.routes.releases import release_public_to_release_out
from app.models.artist import (
    ArtistCreate,
    ArtistOut,
    ArtistPublic,
    ArtistsPublic,
    ArtistUpdate,
)
from app.models.database_models import Artist
from app.models.models import Message
from app.models.release import ReleaseOut, ReleasePublic

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


@router.get("/{slug}", response_model=ArtistOut)
def read_artist(session: SessionDep, slug: str) -> Any:
    """
    Get artist by slug.
    """

    stmt = select(Artist).where(Artist.slug == slug)
    artist = session.execute(stmt).scalar_one_or_none()

    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    unique_release_ids: set[uuid.UUID] = set()
    unique_credit_ids: set[uuid.UUID] = set()

    # right now, I push artist.release_links objects to these
    releases: list[ReleaseOut] = []
    credits: list[ReleaseOut] = []

    # separate album artists from credits
    for release_link in artist.release_links:
        # get release out from release link
        release = release_public_to_release_out(
            ReleasePublic.model_validate(release_link.release)
        )

        # these release link objects are
        if release_link.role.name == "":
            # add release id to a set
            unique_release_ids.add(release.id)

            # add release to releases list
            releases.append(release)

            # if release is in credits, remove it from credits
            if release.id in unique_credit_ids:
                credits = [
                    _release
                    for _release in credits
                    if _release.id != release_link.release_id
                ]
        else:
            # add release to credits if it's not already in releases or credits
            if release_link.release_id not in unique_release_ids.union(
                unique_credit_ids
            ):
                credits.append(release)
                # add to credit release id to a set
                unique_credit_ids.add(release.id)

    return ArtistOut(
        id=artist.id,
        name=artist.name,
        slug=artist.slug,
        profile=artist.profile,
        discogs_id=artist.discogs_id,
        discogs_resource_url=artist.discogs_resource_url,
        releases=releases,
        credits=credits,
    )


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
