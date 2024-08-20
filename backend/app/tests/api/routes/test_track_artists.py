import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.api.routes.utils import get_role_by_name
from app.core.config import settings
from app.tests.utils.artist import create_random_artist
from app.tests.utils.release import create_random_release
from app.tests.utils.track import create_random_track
from app.tests.utils.track_artist import create_random_track_artist


def test_create_track_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db)
    release = create_random_release(db)
    track = create_random_track(db=db, release_id=release.id)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None

    data = {
        "track_id": str(track.id),
        "artist_id": str(artist.id),
        "role_id": str(role.id),
        "anv": "Test Anv",
        "sort_order": 0,
    }

    response = client.post(
        f"{settings.API_V1_STR}/track_artists/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()

    assert content["track_id"] == str(track.id)
    assert content["artist_id"] == str(artist.id)
    assert content["role_id"] == str(role.id)
    assert content["anv"] == data["anv"]
    assert content["sort_order"] == data["sort_order"]
    assert "id" in content

    track_response = client.get(
        f"{settings.API_V1_STR}/tracks/{track.id}",
        headers=superuser_token_headers,
    )
    assert track_response.status_code == 200
    track_content = track_response.json()
    print("***", track_content)
    assert len(track_content["artist_links"]) == 1


def test_read_track_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db)
    track = create_random_track(db)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None

    track_artist = create_random_track_artist(
        db=db, artist_id=artist.id, track_id=track.id, role_name=role.name
    )

    response = client.get(
        f"{settings.API_V1_STR}/track_artists/{track_artist.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()

    assert content["track_id"] == str(track_artist.track_id)
    assert content["artist_id"] == str(track_artist.artist_id)
    assert content["role_id"] == str(track_artist.role_id)
    assert content["anv"] == track_artist.anv
    assert content["sort_order"] == track_artist.sort_order


def test_read_track_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/track_artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "TrackArtist not found"


def test_read_track_artists(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    track = create_random_track(db=db)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None
    create_random_track_artist(
        db=db, artist_id=artist.id, track_id=track.id, role_name=role.name
    )
    response = client.get(
        f"{settings.API_V1_STR}/track_artists/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 1
    assert str(artist.id) in (result["artist_id"] for result in content["data"])


def test_update_track_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    track = create_random_track(db=db)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None
    track_artist = create_random_track_artist(
        db=db, artist_id=artist.id, track_id=track.id, role_name=role.name
    )
    new_role = get_role_by_name(
        session=db, role_name="New Role", create_if_missing=True
    )
    assert new_role is not None
    response = client.put(
        f"{settings.API_V1_STR}/track_artists/{track_artist.id}",
        headers=superuser_token_headers,
        json={"role_id": str(new_role.id)},
    )
    assert response.status_code == 200
    content = response.json()
    assert content["role"]["name"] == new_role.name
    assert content["role"]["id"] == str(new_role.id)


def test_update_track_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    new_role = get_role_by_name(
        session=db, role_name="New Role", create_if_missing=True
    )
    assert new_role is not None
    response = client.put(
        f"{settings.API_V1_STR}/track_artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json={"role_id": str(new_role.id)},
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "TrackArtist not found"


def test_update_track_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    track = create_random_track(db=db)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None
    track_artist = create_random_track_artist(
        db=db, artist_id=artist.id, track_id=track.id, role_name=role.name
    )
    data = {"role": "New Role"}
    response = client.put(
        f"{settings.API_V1_STR}/track_artists/{track_artist.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_track_artist(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db=db)
    track = create_random_track(db=db)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None
    track_artist = create_random_track_artist(
        db=db, artist_id=artist.id, track_id=track.id, role_name=role.name
    )
    response = client.delete(
        f"{settings.API_V1_STR}/track_artists/{track_artist.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "TrackArtist deleted successfully"


def test_delete_track_artist_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/track_artists/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "TrackArtist not found"


def test_delete_track_artist_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    artist = create_random_artist(db)
    track = create_random_track(db)
    role = get_role_by_name(session=db, role_name="Test Role", create_if_missing=True)
    assert role is not None
    track_artist = create_random_track_artist(
        db=db, artist_id=artist.id, track_id=track.id, role_name=role.name
    )
    response = client.delete(
        f"{settings.API_V1_STR}/track_artists/{track_artist.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_create_random_track_artist(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    track_artist = create_random_track_artist(db)

    response = client.get(
        f"{settings.API_V1_STR}/tracks/{track_artist.track_id}",
        headers=normal_user_token_headers,
    )

    assert response.status_code == 200
    content = response.json()

    assert content["id"] == str(track_artist.track_id)
    assert content["artist_links"][0]["artist_id"] == str(track_artist.artist_id)
