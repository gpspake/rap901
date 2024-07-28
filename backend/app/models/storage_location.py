import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import StorageLocationBase


# Properties to receive on storage_location creation
class StorageLocationCreate(StorageLocationBase):
    spreadsheet_id: int | None = Field(default=0)
    container: str | None = Field(default=None, max_length=255)
    row: int | None = Field(default=0)
    position: int | None = Field(default=0)


# Properties to receive on storage_location update
class StorageLocationUpdate(StorageLocationBase):
    spreadsheet_id: int | None = Field(default=0)
    container: str | None = Field(default=None, max_length=255)
    row: int | None = Field(default=0)
    position: int | None = Field(default=0)


# Properties to return via API, id is always required
class StorageLocationPublic(StorageLocationBase):
    id: uuid.UUID
    spreadsheet_id: int | None = Field(default=0)
    container: str | None = Field(default=None, max_length=255)
    row: int | None = Field(default=0)
    position: int | None = Field(default=0)


class StorageLocationsPublic(SQLModel):
    data: list[StorageLocationPublic]
    count: int
