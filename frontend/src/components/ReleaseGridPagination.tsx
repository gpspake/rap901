import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import clsx from "clsx";

interface ReleaseGridPaginationProps {
  page: number
  setPage: (pageNumber: number) => void
  hasNextPage: boolean
  itemCount: number
  itemsPerPage: number
}

export default function ReleaseGridPagination(props: ReleaseGridPaginationProps) {

  const {page, setPage, hasNextPage, itemCount, itemsPerPage} = props

  console.log({itemCount, itemsPerPage, floored: Math.floor(itemCount / itemsPerPage)})

  const totalPages = Math.floor(itemCount / itemsPerPage)

  return (
    <nav className="flex items-center justify-between border-t border-gray-800 px-4 sm:px-0 mt-10">

      <div className="-mt-px flex w-0 flex-1">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
          Previous
        </a>
      </div>

      {[...Array.from({length: totalPages}, (_, i) => i + 1)].map(pageNumber => {
        return (
          <div key={pageNumber} className="hidden md:-mt-px md:flex">
            <button
              onClick={() => setPage(pageNumber)}
              className={clsx(
                "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium  hover:border-gray-300 hover:text-gray-700",
                page === pageNumber ? "border-indigo-500 text-indigo-600" : "text-gray-500 border-transparent "
              )}
            >
              {pageNumber}
            </button>
          </div>
        )

      })}

      <div className="-mt-px flex w-0 flex-1 justify-end">

        <button
          onClick={() => setPage(page + 1)}
          className={clsx(
            "inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
            hasNextPage && "disabled"
          )}
        >
          <span>Next</span>
          <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400"/>
        </button>

        {/*<a*/}
        {/*  href="#"*/}
        {/*  className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"*/}
        {/*>*/}
        {/*  Next*/}
        {/*  <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400"/>*/}
        {/*</a>*/}
      </div>
    </nav>
  )
}