import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app import crud
from app.api.deps import CurrentUser, SessionDep
from app.api.routes.releases import release_public_to_release_out
from app.models.database_models import Label
from app.models.label import (
    LabelCreate,
    LabelPublic,
    LabelsPublic,
    LabelUpdate, LabelOut,
)
from app.models.models import Message
from app.models.release import ReleasePublic

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


@router.get("/{slug}", response_model=LabelOut)
def read_label(session: SessionDep, slug: str) -> Any:
    """
    Get label by slug.
    """

    stmt = select(Label).where(Label.slug == slug)
    label = session.execute(stmt).scalar_one_or_none()

    unique_release_ids = set()
    unique_credit_ids = set()

    releases = []
    credits = []

    # separate album artists from credits
    for release_link in label.release_links:

        # get release out from release link
        release = release_public_to_release_out(ReleasePublic.model_validate(release_link.release))

        # these release link objects are
        if release_link.entity_type.name == "Label":

            # add release id to a set
            unique_release_ids.add(release.id)

            # add release to releases list
            releases.append(release)

            # if release is in credits, remove it from credits
            if release.id in unique_credit_ids:
                credits = [_release for _release in credits if _release.id != release_link.release_id]
        else:
            # add release to credits if it's not already in releases or credits
            if release_link.release_id not in unique_release_ids.union(unique_credit_ids):
                credits.append(release)
                # add to credit release id to a set
                unique_credit_ids.add(release.id)

    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    return LabelOut(
        id=label.id,
        name=label.name,
        slug=label.slug,
        profile=label.profile,
        discogs_id=label.discogs_id,
        discogs_resource_url=label.discogs_resource_url,
        releases=releases,
        credits=credits
    )


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
