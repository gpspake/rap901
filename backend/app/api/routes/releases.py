from datetime import datetime

import typesense
import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import asc, func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import Release, ArtistBaseWithId, Role, ReleaseImage
from app.models.models import Message
from app.models.release import (
    ReleaseCards,
    ReleaseCreate,
    ReleaseOut,
    ReleasePublic,
    ReleaseUpdate,
    ReleasesPublic, ReleaseSearchResponse, ReleaseSearchResult, Highlight, ReleaseCard,
)
from app.models.release_artist import ReleaseArtistLink, ReleaseArtistOut
from app.models.release_label import ReleaseLabelLink, ReleaseLabelOut
from app.api.typesense_client import TypesenseClient

router = APIRouter()


def release_artist_link_to_release_artist_out(
    artist_link: ReleaseArtistLink,
) -> ReleaseArtistOut:
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


def release_label_link_to_release_label_out(
    label_link: ReleaseLabelLink,
) -> ReleaseLabelOut:
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
        identifiers=release.identifiers,
    )


@router.get("/", response_model=ReleaseCards)
def read_releases(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve releases.
    """

    count = session.exec(select(func.count()).select_from(Release)).one()

    results = session.exec(
        select(Release).offset(skip).limit(limit).order_by(asc(Release.sort_date))
    ).all()

    return ReleaseCards(data=results, count=count)

@router.get("/releases-index", response_model=dict)
def releases_index(session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100) -> Any:
    """
    Index releases in Typesense.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    releases = session.exec(
        select(Release).offset(skip).limit(limit).order_by(asc(Release.sort_date))
    ).all()

    collection_schema = {
        "name": "releases",
        "enable_nested_fields": True,
        "fields": [
            {"name": "title", "type": "string"},
            {"name": "discogs_title", "type": "string"},
            {"name": "slug", "type": "string"},
            {"name": "year", "type": "string"},
            {"name": "album_artists", "type": "string"},
            {"name": "images", "type": "object[]", "fields": [
                {"name": "id", "type": "string"},
                {"name": "cloudflare_id", "type": "string"},
                {"name": "alt_text", "type": "string"},
                {"name": "display_type", "type": "string"},
                {"name": "date_taken", "type": "string"},  # Store ISO 8601 dates
                {"name": "image_type", "type": "string"}
            ]},
            {"name": "artist_links", "type": "object[]"},
        ]
    }

    try:
        collections = TypesenseClient.collections.retrieve()
        if not any(collection["name"] == "releases" for collection in collections):
            TypesenseClient.collections.create(collection_schema)

        for release in releases:
            # Generate album artists by sorting artist links and concatenating names
            sorted_artist_links = sorted(
                (link for link in release.artist_links if not link.role or not link.role.name),
                key=lambda x: x.sort_order
            )

            album_artists = ""
            for i, link in enumerate(sorted_artist_links):
                artist_name = link.anv or link.artist.name

                album_artists += artist_name
                if i < len(sorted_artist_links) - 1:
                    album_artists += f" {link.join} "

            print("AA", album_artists)

            document = {
                "id": str(release.id),  # Convert UUID to string
                "title": release.title,
                "discogs_title": release.discogs_title,
                "slug": release.slug,
                "year": str(release.year) if release.year else "",
                "album_artists": album_artists.strip(),
                "images": [
                    {
                        "id": str(img.id),  # Convert UUID to string
                        "cloudflare_id": img.cloudflare_id,
                        "alt_text": img.alt_text or "",  # Provide default
                        "display_type": img.display_type or "",  # Provide default
                        "date_taken": img.date_taken.isoformat() if img.date_taken else None,  # ISO format or None
                        "image_type": img.image_type or "",  # Provide default
                    }
                    for img in release.images
                ],
                "artist_links": [
                    {
                        "id": str(link.id),  # Convert UUID to string
                        "release_id": str(link.release_id),  # Convert UUID to string
                        "artist_id": str(link.artist_id),  # Convert UUID to string
                        "role_id": str(link.role_id) if link.role_id else None,  # Convert UUID to string if exists
                        "artist": {
                            "id": str(link.artist.id),  # Convert UUID to string
                            "name": link.artist.name,
                            "slug": link.artist.slug,
                        },
                        "role": {
                            "name": link.role.name if link.role else ""
                        },
                        "anv": link.anv,
                        "join": link.join,
                        "sort_order": link.sort_order,
                    }
                    for link in release.artist_links
                ],
            }
            TypesenseClient.collections['releases'].documents.create(document)

        return {"status": "success", "indexed_count": len(releases)}

    except typesense.exceptions.RequestMalformed as e:
        raise HTTPException(status_code=400, detail=f"Error indexing releases: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error indexing releases: {str(e)}")


@router.delete("/releases-index", response_model=dict)
def clear_releases_index(current_user: CurrentUser) -> Any:
    """
    Clear the 'releases' collection index in Typesense.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    try:
        # Attempt to delete the collection
        TypesenseClient.collections['releases'].delete()
        return {"status": "success", "message": "Releases index cleared successfully."}

    except typesense.exceptions.ObjectNotFound as e:
        # Handle case where the collection does not exist
        return {"status": "error", "message": "Releases index not found."}

    except Exception as e:
        # Catch and log any other unexpected errors
        raise HTTPException(status_code=500, detail=f"Error clearing releases index: {str(e)}")


@router.get("/releases-indexed", response_model=Any)
def get_indexed_releases(current_user: CurrentUser) -> Any:
    """
    Get all documents from the releases collection.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    try:
        documents = TypesenseClient.collections['releases'].documents.export()
        return {"documents": documents}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching indexed data: {str(e)}")



@router.get("/releases-search", response_model=ReleaseSearchResponse)
def releases_search(query: str, page: int = 1, limit: int = 10) -> Any:
    try:
        print("SKIP", page, "LIMIT", limit)

        search_results = TypesenseClient.collections["releases"].documents.search({
            "q": query,
            "query_by": "discogs_title,album_artists",
            "highlight_full_fields": "discogs_title,album_artists",
            "num_typos": 2,
            "page": page,
            "per_page": limit
        })

        # Map search results to ReleaseSearchResult
        results = []
        for result in search_results["hits"]:
            document = result["document"]

            # Map the document back to ReleaseCard
            release_card = ReleaseCard(
                id=uuid.UUID(document["id"]),
                title=document["title"],
                discogs_title=document["discogs_title"],
                slug=document["slug"],
                year=int(document["year"]) if document["year"] else None,
                images=[
                    ReleaseImage(
                        id=uuid.UUID(img["id"]),
                        cloudflare_id=img["cloudflare_id"],
                        alt_text=img.get("alt_text", ""),  # Default to empty string
                        display_type=img.get("display_type", ""),  # Default to empty string
                        date_taken=datetime.fromisoformat(img["date_taken"]) if img.get("date_taken") else None,
                        image_type=img.get("image_type", ""),  # Default to empty string
                    )
                    for img in document.get("images", [])
                ],
                artist_links=[
                    ReleaseArtistLink(
                        id=uuid.UUID(link["id"]),
                        release_id=uuid.UUID(link["release_id"]),
                        artist_id=uuid.UUID(link["artist_id"]),
                        role_id=uuid.UUID(link["role_id"]) if link.get("role_id") else None,
                        artist=ArtistBaseWithId(
                            id=uuid.UUID(link["artist"]["id"]),
                            name=link["artist"]["name"],
                            slug=link["artist"]["slug"],
                        ),
                        role=Role(name=link["role"]["name"] if link.get("role") else None),
                        anv=link.get("anv", ""),
                        join=link.get("join", ""),
                        sort_order=link.get("sort_order", 0),
                    )
                    for link in document.get("artist_links", [])
                ]
            )

            search_result = ReleaseSearchResult(
                document=release_card,
                highlight=result.get("highlight"),
                highlights=[
                    Highlight(
                        field=highlight["field"],
                        matched_tokens=highlight["matched_tokens"],
                        snippet=highlight["snippet"]
                    )
                    for highlight in result.get("highlights", [])
                ] if "highlights" in result else [],
                text_match=result.get("text_match"),
                text_match_info=result.get("text_match_info"),
            )
            results.append(search_result)

        return ReleaseSearchResponse(results=results, count=search_results["found"])

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during search: {str(e)}")

@router.get("/{slug}", response_model=ReleasePublic)
def read_release(session: SessionDep, slug: str) -> Any:
    """
    Get release by ID.
    """
    stmt = select(Release).where(Release.slug == slug)
    release = session.execute(stmt).scalar_one_or_none()

    if not release:
        raise HTTPException(status_code=404, detail="Release not found")

    return release

@router.post("/", response_model=ReleasePublic)
def create_release(*, session: SessionDep, release_in: ReleaseCreate, current_user: CurrentUser) -> Any:
    """
    Create new release.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
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
