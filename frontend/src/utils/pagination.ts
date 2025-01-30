export interface Pagination {
  page: number,
  pageFirst: number,
  pageLast: number,
  itemCount: number,
  itemsPerPage: number, // todo: make per_page configurable
  hasNextPage: boolean,
  hasPreviousPage: boolean,
}

interface GetPaginationArgs {
  itemCount: number | undefined,
  page: number,
  isPlaceholderData?: boolean
}

// returns a pagination object
export const getPagination = ({page, itemCount: _itemCount, isPlaceholderData}: GetPaginationArgs): Pagination => {
  const itemCount = _itemCount || 0
  const itemsPerPage = 24;
  const pageLast = Math.min(itemsPerPage * page, itemCount);
  const pageFirst = Math.max((page - 1) * itemsPerPage + 1, 1);
  const hasNextPage = !isPlaceholderData && pageLast < (itemCount);
  const hasPreviousPage = page > 1;

  return {
    page,
    pageLast,
    pageFirst,
    itemCount,
    hasNextPage,
    hasPreviousPage,
    itemsPerPage
  }
}


interface CreatePageNumberArgs {
  totalPages: number,
  page: number,
  siblingCount: number,
  boundaryCount: number
}

// returns an array of page numbers and delimiter strings
export const getPageNumbers = ({totalPages, page, siblingCount, boundaryCount}: CreatePageNumberArgs): (number | string)[] => {
  if (totalPages <= 1) return [1]

  const pages: (number | string)[] = []

  // Dynamically adjust sibling count near the beginning or end
  const adjustedSiblingCount = page <= 2 ? siblingCount + 2 : siblingCount

  const startPages = Array.from({length: boundaryCount}, (_, i) => i + 1)
  const endPages = Array.from({length: boundaryCount}, (_, i) => totalPages - i).reverse()
  const siblingStart = Math.max(page - adjustedSiblingCount, boundaryCount + 1)
  const siblingEnd = Math.min(page + adjustedSiblingCount, totalPages - boundaryCount)

  const shouldShowLeftEllipsis = siblingStart > boundaryCount + 1
  const shouldShowRightEllipsis = siblingEnd < totalPages - boundaryCount

  pages.push(...startPages)

  if (shouldShowLeftEllipsis) pages.push('...')
  pages.push(...Array.from({length: siblingEnd - siblingStart + 1}, (_, i) => siblingStart + i))
  if (shouldShowRightEllipsis) pages.push('...')
  pages.push(...endPages)

  return pages
}