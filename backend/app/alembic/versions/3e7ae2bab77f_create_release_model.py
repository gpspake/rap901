"""create release model

Revision ID: 3e7ae2bab77f
Revises: d98dd8ec85a3
Create Date: 2024-07-25 02:46:50.518100

"""

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '3e7ae2bab77f'
down_revision = 'd98dd8ec85a3'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "release",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('discogs_url', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('discogs_title', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('title', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('title_long', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('matrix', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('sealed', sa.Boolean()),
        sa.Column('spreadsheet_id', sa.Integer()),
        sa.Column('year', sa.Integer()),
        sa.Column('sort_date', sa.Date()),
        sa.Column('release_date', sa.Date()),

        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('release')
