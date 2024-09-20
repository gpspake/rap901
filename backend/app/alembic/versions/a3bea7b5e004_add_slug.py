"""add slug

Revision ID: a3bea7b5e004
Revises: 700ac8a84c4d
Create Date: 2024-09-14 04:07:24.269108

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = 'a3bea7b5e004'
down_revision = '700ac8a84c4d'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'release',
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString())
    )
    op.add_column(
        'artist',
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString())
    )
    op.add_column(
        'label',
        sa.Column('slug', sqlmodel.sql.sqltypes.AutoString())
    )

    op.create_unique_constraint('unique_release_slug', 'release', ['slug'])
    op.create_unique_constraint('unique_artist_slug', 'artist', ['slug'])
    op.create_unique_constraint('unique_label_slug', 'label', ['slug'])


def downgrade():
    op.drop_constraint('unique_label_slug', 'label', type_='unique')
    op.drop_constraint('unique_artist_slug', 'artist', type_='unique')
    op.drop_constraint('unique_release_slug', 'release', type_='unique')

    op.drop_column('label', 'slug')
    op.drop_column('artist', 'slug')
    op.drop_column('release', 'slug')



