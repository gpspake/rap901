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
    ReleaseUpdate,
    ReleaseOut,
    ReleasesOut,
)
from app.models.release_artist import ReleaseArtistLink, ReleaseArtistOut
from app.models.release_label import ReleaseLabelLink, ReleaseLabelOut

router = APIRouter()


def release_artist_link_to_release_artist_out(artist_link: ReleaseArtistLink) -> ReleaseArtistOut:
    release_artist_out = ReleaseArtistOut(
        id=artist_link.id,
        release_id=artist_link.release_id,
        artist_id=artist_link.artist_id,
        role=artist_link.role,
        anv=artist_link.anv,
        join=artist_link.join,
        sort_order=artist_link.sort_order,
        name=artist_link.artist.name,
        slug=artist_link.artist.slug,
        profile=artist_link.artist.profile,
        discogs_id=artist_link.artist.discogs_id,
        discogs_resource_url=artist_link.artist.discogs_resource_url,
    )

    return release_artist_out


def release_label_link_to_release_label_out(label_link: ReleaseLabelLink) -> ReleaseLabelOut:
    entity_type_name = label_link.entity_type.name if label_link.entity_type else None

    release_label_out = ReleaseLabelOut(
        id=label_link.id,
        release_id=label_link.release_id,
        label_id=label_link.label_id,
        entity_type_id=label_link.entity_type_id,
        entity_type_name=entity_type_name,
        catalog_number=label_link.catalog_number,
        sort_order=label_link.sort_order,
        name=label_link.label.name,
        slug=label_link.label.slug,
        profile=label_link.label.profile,
        discogs_id=label_link.label.discogs_id,
        discogs_resource_url=label_link.label.discogs_resource_url,
    )

    return release_label_out


def release_public_to_release_out(release: ReleasePublic) -> ReleaseOut:
    """
    Convert a ReleasePublic object in to a ReleaseOut object to prevent need for client side transformation
    """

    artists = []
    extra_artists = []
    labels = []
    companies = []

    # sort tracks
    if hasattr(release, "tracks"):
        release.tracks.sort(key=lambda track: track.sort_order)

    # sort artist links
    if hasattr(release, "artist_links"):
        release.artist_links.sort(key=lambda artist_link: artist_link.sort_order)

        for _artist_link in release.artist_links:
            artist = release_artist_link_to_release_artist_out(_artist_link)

            if not _artist_link.role or not _artist_link.role.name:
                artists.append(artist)
            else:
                extra_artists.append(artist)

    # sort label links
    if hasattr(release, "label_links"):
        release.label_links.sort(key=lambda label_link: label_link.sort_order)

        for _label_link in release.label_links:
            label = release_label_link_to_release_label_out(_label_link)
            if label.entity_type_name == "Label":
                labels.append(label)
            else:
                companies.append(label)

    # sort releases by sort date
    return ReleaseOut(
        id=release.id,
        discogs_url=release.discogs_url,
        discogs_title=release.discogs_title,
        title=release.title,
        title_long=release.title_long,
        slug=release.slug,
        matrix=release.matrix,
        sealed=release.sealed,
        spreadsheet_id=release.spreadsheet_id,
        year=release.year,
        sort_date=release.sort_date,
        release_date=release.release_date,
        storage_location=release.storage_location,
        images=release.images,
        artists=artists,
        extra_artists=extra_artists,
        labels=labels,
        companies=companies,
        tracks=release.tracks,
    )


@router.get("/", response_model=ReleasesOut)
def read_releases(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve releases.
    """

    statement = select(Release)
    count_statement = (select(func.count()).select_from(Release))

    count = session.exec(count_statement).one()
    results = session.exec(statement.offset(skip).limit(limit).distinct().order_by(Release.sort_date.asc())).all()

    releases_out = list(map(release_public_to_release_out, results))

    return ReleasesOut(data=releases_out, count=count)


@router.get("/{slug}", response_model=ReleaseOut)
def read_release(session: SessionDep, slug: str) -> Any:
    """
    Get release by ID.
    """
    stmt = select(Release).where(Release.slug == slug)
    release = session.execute(stmt).scalar_one_or_none()

    if not release:
        raise HTTPException(status_code=404, detail="Release not found")

    release_out = release_public_to_release_out(release)

    return release_out


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
