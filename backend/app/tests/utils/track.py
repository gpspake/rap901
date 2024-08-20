import random
import uuid

from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.database_models import Track
from app.models.track import TrackCreate
from app.tests.utils.release import create_random_release

fake = Faker()


def build_random_track(
    release_id: uuid.UUID | None = None, position: str | None = "1"
) -> TrackCreate:
    release_id = release_id or uuid.uuid4()

    duration_minutes = random.randint(0, 5)
    duration_seconds = random.randint(0, 59)

    return TrackCreate(
        release_id=release_id,
        position=position,
        type="track",
        title=fake.word(),
        duration=f"{duration_minutes}:{duration_seconds:02d}",
    )


def create_random_track(db: Session, release_id: uuid.UUID | None = None) -> Track:
    if release_id is None:
        release = create_random_release(db=db)
        release_id = release.id
    track_in = build_random_track(release_id=release_id)
    return crud.create_track(session=db, track_in=track_in)
