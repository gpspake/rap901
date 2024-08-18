import uuid

from faker import Faker
from sqlmodel import Session

from app.crud import create_release
from app.models.database_models import Release
from app.models.release import ReleaseCreate
from app.models.storage_location import StorageLocationCreate

fake = Faker()


def build_random_release(
    storage_location_id: uuid.UUID | None = None,
    new_storage_location: StorageLocationCreate | None = None,
) -> ReleaseCreate:
    return ReleaseCreate(
        discogs_url=fake.url(),
        discogs_title=fake.sentence(nb_words=4).title().rstrip("."),
        title=fake.sentence(nb_words=4).title().rstrip("."),
        title_long=fake.sentence(nb_words=4).title().rstrip("."),
        matrix=fake.word(),
        sealed=fake.boolean(),
        spreadsheet_id=fake.random_int(min=1, max=999),
        year=fake.random_int(min=1990, max=2000),
        sort_date=fake.date(),
        release_date=fake.date(),
        storage_location_id=storage_location_id,
        storage_location=new_storage_location,
    )


def create_random_release(
    db: Session,
    storage_location_id: uuid.UUID | None = None,
    new_storage_location: StorageLocationCreate | None = None,
) -> Release:
    release_in = build_random_release(
        storage_location_id=storage_location_id,
        new_storage_location=new_storage_location,
    )

    return create_release(session=db, release_in=release_in)
