"""create storage location model

Revision ID: 22be3d989527
Revises: 3e7ae2bab77f
Create Date: 2024-07-28 03:47:00.516722

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy import Column
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = '22be3d989527'
down_revision = '3e7ae2bab77f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "storage_location",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('spreadsheet_id', sa.Integer(), nullable=False),
        sa.Column('container', sqlmodel.sql.sqltypes.AutoString(length=100), nullable=False),
        sa.Column('row', sa.Integer(), nullable=False),
        sa.Column('position', sa.Integer(), nullable=False),

        sa.PrimaryKeyConstraint('id', name='storage_location_pkey')
    )

    with op.batch_alter_table("release") as batch_op:
        batch_op.add_column(Column("storage_location_id", postgresql.UUID(as_uuid=True)))
        batch_op.create_foreign_key(
            "fk_release_storage_location",
            "storage_location",
            ["storage_location_id"],
            ["id"],
        )


def downgrade():
    with op.batch_alter_table("release") as batch_op:
        batch_op.drop_constraint(
            'fk_release_storage_location',
            type_='foreignkey'
        )
        batch_op.drop_column("storage_location_id")

    op.drop_table('storage_location')
