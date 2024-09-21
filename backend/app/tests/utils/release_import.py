import random

from faker import Faker

from app.models.import_models import (
    DiscogsArtist,
    DiscogsIdentifier,
    DiscogsLabel,
    DiscogsRelease,
    ReleaseImport,
    StorageLocationImport,
)
from app.tests.utils.storage_location import build_random_storage_location_import

fake = Faker()


def build_random_discogs_artist(with_role: bool = False) -> DiscogsArtist:
    return DiscogsArtist(
        name=fake.name(),
        anv=fake.word(),
        join=fake.word(),
        role=fake.job() if with_role else None,
        tracks=fake.word(),
        id=fake.random_int(min=1, max=100000),
        resource_url=fake.url(),
        thumbnail_url=fake.image_url(),
    )


def build_random_discogs_label(is_label: bool = False) -> DiscogsLabel:
    if is_label:
        entity_type = 1
        entity_type_name = "Label"
    else:
        entity_type = fake.random_int(min=2, max=999)
        entity_type_name = fake.job()

    return DiscogsLabel(
        id=fake.random_int(min=1, max=100000),
        name=fake.company(),
        catno=fake.bothify(text="??###"),
        entity_type=entity_type,
        entity_type_name=entity_type_name,
        resource_url=fake.url(),
        thumbnail_url=fake.image_url(),
    )


def build_random_discogs_identifier() -> DiscogsIdentifier:
    return DiscogsIdentifier(
        type=fake.word(),
        value=fake.bothify(text="###-###-###"),
        description=fake.sentence(),
    )


def build_random_discogs_release(
    artists: list[DiscogsArtist] | None = None,
    extraartists: list[DiscogsArtist] | None = None,
    identifiers: list[DiscogsIdentifier] | None = None,
    labels: list[DiscogsLabel] | None = None,
    companies: list[DiscogsLabel] | None = None,
) -> DiscogsRelease:
    if artists is None:
        artists = [build_random_discogs_artist() for _ in range(random.randint(1, 3))]
    if extraartists is None:
        extraartists = [
            build_random_discogs_artist(with_role=True)
            for _ in range(random.randint(1, 2))
        ]
    if labels is None:
        labels = [build_random_discogs_label() for _ in range(random.randint(1, 2))]
    if companies is None:
        companies = [build_random_discogs_label() for _ in range(random.randint(1, 2))]
    if identifiers is None:
        identifiers = [
            build_random_discogs_identifier() for _ in range(random.randint(1, 3))
        ]

    return DiscogsRelease(
        id=fake.random_int(min=1, max=100000),
        year=fake.year(),
        resource_url=fake.url(),
        uri=fake.uri(),
        artists=artists,
        artists_sort=fake.name(),
        labels=labels,
        companies=companies,
        master_id=fake.random_int(min=1, max=100000),
        master_url=fake.url(),
        title=fake.sentence(nb_words=3),
        country=fake.country(),
        released=fake.date(),
        notes=fake.text(),
        released_formatted=fake.date(),
        identifiers=identifiers,
        extraartists=extraartists,
        tracklist=[],
    )


def build_random_release_import(
    discogs_release: DiscogsRelease | None = None,
    storage_location: StorageLocationImport | None = None,
) -> ReleaseImport:
    discogs = (
        build_random_discogs_release() if discogs_release is None else discogs_release
    )
    location = (
        random.choice([build_random_storage_location_import(), None])
        if storage_location is None
        else storage_location
    )

    return ReleaseImport(
        group=fake.word(),
        collection=fake.word(),
        album_artist=fake.name(),
        album_title=fake.sentence(nb_words=3),
        album_title_long=fake.sentence(nb_words=6),
        discogs_url=fake.url(),
        front_image=fake.image_url(),
        back_image=fake.image_url(),
        discogs_api_url=fake.url(),
        matrix=fake.bothify(text="??#####"),
        label=fake.company(),
        year=fake.year(),
        sortDate=fake.date_this_century(),
        release_date=fake.date_this_century(),
        sealed=fake.boolean(),
        spreadsheet_id=fake.random_int(min=1, max=10000),
        location=location,
        discogs=discogs,
    )
