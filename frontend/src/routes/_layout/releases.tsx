import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query"
import {createFileRoute, useNavigate} from "@tanstack/react-router"
import {useEffect} from "react"
import {z} from "zod"
import {ReleasesService} from "../../client"
import {Container, RootLayout} from "./index.tsx";
import {ReleasesGrid} from "../../components/ReleasesGrid.tsx";
// import {ReleasesTable} from "../../components/ReleasesTable.tsx";

const releasesSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/releases")({
  component: Releases,
  validateSearch: (search) => releasesSearchSchema.parse(search),
})

const PER_PAGE = 16

function getReleasesQueryOptions({page}: { page: number }) {
  return {
    queryFn: () =>
      ReleasesService.readReleases({skip: (page - 1) * PER_PAGE, limit: PER_PAGE}),
    queryKey: ["releases", {page}],
  }
}

function ShowReleases() {
  const queryClient = useQueryClient()
  const {page} = Route.useSearch()
  const navigate = useNavigate({from: Route.fullPath})
  const setPage = (page: number) =>
    navigate({search: (prev) => ({...prev, page})})

  // type LayoutType = 'grid' | 'table';
  // const [layout, setLayout] = useState<LayoutType>('grid')
  const layout = 'grid'

  const {
    data: releases,
    isPending,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    ...getReleasesQueryOptions({page}),
    placeholderData: keepPreviousData,
  })

  const releasesCount = releases?.count || 0
  // const pagesCount = Math.ceil(releasesCount / PER_PAGE) || 0
  const hasNextPage = !isPlaceholderData && releases?.data.length === PER_PAGE
  const pageLast = PER_PAGE * page
  const pageFirst = pageLast - (PER_PAGE - 1)


  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getReleasesQueryOptions({page: page + 1}))
    }
  }, [page, queryClient, hasNextPage])


  return (
    <>
      {/*<span onClick={() => setLayout('table')}>Table</span>*/}
      {/*<span onClick={() => setLayout('grid')}>Grid</span>*/}
      {/*<span id="releases-top"></span>*/}
      {layout === 'grid' && (
        <ReleasesGrid
          releases={releases}
          releasesCount={releasesCount}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          pageFirst={pageFirst}
          pageLast={pageLast}
          setPage={setPage}
          page={page}
          isPending={isPending}
          isLoading={isLoading}
          perPage={PER_PAGE}
        />
      )}
      {/*{layout === 'table' && (*/}
      {/*  <ReleasesTable*/}
      {/*    releases={releases}*/}
      {/*    releasesCount={releasesCount}*/}
      {/*    hasNextPage={hasNextPage}*/}
      {/*    hasPreviousPage={hasPreviousPage}*/}
      {/*    pageFirst={pageFirst}*/}
      {/*    pageLast={pageLast}*/}
      {/*    setPage={setPage}*/}
      {/*    page={page}*/}
      {/*    isPending={isPending}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  )
}

function Releases() {
  return (
    <RootLayout>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Releases
          </h1>
        </div>
        <ShowReleases />
      </Container>
    </RootLayout>
  )
}
