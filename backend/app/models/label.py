import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import LabelBase
from app.models.release import ReleaseOut
from app.models.release_label import LabelReleaseLink


# Properties to receive on Label creation
class LabelCreate(LabelBase):
    name: str
    profile: str | None = Field(default=None)
    slug: str
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None, max_length=255)


# Properties to receive on Label update
class LabelUpdate(LabelBase):
    name: str | None = Field(default=None)
    profile: str | None = Field(default=None)
    slug: str | None = Field(default=None)
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None, max_length=255)


class ReleaseLinkLabel(LabelBase):
    id: uuid.UUID
    name: str
    profile: str
    discogs_id: int
    discogs_resource_url: str


# Properties to return via API, id is always required
class LabelPublic(LabelBase):
    id: uuid.UUID
    name: str
    profile: str
    discogs_id: int
    discogs_resource_url: str

    release_links: list["LabelReleaseLink"]


class LabelsPublic(SQLModel):
    data: list[LabelPublic]
    count: int


# Properties to return via API, id is always required
class LabelOut(LabelBase):
    id: uuid.UUID
    name: str
    slug: str
    profile: str
    discogs_id: int
    discogs_resource_url: str

    releases: list["ReleaseOut"]
    credits: list["ReleaseOut"]


class LabelsOut(SQLModel):
    data: list[LabelOut]
    count: int
