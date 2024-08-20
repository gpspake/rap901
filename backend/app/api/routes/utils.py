from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr
from sqlmodel import Session, select

from app import crud
from app.api.deps import get_current_active_superuser
from app.models.database_models import Role
from app.models.models import Message
from app.models.role import RoleCreate
from app.utils import generate_test_email, send_email

router = APIRouter()


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")


def get_role_by_name(
    session: Session, role_name: str, create_if_missing: bool = False
) -> Role | None:
    existing_role = session.exec(select(Role).where(Role.name == role_name)).first()

    if existing_role and create_if_missing:
        return existing_role
    else:
        return crud.create_role(session=session, role_in=RoleCreate(name=role_name))
