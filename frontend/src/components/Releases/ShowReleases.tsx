import {useNavigate} from "@tanstack/react-router"
import {useState} from "react"
import {AllReleases} from "./AllReleases.tsx"
import {ReleasesSearchInput} from "./ReleasesSearchInput.tsx";
import {ReleasesSearchResults} from "./ReleasesSearchResults.tsx";
import {Pagination} from "../../utils/pagination.ts";
import {PaginationHeader} from "../Pagination/PaginationHeader.tsx";
import {PaginationFooter} from "../Pagination/PaginationFooter.tsx";
import {Route} from "../../routes/_layout/releases.tsx";

// Stores searchQuery and Renders AllReleases or ReleasesSearchResults based on state
// Stores pagination object and renders the pagination UI based on state
export const ShowReleases = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { q, page } = Route.useSearch(); // Always use URL state
  const [pagination, setPagination] = useState<Pagination | undefined>(undefined);
  const searchQuery = q || "";  // Ensure query is always defined
  const showSearchResults = !!searchQuery.length;

  const setPage = (newPage: number) => {
    if (newPage !== page) {
      navigate({ search: (prev) => ({ ...prev, page: newPage }) });
    }
  };

  const setSearchQuery = (newQuery: string) => {
    const trimmedQuery = newQuery.trim()

    // If the query hasn't changed, do nothing
    if (trimmedQuery === q?.trim()) { return }

    navigate({
      search: (prev) => ({
        ...prev,
        q: trimmedQuery,
        page: trimmedQuery !== "" ? 1 : prev.page,
      }),
    })
  }
  
  return (
    <>
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between mb-4 mt-8">
        {!!pagination && <PaginationHeader pagination={pagination} />}
        <ReleasesSearchInput setSearchQuery={setSearchQuery} />
      </div>

      {showSearchResults && (
        <ReleasesSearchResults
          searchQuery={searchQuery}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
      {!showSearchResults && (
        <AllReleases pagination={pagination} setPagination={setPagination} />
      )}

      {!!pagination && <PaginationFooter setPage={setPage} pagination={pagination} />}
    </>
  );
}
