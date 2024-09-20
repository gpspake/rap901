import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import (
    EntityType,
    LabelBaseWithId,
    ReleaseBase,
    ReleaseLabelBase,
)


# Properties to receive on ReleaseLabel creation
class ReleaseLabelCreate(ReleaseLabelBase):
    release_id: uuid.UUID
    label_id: uuid.UUID
    entity_type_id: uuid.UUID | None = Field(default=None)
    catalog_number: str | None = Field(default=None, max_length=255)
    sort_order: int | None = Field(default=0)


# Properties to receive on ReleaseLabel update
class ReleaseLabelUpdate(ReleaseLabelBase):
    release_id: uuid.UUID | None = Field(default=None)
    label_id: uuid.UUID | None = Field(default=None)
    entity_type_id: uuid.UUID | None = Field(default=None)
    catalog_number: str | None = Field(default=None, max_length=255)
    sort_order: int | None = Field(default=0)


# Properties to return via API, id is always required
class ReleaseLabelPublic(ReleaseLabelBase):
    id: uuid.UUID
    release_id: uuid.UUID
    label_id: uuid.UUID
    entity_type_id: uuid.UUID | None
    entity_type: EntityType | None = Field(default=None)
    catalog_number: str | None
    sort_order: int


# Properties to return via API, id is always required
class ReleaseLabelOut(ReleaseLabelBase):
    id: uuid.UUID
    entity_type_id: uuid.UUID | None
    entity_type_name: str | None
    catalog_number: str | None
    sort_order: int | None
    label_id: uuid.UUID
    name: str | None = Field(default=None)
    slug: str
    profile: str | None = Field(default=None)
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None)


class ReleaseLabelsOut(SQLModel):
    data: list[ReleaseLabelOut]
    count: int


class LabelReleaseLink(ReleaseLabelPublic):
    release: ReleaseBase | None


class ReleaseLabelLink(ReleaseLabelPublic):
    label: LabelBaseWithId | None


class ReleaseLabelsPublic(SQLModel):
    data: list[ReleaseLabelPublic]
    count: int
