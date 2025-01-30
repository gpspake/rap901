import {ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import {getPageNumbers, Pagination} from "../../utils/pagination.ts";

interface PaginationFooterProps {
  setPage: (pageNumber: number) => void
  pagination: Pagination
  siblingCount?: number
  boundaryCount?: number
}

export const PaginationFooter = (props: PaginationFooterProps) => {
  const {pagination, setPage, siblingCount = 1, boundaryCount = 1} = props
  const {itemCount, itemsPerPage, page, hasPreviousPage, hasNextPage} = pagination

  const totalPages = Math.ceil(itemCount / itemsPerPage)
  const pageNumbers = getPageNumbers({totalPages, page, siblingCount, boundaryCount})

  return (
    <nav className="flex items-center justify-between border-t border-gray-800 px-4 sm:px-0 mt-10">

      {/* Navigation: Previous */}
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className={clsx(
            'inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
            page === 1 && 'opacity-50 pointer-events-none',
            !hasPreviousPage && "text-gray-700"
          )}
          disabled={page === 1}
        >
          <ArrowLongLeftIcon aria-hidden="true" className={clsx("mr-3 h-5 w-5 text-gray-400", !hasPreviousPage && "text-gray-700", )} />
          Previous
        </button>
      </div>

      {/* Navigation: Page Numbers */}
      <div className="hidden sm:flex">
        {pageNumbers.map((pageNumber, index) => (
          <button
            id={`${index}`}
            key={index}
            onClick={() => typeof pageNumber === 'number' && setPage(pageNumber)}
            className={clsx(
              'inline-flex items-center px-4 pt-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700',
              page === pageNumber
                ? 'border-t-2 border-indigo-500 text-indigo-600'
                : typeof pageNumber === 'number'
                  ? 'text-gray-500 border-t-2 border-transparent'
                  : 'text-white border-none'
            )}
            disabled={typeof pageNumber !== 'number'}
          >
            {typeof pageNumber === 'number' ? pageNumber : '...'}
          </button>
        ))}
      </div>

      {/* Navigation: Next */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => hasNextPage && setPage(page + 1)}
          className={clsx(
            'inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
            !hasNextPage && 'opacity-50 pointer-events-none'
          )}
          disabled={!hasNextPage}
        >
          Next
          <ArrowLongRightIcon aria-hidden="true" className={clsx("ml-3 h-5 w-5 text-gray-400", !hasNextPage && "text-gray-700",)}/>
        </button>
      </div>
    </nav>
  )
}
