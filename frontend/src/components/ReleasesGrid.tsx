import {ReleasesOut} from "../client"
import { Link} from "@tanstack/react-router"
import {ReleaseArtistsLink} from "./ReleaseArtistsLink.tsx";
import {ProgressiveImg} from "./ProgressiveImg.tsx";
import ReleaseGridPagination from "./ReleaseGridPagination.tsx";

interface ReleasesGridProps {
  releasesCount: number
  releases: ReleasesOut | undefined
  hasNextPage: boolean
  hasPreviousPage: boolean
  pageFirst: number
  pageLast: number
  setPage: (pageNumber: number) => void,
  page: number,
  isPending: boolean,
  isLoading: boolean,
  perPage: number
}

export const ReleasesGrid = (props: ReleasesGridProps) => {
  const {
    releases,
    releasesCount,
    hasNextPage,
    pageFirst,
    pageLast,
    setPage,
    page,
    isPending,
    isLoading,
    perPage
  } = props

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between pb-2">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing
                    <span className="font-semibold px-1">{pageFirst}</span>
                    to
                    <span className="font-semibold px-1">{pageLast}</span>
                    of
                    <span className="font-semibold px-1">{releasesCount}</span>
                    results
                  </p>
                </div>
              </div>

              <div className="inline-block min-w-full py-2 align-middle">
                <ul role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                  {isPending || isLoading ? (
                    <>
                      {[...Array(16)].map(n => {
                          return (
                            <li key={n}>
                              <div
                                className="group aspect-h-1 aspect-w-[1.14] block w-full overflow-hidden rounded focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                              >
                                <div role="status"
                                     className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                                  <div
                                    className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                      <path
                                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                    </svg>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            </li>
                          )
                        }
                      )}
                    </>
                  ) : (
                    <>
                      {releases?.data.map((release) => {
                        const frontImage = release.images && release.images
                          .find(image => image.display_type === "front")

                        return (
                          <li key={release.id}>
                            {/*<div className="bg-black inline-block rounded-t px-2 py-1">*/}
                            <p className="text-slate-400 text-xs pb-2">{release.year}</p>
                            {/*</div>*/}

                            <div
                              className="group aspect-h-1 aspect-w-[1.14] block w-full  rounded focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                            >
                              {frontImage?.cloudflare_id && (
                                <ProgressiveImg
                                  placeholderSrc={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/loading`}
                                  src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/sm`}
                                  alt={frontImage?.alt_text || ""}
                                  className="pointer-events-none object-cover group-hover:opacity-75 shadow-lg shadow-black"
                                />
                              )
                              }
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
                            <p className="text-gray-50 text-xs">{release.artists &&
                                <ReleaseArtistsLink
                                    className={'mt-2 block truncate'}
                                    releaseArtists={release.artists}
                                />}
                            </p>
                            <p className="text-gray-50 font-light text-xs truncate">
                              {release.discogs_title}
                            </p>
                          </li>
                        )
                      })}
                    </>
                  )}

                </ul>

                <ReleaseGridPagination
                  itemCount={releasesCount}
                  itemsPerPage={perPage}
                  page={page}
                  setPage={setPage}
                  hasNextPage={hasNextPage}
                />

              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}
