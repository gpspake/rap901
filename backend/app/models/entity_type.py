import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import EntityTypeBase


# Properties to receive on entity_type creation
class EntityTypeCreate(EntityTypeBase):
    name: str = Field(max_length=255)


# Properties to receive on entity_type update
class EntityTypeUpdate(EntityTypeBase):
    name: str = Field(max_length=255)


# Properties to return via API, id is always required
class EntityTypePublic(EntityTypeBase):
    id: uuid.UUID
    name: str | None = Field(default=None, max_length=255)


class EntityTypesPublic(SQLModel):
    data: list[EntityTypePublic]
    count: int
