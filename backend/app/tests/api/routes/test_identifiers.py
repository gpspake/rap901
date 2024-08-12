import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.identifier import create_random_identifier
from app.tests.utils.release import create_random_release


def test_create_identifier(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)

    data = {
        "type": "Test type",
        "description": "Test description",
        "value": "Test value",
        "release_id": str(release.id),
    }

    response = client.post(
        f"{settings.API_V1_STR}/identifiers/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["type"] == data["type"]
    assert content["description"] == data["description"]
    assert content["value"] == data["value"]
    assert content["value"] == data["value"]
    assert "id" in content


def test_read_identifier(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)
    identifier = create_random_identifier(db, release_id=release.id)
    response = client.get(
        f"{settings.API_V1_STR}/identifiers/{identifier.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["type"] == identifier.type
    assert content["description"] == identifier.description
    assert content["value"] == identifier.value


def test_read_identifier_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/identifiers/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Identifier not found"


def test_read_identifiers(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)
    create_random_identifier(db, release_id=release.id)
    create_random_identifier(db, release_id=release.id)
    response = client.get(
        f"{settings.API_V1_STR}/identifiers/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_identifier(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)
    identifier = create_random_identifier(db, release_id=release.id)
    data = {"description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/identifiers/{identifier.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["description"] == data["description"]
    assert content["id"] == str(identifier.id)


def test_update_identifier_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"description": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/identifiers/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Identifier not found"


def test_update_identifier_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)
    identifier = create_random_identifier(db, release_id=release.id)
    data = {"description": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/identifiers/{identifier.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_identifier(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)
    identifier = create_random_identifier(db, release_id=release.id)
    response = client.delete(
        f"{settings.API_V1_STR}/identifiers/{identifier.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Identifier deleted successfully"


def test_delete_identifier_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/identifiers/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Identifier not found"


def test_delete_identifier_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)
    identifier = create_random_identifier(db, release_id=release.id)
    response = client.delete(
        f"{settings.API_V1_STR}/identifiers/{identifier.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
