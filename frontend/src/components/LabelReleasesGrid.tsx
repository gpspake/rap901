import {ReleaseOut} from "../client"
import { Link} from "@tanstack/react-router"
import {ReleaseArtistsLink} from "./ReleaseArtistsLink.tsx";

interface LabelReleasesGridProps {
  releases: ReleaseOut[]
}

export const LabelReleasesGrid = (props: LabelReleasesGridProps) => {

  const { releases } = props

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

            <ul role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {releases.map((release) => {

                  const frontImage = release?.images && release.images
                    .find(image => image.display_type === "front")

                  return (
                    <li key={release.id}>
                      <div
                        className="group aspect-h-1 aspect-w-[1.14] block w-full overflow-hidden rounded focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                      >
                        {frontImage?.cloudflare_id && (
                          <img
                            src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/sm`}
                            alt={frontImage?.alt_text || ""}
                            className="pointer-events-none object-cover group-hover:opacity-75"/>
                        )}

                        {!!release.slug && (
                          <Link
                            to={'/releases/$slug'}
                            params={{slug: release.slug}}
                            type="button"
                            className="absolute inset-0 focus:outline-none"
                          >
                            <span className="sr-only">
                              {release?.discogs_title}
                            </span>
                          </Link>
                        )}
                      </div>

                      <p className="text-gray-50 text-xs">{release.artists &&
                          <ReleaseArtistsLink
                              className={'mt-2 block truncate'}
                              releaseArtists={release.artists}
                          />}
                      </p>

                      <p className="text-gray-50 font-light text-xs truncate">
                        {release?.discogs_title}
                      </p>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
