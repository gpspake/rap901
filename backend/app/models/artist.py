import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import ArtistBase, ReleaseArtist


# Properties to receive on Artist creation
class ArtistCreate(ArtistBase):
    name: str | None = Field(default=None)
    profile: str | None = Field(default=None)
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None, max_length=255)


# Properties to receive on Artist update
class ArtistUpdate(ArtistBase):
    name: str | None = Field(default=None)
    profile: str | None = Field(default=None)
    discogs_id: int | None = Field(default=None)
    discogs_resource_url: str | None = Field(default=None, max_length=255)


# Properties to return via API, id is always required
class ArtistPublic(ArtistBase):
    id: uuid.UUID
    name: str
    profile: str
    discogs_id: int
    discogs_resource_url: str

    release_links: list["ReleaseArtist"]


class ArtistsPublic(SQLModel):
    data: list[ArtistPublic]
    count: int
