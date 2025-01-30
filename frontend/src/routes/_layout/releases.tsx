import {createFileRoute} from "@tanstack/react-router"
import {z} from "zod"
import {RootLayout} from "./index.tsx"
import {Container} from "../../components/Container.tsx";
import {ShowReleases} from "../../components/Releases/ShowReleases.tsx";

const releasesSearchSchema = z.object({
  page: z.coerce.number().default(1),  // Ensures page is always a number
  q: z.string().default("")  // Ensures q is always a string
})

export const Route = createFileRoute("/_layout/releases")({
  component: Releases,
  validateSearch: (search) => releasesSearchSchema.parse(search),
})

function Releases() {
  return (
    <RootLayout>
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-4xl text-zinc-100">
            Releases
          </h1>
        </div>
        <ShowReleases />
      </Container>
    </RootLayout>
  )
}
