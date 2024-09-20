import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import TrackBase
from app.models.track_artist import TrackArtistPublic


# Properties to receive on Track creation
class TrackCreate(TrackBase):
    position: str | None = Field(default=None)
    sort_order: int
    type: str
    title: str
    duration: str | None = Field(default=None)
    release_id: uuid.UUID


# Properties to receive on Track update
class TrackUpdate(TrackBase):
    position: str | None = Field(default=None)
    sort_order: int | None = Field(default=None)
    type: str | None = Field(default=None)
    title: str | None = Field(default=None)
    duration: str | None = Field(default=None)


# Properties to return via API, id is always required
class TrackPublic(TrackBase):
    id: uuid.UUID
    position: str | None
    sort_order: int
    type: str
    title: str
    duration: str | None = Field(default=None)
    release_id: uuid.UUID
    artist_links: list[TrackArtistPublic] | None = Field(default=None)


class TracksPublic(SQLModel):
    data: list[TrackPublic]
    count: int

# Properties to return via API, id is always required
class TrackPublic(TrackBase):
    id: uuid.UUID
    position: str | None
    sort_order: int
    type: str
    title: str
    duration: str | None = Field(default=None)
    release_id: uuid.UUID
    artist_links: list[TrackArtistPublic] | None = Field(default=None)


class TracksPublic(SQLModel):
    data: list[TrackPublic]
    count: int