import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import RoleBase


# Properties to receive on role creation
class RoleCreate(RoleBase):
    name: str = Field(max_length=255)


# Properties to receive on role update
class RoleUpdate(RoleBase):
    name: str = Field(max_length=255)


# Properties to return via API, id is always required
class RolePublic(RoleBase):
    id: uuid.UUID
    name: str | None = Field(default=None, max_length=255)


class RolesPublic(SQLModel):
    data: list[RolePublic]
    count: int
