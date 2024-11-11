import { Outlet, createRootRoute } from "@tanstack/react-router"

import { ChakraProvider } from "@chakra-ui/react"
import NotFound from "../components/Common/NotFound"
import theme from "../theme.tsx"

export const Route = createRootRoute({
  component: () => (
    <>
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    </>
  ),
  notFoundComponent: () => <NotFound />,
})
