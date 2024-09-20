export type AppearanceReleasePublic = {
	title: string | null;
	discogs_url: string | null;
	discogs_title: string | null;
	title_long: string | null;
	matrix: string | null;
	slug: string | null;
	sealed: boolean | null;
	spreadsheet_id?: number | null;
	year: number | null;
	sort_date: string | null;
	release_date: string | null;
	id: string;
	images: Array<ReleaseImage> | null;
};



export type ArtistBaseWithId = {
	name?: string | null;
	slug?: string | null;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
	id: string;
};



export type ArtistCreate = {
	name: string;
	slug: string;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
};



export type ArtistOut = {
	name: string;
	slug: string;
	profile: string;
	discogs_id: number;
	discogs_resource_url: string;
	id: string;
	releases: Array<ReleaseOut>;
	credits: Array<ReleaseOut>;
};



export type ArtistPublic = {
	name: string;
	slug: string;
	profile: string;
	discogs_id: number;
	discogs_resource_url: string;
	id: string;
	release_links: Array<ArtistReleaseLink>;
};



export type ArtistRelease = {
	title?: string | null;
	discogs_url?: string | null;
	discogs_title?: string | null;
	title_long?: string | null;
	matrix?: string | null;
	slug?: string | null;
	sealed?: boolean | null;
	spreadsheet_id?: number | null;
	year?: number | null;
	sort_date?: string | null;
	release_date?: string | null;
	images?: Array<Image>;
	artist_links?: Array<ReleaseArtist>;
};



export type ArtistReleaseLink = {
	release_id: string;
	artist_id: string;
	role_id: string | null;
	id: string;
	role?: Role | null;
	anv: string | null;
	join: string | null;
	sort_order: number;
	release: ArtistRelease | null;
};



export type ArtistUpdate = {
	name?: string | null;
	slug?: string | null;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
};



export type ArtistsPublic = {
	data: Array<ArtistPublic>;
	count: number;
};



export type Body_login_login_access_token = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};



export type EntityType = {
	name?: string | null;
	id?: string;
};



export type HTTPValidationError = {
	detail?: Array<ValidationError>;
};



export type IdentifierCreate = {
	type: string;
	description: string | null;
	value: string;
	release_id: string;
	sort_order: number;
};



export type IdentifierPublic = {
	type: string;
	description: string | null;
	value: string;
	id: string;
};



export type IdentifierUpdate = {
	type?: string | null;
	description?: string | null;
	value?: string | null;
};



export type IdentifiersPublic = {
	data: Array<IdentifierPublic>;
	count: number;
};



export type Image = {
	date_taken?: string | null;
	image_type?: string | null;
	original_path?: string | null;
	new_path?: string | null;
	alt_text?: string | null;
	cloudflare_id?: string | null;
	id?: string;
	display_type?: string | null;
	release_id?: string | null;
};



export type ImageCreate = {
	date_taken?: string | null;
	image_type?: string | null;
	original_path?: string | null;
	new_path?: string | null;
	alt_text?: string | null;
	cloudflare_id?: string | null;
	display_type?: string | null;
	release_id?: string | null;
};



export type ImagePublic = {
	date_taken: string;
	image_type: string;
	original_path?: string | null;
	new_path?: string | null;
	alt_text: string;
	cloudflare_id: string;
	id: string;
	display_type?: string | null;
	release: ImageRelease | null;
};



export type ImageRelease = {
	title: string | null;
	discogs_url: string | null;
	discogs_title: string | null;
	title_long: string | null;
	matrix: string | null;
	slug?: string | null;
	sealed: boolean | null;
	spreadsheet_id: number | null;
	year: number | null;
	sort_date: string | null;
	release_date: string | null;
	id: string | null;
};



export type ImageUpdate = {
	date_taken?: string | null;
	image_type?: string | null;
	original_path?: string | null;
	new_path?: string | null;
	alt_text?: string | null;
	cloudflare_id?: string | null;
	display_type?: string | null;
};



export type ImagesPublic = {
	data: Array<ImagePublic>;
	count: number;
};



export type ItemCreate = {
	title: string;
	description?: string | null;
};



export type ItemPublic = {
	title: string;
	description?: string | null;
	id: string;
	owner_id: string;
};



export type ItemUpdate = {
	title?: string | null;
	description?: string | null;
};



export type ItemsPublic = {
	data: Array<ItemPublic>;
	count: number;
};



export type LabelBaseWithId = {
	name?: string | null;
	slug?: string | null;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
	id: string;
};



export type LabelCreate = {
	name: string;
	slug: string;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
};



export type LabelOut = {
	name: string;
	slug: string;
	profile: string;
	discogs_id: number;
	discogs_resource_url: string;
	id: string;
	releases: Array<ReleaseOut>;
	credits: Array<ReleaseOut>;
};



export type LabelPublic = {
	name: string;
	slug?: string | null;
	profile: string;
	discogs_id: number;
	discogs_resource_url: string;
	id: string;
	release_links: Array<LabelReleaseLink>;
};



export type LabelReleaseLink = {
	release_id: string;
	artist_id?: string | null;
	entity_type_id: string | null;
	id: string;
	label_id: string;
	entity_type?: EntityType | null;
	catalog_number: string | null;
	sort_order: number;
	release: ReleaseBase | null;
};



export type LabelUpdate = {
	name?: string | null;
	slug?: string | null;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
};



export type LabelsPublic = {
	data: Array<LabelPublic>;
	count: number;
};



export type Message = {
	message: string;
};



export type NewPassword = {
	token: string;
	new_password: string;
};



export type ReleaseArtist = {
	id?: string;
	release_id: string;
	artist_id: string;
	role_id: string | null;
	anv?: string | null;
	join?: string | null;
	sort_order?: number;
};



export type ReleaseArtistCreate = {
	release_id: string;
	artist_id: string;
	role_id?: string | null;
	anv?: string | null;
	join?: string | null;
	sort_order?: number | null;
};



export type ReleaseArtistLink = {
	release_id: string;
	artist_id: string;
	role_id: string | null;
	id: string;
	role?: Role | null;
	anv: string | null;
	join: string | null;
	sort_order: number;
	artist: ArtistBaseWithId | null;
};



export type ReleaseArtistOut = {
	release_id: string;
	artist_id: string;
	role_id?: string | null;
	id: string;
	role?: Role | null;
	anv: string | null;
	join: string | null;
	sort_order: number;
	name: string | null;
	slug: string;
	profile: string | null;
	discogs_id: number | null;
	discogs_resource_url: string | null;
};



export type ReleaseArtistPublic = {
	release_id: string;
	artist_id: string;
	role_id: string | null;
	id: string;
	role?: Role | null;
	anv: string | null;
	join: string | null;
	sort_order: number;
};



export type ReleaseArtistUpdate = {
	release_id?: string | null;
	artist_id?: string | null;
	role_id?: string | null;
	anv?: string | null;
	join?: string | null;
	sort_order?: number | null;
};



export type ReleaseArtistsPublic = {
	data: Array<ReleaseArtistPublic>;
	count: number;
};



export type ReleaseBase = {
	title?: string | null;
	discogs_url?: string | null;
	discogs_title?: string | null;
	title_long?: string | null;
	matrix?: string | null;
	slug?: string | null;
	sealed?: boolean | null;
	spreadsheet_id?: number | null;
	year?: number | null;
	sort_date?: string | null;
	release_date?: string | null;
};



export type ReleaseCreate = {
	title?: string | null;
	discogs_url?: string | null;
	discogs_title?: string | null;
	title_long?: string | null;
	matrix?: string | null;
	slug?: string | null;
	sealed?: boolean | null;
	spreadsheet_id?: number | null;
	year?: number | null;
	sort_date?: string | null;
	release_date?: string | null;
	storage_location_id?: string | null;
};



export type ReleaseImage = {
	date_taken: string | null;
	image_type: string | null;
	original_path?: string | null;
	new_path?: string | null;
	alt_text: string | null;
	cloudflare_id: string | null;
	id: string | null;
	display_type: string | null;
};



export type ReleaseLabelCreate = {
	release_id: string;
	artist_id?: string | null;
	entity_type_id?: string | null;
	label_id: string;
	catalog_number?: string | null;
	sort_order?: number | null;
};



export type ReleaseLabelLink = {
	release_id: string;
	artist_id?: string | null;
	entity_type_id: string | null;
	id: string;
	label_id: string;
	entity_type?: EntityType | null;
	catalog_number: string | null;
	sort_order: number;
	label: LabelBaseWithId | null;
};



export type ReleaseLabelOut = {
	release_id?: string | null;
	artist_id?: string | null;
	entity_type_id: string | null;
	id: string;
	entity_type_name: string | null;
	catalog_number: string | null;
	sort_order: number | null;
	label_id: string;
	name?: string | null;
	slug: string;
	profile?: string | null;
	discogs_id?: number | null;
	discogs_resource_url?: string | null;
};



export type ReleaseLabelPublic = {
	release_id: string;
	artist_id?: string | null;
	entity_type_id: string | null;
	id: string;
	label_id: string;
	entity_type?: EntityType | null;
	catalog_number: string | null;
	sort_order: number;
};



export type ReleaseLabelUpdate = {
	release_id?: string | null;
	artist_id?: string | null;
	entity_type_id?: string | null;
	label_id?: string | null;
	catalog_number?: string | null;
	sort_order?: number | null;
};



export type ReleaseLabelsPublic = {
	data: Array<ReleaseLabelPublic>;
	count: number;
};



export type ReleaseOut = {
	title: string | null;
	discogs_url: string | null;
	discogs_title: string | null;
	title_long: string | null;
	matrix: string | null;
	slug: string | null;
	sealed: boolean | null;
	spreadsheet_id: number | null;
	year: number | null;
	sort_date: string | null;
	release_date: string | null;
	id: string;
	storage_location: StorageLocationPublic | null;
	images: Array<ReleaseImage> | null;
	artists: Array<ReleaseArtistOut> | null;
	extra_artists: Array<ReleaseArtistOut> | null;
	labels: Array<ReleaseLabelOut> | null;
	companies: Array<ReleaseLabelOut> | null;
	tracks: Array<TrackPublic> | null;
};



export type ReleasePublic = {
	title: string | null;
	discogs_url: string | null;
	discogs_title: string | null;
	title_long: string | null;
	matrix: string | null;
	slug: string | null;
	sealed: boolean | null;
	spreadsheet_id: number | null;
	year: number | null;
	sort_date: string | null;
	release_date: string | null;
	id: string;
	storage_location: StorageLocationPublic | null;
	images: Array<ReleaseImage> | null;
	artist_links: Array<ReleaseArtistLink> | null;
	label_links: Array<ReleaseLabelLink> | null;
	tracks: Array<TrackPublic> | null;
};



export type ReleaseUpdate = {
	title?: string | null;
	discogs_url?: string | null;
	discogs_title?: string | null;
	title_long?: string | null;
	matrix?: string | null;
	slug?: string | null;
	sealed?: boolean | null;
	spreadsheet_id?: number | null;
	year?: number | null;
	sort_date?: string | null;
	release_date?: string | null;
};



export type ReleasesOut = {
	data: Array<ReleaseOut>;
	count: number;
};



export type Role = {
	name?: string | null;
	id?: string;
};



export type StorageLocationCreate = {
	spreadsheet_id?: number | null;
	container?: string | null;
	row?: number | null;
	position?: number | null;
};



export type StorageLocationPublic = {
	spreadsheet_id?: number | null;
	container?: string | null;
	row?: number | null;
	position?: number | null;
	id: string;
};



export type StorageLocationUpdate = {
	spreadsheet_id?: number | null;
	container?: string | null;
	row?: number | null;
	position?: number | null;
};



export type StorageLocationsPublic = {
	data: Array<StorageLocationPublic>;
	count: number;
};



export type Token = {
	access_token: string;
	token_type?: string;
};



export type TrackArtistCreate = {
	release_id?: string | null;
	artist_id: string;
	role_id?: string | null;
	track_id: string;
	anv?: string | null;
	join?: string | null;
	sort_order?: number | null;
};



export type TrackArtistPublic = {
	release_id?: string | null;
	artist_id: string;
	role_id: string | null;
	id: string;
	track_id: string;
	role?: Role | null;
	anv: string | null;
	join: string | null;
	sort_order: number | null;
	track: TrackOut | null;
	artist: ArtistBaseWithId | null;
};



export type TrackArtistUpdate = {
	release_id?: string | null;
	artist_id?: string | null;
	role_id?: string | null;
	track_id?: string | null;
	anv?: string | null;
	join?: string | null;
	sort_order?: number | null;
};



export type TrackArtistsPublic = {
	data: Array<TrackArtistPublic>;
	count: number;
};



export type TrackCreate = {
	position?: string | null;
	type: string;
	title: string;
	duration?: string | null;
	sort_order: number;
	release_id: string;
};



export type TrackOut = {
	position?: string | null;
	type?: string | null;
	title?: string | null;
	duration?: string | null;
	release: TrackReleaseOut;
};



export type TrackPublic = {
	position: string | null;
	type: string;
	title: string;
	duration?: string | null;
	id: string;
	sort_order: number;
	release_id: string;
	artist_links?: Array<TrackArtistPublic> | null;
};



export type TrackReleaseOut = {
	title?: string | null;
	discogs_url?: string | null;
	discogs_title?: string | null;
	title_long?: string | null;
	matrix?: string | null;
	slug?: string | null;
	sealed?: boolean | null;
	spreadsheet_id?: number | null;
	year?: number | null;
	sort_date?: string | null;
	release_date?: string | null;
	images: Array<Image>;
};



export type TrackUpdate = {
	position?: string | null;
	type?: string | null;
	title?: string | null;
	duration?: string | null;
	sort_order?: number | null;
};



export type TracksPublic = {
	data: Array<TrackPublic>;
	count: number;
};



export type UpdatePassword = {
	current_password: string;
	new_password: string;
};



export type UserCreate = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	password: string;
};



export type UserPublic = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	id: string;
};



export type UserRegister = {
	email: string;
	password: string;
	full_name?: string | null;
};



export type UserUpdate = {
	email?: string | null;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	password?: string | null;
};



export type UserUpdateMe = {
	full_name?: string | null;
	email?: string | null;
};



export type UsersPublic = {
	data: Array<UserPublic>;
	count: number;
};



export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

