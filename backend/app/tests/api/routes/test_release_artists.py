import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.artist import create_random_artist
from app.tests.utils.release import create_random_release
from app.tests.utils.release_artist import (
    create_random_release_artist,
    get_or_create_role_by_name,
)


def test_create_release_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")

    data = {
        "release_id": str(release.id),
        "artist_id": str(artist.id),
        "role_id": str(role.id),
        "anv": "Test Anv",
        "sort_order": 0,
    }

    response = client.post(
        f"{settings.API_V1_STR}/release_artists/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()

    assert content["release_id"] == data["release_id"]
    assert content["artist_id"] == data["artist_id"]
    assert content["role_id"] == data["role_id"]
    assert content["anv"] == data["anv"]
    assert content["sort_order"] == data["sort_order"]
    assert "id" in content


def test_read_release_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")
    release_artist = create_random_release_artist(
        db=db, artist_id=artist.id, release_id=release.id, role_name=role.name
    )
    response = client.get(
        f"{settings.API_V1_STR}/release_artists/{release_artist.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()

    assert content["release_id"] == str(release_artist.release_id)
    assert content["artist_id"] == str(release_artist.artist_id)
    assert content["role_id"] == str(release_artist.role_id)
    assert content["anv"] == release_artist.anv
    assert content["sort_order"] == release_artist.sort_order


def test_read_release_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/release_artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "ReleaseArtist not found"


def test_read_release_artists(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")
    create_random_release_artist(
        db=db, artist_id=artist.id, release_id=release.id, role_name=role.name
    )
    response = client.get(
        f"{settings.API_V1_STR}/release_artists/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 1
    assert str(artist.id) in (result["artist_id"] for result in content["data"])


def test_update_release_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")
    release_artist = create_random_release_artist(
        db=db, artist_id=artist.id, release_id=release.id, role_name=role.name
    )
    new_role = get_or_create_role_by_name(db=db, name="New Role")
    response = client.put(
        f"{settings.API_V1_STR}/release_artists/{release_artist.id}",
        headers=superuser_token_headers,
        json={"role_id": str(new_role.id)},
    )
    assert response.status_code == 200
    content = response.json()
    assert content["role"]["name"] == new_role.name
    assert content["role"]["id"] == str(new_role.id)


def test_update_release_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    new_role = get_or_create_role_by_name(db=db, name="New Role")
    response = client.put(
        f"{settings.API_V1_STR}/release_artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json={"role_id": str(new_role.id)},
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "ReleaseArtist not found"


def test_update_release_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")
    release_artist = create_random_release_artist(
        db=db, artist_id=artist.id, release_id=release.id, role_name=role.name
    )
    data = {"role": "New Role"}
    response = client.put(
        f"{settings.API_V1_STR}/release_artists/{release_artist.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_release_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")
    release_artist = create_random_release_artist(
        db=db, artist_id=artist.id, release_id=release.id, role_name=role.name
    )
    response = client.delete(
        f"{settings.API_V1_STR}/release_artists/{release_artist.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "ReleaseArtist deleted successfully"


def test_delete_release_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/release_artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "ReleaseArtist not found"


def test_delete_release_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    release = create_random_release(db=db)
    role = get_or_create_role_by_name(db=db, name="Test Role")
    release_artist = create_random_release_artist(
        db=db, artist_id=artist.id, release_id=release.id, role_name=role.name
    )
    response = client.delete(
        f"{settings.API_V1_STR}/release_artists/{release_artist.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_create_random_release_artist(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    release_artist = create_random_release_artist(db=db)

    response = client.get(
        f"{settings.API_V1_STR}/releases/{release_artist.release_id}",
        headers=normal_user_token_headers,
    )

    assert response.status_code == 200
    content = response.json()

    assert content["id"] == str(release_artist.release_id)
    assert content["artist_links"][0]["artist"]["id"] == str(release_artist.artist_id)
