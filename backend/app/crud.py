import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models.artist import ArtistCreate
from app.models.database_models import (
    Artist,
    Identifier,
    Image,
    Label,
    Release,
    ReleaseArtist,
    ReleaseLabel,
    StorageLocation,
)
from app.models.identifier import IdentifierCreate
from app.models.image import ImageCreate
from app.models.label import LabelCreate
from app.models.models import Item, ItemCreate, User, UserCreate, UserUpdate
from app.models.release import ReleaseCreate
from app.models.release_artist import ReleaseArtistCreate
from app.models.release_label import ReleaseLabelCreate
from app.models.storage_location import StorageLocationCreate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_item(*, session: Session, item_in: ItemCreate, owner_id: uuid.UUID) -> Item:
    db_item = Item.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def orm_create_release(*, session: Session, release_in: ReleaseCreate) -> Release:
    release_in = ReleaseCreate.model_validate(release_in)

    if release_in.storage_location_id is not None:
        storage_location = session.get(StorageLocation, release_in.storage_location_id)
        release_in.storage_location = storage_location
    elif release_in.storage_location is not None:
        storage_location_in = StorageLocationCreate.model_validate(
            release_in.storage_location
        )
        storage_location = create_storage_location(
            session=session, storage_location_in=storage_location_in
        )
        release_in.storage_location = storage_location

    db_release = Release.model_validate(release_in)
    session.add(db_release)
    session.commit()
    session.refresh(db_release)
    return db_release


def create_storage_location(
    *, session: Session, storage_location_in: StorageLocationCreate
) -> StorageLocation:
    db_storage_location = StorageLocation.model_validate(storage_location_in)
    session.add(db_storage_location)
    session.commit()
    session.refresh(db_storage_location)
    return db_storage_location


def create_image(*, session: Session, image_in: ImageCreate) -> Image:
    db_image = Image.model_validate(image_in)
    session.add(db_image)
    session.commit()
    session.refresh(db_image)
    return db_image


def create_artist(*, session: Session, artist_in: ArtistCreate) -> Artist:
    db_artist = Artist.model_validate(artist_in)
    session.add(db_artist)
    session.commit()
    session.refresh(db_artist)
    return db_artist


def create_release_artist(
    *, session: Session, release_artist_in: ReleaseArtistCreate
) -> ReleaseArtist:
    db_release_artist = ReleaseArtist.model_validate(release_artist_in)
    session.add(db_release_artist)
    session.commit()
    session.refresh(db_release_artist)
    return db_release_artist


def create_label(*, session: Session, label_in: LabelCreate) -> Label:
    db_label = Label.model_validate(label_in)
    session.add(db_label)
    session.commit()
    session.refresh(db_label)
    return db_label


def create_release_label(
    *, session: Session, release_label_in: ReleaseLabelCreate
) -> ReleaseLabel:
    db_release_label = ReleaseLabel.model_validate(release_label_in)
    session.add(db_release_label)
    session.commit()
    session.refresh(db_release_label)
    return db_release_label


def create_identifier(
    *, session: Session, identifier_in: IdentifierCreate
) -> Identifier:
    db_identifier = Identifier.model_validate(identifier_in)
    session.add(db_identifier)
    session.commit()
    session.refresh(db_identifier)
    return db_identifier
