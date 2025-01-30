import {useEffect} from "react";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {ReleasesService} from "../../client";
import {Route} from "../../routes/_layout/releases.tsx";
import {ReleasesGrid} from "./ReleasesGrid.tsx";
import {getPagination, Pagination} from "../../utils/pagination.ts";

const PER_PAGE = 24

function getReleaseSearchResultsQueryOptions({page, query}: { page: number, query: string }) {
  return {
    queryFn: () =>
      ReleasesService.releasesSearch({
        page,
        limit: PER_PAGE,
        query
    }),
    queryKey: ["releases", {page, query}],
  }
}

interface ReleasesSearchResultsProps {
  searchQuery: string
  pagination: Pagination | undefined
  setPagination: (pagination: Pagination) => void
}

export const ReleasesSearchResults = (props: ReleasesSearchResultsProps) => {
  const { searchQuery, pagination, setPagination } = props
  const {page} = Route.useSearch() || 1
  const queryClient = useQueryClient()

  // fetch data
  const {
    data: releases,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getReleaseSearchResultsQueryOptions({ page: pagination?.page || 1, query: searchQuery }),
    placeholderData: keepPreviousData,
  })

  // Prefetch next page
  useEffect(() => {
    if (pagination && pagination.hasNextPage) {
      queryClient.prefetchQuery(getReleaseSearchResultsQueryOptions({page: pagination.page + 1, query: searchQuery}))
    }
  }, [pagination, queryClient, searchQuery])

  // Update pagination when data or page changes
  useEffect(() => {
  if (releases) {
      const itemCount = releases.count || 0;
      setPagination(getPagination({ page, itemCount, isPlaceholderData }));
    }
  }, [releases, page, isPlaceholderData]);

  return (
    <div className="mt-8">
      {!!releases?.results && !isPending && (
        <ReleasesGrid releases={releases.results.map(result => result.document)} />
      )}
    </div>
  )
}
