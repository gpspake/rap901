import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import Identifier
from app.models.identifier import (
    IdentifierCreate,
    IdentifierPublic,
    IdentifiersPublic,
    IdentifierUpdate,
)
from app.models.models import Message

router = APIRouter()


@router.get("/", response_model=IdentifiersPublic)
def read_identifiers(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve identifiers.
    """

    count_statement = select(func.count()).select_from(Identifier)
    count = session.exec(count_statement).one()
    statement = select(Identifier).offset(skip).limit(limit)
    identifiers = session.exec(statement).all()

    return IdentifiersPublic(data=identifiers, count=count)


@router.get("/{id}", response_model=IdentifierPublic)
def read_identifier(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get identifier by ID.
    """
    identifier = session.get(Identifier, id)
    if not identifier:
        raise HTTPException(status_code=404, detail="Identifier not found")
    return identifier


@router.post("/", response_model=IdentifierPublic)
def create_identifier(*, session: SessionDep, identifier_in: IdentifierCreate) -> Any:
    """
    Create new identifier.
    """
    return crud.create_identifier(session=session, identifier_in=identifier_in)


@router.put("/{id}", response_model=IdentifierPublic)
def update_identifier(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    identifier_in: IdentifierUpdate,
) -> Any:
    """
    Update an identifier.
    """
    identifier = session.get(Identifier, id)
    if not identifier:
        raise HTTPException(status_code=404, detail="Identifier not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = identifier_in.model_dump(exclude_unset=True)

    identifier.sqlmodel_update(update_dict)
    session.add(identifier)
    session.commit()
    session.refresh(identifier)
    return identifier


@router.delete("/{id}")
def delete_identifier(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an identifier.
    """
    identifier = session.get(Identifier, id)
    if not identifier:
        raise HTTPException(status_code=404, detail="Identifier not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(identifier)
    session.commit()
    return Message(message="Identifier deleted successfully")
