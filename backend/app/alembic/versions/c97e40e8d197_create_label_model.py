"""create label model

Revision ID: c97e40e8d197
Revises: 7d552b132e3f
Create Date: 2024-08-10 18:44:33.706354

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c97e40e8d197'
down_revision = '7d552b132e3f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "label",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255)),
        sa.Column('profile', sa.Text()),
        sa.Column('discogs_id', sa.Integer()),
        sa.Column('discogs_resource_url', sqlmodel.sql.sqltypes.AutoString(length=255)),

        sa.PrimaryKeyConstraint('id', name='label_pkey')
    )

    op.create_table(
        "entity_type",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('name', sqlmodel.sql.sqltypes.AutoString(length=255)),

        sa.PrimaryKeyConstraint('id', name='entity_type_pkey')
    )

    op.create_table(
        "release_label",
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False, default=sa.text('uuid_generate_v4()')),
        sa.Column('release_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('label_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("sort_order", sa.Integer, default=0),
        sa.Column("catalog_number", sa.VARCHAR(length=255)),
        sa.Column("entity_type_id", postgresql.UUID(as_uuid=True)),

        sa.ForeignKeyConstraint(
            ['entity_type_id'],
            ['entity_type.id'],
            name='release_label_entity_type_id_fkey'
        ),

        sa.ForeignKeyConstraint(
            ['release_id'],
            ['release.id'],
            name='release_label_release_id_fkey'
        ),

        sa.ForeignKeyConstraint(
            ['label_id'],
            ['label.id'],
            name='release_label_label_id_fkey'
        ),

        sa.PrimaryKeyConstraint('id', name='release_label_pkey')
    )


def downgrade():
    op.drop_table('release_label')
    op.drop_table('entity_type')
    op.drop_table('label')
