import copy

from sqlalchemy import func
from sqlmodel import Session, select
from starlette.testclient import TestClient

from app.core.config import settings
from app.models.database_models import (
    Artist,
    EntityType,
    Identifier,
    Label,
    Release,
    Role,
    StorageLocation,
)
from app.tests.utils.release_import import (
    build_random_discogs_artist,
    build_random_discogs_identifier,
    build_random_discogs_label,
    build_random_discogs_release,
    build_random_release_import,
)
from app.tests.utils.storage_location import build_random_storage_location_import
from scripts.seed_db import (
    clean_db,
    seed_db,
    seed_db_from_file,
    validate_import_file,
)


def test_build_random_release_import() -> None:
    release_import = build_random_release_import()

    assert release_import.discogs is not None
    assert release_import.discogs.artists is not None
    assert release_import.discogs.extraartists is not None
    assert release_import.discogs.labels is not None
    assert release_import.discogs.companies is not None
    assert release_import.discogs.identifiers is not None

    assert len(release_import.discogs.artists) >= 1
    assert len(release_import.discogs.extraartists) >= 1
    assert len(release_import.discogs.labels) >= 1
    assert len(release_import.discogs.companies) >= 1
    assert len(release_import.discogs.identifiers) >= 1


def test_seed_db_from_import(
    db: Session, client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    clean_db(db)

    artist = build_random_discogs_artist()
    extra_artist = build_random_discogs_artist(with_role=True)

    # todo: check on entity types
    label = build_random_discogs_label(is_label=True)
    extra_label = build_random_discogs_label()

    # todo: add identifiers to release output (TDD)
    identifier = build_random_discogs_identifier()

    print("exart", extra_artist)

    discogs_release_one = build_random_discogs_release(
        artists=[artist],
        extraartists=[extra_artist],
        labels=[label],
        companies=[extra_label],
        identifiers=[identifier],
    )

    # create a second release with the artist roles swapped
    release_two_artist = copy.deepcopy(extra_artist)
    release_two_artist.role = ""

    release_two_extra_artist = copy.deepcopy(artist)
    release_two_extra_artist.role = extra_artist.role

    release_two_identifier = build_random_discogs_identifier()

    discogs_release_two = build_random_discogs_release(
        artists=[release_two_artist],
        extraartists=[release_two_extra_artist],
        labels=[label],
        companies=[extra_label],
        identifiers=[release_two_identifier],
    )

    storage_location_one = build_random_storage_location_import()
    storage_location_two = build_random_storage_location_import()

    release_import_one = build_random_release_import(
        discogs_release=discogs_release_one, storage_location=storage_location_one
    )
    release_import_two = build_random_release_import(
        discogs_release=discogs_release_two, storage_location=storage_location_two
    )

    print("$$$$$$$$$$$")
    print("release_import_one", release_import_one)
    print("$$$$$$$$$$$")

    seed_db(
        session=db,
        releases_in=[release_import_one, release_import_two],
        clean=True,
    )

    # Check database
    releases = db.exec(select(Release)).all()
    print("releases", releases)
    assert len(releases) == 2
    artists = db.exec(select(Artist)).all()
    assert len(artists) == 2
    labels = db.exec(select(Label)).all()
    assert len(labels) == 2
    roles = db.exec(select(Role)).all()
    assert len(roles) == 2
    storage_locations = db.exec(select(StorageLocation)).all()
    assert len(storage_locations) == 2
    entity_types = db.exec(select(EntityType)).all()
    assert len(entity_types) == 2
    identifiers = db.exec(select(Identifier)).all()
    assert len(identifiers) > 1

    # Check api response
    response = client.get(
        f"{settings.API_V1_STR}/releases/", headers=superuser_token_headers
    )
    assert response.status_code == 200

    content = response.json()
    release_one_result = next(
        (
            release
            for release in content["data"]
            if release["matrix"] == release_import_one.matrix
        ),
        None,
    )
    release_two_result = next(
        (
            release
            for release in content["data"]
            if release["matrix"] == release_import_two.matrix
        ),
        None,
    )

    assert release_one_result is not None
    assert release_two_result is not None

    # print("&&&", release_one_result)
    # print("%%%", release_two_result)

    assert len(release_one_result["artists"]) == 1
    assert len(release_one_result["extra_artists"]) == 1
    assert len(release_one_result["labels"]) == 1
    assert len(release_one_result["companies"]) == 1

    assert len(release_two_result["artists"]) == 1
    assert len(release_two_result["extra_artists"]) == 1
    assert len(release_two_result["labels"]) == 1
    assert len(release_two_result["companies"]) == 1


def test_validate_import_file() -> None:
    results = validate_import_file()
    assert len(results) > 1


def test_seed_db_from_file(db: Session) -> None:
    count_statement = select(func.count()).select_from(Release)
    results = seed_db_from_file(clean=True)

    count = db.exec(count_statement).one()

    assert count == len(results)


def test_clean_db(db: Session) -> None:
    count_statement = select(func.count()).select_from(Release)
    seed_db_from_file(clean=True)
    count_before = db.exec(count_statement).one()
    clean_db(session=db)
    count_after = db.exec(count_statement).one()
    assert count_before > 0
    assert count_after == 0
