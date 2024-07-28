from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.release import Release, ReleaseCreate

fake = Faker()


def build_random_release() -> ReleaseCreate:
    title = fake.sentence(nb_words=4).title().rstrip(".")
    discogs_url = fake.url()
    discogs_title = fake.sentence(nb_words=4).title().rstrip(".")
    title_long = fake.sentence(nb_words=4).title().rstrip(".")
    matrix = fake.word()
    sealed = fake.boolean()
    spreadsheet_id = fake.random_int(min=1, max=999)
    year = fake.random_int(min=1990, max=2000)
    sort_date = fake.date()
    release_date = fake.date()

    return ReleaseCreate(
        discogs_url=discogs_url,
        discogs_title=discogs_title,
        title=title,
        title_long=title_long,
        matrix=matrix,
        sealed=sealed,
        spreadsheet_id=spreadsheet_id,
        year=year,
        sort_date=sort_date,
        release_date=release_date,
    )


def create_random_release(db: Session) -> Release:
    release_in = build_random_release()
    return crud.create_release(session=db, release_in=release_in)
