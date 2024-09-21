import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.label import create_random_label


def test_create_label(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {
        "name": "Bill",
        "slug": "bill",
        "profile": "Label from Memphis TN",
        "discogs_id": "1234",
        "discogs_resource_url": "https://new.com/1234",
    }

    response = client.post(
        f"{settings.API_V1_STR}/labels/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["slug"] == data["slug"]
    assert content["profile"] == data["profile"]
    assert content["discogs_id"] == int(data["discogs_id"])
    assert content["discogs_resource_url"] == data["discogs_resource_url"]
    assert "id" in content


def test_create_label_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    data = {
        "name": "Bill",
        "slug": "bill",
        "profile": "Label from Memphis TN",
        "discogs_id": "1234",
        "discogs_resource_url": "https://new.com/1234",
    }

    response = client.post(
        f"{settings.API_V1_STR}/labels/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_read_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db)
    response = client.get(
        f"{settings.API_V1_STR}/labels/{label.slug}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["name"] == label.name
    assert content["profile"] == label.profile
    assert content["discogs_id"] == label.discogs_id
    assert content["discogs_resource_url"] == label.discogs_resource_url


def test_read_label_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/labels/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Label not found"


def test_read_labels(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_label(db)
    create_random_label(db)
    response = client.get(
        f"{settings.API_V1_STR}/labels/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db)
    data = {"name": "Updated Name"}
    response = client.put(
        f"{settings.API_V1_STR}/labels/{label.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["id"] == str(label.id)


def test_update_label_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/labels/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Label not found"


def test_update_label_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db)
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/labels/{label.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_label(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db)
    response = client.delete(
        f"{settings.API_V1_STR}/labels/{label.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Label deleted successfully"


def test_delete_label_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/labels/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Label not found"


def test_delete_label_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    label = create_random_label(db)
    response = client.delete(
        f"{settings.API_V1_STR}/labels/{label.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
