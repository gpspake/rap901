import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.label import create_random_label
from app.tests.utils.release import create_random_release
from app.tests.utils.release_label import (
    create_random_release_label,
    get_or_create_entity_type_by_name,
)


def test_create_release_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")

    data = {
        "release_id": str(release.id),
        "label_id": str(label.id),
        "entity_type_id": str(entity_type.id),
        "catalog_number": "Test Catalog number",
        "sort_order": 0,
    }

    response = client.post(
        f"{settings.API_V1_STR}/release_labels/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()

    assert content["release_id"] == data["release_id"]
    assert content["label_id"] == data["label_id"]
    assert content["entity_type_id"] == data["entity_type_id"]
    assert content["catalog_number"] == data["catalog_number"]
    assert content["sort_order"] == data["sort_order"]
    assert "id" in content


def test_read_release_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")
    release_label = create_random_release_label(
        db=db,
        label_id=label.id,
        release_id=release.id,
        entity_type_name=entity_type.name,
    )
    response = client.get(
        f"{settings.API_V1_STR}/release_labels/{release_label.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()

    assert content["release_id"] == str(release_label.release_id)
    assert content["label_id"] == str(release_label.label_id)
    assert content["entity_type_id"] == str(release_label.entity_type_id)
    assert content["catalog_number"] == release_label.catalog_number
    assert content["sort_order"] == release_label.sort_order


def test_read_release_label_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/release_labels/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "ReleaseLabel not found"


def test_read_release_labels(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")
    create_random_release_label(
        db=db,
        label_id=label.id,
        release_id=release.id,
        entity_type_name=entity_type.name,
    )
    response = client.get(
        f"{settings.API_V1_STR}/release_labels/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 1
    assert str(label.id) in (str(result["label_id"]) for result in content["data"])


def test_update_release_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")
    release_label = create_random_release_label(
        db=db,
        label_id=label.id,
        release_id=release.id,
        entity_type_name=entity_type.name,
    )
    new_entity_type = get_or_create_entity_type_by_name(db=db, name="New Role")
    response = client.put(
        f"{settings.API_V1_STR}/release_labels/{release_label.id}",
        headers=superuser_token_headers,
        json={"entity_type_id": str(new_entity_type.id)},
    )
    assert response.status_code == 200
    content = response.json()
    assert content["entity_type"]["name"] == new_entity_type.name
    assert content["entity_type"]["id"] == str(new_entity_type.id)


def test_update_release_label_not_found(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    new_entity_type = get_or_create_entity_type_by_name(db=db, name="New Role")
    response = client.put(
        f"{settings.API_V1_STR}/release_labels/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json={"entity_type_id": str(new_entity_type.id)},
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "ReleaseLabel not found"


def test_update_release_label_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")
    release_label = create_random_release_label(
        db=db,
        label_id=label.id,
        release_id=release.id,
        entity_type_name=entity_type.name,
    )
    data = {"entity_type": "New Role"}
    response = client.put(
        f"{settings.API_V1_STR}/release_labels/{release_label.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_release_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")
    release_label = create_random_release_label(
        db=db,
        label_id=label.id,
        release_id=release.id,
        entity_type_name=entity_type.name,
    )
    response = client.delete(
        f"{settings.API_V1_STR}/release_labels/{release_label.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "ReleaseLabel deleted successfully"


def test_delete_release_label_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/release_labels/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "ReleaseLabel not found"


def test_delete_release_label_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db=db)
    release = create_random_release(db=db)
    entity_type = get_or_create_entity_type_by_name(db=db, name="Test Role")
    release_label = create_random_release_label(
        db=db,
        label_id=label.id,
        release_id=release.id,
        entity_type_name=entity_type.name,
    )
    response = client.delete(
        f"{settings.API_V1_STR}/release_labels/{release_label.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_create_random_release_label(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release_label = create_random_release_label(db=db)

    response = client.get(
        f"{settings.API_V1_STR}/releases/{release_label.release.slug}",
        headers=normal_user_token_headers,
    )

    assert response.status_code == 200
    content = response.json()

    assert content["id"] == str(release_label.release_id)
    assert content["companies"][0]["label_id"] == str(release_label.label_id)
