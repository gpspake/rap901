import {Pagination} from "../../utils/pagination.ts";

interface PaginationHeaderProps {
  pagination: Pagination
}

export const PaginationHeader = (props: PaginationHeaderProps) => {
  const {pageFirst, pageLast, itemCount} = props.pagination
  return (
    <p className=" text-gray-400">
      Showing
      <span className="font-semibold px-1 text-gray-300">{pageFirst}</span>
      to
      <span className="font-semibold px-1 text-gray-300">{pageLast}</span>
      of
      <span className="font-semibold px-1 text-gray-300">{itemCount}</span>
      results
    </p>
  )
}
