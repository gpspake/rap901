from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.database_models import Label
from app.models.label import LabelCreate

fake = Faker()


def build_random_label() -> LabelCreate:
    return LabelCreate(
        name=fake.word(),
        slug=fake.word(),
        profile=fake.sentence(nb_words=3).title().rstrip("."),
        discogs_id=fake.random_int(min=1, max=999),
        discogs_resource_url=fake.url(),
    )


def create_random_label(db: Session) -> Label:
    label_in = build_random_label()
    label = crud.create_label(session=db, label_in=label_in)
    return label
