import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import StorageLocation
from app.models.models import Message
from app.models.storage_location import (
    StorageLocationCreate,
    StorageLocationPublic,
    StorageLocationsPublic,
    StorageLocationUpdate,
)

router = APIRouter()


@router.get("/", response_model=StorageLocationsPublic)
def read_storage_locations(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve storage_locations.
    """

    count_statement = select(func.count()).select_from(StorageLocation)
    count = session.exec(count_statement).one()
    statement = select(StorageLocation).offset(skip).limit(limit)
    storage_locations = session.exec(statement).all()

    return StorageLocationsPublic(data=storage_locations, count=count)


@router.get("/{id}", response_model=StorageLocationPublic)
def read_storage_location(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get storage_location by ID.
    """
    storage_location = session.get(StorageLocation, id)
    if not storage_location:
        raise HTTPException(status_code=404, detail="StorageLocation not found")
    return storage_location


@router.post("/", response_model=StorageLocationPublic)
def create_storage_location(
    *, session: SessionDep, storage_location_in: StorageLocationCreate
) -> Any:
    """
    Create new storage_location.
    """
    storage_location = StorageLocation.model_validate(storage_location_in)
    session.add(storage_location)
    session.commit()
    session.refresh(storage_location)
    return storage_location


@router.put("/{id}", response_model=StorageLocationPublic)
def update_storage_location(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    storage_location_in: StorageLocationUpdate,
) -> Any:
    """
    Update a storage_location.
    """
    storage_location = session.get(StorageLocation, id)
    if not storage_location:
        raise HTTPException(status_code=404, detail="StorageLocation not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = storage_location_in.model_dump(exclude_unset=True)
    storage_location.sqlmodel_update(update_dict)
    session.add(storage_location)
    session.commit()
    session.refresh(storage_location)
    return storage_location


@router.delete("/{id}")
def delete_storage_location(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete a storage_location.
    """
    storage_location = session.get(StorageLocation, id)
    if not storage_location:
        raise HTTPException(status_code=404, detail="StorageLocation not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(storage_location)
    session.commit()
    return Message(message="StorageLocation deleted successfully")
