"""create identifier model

Revision ID: b75f4cb51024
Revises: c97e40e8d197
Create Date: 2024-08-11 18:39:42.692800

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b75f4cb51024'
down_revision = 'c97e40e8d197'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "identifier",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('release_id', postgresql.UUID(as_uuid=True)),
        sa.Column('type', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('description', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('value', sqlmodel.sql.sqltypes.AutoString()),

        sa.PrimaryKeyConstraint('id', name='identifier_pkey'),
        sa.ForeignKeyConstraint(
            ["release_id"],
            ["release.id"],
        )
    )


def downgrade():
    op.drop_table('identifier')
