from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.artist import ArtistCreate
from app.models.database_models import Artist

fake = Faker()


def build_random_artist() -> ArtistCreate:
    return ArtistCreate(
        name=fake.word(),
        profile=fake.sentence(nb_words=3).title().rstrip("."),
        discogs_id=fake.random_int(min=1, max=999),
        discogs_resource_url=fake.url(),
    )


def create_random_artist(db: Session) -> Artist:
    artist_in = build_random_artist()
    artist = crud.create_artist(session=db, artist_in=artist_in)
    return artist
