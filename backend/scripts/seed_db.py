import json
import os
import uuid
from typing import Literal

from psycopg import errors
from sqlalchemy import MetaData, Table, delete
from sqlmodel import Session, select

from app.api.routes.utils import get_role_by_name
from app.backend_pre_start import logger
from app.core.db import engine
from app import crud
from app.models.artist import ArtistCreate
from app.models.database_models import Release, Artist, Role, Label, EntityType
from app.models.entity_type import EntityTypeCreate
from app.models.identifier import IdentifierCreate
from app.models.image import ImageCreate
from app.models.import_models import ReleaseImport, DiscogsArtist, DiscogsLabel, DiscogsIdentifier, DiscogsTrack, \
    ImageImport
from app.models.label import LabelCreate
from app.models.release import ReleaseCreate
from app.models.release_artist import ReleaseArtistCreate
from app.models.release_label import ReleaseLabelCreate
from app.models.storage_location import StorageLocationCreate
from app.models.track import TrackCreate
from app.models.track_artist import TrackArtistCreate
import re
import unicodedata


def string_to_slug(text):
    # Normalize the string (handle accented characters)
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')

    # Convert to lowercase
    text = text.lower()

    # Replace any non-alphanumeric characters with hyphens
    text = re.sub(r'[^a-z0-9]+', '-', text)

    # Remove leading and trailing hyphens
    text = text.strip('-')

    return text


def unique_slug(session: Session, slug: str, i: int = 0) -> str:
    suffixed_slug = slug + f"-{i}" if i > 0 else slug
    existing_slug = session.exec(select(Release).where(Release.slug == suffixed_slug)).first()
    if existing_slug:
        return unique_slug(session=session, slug=slug, i=i + 1)
    return suffixed_slug


def clean_db(session: Session):
    # Clean DB
    metadata = MetaData()
    metadata.reflect(bind=engine)

    session.execute(delete(Table("identifier", metadata, autoload_with=engine)))
    session.execute(delete(Table("image", metadata, autoload_with=engine)))
    session.execute(delete(Table("track_artist", metadata, autoload_with=engine)))
    session.execute(delete(Table("track", metadata, autoload_with=engine)))
    session.execute(delete(Table("release_label", metadata, autoload_with=engine)))
    session.execute(delete(Table("label", metadata, autoload_with=engine)))
    session.execute(delete(Table("release_artist", metadata, autoload_with=engine)))
    session.execute(delete(Table("artist", metadata, autoload_with=engine)))
    session.execute(delete(Table("release_label", metadata, autoload_with=engine)))
    session.execute(delete(Table("role", metadata, autoload_with=engine)))
    session.execute(delete(Table("release", metadata, autoload_with=engine)))
    session.execute(delete(Table("storage_location", metadata, autoload_with=engine)))
    session.execute(delete(Table("entity_type", metadata, autoload_with=engine)))


def validate_import_file() -> list[ReleaseImport]:
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct a path relative to the script directory
    file_path = os.path.join(script_dir, "data.json")

    try:
        with open(file_path) as file:
            releases_in = json.load(file)
        releases = []
        for release_in in releases_in:
            releases.append(ReleaseImport.model_validate(release_in))
        return releases
    except Exception as e:
        logger.error(e)
        raise e


def get_entity_type_by_name(entity_type_name: str, create_if_missing: bool = False,
                            session: Session | None = None) -> EntityType | None:
    existing_entity_type = session.exec(
        select(EntityType).where(EntityType.name == entity_type_name)
    ).first()

    if not existing_entity_type and create_if_missing and session is not None:
        return crud.create_entity_type(
            session=session,
            entity_type_in=EntityTypeCreate(name=entity_type_name)
        )
    else:
        return existing_entity_type


def clean_discogs_name(s):
    # Use regex to remove space followed by parentheses and digits inside
    return re.sub(r'\s*\(\d+\)', '', s)


def load_artists(
        session: Session,
        parent_id: uuid.uuid4(),
        artists: list[DiscogsArtist],
        relationship: Literal["release_artist", "track_artist"]
) -> None:
    for index, discogs_artist in enumerate(artists):
        name = clean_discogs_name(discogs_artist.name)

        slug = string_to_slug(name)

        existing_artist = session.exec(
            select(Artist).where(Artist.slug == slug)
        ).first()

        if existing_artist:
            artist = existing_artist
        else:
            artist = crud.create_artist(
                session=session,
                artist_in=ArtistCreate(
                    name=name,
                    slug=slug,
                    profile="",
                    discogs_id=discogs_artist.id,
                    discogs_resource_url=discogs_artist.resource_url,
                )
            )

        import_role = getattr(discogs_artist, "role")
        role_name = import_role if import_role else ""

        role = get_role_by_name(role_name=role_name, create_if_missing=True, session=session)

        if relationship == "release_artist":
            crud.create_release_artist(
                session=session,
                release_artist_in=ReleaseArtistCreate(
                    release_id=parent_id,
                    artist_id=artist.id,
                    role_id=role.id,
                    anv=getattr(discogs_artist, "anv"),
                    join=getattr(discogs_artist, "join"),
                    sort_order=index,
                )
            )

        if relationship == "track_artist":
            crud.create_track_artist(
                session=session,
                track_artist_in=TrackArtistCreate(
                    track_id=parent_id,
                    artist_id=artist.id,
                    role_id=role.id,
                    anv=getattr(discogs_artist, "anv"),
                    join=getattr(discogs_artist, "join"),
                    sort_order=index,
                )
            )

        print("created artist {}".format(artist))


def load_release_labels(session: Session, release_id: uuid.uuid4(), labels: list[DiscogsLabel]) -> None:
    for index, discogs_label in enumerate(labels):
        
        label_name = clean_discogs_name(discogs_label.name)
        slug = string_to_slug(text=label_name)
        
        existing_label = session.exec(
            select(Label).where(Label.slug == slug)
        ).first()

        if existing_label:
            label = existing_label
        else:
            label = crud.create_label(
                session=session,
                label_in=LabelCreate(
                    name=label_name,
                    slug=slug,
                    profile="",
                    discogs_id=discogs_label.id,
                    discogs_resource_url=discogs_label.resource_url,
                )
            )

        import_entity_type = getattr(discogs_label, "entity_type_name")

        entity_type = get_entity_type_by_name(
            entity_type_name=import_entity_type,
            create_if_missing=True,
            session=session)

        crud.create_release_label(
            session=session,
            release_label_in=ReleaseLabelCreate(
                release_id=release_id,
                label_id=label.id,
                sort_order=index,
                entity_type_id=entity_type.id,
                catalog_number=getattr(discogs_label, "catno"),
            )
        )


def load_release_tracks(session: Session, release_id: uuid.uuid4(), tracks: list[DiscogsTrack]) -> None:
    for index, discogs_track in enumerate(tracks):
        track = crud.create_track(
            session=session,
            track_in=TrackCreate(
                position=discogs_track.position,
                sort_order=index,
                type=discogs_track.type_,
                title=discogs_track.title,
                duration=discogs_track.duration,
                release_id=release_id,
            )
        )

        artists = []
        extraartists = []
        if discogs_track.artists:
            artists = discogs_track.artists
        if discogs_track.extraartists:
            extraartists = discogs_track.extraartists

        load_artists(
            session=session,
            parent_id=track.id,
            artists=(artists or []) + (extraartists or []),
            relationship="track_artist"
        )

        print("created track {}".format(track))


def load_release_identifiers(session: Session, release_id: uuid.uuid4(), identifiers: list[DiscogsIdentifier]) -> None:
    for index, discogs_identifier in enumerate(identifiers):
        identifier = crud.create_identifier(
            session=session,
            identifier_in=IdentifierCreate(
                type=discogs_identifier.type,
                description=discogs_identifier.description,
                value=discogs_identifier.value,
                release_id=release_id,
                sort_order=index,
            )
        )

        print("created identifier {}".format(identifier))


def load_images(session: Session, release_id: uuid.uuid4(), images: list[ImageImport]) -> None:
    for image in images:
        db_image = crud.create_image(
            session=session,
            image_in=ImageCreate(
                date_taken=image.date_taken,
                display_type=image.display_type,
                image_type=image.image_type,
                original_path=image.original_path,
                new_path=image.new_path,
                alt_text=image.alt_text,
                cloudflare_id=image.cloudflare_id,
                release_id=release_id,
            )
        )
        print("created image {}".format(db_image))


def load_release(session: Session, release: ReleaseImport) -> Release:
    release = ReleaseImport.model_validate(release)

    discogs_title = release.discogs.title if release.discogs else None

    storage_location_id = None

    slug = unique_slug(session=session, slug=string_to_slug(discogs_title))

    # StorageLocation
    if hasattr(release, 'location') and getattr(release, 'location'):
        storage_location = crud.create_storage_location(
            session=session,
            storage_location_in=StorageLocationCreate(
                container=release.location.container,
                row=release.location.row,
                position=release.location.position,
                spreadsheet_id=release.spreadsheet_id,
            )
        )
        storage_location_id = storage_location.id

    release_date = release.release if release.release else None

    print("xxx", release.sortDate, discogs_title)

    # Release
    release_in = ReleaseCreate(
        discogs_url=release.discogsUrl,
        discogs_title=discogs_title,
        title=discogs_title,
        slug=slug,
        title_long=release.album_title_long,
        matrix=release.matrix,
        sealed=release.sealed,
        spreadsheet_id=release.spreadsheet_id,
        year=release.year,
        sort_date=release.sortDate,
        release_date=release_date,
        storage_location_id=storage_location_id,
    )

    print("(((", release_in, release_in.sort_date)
    release_out = crud.create_release(session=session, release_in=release_in)

    return release_out


def seed_db(session: Session, releases_in: list[ReleaseImport], clean: bool = False) -> list[Release]:
    if clean:
        clean_db(session)

    releases = []
    for _release in releases_in:
        release_import = ReleaseImport.model_validate(_release)

        db_release = load_release(session=session, release=_release)

        load_artists(session=session,
                     artists=(release_import.discogs.artists or []) + (release_import.discogs.extraartists or []),
                     parent_id=db_release.id,
                     relationship="release_artist")

        load_release_labels(session=session,
                            labels=(release_import.discogs.labels or []) + (release_import.discogs.companies or []),
                            release_id=db_release.id)

        load_release_identifiers(session=session,
                                 identifiers=(release_import.discogs.identifiers or []),
                                 release_id=db_release.id)

        load_release_tracks(session=session,
                            tracks=release_import.discogs.tracklist,
                            release_id=db_release.id)

        load_images(session=session,
                    images=release_import.images,
                    release_id=db_release.id)

        releases.append(db_release)

    return releases


def seed_db_from_file(clean: bool = False) -> list[Release]:
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct a path relative to the script directory
    file_path = os.path.join(script_dir, "data.json")

    try:
        with open(file_path) as file:
            releases = json.load(file)

        with Session(engine) as session:
            # Try to create session to check if DB is awake
            session.exec(select(1))
            return seed_db(session=session, releases_in=releases, clean=clean)
    except Exception as e:
        logger.error(e)
        raise e


if __name__ == "__main__":
    seed_db_from_file(clean=True)
