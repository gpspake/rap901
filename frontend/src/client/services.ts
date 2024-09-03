import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';

import type { Body_login_login_access_token,Message,NewPassword,Token,UserPublic,UpdatePassword,UserCreate,UserRegister,UsersPublic,UserUpdate,UserUpdateMe,ItemCreate,ItemPublic,ItemsPublic,ItemUpdate,ReleaseCreate,ReleasePublic,ReleasesPublic,ReleaseUpdate,StorageLocationCreate,StorageLocationPublic,StorageLocationsPublic,StorageLocationUpdate,ImageCreate,ImagePublic,ImagesPublic,ImageUpdate,ArtistCreate,ArtistPublic,ArtistsPublic,ArtistUpdate,ReleaseArtistCreate,ReleaseArtistPublic,ReleaseArtistsPublic,ReleaseArtistUpdate,LabelCreate,LabelPublic,LabelsPublic,LabelUpdate,ReleaseLabelCreate,ReleaseLabelPublic,ReleaseLabelsPublic,ReleaseLabelUpdate,IdentifierCreate,IdentifierPublic,IdentifiersPublic,IdentifierUpdate,TrackCreate,TrackPublic,TracksPublic,TrackUpdate,TrackArtistCreate,TrackArtistPublic,TrackArtistsPublic,TrackArtistUpdate } from './models';

export type TDataLoginAccessToken = {
                formData: Body_login_login_access_token
                
            }
export type TDataRecoverPassword = {
                email: string
                
            }
export type TDataResetPassword = {
                requestBody: NewPassword
                
            }
export type TDataRecoverPasswordHtmlContent = {
                email: string
                
            }

export class LoginService {

	/**
	 * Login Access Token
	 * OAuth2 compatible token login, get an access token for future requests
	 * @returns Token Successful Response
	 * @throws ApiError
	 */
	public static loginAccessToken(data: TDataLoginAccessToken): CancelablePromise<Token> {
		const {
formData,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/access-token',
			formData: formData,
			mediaType: 'application/x-www-form-urlencoded',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Test Token
	 * Test access token
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static testToken(): CancelablePromise<UserPublic> {
				return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/test-token',
		});
	}

	/**
	 * Recover Password
	 * Password Recovery
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static recoverPassword(data: TDataRecoverPassword): CancelablePromise<Message> {
		const {
email,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/password-recovery/{email}',
			path: {
				email
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Reset Password
	 * Reset password
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static resetPassword(data: TDataResetPassword): CancelablePromise<Message> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/reset-password/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Recover Password Html Content
	 * HTML Content for Password Recovery
	 * @returns string Successful Response
	 * @throws ApiError
	 */
	public static recoverPasswordHtmlContent(data: TDataRecoverPasswordHtmlContent): CancelablePromise<string> {
		const {
email,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/password-recovery-html-content/{email}',
			path: {
				email
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadUsers = {
                limit?: number
skip?: number
                
            }
export type TDataCreateUser = {
                requestBody: UserCreate
                
            }
export type TDataUpdateUserMe = {
                requestBody: UserUpdateMe
                
            }
export type TDataUpdatePasswordMe = {
                requestBody: UpdatePassword
                
            }
export type TDataRegisterUser = {
                requestBody: UserRegister
                
            }
export type TDataReadUserById = {
                userId: string
                
            }
export type TDataUpdateUser = {
                requestBody: UserUpdate
userId: string
                
            }
export type TDataDeleteUser = {
                userId: string
                
            }

export class UsersService {

	/**
	 * Read Users
	 * Retrieve users.
	 * @returns UsersPublic Successful Response
	 * @throws ApiError
	 */
	public static readUsers(data: TDataReadUsers = {}): CancelablePromise<UsersPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create User
	 * Create new user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static createUser(data: TDataCreateUser): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User Me
	 * Get current user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static readUserMe(): CancelablePromise<UserPublic> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/me',
		});
	}

	/**
	 * Delete User Me
	 * Delete own user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteUserMe(): CancelablePromise<Message> {
				return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/users/me',
		});
	}

	/**
	 * Update User Me
	 * Update own user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static updateUserMe(data: TDataUpdateUserMe): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/me',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Password Me
	 * Update own password.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static updatePasswordMe(data: TDataUpdatePasswordMe): CancelablePromise<Message> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/me/password',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Register User
	 * Create new user without the need to be logged in.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static registerUser(data: TDataRegisterUser): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/signup',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User By Id
	 * Get a specific user by id.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static readUserById(data: TDataReadUserById): CancelablePromise<UserPublic> {
		const {
userId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update User
	 * Update a user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static updateUser(data: TDataUpdateUser): CancelablePromise<UserPublic> {
		const {
requestBody,
userId,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete User
	 * Delete a user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
		const {
userId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataTestEmail = {
                emailTo: string
                
            }

export class UtilsService {

	/**
	 * Test Email
	 * Test emails.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static testEmail(data: TDataTestEmail): CancelablePromise<Message> {
		const {
emailTo,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/utils/test-email/',
			query: {
				email_to: emailTo
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadItems = {
                limit?: number
skip?: number
                
            }
export type TDataCreateItem = {
                requestBody: ItemCreate
                
            }
export type TDataReadItem = {
                id: string
                
            }
export type TDataUpdateItem = {
                id: string
requestBody: ItemUpdate
                
            }
export type TDataDeleteItem = {
                id: string
                
            }

export class ItemsService {

	/**
	 * Read Items
	 * Retrieve items.
	 * @returns ItemsPublic Successful Response
	 * @throws ApiError
	 */
	public static readItems(data: TDataReadItems = {}): CancelablePromise<ItemsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/items/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Item
	 * Create new item.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static createItem(data: TDataCreateItem): CancelablePromise<ItemPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/items/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Item
	 * Get item by ID.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static readItem(data: TDataReadItem): CancelablePromise<ItemPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Item
	 * Update an item.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static updateItem(data: TDataUpdateItem): CancelablePromise<ItemPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Item
	 * Delete an item.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteItem(data: TDataDeleteItem): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadReleases = {
                limit?: number
skip?: number
                
            }
export type TDataCreateRelease = {
                requestBody: ReleaseCreate
                
            }
export type TDataReadRelease = {
                id: string
                
            }
export type TDataUpdateRelease = {
                id: string
requestBody: ReleaseUpdate
                
            }
export type TDataDeleteRelease = {
                id: string
                
            }

export class ReleasesService {

	/**
	 * Read Releases
	 * Retrieve releases.
	 * @returns ReleasesPublic Successful Response
	 * @throws ApiError
	 */
	public static readReleases(data: TDataReadReleases = {}): CancelablePromise<ReleasesPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/releases/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Release
	 * Create new release.
	 * @returns ReleasePublic Successful Response
	 * @throws ApiError
	 */
	public static createRelease(data: TDataCreateRelease): CancelablePromise<ReleasePublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/releases/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Release
	 * Get release by ID.
	 * @returns ReleasePublic Successful Response
	 * @throws ApiError
	 */
	public static readRelease(data: TDataReadRelease): CancelablePromise<ReleasePublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/releases/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Release
	 * Update a release.
	 * @returns ReleasePublic Successful Response
	 * @throws ApiError
	 */
	public static updateRelease(data: TDataUpdateRelease): CancelablePromise<ReleasePublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/releases/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Release
	 * Delete an release.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteRelease(data: TDataDeleteRelease): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/releases/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadStorageLocations = {
                limit?: number
skip?: number
                
            }
export type TDataCreateStorageLocation = {
                requestBody: StorageLocationCreate
                
            }
export type TDataReadStorageLocation = {
                id: string
                
            }
export type TDataUpdateStorageLocation = {
                id: string
requestBody: StorageLocationUpdate
                
            }
export type TDataDeleteStorageLocation = {
                id: string
                
            }

export class StorageLocationsService {

	/**
	 * Read Storage Locations
	 * Retrieve storage_locations.
	 * @returns StorageLocationsPublic Successful Response
	 * @throws ApiError
	 */
	public static readStorageLocations(data: TDataReadStorageLocations = {}): CancelablePromise<StorageLocationsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/storage_locations/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Storage Location
	 * Create new storage_location.
	 * @returns StorageLocationPublic Successful Response
	 * @throws ApiError
	 */
	public static createStorageLocation(data: TDataCreateStorageLocation): CancelablePromise<StorageLocationPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/storage_locations/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Storage Location
	 * Get storage_location by ID.
	 * @returns StorageLocationPublic Successful Response
	 * @throws ApiError
	 */
	public static readStorageLocation(data: TDataReadStorageLocation): CancelablePromise<StorageLocationPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/storage_locations/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Storage Location
	 * Update a storage_location.
	 * @returns StorageLocationPublic Successful Response
	 * @throws ApiError
	 */
	public static updateStorageLocation(data: TDataUpdateStorageLocation): CancelablePromise<StorageLocationPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/storage_locations/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Storage Location
	 * Delete a storage_location.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteStorageLocation(data: TDataDeleteStorageLocation): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/storage_locations/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadImages = {
                limit?: number
skip?: number
                
            }
export type TDataCreateImage = {
                requestBody: ImageCreate
                
            }
export type TDataReadImage = {
                id: string
                
            }
export type TDataUpdateImage = {
                id: string
requestBody: ImageUpdate
                
            }
export type TDataDeleteImage = {
                id: string
                
            }

export class ImagesService {

	/**
	 * Read Images
	 * Retrieve images.
	 * @returns ImagesPublic Successful Response
	 * @throws ApiError
	 */
	public static readImages(data: TDataReadImages = {}): CancelablePromise<ImagesPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/images/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Image
	 * Create new image.
	 * @returns ImagePublic Successful Response
	 * @throws ApiError
	 */
	public static createImage(data: TDataCreateImage): CancelablePromise<ImagePublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/images/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Image
	 * Get image by ID.
	 * @returns ImagePublic Successful Response
	 * @throws ApiError
	 */
	public static readImage(data: TDataReadImage): CancelablePromise<ImagePublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/images/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Image
	 * Update an image.
	 * @returns ImagePublic Successful Response
	 * @throws ApiError
	 */
	public static updateImage(data: TDataUpdateImage): CancelablePromise<ImagePublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/images/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Image
	 * Delete an image.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteImage(data: TDataDeleteImage): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/images/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadArtists = {
                limit?: number
skip?: number
                
            }
export type TDataCreateArtist = {
                requestBody: ArtistCreate
                
            }
export type TDataReadArtist = {
                id: string
                
            }
export type TDataUpdateArtist = {
                id: string
requestBody: ArtistUpdate
                
            }
export type TDataDeleteArtist = {
                id: string
                
            }

export class ArtistsService {

	/**
	 * Read Artists
	 * Retrieve artists.
	 * @returns ArtistsPublic Successful Response
	 * @throws ApiError
	 */
	public static readArtists(data: TDataReadArtists = {}): CancelablePromise<ArtistsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/artists/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Artist
	 * Create new artist.
	 * @returns ArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static createArtist(data: TDataCreateArtist): CancelablePromise<ArtistPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/artists/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Artist
	 * Get artist by ID.
	 * @returns ArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static readArtist(data: TDataReadArtist): CancelablePromise<ArtistPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/artists/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Artist
	 * Update an artist.
	 * @returns ArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static updateArtist(data: TDataUpdateArtist): CancelablePromise<ArtistPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/artists/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Artist
	 * Delete an artist.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteArtist(data: TDataDeleteArtist): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/artists/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadReleaseArtists = {
                limit?: number
skip?: number
                
            }
export type TDataCreateReleaseArtist = {
                requestBody: ReleaseArtistCreate
                
            }
export type TDataReadReleaseArtist = {
                id: string
                
            }
export type TDataUpdateReleaseArtist = {
                id: string
requestBody: ReleaseArtistUpdate
                
            }
export type TDataDeleteReleaseArtist = {
                id: string
                
            }

export class ReleaseArtistsService {

	/**
	 * Read Release Artists
	 * Retrieve release_artists.
	 * @returns ReleaseArtistsPublic Successful Response
	 * @throws ApiError
	 */
	public static readReleaseArtists(data: TDataReadReleaseArtists = {}): CancelablePromise<ReleaseArtistsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/release_artists/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Release Artist
	 * Create new release_artist.
	 * @returns ReleaseArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static createReleaseArtist(data: TDataCreateReleaseArtist): CancelablePromise<ReleaseArtistPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/release_artists/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Release Artist
	 * Get release_artist by ID.
	 * @returns ReleaseArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static readReleaseArtist(data: TDataReadReleaseArtist): CancelablePromise<ReleaseArtistPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/release_artists/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Release Artist
	 * Update an release_artist.
	 * @returns ReleaseArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static updateReleaseArtist(data: TDataUpdateReleaseArtist): CancelablePromise<ReleaseArtistPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/release_artists/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Release Artist
	 * Delete an release_artist.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteReleaseArtist(data: TDataDeleteReleaseArtist): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/release_artists/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadLabels = {
                limit?: number
skip?: number
                
            }
export type TDataCreateLabel = {
                requestBody: LabelCreate
                
            }
export type TDataReadLabel = {
                id: string
                
            }
export type TDataUpdateLabel = {
                id: string
requestBody: LabelUpdate
                
            }
export type TDataDeleteLabel = {
                id: string
                
            }

export class LabelsService {

	/**
	 * Read Labels
	 * Retrieve labels.
	 * @returns LabelsPublic Successful Response
	 * @throws ApiError
	 */
	public static readLabels(data: TDataReadLabels = {}): CancelablePromise<LabelsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/labels/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Label
	 * Create new label.
	 * @returns LabelPublic Successful Response
	 * @throws ApiError
	 */
	public static createLabel(data: TDataCreateLabel): CancelablePromise<LabelPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/labels/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Label
	 * Get label by ID.
	 * @returns LabelPublic Successful Response
	 * @throws ApiError
	 */
	public static readLabel(data: TDataReadLabel): CancelablePromise<LabelPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/labels/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Label
	 * Update an label.
	 * @returns LabelPublic Successful Response
	 * @throws ApiError
	 */
	public static updateLabel(data: TDataUpdateLabel): CancelablePromise<LabelPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/labels/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Label
	 * Delete an label.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteLabel(data: TDataDeleteLabel): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/labels/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadReleaseLabels = {
                limit?: number
skip?: number
                
            }
export type TDataCreateReleaseLabel = {
                requestBody: ReleaseLabelCreate
                
            }
export type TDataReadReleaseLabel = {
                id: string
                
            }
export type TDataUpdateReleaseLabel = {
                id: string
requestBody: ReleaseLabelUpdate
                
            }
export type TDataDeleteReleaseLabel = {
                id: string
                
            }

export class ReleaseLabelsService {

	/**
	 * Read Release Labels
	 * Retrieve release_labels.
	 * @returns ReleaseLabelsPublic Successful Response
	 * @throws ApiError
	 */
	public static readReleaseLabels(data: TDataReadReleaseLabels = {}): CancelablePromise<ReleaseLabelsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/release_labels/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Release Label
	 * Create new release_label.
	 * @returns ReleaseLabelPublic Successful Response
	 * @throws ApiError
	 */
	public static createReleaseLabel(data: TDataCreateReleaseLabel): CancelablePromise<ReleaseLabelPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/release_labels/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Release Label
	 * Get release_label by ID.
	 * @returns ReleaseLabelPublic Successful Response
	 * @throws ApiError
	 */
	public static readReleaseLabel(data: TDataReadReleaseLabel): CancelablePromise<ReleaseLabelPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/release_labels/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Release Label
	 * Update an release_label.
	 * @returns ReleaseLabelPublic Successful Response
	 * @throws ApiError
	 */
	public static updateReleaseLabel(data: TDataUpdateReleaseLabel): CancelablePromise<ReleaseLabelPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/release_labels/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Release Label
	 * Delete an release_label.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteReleaseLabel(data: TDataDeleteReleaseLabel): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/release_labels/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadIdentifiers = {
                limit?: number
skip?: number
                
            }
export type TDataCreateIdentifier = {
                requestBody: IdentifierCreate
                
            }
export type TDataReadIdentifier = {
                id: string
                
            }
export type TDataUpdateIdentifier = {
                id: string
requestBody: IdentifierUpdate
                
            }
export type TDataDeleteIdentifier = {
                id: string
                
            }

export class IdentifiersService {

	/**
	 * Read Identifiers
	 * Retrieve identifiers.
	 * @returns IdentifiersPublic Successful Response
	 * @throws ApiError
	 */
	public static readIdentifiers(data: TDataReadIdentifiers = {}): CancelablePromise<IdentifiersPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/identifiers/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Identifier
	 * Create new identifier.
	 * @returns IdentifierPublic Successful Response
	 * @throws ApiError
	 */
	public static createIdentifier(data: TDataCreateIdentifier): CancelablePromise<IdentifierPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/identifiers/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Identifier
	 * Get identifier by ID.
	 * @returns IdentifierPublic Successful Response
	 * @throws ApiError
	 */
	public static readIdentifier(data: TDataReadIdentifier): CancelablePromise<IdentifierPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/identifiers/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Identifier
	 * Update an identifier.
	 * @returns IdentifierPublic Successful Response
	 * @throws ApiError
	 */
	public static updateIdentifier(data: TDataUpdateIdentifier): CancelablePromise<IdentifierPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/identifiers/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Identifier
	 * Delete an identifier.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteIdentifier(data: TDataDeleteIdentifier): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/identifiers/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadTracks = {
                limit?: number
skip?: number
                
            }
export type TDataCreateTrack = {
                requestBody: TrackCreate
                
            }
export type TDataReadTrack = {
                id: string
                
            }
export type TDataUpdateTrack = {
                id: string
requestBody: TrackUpdate
                
            }
export type TDataDeleteTrack = {
                id: string
                
            }

export class TracksService {

	/**
	 * Read Tracks
	 * Retrieve tracks.
	 * @returns TracksPublic Successful Response
	 * @throws ApiError
	 */
	public static readTracks(data: TDataReadTracks = {}): CancelablePromise<TracksPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/tracks/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Track
	 * Create new track.
	 * @returns TrackPublic Successful Response
	 * @throws ApiError
	 */
	public static createTrack(data: TDataCreateTrack): CancelablePromise<TrackPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/tracks/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Track
	 * Get track by ID.
	 * @returns TrackPublic Successful Response
	 * @throws ApiError
	 */
	public static readTrack(data: TDataReadTrack): CancelablePromise<TrackPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/tracks/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Track
	 * Update a track.
	 * @returns TrackPublic Successful Response
	 * @throws ApiError
	 */
	public static updateTrack(data: TDataUpdateTrack): CancelablePromise<TrackPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/tracks/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Track
	 * Delete a track.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteTrack(data: TDataDeleteTrack): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/tracks/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataReadTrackArtists = {
                limit?: number
skip?: number
                
            }
export type TDataCreateTrackArtist = {
                requestBody: TrackArtistCreate
                
            }
export type TDataReadTrackArtist = {
                id: string
                
            }
export type TDataUpdateTrackArtist = {
                id: string
requestBody: TrackArtistUpdate
                
            }
export type TDataDeleteTrackArtist = {
                id: string
                
            }

export class TrackArtistsService {

	/**
	 * Read Track Artists
	 * Retrieve track_artists.
	 * @returns TrackArtistsPublic Successful Response
	 * @throws ApiError
	 */
	public static readTrackArtists(data: TDataReadTrackArtists = {}): CancelablePromise<TrackArtistsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/track_artists/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Track Artist
	 * Create new track_artist.
	 * @returns TrackArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static createTrackArtist(data: TDataCreateTrackArtist): CancelablePromise<TrackArtistPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/track_artists/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Track Artist
	 * Get track_artist by ID.
	 * @returns TrackArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static readTrackArtist(data: TDataReadTrackArtist): CancelablePromise<TrackArtistPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/track_artists/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Track Artist
	 * Update an track_artist.
	 * @returns TrackArtistPublic Successful Response
	 * @throws ApiError
	 */
	public static updateTrackArtist(data: TDataUpdateTrackArtist): CancelablePromise<TrackArtistPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/track_artists/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Track Artist
	 * Delete an track_artist.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteTrackArtist(data: TDataDeleteTrackArtist): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/track_artists/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}