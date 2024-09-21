import { Outlet, createRootRoute } from "@tanstack/react-router"

import NotFound from "../components/Common/NotFound"
import theme from "../theme.tsx";
import {ChakraProvider} from "@chakra-ui/react";

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
