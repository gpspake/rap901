import {useEffect} from "react";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {ReleasesService} from "../../client";
import {Route} from "../../routes/_layout/releases.tsx";
import {ReleasesGrid} from "./ReleasesGrid.tsx";
import {ReleasesGridSkeleton} from "./ReleasesGridSkeleton.tsx";
import {getPagination, Pagination} from "../../utils/pagination.ts";

const PER_PAGE = 24

function getReleasesQueryOptions({page}: { page: number }) {
  return {
    queryFn: () =>
      ReleasesService.readReleases({
        skip: (page - 1) * PER_PAGE,
        limit: PER_PAGE,
      }),
    queryKey: ["releases", {page}],
  }
}

interface AllReleasesProps {
  pagination: Pagination | undefined
  setPagination: (pagination: Pagination) => void
}

export const AllReleases = (props: AllReleasesProps) => {
  const { pagination, setPagination } = props
  const {page} = Route.useSearch() || 1
  const queryClient = useQueryClient()

  // fetch data
  const {
    data: releases,
    isPending,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    ...getReleasesQueryOptions({page: pagination?.page || 1}),
    placeholderData: keepPreviousData,
  })

  // Prefetch next page
  useEffect(() => {
    if (pagination && pagination.hasNextPage) {
      queryClient.prefetchQuery(getReleasesQueryOptions({page: pagination.page + 1}))
    }
  }, [pagination, queryClient])

  // Update pagination when data or page changes
  useEffect(() => {
  if (releases) {
      const itemCount = releases.count || 0;
      setPagination(getPagination({ page, itemCount, isPlaceholderData }));
    }
  }, [releases, page, isPlaceholderData]);

  return (
    <div className="mt-8">
      {isLoading || isPending || isPlaceholderData ? (
        <ReleasesGridSkeleton cardCount={16}/>
      ) : (
        releases && <ReleasesGrid releases={releases.data}/>
      )}
    </div>
  )
}
