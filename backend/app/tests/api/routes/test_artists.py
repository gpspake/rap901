import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.artist import create_random_artist


def test_create_artist(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {
        "name": "Bill",
        "slug": "bill",
        "profile": "Artist from Memphis TN",
        "discogs_id": "1234",
        "discogs_resource_url": "https://new.com/1234",
    }

    response = client.post(
        f"{settings.API_V1_STR}/artists/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["profile"] == data["profile"]
    assert content["discogs_id"] == int(data["discogs_id"])
    assert content["discogs_resource_url"] == data["discogs_resource_url"]
    assert "id" in content


def test_create_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    data = {
        "name": "Bill",
        "slug": "bill",
        "profile": "Artist from Memphis TN",
        "discogs_id": "1234",
        "discogs_resource_url": "https://new.com/1234",
    }

    response = client.post(
        f"{settings.API_V1_STR}/artists/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_read_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    response = client.get(
        f"{settings.API_V1_STR}/artists/{artist.slug}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["name"] == artist.name
    assert content["profile"] == artist.profile
    assert content["discogs_id"] == artist.discogs_id
    assert content["discogs_resource_url"] == artist.discogs_resource_url


def test_read_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/artists/fake",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Artist not found"


def test_read_artists(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_artist(db=db)
    create_random_artist(db=db)
    response = client.get(
        f"{settings.API_V1_STR}/artists/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    data = {"name": "Updated Name"}
    response = client.put(
        f"{settings.API_V1_STR}/artists/{artist.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["id"] == str(artist.id)


def test_update_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Artist not found"


def test_update_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/artists/{artist.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    response = client.delete(
        f"{settings.API_V1_STR}/artists/{artist.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Artist deleted successfully"


def test_delete_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Artist not found"


def test_delete_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    response = client.delete(
        f"{settings.API_V1_STR}/artists/{artist.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
