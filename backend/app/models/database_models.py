import uuid
from datetime import date
from typing import Optional

from sqlmodel import Field, Relationship, SQLModel


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

    storage_location_id: uuid.UUID | None = Field(
        default=None, foreign_key="storage_location.id"
    )
    storage_location: Optional["StorageLocation"] = Relationship(
        back_populates="release"
    )


# Shared properties
class StorageLocationBase(SQLModel):
    spreadsheet_id: int | None = Field(default=0)
    container: str | None = Field(default=None, max_length=255)
    row: int | None = Field(default=0)
    position: int | None = Field(default=0)


# Database model, database table inferred from class name
class StorageLocation(StorageLocationBase, table=True):
    __tablename__ = "storage_location"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    spreadsheet_id: int | None = Field(default=0)
    container: str | None = Field(default=None, max_length=255)
    row: int | None = Field(default=0)
    position: int | None = Field(default=0)

    release: Release | None = Relationship(
        sa_relationship_kwargs={"uselist": False}, back_populates="storage_location"
    )
