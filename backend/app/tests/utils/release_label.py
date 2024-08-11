import uuid

from faker import Faker
from sqlmodel import Session, select

from app import crud
from app.models.database_models import EntityType, ReleaseLabel
from app.models.release_label import ReleaseLabelCreate
from app.tests.utils.label import create_random_label
from app.tests.utils.release import create_random_release

fake = Faker()


def get_or_create_entity_type_by_name(
    db: Session,
    name: str | None = None,
) -> EntityType:
    statement = select(EntityType).where(EntityType.name == name)
    result: EntityType | None = db.exec(statement).first()

    if result:
        return result
    else:
        entity_type = EntityType(name=name)
        db.add(entity_type)
        db.commit()
        db.refresh(entity_type)
        return entity_type


def create_random_release_label(
    db: Session,
    label_id: uuid.UUID | None = None,
    release_id: uuid.UUID | None = None,
    entity_type_name: str | None = None,
    catalog_number: str | None = None,
    sort_order: int = 0,
) -> ReleaseLabel:
    if label_id is None:
        label = create_random_label(db=db)
        label_id = label.id
    if release_id is None:
        release = create_random_release(db=db)
        release_id = release.id
    if entity_type_name is None:
        entity_type_name = fake.word()

    entity_type = get_or_create_entity_type_by_name(db=db, name=entity_type_name)
    entity_type_id = entity_type.id

    release_label_in = ReleaseLabelCreate(
        release_id=release_id,
        label_id=label_id,
        entity_type_id=entity_type_id,
        catalog_number=catalog_number,
        sort_order=sort_order,
    )

    return crud.create_release_label(session=db, release_label_in=release_label_in)
