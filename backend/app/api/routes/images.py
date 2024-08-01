import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import Image
from app.models.image import ImageCreate, ImagePublic, ImagesPublic, ImageUpdate
from app.models.models import Message

router = APIRouter()


@router.get("/", response_model=ImagesPublic)
def read_images(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve images.
    """

    count_statement = select(func.count()).select_from(Image)
    count = session.exec(count_statement).one()
    statement = select(Image).offset(skip).limit(limit)
    images = session.exec(statement).all()

    return ImagesPublic(data=images, count=count)


@router.get("/{id}", response_model=ImagePublic)
def read_image(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get image by ID.
    """
    image = session.get(Image, id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image


@router.post("/", response_model=ImagePublic)
def create_image(*, session: SessionDep, image_in: ImageCreate) -> Any:
    """
    Create new image.
    """
    image = Image.model_validate(image_in)
    session.add(image)
    session.commit()
    session.refresh(image)
    return image


@router.put("/{id}", response_model=ImagePublic)
def update_image(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    image_in: ImageUpdate,
) -> Any:
    """
    Update an image.
    """
    image = session.get(Image, id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = image_in.model_dump(exclude_unset=True)
    image.sqlmodel_update(update_dict)
    session.add(image)
    session.commit()
    session.refresh(image)
    return image


@router.delete("/{id}")
def delete_image(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an image.
    """
    image = session.get(Image, id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(image)
    session.commit()
    return Message(message="Image deleted successfully")
