export const $ArtistBaseWithId = {
	properties: {
		name: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		profile: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		discogs_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		discogs_resource_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $ArtistCreate = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
},
		profile: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		discogs_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		discogs_resource_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ArtistPublic = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
},
		profile: {
	type: 'string',
	isRequired: true,
},
		discogs_id: {
	type: 'number',
	isRequired: true,
},
		discogs_resource_url: {
	type: 'string',
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		release_links: {
	type: 'array',
	contains: {
		type: 'ArtistReleaseLink',
	},
	isRequired: true,
},
	},
} as const;

export const $ArtistReleaseLink = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role: {
	type: 'any-of',
	contains: [{
	type: 'Role',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
		release: {
	type: 'any-of',
	contains: [{
	type: 'ReleaseBase',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ArtistUpdate = {
	properties: {
		name: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		profile: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		discogs_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		discogs_resource_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ArtistsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ArtistPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $Body_login_login_access_token = {
	properties: {
		grant_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
	pattern: 'password',
}, {
	type: 'null',
}],
},
		username: {
	type: 'string',
	isRequired: true,
},
		password: {
	type: 'string',
	isRequired: true,
},
		scope: {
	type: 'string',
	default: '',
},
		client_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		client_secret: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $EntityType = {
	properties: {
		name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	format: 'uuid',
},
	},
} as const;

export const $HTTPValidationError = {
	properties: {
		detail: {
	type: 'array',
	contains: {
		type: 'ValidationError',
	},
},
	},
} as const;

export const $IdentifierCreate = {
	properties: {
		type: {
	type: 'string',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		value: {
	type: 'string',
	isRequired: true,
},
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $IdentifierPublic = {
	properties: {
		type: {
	type: 'string',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		value: {
	type: 'string',
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $IdentifierUpdate = {
	properties: {
		type: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		value: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $IdentifiersPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'IdentifierPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ImageCreate = {
	properties: {
		date_taken: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
		image_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		original_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		new_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		alt_text: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		cloudflare_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		display_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ImagePublic = {
	properties: {
		date_taken: {
	type: 'string',
	isRequired: true,
	format: 'date',
},
		image_type: {
	type: 'string',
	isRequired: true,
},
		original_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		new_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		alt_text: {
	type: 'string',
	isRequired: true,
},
		cloudflare_id: {
	type: 'string',
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		display_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		release: {
	type: 'any-of',
	contains: [{
	type: 'ImageRelease',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ImageRelease = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		discogs_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		discogs_title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		title_long: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		matrix: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sealed: {
	type: 'any-of',
	contains: [{
	type: 'boolean',
}, {
	type: 'null',
}],
	isRequired: true,
},
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
	isRequired: true,
},
		year: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
	isRequired: true,
},
		release_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ImageUpdate = {
	properties: {
		date_taken: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
		image_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		original_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		new_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		alt_text: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		cloudflare_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		display_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ImagesPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ImagePublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ItemCreate = {
	properties: {
		title: {
	type: 'string',
	isRequired: true,
	maxLength: 255,
	minLength: 1,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ItemPublic = {
	properties: {
		title: {
	type: 'string',
	isRequired: true,
	maxLength: 255,
	minLength: 1,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		owner_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $ItemUpdate = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ItemsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ItemPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $LabelBaseWithId = {
	properties: {
		name: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		profile: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		discogs_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		discogs_resource_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $LabelCreate = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
},
		profile: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		discogs_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		discogs_resource_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $LabelPublic = {
	properties: {
		name: {
	type: 'string',
	isRequired: true,
},
		profile: {
	type: 'string',
	isRequired: true,
},
		discogs_id: {
	type: 'number',
	isRequired: true,
},
		discogs_resource_url: {
	type: 'string',
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		release_links: {
	type: 'array',
	contains: {
		type: 'LabelReleaseLink',
	},
	isRequired: true,
},
	},
} as const;

export const $LabelReleaseLink = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		entity_type_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		label_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		entity_type: {
	type: 'any-of',
	contains: [{
	type: 'EntityType',
}, {
	type: 'null',
}],
},
		catalog_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
		release: {
	type: 'any-of',
	contains: [{
	type: 'ReleaseBase',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $LabelUpdate = {
	properties: {
		name: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		profile: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		discogs_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		discogs_resource_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $LabelsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'LabelPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $Message = {
	properties: {
		message: {
	type: 'string',
	isRequired: true,
},
	},
} as const;

export const $NewPassword = {
	properties: {
		token: {
	type: 'string',
	isRequired: true,
},
		new_password: {
	type: 'string',
	isRequired: true,
	maxLength: 40,
	minLength: 8,
},
	},
} as const;

export const $ReleaseArtistCreate = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		sort_order: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleaseArtistLink = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role: {
	type: 'any-of',
	contains: [{
	type: 'Role',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
		artist: {
	type: 'any-of',
	contains: [{
	type: 'ArtistBaseWithId',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ReleaseArtistPublic = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role: {
	type: 'any-of',
	contains: [{
	type: 'Role',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ReleaseArtistUpdate = {
	properties: {
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		sort_order: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleaseArtistsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ReleaseArtistPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ReleaseBase = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		discogs_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		discogs_title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		title_long: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		matrix: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		sealed: {
	type: 'any-of',
	contains: [{
	type: 'boolean',
}, {
	type: 'null',
}],
},
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		year: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		sort_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
		release_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleaseCreate = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		discogs_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		discogs_title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		title_long: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		matrix: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		sealed: {
	type: 'any-of',
	contains: [{
	type: 'boolean',
}, {
	type: 'null',
}],
},
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		year: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		sort_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
		release_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
		storage_location_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleaseImage = {
	properties: {
		date_taken: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
	isRequired: true,
},
		image_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		original_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		new_path: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		alt_text: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		cloudflare_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		display_type: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ReleaseLabelCreate = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		entity_type_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		label_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		catalog_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		sort_order: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleaseLabelLink = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		entity_type_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		label_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		entity_type: {
	type: 'any-of',
	contains: [{
	type: 'EntityType',
}, {
	type: 'null',
}],
},
		catalog_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
		label: {
	type: 'any-of',
	contains: [{
	type: 'LabelBaseWithId',
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ReleaseLabelPublic = {
	properties: {
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		entity_type_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		label_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		entity_type: {
	type: 'any-of',
	contains: [{
	type: 'EntityType',
}, {
	type: 'null',
}],
},
		catalog_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ReleaseLabelUpdate = {
	properties: {
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		entity_type_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		label_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		catalog_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		sort_order: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleaseLabelsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ReleaseLabelPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ReleasePublic = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		discogs_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		discogs_title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		title_long: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		matrix: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sealed: {
	type: 'any-of',
	contains: [{
	type: 'boolean',
}, {
	type: 'null',
}],
	isRequired: true,
},
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
	isRequired: true,
},
		year: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
	isRequired: true,
},
		release_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		storage_location: {
	type: 'any-of',
	contains: [{
	type: 'StorageLocationPublic',
}, {
	type: 'null',
}],
	isRequired: true,
},
		images: {
	type: 'any-of',
	contains: [{
	type: 'array',
	contains: {
		type: 'ReleaseImage',
	},
}, {
	type: 'null',
}],
	isRequired: true,
},
		artist_links: {
	type: 'any-of',
	contains: [{
	type: 'array',
	contains: {
		type: 'ReleaseArtistLink',
	},
}, {
	type: 'null',
}],
	isRequired: true,
},
		label_links: {
	type: 'any-of',
	contains: [{
	type: 'array',
	contains: {
		type: 'ReleaseLabelLink',
	},
}, {
	type: 'null',
}],
	isRequired: true,
},
	},
} as const;

export const $ReleaseUpdate = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		discogs_url: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		discogs_title: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		title_long: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		matrix: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
	minLength: 1,
}, {
	type: 'null',
}],
},
		sealed: {
	type: 'any-of',
	contains: [{
	type: 'boolean',
}, {
	type: 'null',
}],
},
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		year: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		sort_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
		release_date: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'date',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $ReleasesPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'ReleasePublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $Role = {
	properties: {
		name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	format: 'uuid',
},
	},
} as const;

export const $StorageLocationCreate = {
	properties: {
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		container: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		row: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		position: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $StorageLocationPublic = {
	properties: {
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		container: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		row: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		position: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $StorageLocationUpdate = {
	properties: {
		spreadsheet_id: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		container: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		row: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
		position: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $StorageLocationsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'StorageLocationPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $Token = {
	properties: {
		access_token: {
	type: 'string',
	isRequired: true,
},
		token_type: {
	type: 'string',
	default: 'bearer',
},
	},
} as const;

export const $TrackArtistBase = {
	properties: {
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $TrackArtistCreate = {
	properties: {
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		artist_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		track_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		sort_order: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $TrackArtistPublic = {
	properties: {
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		artist_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
	isRequired: true,
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		track_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		role: {
	type: 'any-of',
	contains: [{
	type: 'Role',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
	isRequired: true,
},
		sort_order: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $TrackArtistUpdate = {
	properties: {
		release_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		artist_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		role_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		track_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'uuid',
}, {
	type: 'null',
}],
},
		anv: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		join: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		sort_order: {
	type: 'any-of',
	contains: [{
	type: 'number',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $TrackArtistsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'TrackArtistPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $TrackCreate = {
	properties: {
		position: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		type: {
	type: 'string',
	isRequired: true,
},
		title: {
	type: 'string',
	isRequired: true,
},
		duration: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $TrackPublic = {
	properties: {
		position: {
	type: 'string',
	isRequired: true,
},
		type: {
	type: 'string',
	isRequired: true,
},
		title: {
	type: 'string',
	isRequired: true,
},
		duration: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		release_id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
		artist_links: {
	type: 'any-of',
	contains: [{
	type: 'array',
	contains: {
		type: 'TrackArtistBase',
	},
}, {
	type: 'null',
}],
},
	},
} as const;

export const $TrackUpdate = {
	properties: {
		position: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		type: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		duration: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $TracksPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'TrackPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $UpdatePassword = {
	properties: {
		current_password: {
	type: 'string',
	isRequired: true,
	maxLength: 40,
	minLength: 8,
},
		new_password: {
	type: 'string',
	isRequired: true,
	maxLength: 40,
	minLength: 8,
},
	},
} as const;

export const $UserCreate = {
	properties: {
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
	maxLength: 255,
},
		is_active: {
	type: 'boolean',
	default: true,
},
		is_superuser: {
	type: 'boolean',
	default: false,
},
		full_name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		password: {
	type: 'string',
	isRequired: true,
	maxLength: 40,
	minLength: 8,
},
	},
} as const;

export const $UserPublic = {
	properties: {
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
	maxLength: 255,
},
		is_active: {
	type: 'boolean',
	default: true,
},
		is_superuser: {
	type: 'boolean',
	default: false,
},
		full_name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		id: {
	type: 'string',
	isRequired: true,
	format: 'uuid',
},
	},
} as const;

export const $UserRegister = {
	properties: {
		email: {
	type: 'string',
	isRequired: true,
	format: 'email',
	maxLength: 255,
},
		password: {
	type: 'string',
	isRequired: true,
	maxLength: 40,
	minLength: 8,
},
		full_name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $UserUpdate = {
	properties: {
		email: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'email',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		is_active: {
	type: 'boolean',
	default: true,
},
		is_superuser: {
	type: 'boolean',
	default: false,
},
		full_name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		password: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 40,
	minLength: 8,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $UserUpdateMe = {
	properties: {
		full_name: {
	type: 'any-of',
	contains: [{
	type: 'string',
	maxLength: 255,
}, {
	type: 'null',
}],
},
		email: {
	type: 'any-of',
	contains: [{
	type: 'string',
	format: 'email',
	maxLength: 255,
}, {
	type: 'null',
}],
},
	},
} as const;

export const $UsersPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'UserPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $ValidationError = {
	properties: {
		loc: {
	type: 'array',
	contains: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'number',
}],
},
	isRequired: true,
},
		msg: {
	type: 'string',
	isRequired: true,
},
		type: {
	type: 'string',
	isRequired: true,
},
	},
} as const;