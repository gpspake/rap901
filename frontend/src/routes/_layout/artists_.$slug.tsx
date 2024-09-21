import {createFileRoute} from '@tanstack/react-router'
import {ArtistsService} from "../../client";
import {useQuery} from "@tanstack/react-query";
import {RootLayout} from "./index.tsx";
import {ArtistReleasesGrid} from "../../components/ArtistReleasesGrid.tsx";
import {ArtistAppearances} from "../../components/ArtistAppearances.tsx";

export const Route = createFileRoute('/_layout/artists/$slug')({
  component: ArtistComponent,
})

function getArtistQueryOptions({slug}: { slug: string }) {
  return {
    queryFn: () =>
      ArtistsService.readArtist({slug}),
    queryKey: ["artists", {slug}],
  }
}

function ArtistComponent() {
  const {slug} = Route.useParams()
  const {
    data: artist,
    isPending,
    // isPlaceholderData,
  } = useQuery({
    ...getArtistQueryOptions({slug}),
    placeholderData: (prevData) => prevData,
  })

  return !isPending && artist && (
    <RootLayout>
      <main className="flex-auto">
        <div className="sm:px-8 mt-16">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                  <div className="lg:order-first lg:row-span-2">
                    <h1
                      className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                      {artist.name}
                    </h1>
                  </div>
                </div>
                {artist.releases.length && (
                  <>
                    <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">
                      Releases
                    </h2>
                    <ArtistReleasesGrid releases={artist.releases}/>
                  </>
                )}
                {artist.credits.length && (
                  <>
                    <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">Credits</h2>
                    <ArtistReleasesGrid releases={artist.credits}/>
                  </>
                )}

                <ArtistAppearances artistId={artist.id}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  )
}