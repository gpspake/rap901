import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import (
    ArtistBaseWithId,
    Image,
    ReleaseBase,
    Role,
    TrackArtistBase,
    TrackBase,
)


# Properties to receive on TrackArtist creation
class TrackArtistCreate(TrackArtistBase):
    track_id: uuid.UUID
    artist_id: uuid.UUID
    role_id: uuid.UUID | None = Field(default=None)
    anv: str | None = Field(default=None, max_length=255)
    join: str | None = Field(default=None)
    sort_order: int | None = Field(default=0)


# Properties to receive on TrackArtist update
class TrackArtistUpdate(TrackArtistBase):
    track_id: uuid.UUID | None = Field(default=None)
    artist_id: uuid.UUID | None = Field(default=None)
    role_id: uuid.UUID | None = Field(default=None)
    anv: str | None = Field(default=None, max_length=255)
    join: str | None = Field(default=None)
    sort_order: int | None = Field(default=0)


class TrackReleaseOut(ReleaseBase):
    images: list[Image]


class TrackOut(TrackBase):
    release: TrackReleaseOut


class TrackArtistPublic(TrackArtistBase):
    id: uuid.UUID
    track_id: uuid.UUID
    artist_id: uuid.UUID
    role_id: uuid.UUID | None
    role: Role | None = Field(default=None)
    anv: str | None
    join: str | None
    sort_order: int | None
    track: TrackOut | None
    artist: ArtistBaseWithId | None


class TrackArtistLink(TrackArtistPublic):
    artist: ArtistBaseWithId | None


class TrackArtistsPublic(SQLModel):
    data: list[TrackArtistPublic]
    count: int
