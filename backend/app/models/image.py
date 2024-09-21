import datetime
import uuid

from sqlmodel import Field, SQLModel

from app.models.database_models import ImageBase, ImageRelease


# Properties to receive on Image creation
class ImageCreate(ImageBase):
    date_taken: datetime.date | None = Field(default=None)
    image_type: str | None = Field(default=None, max_length=255)
    display_type: str | None = Field(default=None, max_length=255)
    original_path: str | None = Field(default=None, max_length=255)
    new_path: str | None = Field(default=None, max_length=255)
    alt_text: str | None = Field(default=None, max_length=255)
    cloudflare_id: str | None = Field(default=None, max_length=255)
    release_id: uuid.UUID | None = Field(default=None)


# Properties to receive on Image update
class ImageUpdate(ImageBase):
    date_taken: datetime.date | None = Field(default=None)
    image_type: str | None = Field(default=None, max_length=255)
    display_type: str | None = Field(default=None)
    alt_text: str | None = Field(default=None, max_length=255)
    cloudflare_id: str | None = Field(default=None, max_length=255)


# Properties to return via API, id is always required
class ImagePublic(ImageBase):
    id: uuid.UUID
    date_taken: datetime.date
    image_type: str
    display_type: str | None = Field(default=None)
    alt_text: str
    cloudflare_id: str
    release: ImageRelease | None


class ImagesPublic(SQLModel):
    data: list[ImagePublic]
    count: int
