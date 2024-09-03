import uuid
from datetime import date

from sqlmodel import Field, SQLModel

from app.models.database_models import (
    ReleaseBase,
    ReleaseImage,
)
from app.models.release_artist import ReleaseArtistLink
from app.models.release_label import ReleaseLabelLink
from app.models.storage_location import StorageLocationPublic
from app.models.track import TrackPublic


# Properties to receive on item creation
class ReleaseCreate(ReleaseBase):
    discogs_url: str | None = Field(default=None, min_length=1, max_length=255)
    discogs_title: str | None = Field(default=None, min_length=1, max_length=255)
    title: str | None = Field(default=None, min_length=1, max_length=255)
    title_long: str | None = Field(default=None, min_length=1, max_length=255)
    matrix: str | None = Field(default=None, min_length=1, max_length=255)
    sealed: bool | None = Field(default=False)
    spreadsheet_id: int | None = Field(default=None)
    year: int | None = Field(default=None)
    sort_date: date | None = Field(default=None)
    release_date: date | None = Field(default=None)
    storage_location_id: uuid.UUID | None = Field(default=None)


# Properties to receive on item update
class ReleaseUpdate(ReleaseBase):
    discogs_url: str | None = Field(default=None, min_length=1, max_length=255)
    discogs_title: str | None = Field(default=None, min_length=1, max_length=255)
    title: str | None = Field(default=None, min_length=1, max_length=255)
    title_long: str | None = Field(default=None, min_length=1, max_length=255)
    matrix: str | None = Field(default=None, min_length=1, max_length=255)
    sealed: bool | None = Field(default=False)
    spreadsheet_id: int | None = Field(default=None)
    year: int | None = Field(default=None)
    sort_date: date | None = Field(default=None)
    release_date: date | None = Field(default=None)


# Properties to return via API, id is always required
class ReleasePublic(ReleaseBase):
    id: uuid.UUID
    discogs_url: str | None
    discogs_title: str | None
    title: str | None
    title_long: str | None
    matrix: str | None
    sealed: bool | None
    spreadsheet_id: int | None
    year: int | None
    sort_date: date | None
    release_date: date | None
    storage_location: StorageLocationPublic | None
    images: list[ReleaseImage] | None
    artist_links: list["ReleaseArtistLink"] | None
    label_links: list["ReleaseLabelLink"] | None
    tracks: list["TrackPublic"] | None


class ReleasesPublic(SQLModel):
    data: list[ReleasePublic]
    count: int
