from datetime import date

from sqlmodel import Field, SQLModel


class DiscogsArtist(SQLModel):
    name: str | None = Field(default=None)
    anv: str | None = Field(default=None)
    join: str | None = Field(default=None)
    role: str | None = Field(default=None)
    tracks: str | None = Field(default=None)
    id: int | None = Field(default=None)
    resource_url: str | None = Field(default=None)
    thumbnail_url: str | None = Field(default=None)


class DiscogsLabel(SQLModel):
    id: int
    name: str
    catno: str | None = Field(default=None)
    entity_type: int
    entity_type_name: str
    resource_url: str
    thumbnail_url: str | None = Field(default=None)


class DiscogsIdentifier(SQLModel):
    type: str
    value: str
    description: str | None = Field(default=None)


class DiscogsTrack(SQLModel):
    position: str
    type_: str
    title: str
    artists: list[DiscogsArtist] | None = Field(default=None)
    extraartists: list[DiscogsArtist] | None = Field(default=None)
    duration: str | None = Field(default=None)


class DiscogsRelease(SQLModel):
    id: int | None = Field(default=None)
    year: int | None = Field(default=None)
    resource_url: str | None = Field(default=None)
    uri: str | None = Field(default=None)
    artists: list[DiscogsArtist] | None = Field(default=None)
    artists_sort: str | None = Field(default=None)
    labels: list[DiscogsLabel] | None = Field(default=None)
    companies: list[DiscogsLabel] | None = Field(default=None)
    # formats: list[DiscogsFormats] | None = Field(default=None)
    master_id: int | None = Field(default=None)
    master_url: str | None = Field(default=None)
    title: str | None = Field(default=None)
    country: str | None = Field(default=None)
    released: str | None = Field(default=None)
    notes: str | None = Field(default=None)
    released_formatted: str | None = Field(default=None)
    identifiers: list[DiscogsIdentifier] | None = Field(default=None)
    tracklist: list[DiscogsTrack] | None = Field(default=None)
    extraartists: list[DiscogsArtist] | None = Field(default=None)


class StorageLocationImport(SQLModel):
    container: str | None = Field(default=None)
    row: int | None = Field(default=0)
    position: int | None = Field(default=0)


class ReleaseImport(SQLModel):
    # rip: Rip | None = Field() | None = Field(default=None)
    # order: Order | None = Field() | None = Field(default=None)
    group: str | None = Field(default=None)
    collection: str | None = Field(default=None)
    album_artist: str | None = Field(default=None)
    album_title: str | None = Field(default=None)
    album_title_long: str | None = Field(default=None)
    discogs_url: str | None = Field(default=None)
    front_image: str | None = Field(default=None)
    back_mage: str | None = Field(default=None)
    discogs_api_url: str | None = Field(default=None)
    matrix: str | None = Field(default=None)
    label: str | None = Field(default=None)
    year: int | None = Field(default=None)
    sort_date: date | None = Field(default=None)
    release_date: date | None = Field(default=None)
    sealed: bool = Field(default=False)
    spreadsheet_id: int | None = Field(default=None)

    location: StorageLocationImport | None = Field(default=None)
    discogs: DiscogsRelease | None = Field(default=None)
