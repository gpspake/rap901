import uuid
from datetime import date

from sqlmodel import Field, SQLModel


# Shared properties
class ReleaseBase(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)


# Database model, database table inferred from class name
class Release(ReleaseBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
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
