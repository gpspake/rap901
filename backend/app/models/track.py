import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import TrackArtistBase, TrackBase


# Properties to receive on Track creation
class TrackCreate(TrackBase):
    position: str
    type: str
    title: str
    duration: str | None = Field(default=None)
    release_id: uuid.UUID


# Properties to receive on Track update
class TrackUpdate(TrackBase):
    position: str | None = Field(default=None)
    type: str | None = Field(default=None)
    title: str | None = Field(default=None)
    duration: str | None = Field(default=None)


# Properties to return via API, id is always required
class TrackPublic(TrackBase):
    id: uuid.UUID
    position: str
    type: str
    title: str
    duration: str | None = Field(default=None)
    release_id: uuid.UUID
    artist_links: list[TrackArtistBase] | None = Field(default=None)


class TracksPublic(SQLModel):
    data: list[TrackPublic]
    count: int
