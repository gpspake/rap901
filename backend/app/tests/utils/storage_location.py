import random

from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.database_models import StorageLocation
from app.models.storage_location import StorageLocationCreate

fake = Faker()


def build_random_storage_location() -> StorageLocationCreate:
    return StorageLocationCreate(
        spreadsheet_id=fake.random_int(min=1, max=999),
        container=random.choice(["Case", "Overflow"]),
        row=fake.random_int(min=1, max=6),
        position=fake.random_int(min=1, max=50),
    )


def create_random_storage_location(db: Session) -> StorageLocation:
    storage_location_in = build_random_storage_location()
    return crud.create_storage_location(
        session=db, storage_location_in=storage_location_in
    )
