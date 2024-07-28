import json
import os

from sqlalchemy import MetaData, Table, delete
from sqlmodel import Session, select

from app.backend_pre_start import logger
from app.core.db import engine
from app.models.database_models import Release, StorageLocation
from app.models.release import ReleaseCreate


def clean_db(session: Session):
    # Clean DB
    metadata = MetaData()
    metadata.reflect(bind=engine)

    releases_table = Table("release", metadata, autoload_with=engine)
    delete_releases_stmt = delete(releases_table)
    session.execute(delete_releases_stmt)

    storage_locations_table = Table("storage_location", metadata, autoload_with=engine)
    delete_storage_location_stmt = delete(storage_locations_table)
    session.execute(delete_storage_location_stmt)


def seed_db(session: Session, releases: list[ReleaseCreate], clean: bool = False):
    if clean:
        clean_db(session)

    for release_in in releases:
        # add storage location id
        if (
            "storage_location" in release_in
            and release_in["storage_location"] is not None
        ):
            storage_location_in = release_in.pop("storage_location")
            storage_location = StorageLocation.model_validate(storage_location_in)
            session.add(storage_location)
            session.commit()
            session.refresh(storage_location)
            release_in["storage_location_id"] = storage_location.id

        release = Release.model_validate(release_in)
        session.add(release)
        session.commit()
        session.refresh(release)
        print(f"Created release: {release.id}")


def seed_db_from_file(clean: bool = False) -> None:
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct a path relative to the script directory
    file_path = os.path.join(script_dir, "release_data.json")

    try:
        with open(file_path) as file:
            releases = json.load(file)

        with Session(engine) as session:
            # Try to create session to check if DB is awake
            session.exec(select(1))
            seed_db(session=session, releases=releases, clean=clean)
    except Exception as e:
        logger.error(e)
        raise e


seed_db_from_file(clean=True)
