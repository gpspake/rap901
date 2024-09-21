import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import ArtistBase
from app.models.release import ReleaseOut
from app.models.release_artist import ArtistReleaseLink


# Properties to receive on Artist creation
class ArtistCreate(ArtistBase):
    name: str
    slug: str
    profile: str | None = Field(default=None)
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None, max_length=255)


# Properties to receive on Artist update
class ArtistUpdate(ArtistBase):
    name: str | None = Field(default=None)
    slug: str | None = Field(default=None)
    profile: str | None = Field(default=None)
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None, max_length=255)


class ReleaseLinkArtist(ArtistBase):
    id: uuid.UUID
    name: str
    slug: str
    profile: str
    discogs_id: int
    discogs_resource_url: str


# Properties to return via API, id is always required
class ArtistPublic(ArtistBase):
    id: uuid.UUID
    name: str
    slug: str
    profile: str
    discogs_id: int
    discogs_resource_url: str

    release_links: list["ArtistReleaseLink"]


class ArtistsPublic(SQLModel):
    data: list[ArtistPublic]
    count: int


class ArtistOut(ArtistBase):
    id: uuid.UUID
    name: str
    slug: str
    profile: str
    discogs_id: int
    discogs_resource_url: str

    # albums where the artist is the album artist
    releases: list["ReleaseOut"]

    # album credits grouped by release
    credits: list["ReleaseOut"]
