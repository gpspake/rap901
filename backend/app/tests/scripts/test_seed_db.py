from sqlalchemy import func, select
from sqlmodel import Session

from app.api.deps import SessionDep
from app.models.database_models import Release
from app.tests.utils.release_import import build_random_release_import
from scripts.seed_db import (
    clean_db,
    seed_db,
    seed_db_from_file,
    validate_import_file,
)


def test_seed_db(db: SessionDep) -> None:
    seed_db(
        session=db,
        releases_in=[build_random_release_import()],
        clean=True,
    )

    count_statement = select(func.count()).select_from(Release)
    count_before = db.exec(count_statement).one()  # type: ignore
    seed_db(
        session=db,
        releases_in=[build_random_release_import(), build_random_release_import()],
        clean=False,
    )
    count = db.exec(count_statement).one()  # type: ignore
    seed_db(session=db, releases_in=[build_random_release_import()], clean=True)
    count_final = db.exec(count_statement).one()  # type: ignore

    assert count_before[0] == 1
    assert count[0] == 3
    assert count_final[0] == 1


def test_validate_import_file() -> None:
    results = validate_import_file()
    assert len(results) == 25


def test_seed_db_from_file(db: Session) -> None:
    count_statement = select(func.count()).select_from(Release)
    results = seed_db_from_file(clean=True)
    count = db.exec(count_statement).one()  # type: ignore

    assert len(results) == 25
    assert count[0] == 25


def test_clean_db(db: Session) -> None:
    count_statement = select(func.count()).select_from(Release)
    seed_db_from_file(clean=True)
    count_before = db.exec(count_statement).one()  # type: ignore
    clean_db(session=db)
    count_after = db.exec(count_statement).one()  # type: ignore
    assert count_before[0] > 0
    assert count_after[0] == 0
