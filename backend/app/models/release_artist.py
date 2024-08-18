import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import (
    ArtistBaseWithId,
    ReleaseArtistBase,
    ReleaseBase,
    Role,
)


# Properties to receive on ReleaseArtist creation
class ReleaseArtistCreate(ReleaseArtistBase):
    release_id: uuid.UUID
    artist_id: uuid.UUID
    role_id: uuid.UUID | None = Field(default=None)
    anv: str | None = Field(default=None, max_length=255)
    join: str | None = Field(default=None)
    sort_order: int | None = Field(default=0)


# Properties to receive on ReleaseArtist update
class ReleaseArtistUpdate(ReleaseArtistBase):
    release_id: uuid.UUID | None = Field(default=None)
    artist_id: uuid.UUID | None = Field(default=None)
    role_id: uuid.UUID | None = Field(default=None)
    anv: str | None = Field(default=None, max_length=255)
    join: str | None = Field(default=None)
    sort_order: int | None = Field(default=0)


# Properties to return via API, id is always required
class ReleaseArtistPublic(ReleaseArtistBase):
    id: uuid.UUID
    release_id: uuid.UUID
    artist_id: uuid.UUID
    role_id: uuid.UUID | None
    role: Role | None = Field(default=None)
    anv: str | None
    join: str | None
    sort_order: int


class ArtistReleaseLink(ReleaseArtistPublic):
    release: ReleaseBase | None


class ReleaseArtistLink(ReleaseArtistPublic):
    artist: ArtistBaseWithId | None


class ReleaseArtistsPublic(SQLModel):
    data: list[ReleaseArtistPublic]
    count: int
