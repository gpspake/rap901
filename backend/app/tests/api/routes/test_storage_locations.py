import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.storage_location import create_random_storage_location


def test_create_storage_location(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {
        "container": "Case",
        "spreadsheet_id": 3,
        "row": 1,
        "position": 2,
    }
    response = client.post(
        f"{settings.API_V1_STR}/storage_locations/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["container"] == data["container"]
    assert content["row"] == data["row"]
    assert content["position"] == data["position"]
    assert "id" in content


def test_read_storage_location(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    storage_location = create_random_storage_location(db)
    response = client.get(
        f"{settings.API_V1_STR}/storage_locations/{storage_location.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["container"] == str(storage_location.container)
    assert content["spreadsheet_id"] == storage_location.spreadsheet_id
    assert content["row"] == storage_location.row
    assert content["position"] == storage_location.position


def test_read_storage_location_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/storage_locations/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "StorageLocation not found"


def test_read_storage_locations(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_storage_location(db)
    create_random_storage_location(db)
    response = client.get(
        f"{settings.API_V1_STR}/storage_locations/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_storage_location(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    storage_location = create_random_storage_location(db)
    data = {"container": "Updated Container"}
    response = client.put(
        f"{settings.API_V1_STR}/storage_locations/{storage_location.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["container"] == data["container"]
    assert content["id"] == str(storage_location.id)


def test_update_storage_location_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/storage_locations/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "StorageLocation not found"


def test_update_storage_location_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    storage_location = create_random_storage_location(db)
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/storage_locations/{storage_location.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_storage_location(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    storage_location = create_random_storage_location(db)
    response = client.delete(
        f"{settings.API_V1_STR}/storage_locations/{storage_location.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "StorageLocation deleted successfully"


def test_delete_storage_location_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/storage_locations/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "StorageLocation not found"


def test_delete_storage_location_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    storage_location = create_random_storage_location(db)
    response = client.delete(
        f"{settings.API_V1_STR}/storage_locations/{storage_location.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
