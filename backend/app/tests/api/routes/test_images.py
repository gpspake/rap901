import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.image import create_random_image


def test_create_image(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {
        "date_taken": "1995-02-01",
        "image_type": "jewel_back",
        "original_path": "/abc/test.jpg",
        "new_path": "/new/test.jpg",
        "alt_text": "Album - Jewel Back",
        "cloudflare_id": "abcdef",
    }

    response = client.post(
        f"{settings.API_V1_STR}/images/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["date_taken"] == data["date_taken"]
    assert content["image_type"] == data["image_type"]
    assert content["cloudflare_id"] == data["cloudflare_id"]
    assert "id" in content


def test_read_image(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    image = create_random_image(db)
    response = client.get(
        f"{settings.API_V1_STR}/images/{image.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200

    content = response.json()
    assert content["date_taken"] == str(image.date_taken)
    assert content["image_type"] == image.image_type
    assert content["cloudflare_id"] == image.cloudflare_id


def test_read_image_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/images/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Image not found"


def test_read_images(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_image(db)
    create_random_image(db)
    response = client.get(
        f"{settings.API_V1_STR}/images/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_image(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    image = create_random_image(db)
    data = {"alt_text": "Updated Alt Text"}
    response = client.put(
        f"{settings.API_V1_STR}/images/{image.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["alt_text"] == data["alt_text"]
    assert content["id"] == str(image.id)


def test_update_image_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/images/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Image not found"


def test_update_image_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    image = create_random_image(db)
    data = {"container": "Updated container"}
    response = client.put(
        f"{settings.API_V1_STR}/images/{image.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_image(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    image = create_random_image(db)
    response = client.delete(
        f"{settings.API_V1_STR}/images/{image.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Image deleted successfully"


def test_delete_image_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/images/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Image not found"


def test_delete_image_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    image = create_random_image(db)
    response = client.delete(
        f"{settings.API_V1_STR}/images/{image.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
