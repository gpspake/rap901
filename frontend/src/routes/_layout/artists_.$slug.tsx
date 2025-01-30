import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { ArtistsService } from "../../client"
import { ArtistAppearances } from "../../components/ArtistAppearances.tsx"
import { ReleasesGrid } from "../../components/Releases/ReleasesGrid.tsx"
import { RootLayout } from "./index.tsx"

export const Route = createFileRoute("/_layout/artists/$slug")({
  component: ArtistComponent,
})

function getArtistQueryOptions({ slug }: { slug: string }) {
  return {
    queryFn: () => ArtistsService.readArtist({ slug }),
    queryKey: ["artist", { slug }],
  }
}

function ArtistComponent() {
  const { slug } = Route.useParams()
  const { data: artist, isPending } = useQuery({
    ...getArtistQueryOptions({ slug }),
    placeholderData: (prevData) => prevData,
  })

  return (
    !isPending &&
    artist && (
      <RootLayout>
        <main className="flex-auto">
          <div className="sm:px-8">
            <div className="mx-auto w-full max-w-7xl lg:px-8">
              <div className="relative px-4 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-2xl lg:max-w-5xl">
                  <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                    <h1 className="text-4xl tracking-tight sm:text-4xl text-zinc-100">
                      <span className="font-bold ">Artist</span> <span className="pl-2 text-slate-300 font-light">{artist.name}</span>
                    </h1>
                  </div>
                  {!!artist.releases.length && (
                      <>
                        <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">
                        Releases
                      </h2>
                      <ReleasesGrid
                        releases={artist.releases.sort(
                          (a, b) => a.year - b.year,
                        )}
                        columns={4}
                      />
                    </>
                  )}
                  {!!artist.credits.length && (
                    <>
                      <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">
                        Album Credits
                      </h2>
                      <ReleasesGrid
                        releases={artist.credits.sort(
                          (a, b) => a.year - b.year,
                        )}
                        columns={4}
                      />
                    </>
                  )}

                  <ArtistAppearances artistId={artist.id} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </RootLayout>
    )
  )
}
