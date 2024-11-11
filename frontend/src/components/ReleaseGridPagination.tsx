import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid"
import clsx from "clsx"

interface ReleaseGridPaginationProps {
  page: number
  setPage: (pageNumber: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  itemCount: number
  itemsPerPage: number
}

export default function ReleaseGridPagination(
  props: ReleaseGridPaginationProps,
) {
  const {
    page,
    setPage,
    hasNextPage,
    hasPreviousPage,
    itemCount,
    itemsPerPage,
  } = props

  const totalPages = Math.ceil(itemCount / itemsPerPage)

  return (
    <nav className="flex items-center justify-between border-t border-gray-800 px-4 sm:px-0 mt-10">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => setPage(page - 1)}
          className={clsx(
            "inline-flex items-center border-t-2 pl-1 pt-4 text-sm font-medium ",
            "border-transparent text-gray-500",
            "disabled:border-none disabled:text-gray-700",
            "hover:border-gray-300 hover:text-gray-300",
          )}
          disabled={!hasPreviousPage}
        >
          <ArrowLongLeftIcon
            aria-hidden="true"
            className={clsx(
              "mr-3 h-5 w-5 text-gray-400",
              !hasPreviousPage && "text-gray-700",
            )}
          />
          Previous
        </button>
      </div>

      {[...Array.from({ length: totalPages }, (_, i) => i + 1)].map(
        (pageNumber) => {
          return (
            <div key={pageNumber} className="hidden md:-mt-px md:flex">
              <button
                onClick={() => setPage(pageNumber)}
                className={clsx(
                  "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium  hover:border-gray-300 hover:text-gray-700",
                  page === pageNumber
                    ? "border-indigo-500 text-indigo-600"
                    : "text-gray-500 border-transparent ",
                )}
              >
                {pageNumber}
              </button>
            </div>
          )
        },
      )}

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => setPage(page + 1)}
          className={clsx(
            "inline-flex items-center border-t-2 pl-1 pt-4 text-sm font-medium ",
            "border-transparent text-gray-500",
            "disabled:border-none disabled:text-gray-700",
            "hover:border-gray-300 hover:text-gray-300",
          )}
          disabled={!hasNextPage}
        >
          <span>Next</span>
          <ArrowLongRightIcon
            aria-hidden="true"
            className={clsx(
              "ml-3 h-5 w-5 text-gray-400",
              !hasNextPage && "text-gray-700",
            )}
          />
        </button>
      </div>
    </nav>
  )
}
