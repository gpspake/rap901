import uuid

from faker import Faker
from sqlmodel import Session, select

from app import crud
from app.models.database_models import ReleaseArtist, Role
from app.models.release_artist import ReleaseArtistCreate
from app.tests.utils.artist import create_random_artist
from app.tests.utils.release import create_random_release

fake = Faker()


def get_or_create_role_by_name(
    db: Session,
    name: str | None = None,
) -> Role:
    statement = select(Role).where(Role.name == name)
    result: Role | None = db.exec(statement).first()

    if result:
        return result
    else:
        role = Role(name=name)
        db.add(role)
        db.commit()
        db.refresh(role)
        return role


def create_random_release_artist(
    db: Session,
    artist_id: uuid.UUID | None = None,
    release_id: uuid.UUID | None = None,
    role_name: str | None = None,
    anv: str | None = None,
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

    role = get_or_create_role_by_name(db=db, name=role_name)
    role_id = role.id

    release_artist_in = ReleaseArtistCreate(
        release_id=release_id,
        artist_id=artist_id,
        role_id=role_id,
        anv=anv,
        sort_order=sort_order,
    )

    return crud.create_release_artist(session=db, release_artist_in=release_artist_in)
