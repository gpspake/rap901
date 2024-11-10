import {ProgressiveImg} from "./ProgressiveImg.tsx";
import {Link} from "@tanstack/react-router";
import {ReleaseArtistsLink} from "./ReleaseArtistsLink.tsx";
import {ReleaseCard} from "../client";

interface CommonGridProps {
  releases: ReleaseCard[]
  columns?: number
}

export const ReleasesGrid = ({releases, columns = 4}: CommonGridProps) => {

  return (
    <ul role="list"
        className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-${columns} xl:gap-x-8`}>

      {releases.map((release) => {
        const frontImage = release.images && release.images
          .find(image => image.display_type === "front")

        return (
          <li key={release.id}>
            <p className="text-slate-400 text-xs pb-2">{release.year}</p>

            <div
              className="group aspect-h-1 aspect-w-[1.14] block w-full rounded focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
            >
              {frontImage?.cloudflare_id && (
                <ProgressiveImg
                  placeholderSrc={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/loading`}
                  src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/sm`}
                  alt={frontImage?.alt_text || ""}
                  className="pointer-events-none object-cover group-hover:opacity-75 shadow-lg shadow-black"
                />
              )}

              {!!release.slug && (
                <Link
                  to={'/releases/$slug'}
                  params={{slug: release.slug}}
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">
                    {release.discogs_title}
                  </span>
                </Link>
              )}
            </div>

            {release.artist_links && (
              <p className="text-gray-50 text-xs">
                <ReleaseArtistsLink
                  className={'mt-2 block truncate'}
                  releaseArtists={release.artist_links}
                />
              </p>
            )}

            <p className="text-gray-50 font-light text-xs truncate">
              {release.discogs_title}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
