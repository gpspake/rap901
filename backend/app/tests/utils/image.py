import random

from faker import Faker
from sqlmodel import Session

from app import crud
from app.models.database_models import Image
from app.models.image import ImageCreate

fake = Faker()


def build_random_image() -> ImageCreate:
    return ImageCreate(
        date_taken=fake.date(),
        image_type=random.choice(["jewel_front", "jewel_back"]),
        original_path=fake.file_path(),
        new_path=fake.file_path(),
        alt_text=fake.sentence(nb_words=3).title().rstrip("."),
        cloudflare_id=fake.word(),
    )


def create_random_image(db: Session) -> Image:
    image_in = build_random_image()
    return crud.create_image(session=db, image_in=image_in)
