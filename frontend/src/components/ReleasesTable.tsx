import {ReleaseArtistLink, ReleasesPublic} from "../client"
import ActionsMenu from "../components/Common/ActionsMenu.tsx"
import clsx from "clsx";
import {Link} from "@tanstack/react-router"

interface ReleaseArtistProps {
  releaseArtists: ReleaseArtistLink[]
}

const ReleaseArtistsLink = (props: ReleaseArtistProps) => {
  const {releaseArtists} = props


  const getArtistName = (releaseArtist: ReleaseArtistLink): string => {
    const artistName = releaseArtist.anv ? releaseArtist.anv : releaseArtist.artist?.name
    return artistName || ""
  }

  return releaseArtists.map(artist => {
    return (
      <>
        <a className="hover:underline font-semibold" href={`/artists/${artist.artist_id}`}>
          {getArtistName(artist)}
        </a>
        {artist.join && ` ${artist.join} `}
      </>
    )
  })
}

interface ReleasesTableProps {
  releasesCount: number
  releases: ReleasesPublic | undefined
  hasNextPage: boolean
  hasPreviousPage: boolean
  pageFirst: number
  pageLast: number
  setPage: (pageNumber: number) => void,
  page: number,
  isPending: boolean
}

export const ReleasesTable = (props: ReleasesTableProps) => {

  const {
    releases,
    releasesCount,
    hasNextPage,
    hasPreviousPage,
    pageFirst,
    pageLast,
    setPage,
    page,
    isPending
  } = props

  const getReleaseArtists = (
    artists: ReleaseArtistLink[]
  ): ReleaseArtistLink[] => {
    const releaseArtists = artists
      .filter(artist => !artist.role || !artist.role.name)
      .sort((a, b) => a.sort_order - b.sort_order)
    return releaseArtists
  }

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white"></th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Artist</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Title</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Year</th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Edit</span></th>
                    </tr>
                    </thead>
                    {isPending ? (
                      <tbody>
                      <tr>
                        {new Array(4).fill(null).map((_, index) => (
                          <td key={index}>
                            {/*<SkeletonText noOfLines={1} paddingBlock="16px" />*/}
                          </td>
                        ))}
                      </tr>
                      </tbody>
                    ) : (
                      <tbody>
                      {releases?.data.map((release) => {

                        const frontImage = release.images && release.images
                          .find(image => image.display_type === "front")

                        return (
                          <tr key={release.id}>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
                              {frontImage?.cloudflare_id && <img
                                  className="h-20"
                                  src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/sm`}
                                  alt={frontImage?.alt_text || ""}/>}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
                              {release.artist_links &&
                                  <ReleaseArtistsLink releaseArtists={getReleaseArtists(release.artist_links)}/>}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
                              <Link
                                to="/releases/$releaseId/"
                                params={{ releaseId: release.id }}
                              >
                                {release.discogs_title}
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
                              {release.year || "N/A"}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-300">
                              <ActionsMenu type={"Release"} value={release}/>
                            </td>
                          </tr>
                        )
                      })}
                      </tbody>
                    )}
                  </table>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-300">
                      Showing
                      <span className="font-semibold px-1">{pageFirst}</span>
                      to
                      <span className="font-semibold px-1">{pageLast}</span>
                      of
                      <span className="font-semibold px-1">{releasesCount}</span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setPage(page - 1)}
                        className={clsx(
                          "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ",
                          hasPreviousPage && "hover:bg-gray-50 focus:z-20 focus:outline-offset-0")}
                        disabled={!hasPreviousPage}
                      >
                        <span className="">Previous</span>
                      </button>
                      <button
                        onClick={() => setPage(page + 1)}
                        className={clsx(
                          "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300",
                          hasNextPage && "hover:bg-gray-50 focus:z-20 focus:outline-offset-0")}
                      >
                        <span>Next</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
