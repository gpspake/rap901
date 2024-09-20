import {useQuery, useQueryClient} from "@tanstack/react-query"
import {createFileRoute, useNavigate} from "@tanstack/react-router"
import {useEffect} from "react"
import {z} from "zod"
import {ArtistsService} from "../../client"
import {Container, RootLayout} from "./index.tsx";
import {ArtistsGrid} from "../../components/ArtistsGrid.tsx";

const artistsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/artists")({
  component: Artists,
  validateSearch: (search) => artistsSearchSchema.parse(search),
})

const PER_PAGE = 16

function getArtistsQueryOptions({page}: { page: number }) {
  return {
    queryFn: () =>
      ArtistsService.readArtists({skip: (page - 1) * PER_PAGE, limit: PER_PAGE}),
    queryKey: ["artists", {page}],
  }
}

function ShowArtists() {
  const queryClient = useQueryClient()
  const {page} = Route.useSearch()
  const navigate = useNavigate({from: Route.fullPath})
  const setPage = (page: number) =>
    navigate({search: (prev) => ({...prev, page})})

  const {
    data: artists,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getArtistsQueryOptions({page}),
    placeholderData: (prevData) => prevData,
  })

  const artistsCount = artists?.count || 0
  // const pagesCount = Math.ceil(artistsCount / PER_PAGE) || 0
  const hasNextPage = !isPlaceholderData && artists?.data.length === PER_PAGE
  const pageLast = PER_PAGE * page
  const pageFirst = pageLast - (PER_PAGE - 1)


  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getArtistsQueryOptions({page: page + 1}))
    }
  }, [page, queryClient, hasNextPage])


  return (
    <ArtistsGrid
      artists={artists}
      artistsCount={artistsCount}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      pageFirst={pageFirst}
      pageLast={pageLast}
      setPage={setPage}
      page={page}
      isPending={isPending}
    />
  )
}

function Artists() {
  return (
    <RootLayout>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Artists
          </h1>
        </div>
        <ShowArtists />
      </Container>
    </RootLayout>
  )
}
