import {useQuery, useQueryClient} from "@tanstack/react-query"
import {createFileRoute, useNavigate} from "@tanstack/react-router"
import {useEffect, useState} from "react"
import {z} from "zod"
import {LabelsService} from "../../client"
import {Container, RootLayout} from "./index.tsx";
// import {LabelsGrid} from "../../components/LabelsGrid.tsx";
// import {LabelsTable} from "../../components/LabelsTable.tsx";

const labelsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/labels")({
  component: Labels,
  validateSearch: (search) => labelsSearchSchema.parse(search),
})

const PER_PAGE = 16

function getLabelsQueryOptions({page}: { page: number }) {
  return {
    queryFn: () =>
      LabelsService.readLabels({skip: (page - 1) * PER_PAGE, limit: PER_PAGE}),
    queryKey: ["labels", {page}],
  }
}

function ShowLabels() {
  const queryClient = useQueryClient()
  const {page} = Route.useSearch()
  const navigate = useNavigate({from: Route.fullPath})
  const setPage = (page: number) =>
    navigate({search: (prev) => ({...prev, page})})

  type LayoutType = 'grid' | 'table';

  const [layout, setLayout] = useState<LayoutType>('grid')

  const {
    data: labels,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getLabelsQueryOptions({page}),
    placeholderData: (prevData) => prevData,
  })

  const labelsCount = labels?.count || 0
  // const pagesCount = Math.ceil(labelsCount / PER_PAGE) || 0
  const hasNextPage = !isPlaceholderData && labels?.data.length === PER_PAGE
  const pageLast = PER_PAGE * page
  const pageFirst = pageLast - (PER_PAGE - 1)


  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getLabelsQueryOptions({page: page + 1}))
    }
  }, [page, queryClient, hasNextPage])


  return (
    <>
      <span onClick={() => setLayout('table')}>Table</span>
      <span onClick={() => setLayout('grid')}>Grid</span>
      {hasPreviousPage} {pageFirst} {labelsCount} {isPending} {layout} {setPage}
    </>
  )
}

function Labels() {
  return (
    <RootLayout>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Labels
          </h1>
        </div>
        <ShowLabels />
      </Container>
    </RootLayout>
  )
}
