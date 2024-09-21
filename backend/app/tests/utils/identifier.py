import uuid

from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.database_models import Identifier
from app.models.identifier import IdentifierCreate

fake = Faker()


def create_random_identifier(db: Session, release_id: uuid.UUID) -> Identifier:
    identifier_in = IdentifierCreate(
        type=fake.word(),
        value=fake.word(),
        description=fake.sentence(nb_words=3).title().rstrip("."),
        release_id=release_id,
        sort_order=0,
    )
    return crud.create_identifier(session=db, identifier_in=identifier_in)
