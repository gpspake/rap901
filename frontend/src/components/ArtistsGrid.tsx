import {ArtistsPublic} from "../client"
import clsx from "clsx";
import { Link} from "@tanstack/react-router"

interface ArtistsGridProps {
  artistsCount: number
  artists: ArtistsPublic | undefined
  hasNextPage: boolean
  hasPreviousPage: boolean
  pageFirst: number
  pageLast: number
  setPage: (pageNumber: number) => void,
  page: number,
  isPending: boolean
}

export const ArtistsGrid = (props: ArtistsGridProps) => {

  const {
    artists,
    artistsCount,
    hasNextPage,
    hasPreviousPage,
    pageFirst,
    pageLast,
    setPage,
    page,
    isPending
  } = props



  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

                  <ul role="list"
                      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {isPending ? (
                        <p>loading</p>

                    ) : (<>

                        {artists?.data.map((artist) => {

                          return (
                            <li key={artist.id}>
                              <div
                                className="group aspect-h-1 aspect-w-[1.14] block w-full overflow-hidden rounded bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                              >
                                <Link
                                  to={'/artists/$slug'}
                                  params={{ slug: artist.slug }}
                                  type="button"
                                  className="absolute inset-0 focus:outline-none"
                                >
                                  <span className="sr-only">
                                    {artist.name}
                                  </span>
                                </Link>
                              </div>
                            </li>
                          )
                        })}
                      </>

                    )}

                  </ul>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-300">
                      Showing
                      <span className="font-semibold px-1">{pageFirst}</span>
                      to
                      <span className="font-semibold px-1">{pageLast}</span>
                      of
                      <span className="font-semibold px-1">{artistsCount}</span>
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
