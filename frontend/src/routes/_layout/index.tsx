import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import '../../../index.css'
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Public Frontend 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
      </Container>
    </>
  )
}
