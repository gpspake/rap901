import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.models.database_models import ReleaseLabel
from app.models.models import Message
from app.models.release_label import (
    ReleaseLabelCreate,
    ReleaseLabelPublic,
    ReleaseLabelsPublic,
    ReleaseLabelUpdate,
)

router = APIRouter()


@router.get("/", response_model=ReleaseLabelsPublic)
def read_release_labels(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve release_labels.
    """

    count_statement = select(func.count()).select_from(ReleaseLabel)
    count = session.exec(count_statement).one()
    statement = select(ReleaseLabel).offset(skip).limit(limit)
    release_labels = session.exec(statement).all()

    return ReleaseLabelsPublic(data=release_labels, count=count)


@router.get("/{id}", response_model=ReleaseLabelPublic)
def read_release_label(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get release_label by ID.
    """
    release_label = session.get(ReleaseLabel, id)
    if not release_label:
        raise HTTPException(status_code=404, detail="ReleaseLabel not found")
    return release_label


@router.post("/", response_model=ReleaseLabelPublic)
def create_release_label(
    *, session: SessionDep, release_label_in: ReleaseLabelCreate
) -> Any:
    """
    Create new release_label.
    """
    return crud.create_release_label(session=session, release_label_in=release_label_in)


@router.put("/{id}", response_model=ReleaseLabelPublic)
def update_release_label(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    release_label_in: ReleaseLabelUpdate,
) -> Any:
    """
    Update an release_label.
    """
    release_label = session.get(ReleaseLabel, id)
    if not release_label:
        raise HTTPException(status_code=404, detail="ReleaseLabel not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = release_label_in.model_dump(exclude_unset=True)
    release_label.sqlmodel_update(update_dict)
    session.add(release_label)
    session.commit()
    session.refresh(release_label)
    return release_label


@router.delete("/{id}")
def delete_release_label(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an release_label.
    """
    release_label = session.get(ReleaseLabel, id)
    if not release_label:
        raise HTTPException(status_code=404, detail="ReleaseLabel not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(release_label)
    session.commit()
    return Message(message="ReleaseLabel deleted successfully")
