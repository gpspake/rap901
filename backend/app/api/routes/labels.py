import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import Label
from app.models.label import (
    LabelCreate,
    LabelPublic,
    LabelsPublic,
    LabelUpdate,
)
from app.models.models import Message

router = APIRouter()


@router.get("/", response_model=LabelsPublic)
def read_labels(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve labels.
    """

    count_statement = select(func.count()).select_from(Label)
    count = session.exec(count_statement).one()
    statement = select(Label).offset(skip).limit(limit)
    labels = session.exec(statement).all()

    return LabelsPublic(data=labels, count=count)


@router.get("/{id}", response_model=LabelPublic)
def read_label(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get label by ID.
    """
    label = session.get(Label, id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    return label


@router.post("/", response_model=LabelPublic)
def create_label(
    *, session: SessionDep, current_user: CurrentUser, label_in: LabelCreate
) -> Any:
    """
    Create new label.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    return crud.create_label(session=session, label_in=label_in)


@router.put("/{id}", response_model=LabelPublic)
def update_label(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    label_in: LabelUpdate,
) -> Any:
    """
    Update an label.
    """
    label = session.get(Label, id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = label_in.model_dump(exclude_unset=True)
    label.sqlmodel_update(update_dict)
    session.add(label)
    session.commit()
    session.refresh(label)
    return label


@router.delete("/{id}")
def delete_label(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an label.
    """
    label = session.get(Label, id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(label)
    session.commit()
    return Message(message="Label deleted successfully")
