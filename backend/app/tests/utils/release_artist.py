import uuid

from faker import Faker
from sqlmodel import Session

from app import crud
from app.api.routes.utils import get_role_by_name
from app.models.database_models import ReleaseArtist
from app.models.release_artist import ReleaseArtistCreate
from app.tests.utils.artist import create_random_artist
from app.tests.utils.release import create_random_release

fake = Faker()


def create_random_release_artist(
    db: Session,
    artist_id: uuid.UUID | None = None,
    release_id: uuid.UUID | None = None,
    role_name: str | None = None,
    anv: str | None = None,
    join: str | None = None,
    sort_order: int = 0,
) -> ReleaseArtist:
    if artist_id is None:
        artist = create_random_artist(db=db)
        artist_id = artist.id
    if release_id is None:
        release = create_random_release(db=db)
        release_id = release.id
    if role_name is None:
        role_name = fake.word()

    role = get_role_by_name(session=db, role_name=role_name, create_if_missing=True)
    assert role is not None
    role_id = role.id

    release_artist_in = ReleaseArtistCreate(
        release_id=release_id,
        artist_id=artist_id,
        role_id=role_id,
        anv=anv,
        join=join,
        sort_order=sort_order,
    )

    return crud.create_release_artist(session=db, release_artist_in=release_artist_in)
