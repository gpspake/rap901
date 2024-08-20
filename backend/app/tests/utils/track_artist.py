import uuid

from faker import Faker
from sqlmodel import Session

from app import crud
from app.api.routes.utils import get_role_by_name
from app.models.database_models import TrackArtist
from app.models.track_artist import TrackArtistCreate
from app.tests.utils.artist import create_random_artist
from app.tests.utils.track import create_random_track

fake = Faker()


def create_random_track_artist(
    db: Session,
    artist_id: uuid.UUID | None = None,
    track_id: uuid.UUID | None = None,
    role_name: str | None = None,
    anv: str | None = None,
    join: str | None = None,
    sort_order: int = 0,
) -> TrackArtist:
    if artist_id is None:
        artist = create_random_artist(db=db)
        artist_id = artist.id
    if track_id is None:
        track = create_random_track(db=db)
        track_id = track.id
    if role_name is None:
        role_name = fake.word()

    role = get_role_by_name(session=db, role_name=role_name, create_if_missing=True)
    assert role is not None
    role_id = role.id

    track_artist_in = TrackArtistCreate(
        track_id=track_id,
        artist_id=artist_id,
        role_id=role_id,
        anv=anv,
        join=join,
        sort_order=sort_order,
    )

    return crud.create_track_artist(session=db, track_artist_in=track_artist_in)
