import {
  Button,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

import { ReleasesService } from "../../../../client"
import ActionsMenu from "../../../../components/Common/ActionsMenu.tsx"
import Navbar from "../../../../components/Common/Navbar.tsx"
import AddRelease from "../../../../components/Releases/AddRelease.tsx"

const releasesSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_admin/_dashboard/dashboard/releases")({
  component: Releases,
  validateSearch: (search) => releasesSearchSchema.parse(search),
})

const PER_PAGE = 5

function getReleasesQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ReleasesService.readReleases({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["releases", { page }],
  }
}

function ReleasesTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: releases,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getReleasesQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && releases?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getReleasesQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              <Tr>
                {new Array(4).fill(null).map((_, index) => (
                  <Td key={index}>
                    <SkeletonText noOfLines={1} paddingBlock="16px" />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {releases?.data.map((release) => (
                <Tr key={release.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{release.id}</Td>
                  <Td isTruncated maxWidth="150px">
                    {release.title}
                  </Td>
                  <Td
                    color={!release.title ? "ui.dim" : "inherit"}
                    isTruncated
                    maxWidth="150px"
                  >
                    {release.title || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu type={"Release"} value={release} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Flex
        gap={4}
        alignItems="center"
        mt={4}
        direction="row"
        justifyContent="flex-end"
      >
        <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Flex>
    </>
  )
}

function Releases() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Releases Management
      </Heading>

      <Navbar type={"Release"} addModalAs={AddRelease} />
      <ReleasesTable />
    </Container>
  )
}
