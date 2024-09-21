import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.release import create_random_release
from app.tests.utils.track import create_random_track


def test_create_track(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    release = create_random_release(db=db)

    data = {
        "position": "1",
        "type": "track",
        "title": "Track Title",
        "duration": "3:22",
        "release_id": str(release.id),
        "sort_order": 0,
    }

    response = client.post(
        f"{settings.API_V1_STR}/tracks/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["release_id"] == str(release.id)

    db.refresh(release)
    assert len(release.tracks) == 1


def test_read_track(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    track = create_random_track(db=db)
    response = client.get(
        f"{settings.API_V1_STR}/tracks/{track.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["release_id"] == str(track.release_id)
    assert content["type"] == track.type
    assert content["duration"] == track.duration


def test_read_track_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/tracks/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Track not found"


def test_read_tracks(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_track(db)
    create_random_track(db)
    response = client.get(
        f"{settings.API_V1_STR}/tracks/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_track(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    track = create_random_track(db)
    data = {"duration": "1:23"}
    response = client.put(
        f"{settings.API_V1_STR}/tracks/{track.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["duration"] == data["duration"]
    assert content["id"] == str(track.id)


def test_update_track_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/tracks/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Track not found"


def test_update_track_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    track = create_random_track(db)
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/tracks/{track.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_track(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    track = create_random_track(db)
    response = client.delete(
        f"{settings.API_V1_STR}/tracks/{track.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Track deleted successfully"


def test_delete_track_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/tracks/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Track not found"


def test_delete_track_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    track = create_random_track(db)
    response = client.delete(
        f"{settings.API_V1_STR}/tracks/{track.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
