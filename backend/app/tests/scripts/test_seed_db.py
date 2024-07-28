from typing import Any

from sqlalchemy import func, select
from sqlmodel import Session

from app.api.deps import SessionDep
from app.models.database_models import Release
from app.tests.utils.release import build_random_release
from scripts.seed_db import seed_db, seed_db_from_file


def contains_value(data: list[Any], key: str, value: Any) -> bool:
    return any(item.get(key) == value for item in data)


def test_seed_db(db: SessionDep) -> None:
    seed_db(session=db, releases=[build_random_release()], clean=True)
    count_statement = select(func.count()).select_from(Release)
    count_before = db.exec(count_statement).one()  # type: ignore
    seed_db(
        session=db,
        releases=[build_random_release(), build_random_release()],
        clean=False,
    )
    count = db.exec(count_statement).one()  # type: ignore
    seed_db(session=db, releases=[build_random_release()], clean=True)
    count_final = db.exec(count_statement).one()  # type: ignore

    assert count_before[0] == 1
    assert count[0] == 3
    assert count_final[0] == 1


def test_seed_db_from_file(db: Session) -> None:
    count_statement = select(func.count()).select_from(Release)
    seed_db_from_file(clean=True)
    count = db.exec(count_statement).one()  # type: ignore

    assert count[0] == 2
