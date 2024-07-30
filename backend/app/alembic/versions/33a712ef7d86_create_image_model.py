"""create image model

Revision ID: 33a712ef7d86
Revises: 22be3d989527
Create Date: 2024-07-30 05:41:29.807547

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '33a712ef7d86'
down_revision = '22be3d989527'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "image",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('release_id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('date_taken', sa.Date()),
        sa.Column('image_type', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('original_path', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('new_path', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('alt_text', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column('cloudflare_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),

        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('image')
