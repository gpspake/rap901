from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete

from app.core.config import settings
from app.core.db import engine, init_db
from app.main import app
from app.models.database_models import (
    Artist,
    Identifier,
    Label,
    Release,
    ReleaseArtist,
    ReleaseLabel,
    Role,
    Track,
    TrackArtist,
)
from app.models.models import Item, User
from app.tests.utils.user import authentication_token_from_email
from app.tests.utils.utils import get_superuser_token_headers


@pytest.fixture(scope="session", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db(session)
        yield session
        session.execute(delete(Item))
        session.execute(delete(Identifier))
        session.execute(delete(ReleaseLabel))
        session.execute(delete(Label))
        session.execute(delete(ReleaseArtist))
        session.execute(delete(TrackArtist))
        session.execute(delete(Artist))
        session.execute(delete(Track))
        session.execute(delete(Role))
        session.execute(delete(Release))
        session.execute(delete(User))
        session.commit()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )
