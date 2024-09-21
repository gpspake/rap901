"""add sort order

Revision ID: 700ac8a84c4d
Revises: e2c545d5ca9a
Create Date: 2024-09-05 02:45:34.006497

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '700ac8a84c4d'
down_revision = 'e2c545d5ca9a'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('track', sa.Column('sort_order', sa.Integer()))
    op.add_column('identifier', sa.Column('sort_order', sa.Integer()))


def downgrade():
    op.drop_column('track', 'sort_order')
    op.drop_column('identifier', 'sort_order')
