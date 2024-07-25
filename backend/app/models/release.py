from datetime import date

from sqlmodel import Field, SQLModel


# Shared properties
class ReleaseBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)


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


# Database model, database table inferred from class name
class Release(ReleaseBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    discogs_url: str | None = Field(default=None, max_length=255)
    discogs_title: str | None = Field(default=None, max_length=255)
    title: str | None = Field(default=None, max_length=255)
    title_long: str | None = Field(default=None, max_length=255)
    matrix: str | None = Field(default=None, max_length=255)
    sealed: bool | None = Field(default=False)
    spreadsheet_id: int | None = Field(default=None)
    year: int | None = Field(default=None)
    sort_date: date | None = Field(default=None)
    release_date: date | None = Field(default=None)


# Properties to return via API, id is always required
class ReleasePublic(ReleaseBase):
    id: int
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


class ReleasesPublic(SQLModel):
    data: list[ReleasePublic]
    count: int