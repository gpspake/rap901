"""create artist model

Revision ID: 7d552b132e3f
Revises: 33a712ef7d86
Create Date: 2024-08-06 16:49:08.603125

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '7d552b132e3f'
down_revision = '33a712ef7d86'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "artist",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255)),
        sa.Column('profile', sa.Text()),
        sa.Column('discogs_id', sa.Integer()),
        sa.Column('discogs_resource_url', sqlmodel.sql.sqltypes.AutoString(length=255)),

        sa.PrimaryKeyConstraint('id', name='artist_pkey')
    )

    op.create_table(
        "role",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255)),

        sa.PrimaryKeyConstraint('id', name='role_pkey')
    )

    op.create_table(
        "release_artist",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('release_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('artist_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("sort_order", sa.Integer, default=0),
        sa.Column("join", sa.VARCHAR(length=255)),
        sa.Column("anv", sa.VARCHAR(length=255)),
        sa.Column("role_id", postgresql.UUID(as_uuid=True)),

        sa.ForeignKeyConstraint(
            ['role_id'],
            ['role.id'],
            name='release_artist_role_id_fkey'
        ),

        sa.ForeignKeyConstraint(
            ['release_id'],
            ['release.id'],
            name='release_artist_release_id_fkey'
        ),

        sa.ForeignKeyConstraint(
            ['artist_id'],
            ['artist.id'],
            name='release_artist_artist_id_fkey'
        ),

        sa.PrimaryKeyConstraint('id', name='release_artist_pkey')
    )


def downgrade():
    op.drop_table('release_artist')
    op.drop_table('role')
    op.drop_table('artist')

