"""add image display type

Revision ID: e2c545d5ca9a
Revises: 914cc8097621
Create Date: 2024-08-26 00:50:13.644560

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'e2c545d5ca9a'
down_revision = '914cc8097621'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'image',
        sa.Column('display_type', sqlmodel.sql.sqltypes.AutoString())
    )


def downgrade():
    op.drop_column('image', 'display_type')
