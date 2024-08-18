import random

from faker import Faker

from app.models.import_models import (
    DiscogsArtist,
    DiscogsIdentifier,
    DiscogsLabel,
    DiscogsRelease,
    ReleaseImport,
)
from app.tests.utils.storage_location import build_random_storage_location_import

fake = Faker()


def build_random_discogs_artist() -> DiscogsArtist:
    return DiscogsArtist(
        name=fake.name(),
        anv=fake.word(),
        join=fake.word(),
        role=fake.job(),
        tracks=fake.word(),
        id=fake.random_int(min=1, max=100000),
        resource_url=fake.url(),
        thumbnail_url=fake.image_url(),
    )


def build_random_discogs_label() -> DiscogsLabel:
    return DiscogsLabel(
        id=fake.random_int(min=1, max=100000),
        name=fake.company(),
        catno=fake.bothify(text="??###"),
        entity_type=fake.random_int(min=1, max=10),
        entity_type_name=fake.word(),
        resource_url=fake.url(),
        thumbnail_url=fake.image_url(),
    )


def build_random_discogs_identifiers() -> DiscogsIdentifier:
    return DiscogsIdentifier(
        type=fake.word(),
        value=fake.bothify(text="###-###-###"),
        description=fake.sentence(),
    )


def build_random_discogs_release() -> DiscogsRelease:
    return DiscogsRelease(
        id=fake.random_int(min=1, max=100000),
        year=fake.year(),
        resource_url=fake.url(),
        uri=fake.uri(),
        artists=[build_random_discogs_artist() for _ in range(random.randint(1, 3))],
        artists_sort=fake.name(),
        labels=[build_random_discogs_label() for _ in range(random.randint(1, 2))],
        companies=[build_random_discogs_label() for _ in range(random.randint(1, 2))],
        master_id=fake.random_int(min=1, max=100000),
        master_url=fake.url(),
        title=fake.sentence(nb_words=3),
        country=fake.country(),
        released=fake.date(),
        notes=fake.text(),
        released_formatted=fake.date(),
        identifiers=[
            build_random_discogs_identifiers() for _ in range(random.randint(1, 3))
        ],
        extraartists=[
            build_random_discogs_artist() for _ in range(random.randint(1, 2))
        ],
    )


def build_random_release_import() -> ReleaseImport:
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
        sort_date=fake.date_this_century(),
        release_date=fake.date_this_century(),
        sealed=fake.boolean(),
        spreadsheet_id=fake.random_int(min=1, max=10000),
        location=random.choice([build_random_storage_location_import(), None]),
        discogs=build_random_discogs_release(),
    )
