import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.release import create_random_release


def test_create_release(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {
        "discogs_url": "https://discogs_url.com/fake",
        "discogs_title": "Discogs Title",
        "title": "Title",
        "title_long": "Title Long",
        "matrix": "ABC123",
        "sealed": True,
        "spreadsheet_id": 2,
        "year": 1995,
        "sort_date": "1995-02-01",
        "release_date": "1995-02-01",
    }
    response = client.post(
        f"{settings.API_V1_STR}/releases/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert "id" in content


def test_read_release(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db)
    response = client.get(
        f"{settings.API_V1_STR}/releases/{release.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    release_sort_date = (
        release.sort_date.strftime("%Y-%m-%d")
        if release.sort_date is not None
        else None
    )
    release_release_date = (
        release.release_date.strftime("%Y-%m-%d")
        if release.release_date is not None
        else None
    )
    content = response.json()
    assert content["id"] == str(release.id)
    assert content["title"] == release.title
    assert content["discogs_url"] == release.discogs_url
    assert content["discogs_title"] == release.discogs_title
    assert content["title"] == release.title
    assert content["title_long"] == release.title_long
    assert content["matrix"] == release.matrix
    assert content["sealed"] == release.sealed
    assert content["spreadsheet_id"] == release.spreadsheet_id
    assert content["year"] == release.year
    assert content["sort_date"] == release_sort_date
    assert content["release_date"] == release_release_date


def test_read_release_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/releases/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Release not found"


def test_read_release_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db)
    response = client.get(
        f"{settings.API_V1_STR}/releases/{release.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_read_releases(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_release(db)
    create_random_release(db)
    response = client.get(
        f"{settings.API_V1_STR}/releases/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_release(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db)
    data = {"title": "Updated title"}
    response = client.put(
        f"{settings.API_V1_STR}/releases/{release.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["id"] == str(release.id)


def test_update_release_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"title": "Updated title", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/releases/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Release not found"


def test_update_release_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db)
    data = {"title": "Updated title", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/releases/{release.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_release(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db)
    response = client.delete(
        f"{settings.API_V1_STR}/releases/{release.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Release deleted successfully"


def test_delete_release_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/releases/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Release not found"


def test_delete_release_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db)
    response = client.delete(
        f"{settings.API_V1_STR}/releases/{release.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
