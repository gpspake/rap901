import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import IdentifierBase


# Properties to receive on Identifier creation
class IdentifierCreate(IdentifierBase):
    type: str
    description: str | None
    value: str
    release_id: uuid.UUID


# Properties to receive on Identifier update
class IdentifierUpdate(IdentifierBase):
    type: str | None = Field(default=None)
    description: str | None = Field(default=None)
    value: str | None = Field(default=None)


# Properties to return via API, id is always required
class IdentifierPublic(IdentifierBase):
    id: uuid.UUID
    type: str
    description: str | None
    value: str


class IdentifiersPublic(SQLModel):
    data: list[IdentifierPublic]
    count: int
