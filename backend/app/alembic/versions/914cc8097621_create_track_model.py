"""create track model

Revision ID: 914cc8097621
Revises: b75f4cb51024
Create Date: 2024-08-18 04:21:16.717737

"""
import sqlmodel
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '914cc8097621'
down_revision = 'b75f4cb51024'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "track",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('release_id', postgresql.UUID(as_uuid=True)),
        sa.Column('position', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('type', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('title', sqlmodel.sql.sqltypes.AutoString()),
        sa.Column('duration', sqlmodel.sql.sqltypes.AutoString()),

        sa.PrimaryKeyConstraint('id', name='track_pkey'),
        sa.ForeignKeyConstraint(
            ["release_id"],
            ["release.id"],
        )
    )

    op.create_table(
        "track_artist",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('track_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('artist_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("sort_order", sa.Integer, default=0),
        sa.Column("join", sa.VARCHAR(length=255)),
        sa.Column("anv", sa.VARCHAR(length=255)),
        sa.Column("role_id", postgresql.UUID(as_uuid=True)),

        sa.ForeignKeyConstraint(
            ['role_id'],
            ['role.id'],
            name='track_artist_role_id_fkey'
        ),

        sa.ForeignKeyConstraint(
            ['track_id'],
            ['track.id'],
            name='track_artist_track_id_fkey'
        ),

        sa.ForeignKeyConstraint(
            ['artist_id'],
            ['artist.id'],
            name='track_artist_artist_id_fkey'
        ),

        sa.PrimaryKeyConstraint('id', name='track_artist_pkey')
    )


def downgrade():
    op.drop_table('track_artist')
    op.drop_table('track')
