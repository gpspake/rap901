import {createFileRoute, Link} from '@tanstack/react-router'
import {ReleasesService} from "../../client";
import {useQuery} from "@tanstack/react-query";
import {RootLayout} from "./index.tsx";
import {ReleaseArtistsLink} from "../../components/ReleaseArtistsLink.tsx";
import {TrackList} from "../../components/TrackList.tsx";
import {ProgressiveImg} from "../../components/ProgressiveImg.tsx";

export const Route = createFileRoute('/_layout/releases/$slug')({
  component: ReleaseComponent,
})

function getReleaseQueryOptions({slug}: { slug: string }) {
  return {
    queryFn: () =>
      ReleasesService.readRelease({slug: slug}),
    queryKey: ["releases", {slug}],
  }
}


function ReleaseComponent() {
  const {slug} = Route.useParams()
  const {
    data: release,
    isPending,
    // isPlaceholderData,
  } = useQuery({
    ...getReleaseQueryOptions({slug}),
    placeholderData: (prevData) => prevData,
  })

  const frontImage = release?.images && release.images
    .find(image => image.display_type === "front")
  const backImage = release?.images && release.images
    .find(image => image.display_type === "back")

  return !isPending && release && (
    <RootLayout>
      <main className="flex-auto">
        <div className="sm:px-8 mt-16 sm:mt-32">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                  <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none z-20 relative inline-block">
                      {frontImage && <ProgressiveImg
                          alt=""
                          loading="lazy"
                          width="800"
                          height="800"
                          decoding="async"
                          data-nimg="1"
                          className="-rotate-3 rounded bg-zinc-100 object-cover dark:bg-zinc-800  shadow-lg shadow-black"
                          style={{color: "transparent"}}
                          sizes="(min-width: 1024px) 32rem, 20rem"
                          placeholderSrc={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/loading`}
                          src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${frontImage.cloudflare_id}/lg`}
                      />}
                    </div>
                    <div className="max-w-xs px-2.5 lg:max-w-none z-10 inline-block">
                      {backImage && <ProgressiveImg
                          alt=""
                          loading="lazy"
                          width="800"
                          height="800"
                          decoding="async"
                          data-nimg="1"
                          className="inline-block md:block rotate-3 rounded bg-zinc-100 object-cover dark:bg-zinc-800 shadow-lg shadow-black"
                          style={{color: "transparent"}}
                          sizes="(min-width: 1024px) 32rem, 20rem"
                          placeholderSrc={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${backImage.cloudflare_id}/loading`}
                          src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${backImage.cloudflare_id}/lg`}
                      />}
                    </div>
                  </div>

                  <div className="lg:order-first lg:row-span-2">
                    <p className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-100">
                      {release.artists && (
                        <ReleaseArtistsLink
                          className={'mt-2 block truncate '}
                          releaseArtists={release.artists}
                        />
                      )}
                    </p>
                    <h1
                      className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                      {release.discogs_title}
                    </h1>
                    <p className="font-bold tracking-tight text-zinc-800 text-xl dark:text-zinc-100">
                      {release.year}
                    </p>

                    <div className="flex items-center py-4">
                      {release.labels && release.labels.map(label => {
                        // return <p>{label.name} | {label.catalog_number}</p>
                        return (
                          <div className="flex space-x-1 rounded-lg bg-zinc-700 p-1 mr-4" role="tablist"
                               aria-orientation="horizontal">
                            <button
                              className="flex items-center rounded-md py-[0.4375rem] px-2 text-sm font-semibold bg-zinc-800 shadow"
                              id="headlessui-tabs-tab-:R9d6aj:" role="tab" type="button" aria-selected="true"
                              // tabIndex="0"
                              data-headlessui-state="selected" data-selected=""
                              aria-controls="headlessui-tabs-panel-:R1l6aj:">
                              <Link to="/labels/$slug" params={{slug: label.slug}}>
                                <span className="text-xs text-zinc-300">{label.name}</span>
                              </Link>
                            </button>
                            <button
                              className="flex items-center rounded-md py-[0.4375rem] text-xs"
                              id="headlessui-tabs-tab-:Rhd6aj:" role="tab" type="button" aria-selected="false"
                              // tabIndex="-1"

                              data-headlessui-state="" aria-controls="headlessui-tabs-panel-:r3:">
                              <span className="px-2 text-slate-300">{label.catalog_number}</span>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                    {release.discogs_url && (
                      <a href={release.discogs_url}
                         className="font-medium text-sky-600 dark:text-sky-600 hover:underline">
                        View on Discogs
                      </a>
                    )}

                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                      <h2
                        className="font-bold tracking-tight text-zinc-800 text-xl dark:text-zinc-100">
                        Tracklist
                      </h2>
                      {release.tracks && <TrackList tracks={release.tracks}/>}
                    </div>


                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                      <h2
                        className="font-bold tracking-tight text-zinc-800 text-xl dark:text-zinc-100">
                        Companies
                      </h2>
                      <ul>
                        {release.companies && release.companies.map(company => {
                          return (
                            <li className="text-gray-300">
                              {company.entity_type_name} - <Link to="/labels/$slug"
                                                                 className="hover:underline text-red-600"
                                                                 params={{slug: company.slug}}>{company.name}</Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                      <h2
                        className="font-bold tracking-tight text-zinc-800 text-xl dark:text-zinc-100">
                        Credits
                      </h2>
                      <ul>
                        {release.extra_artists && release.extra_artists.map(extra_artist => {
                          return (
                            <li className="text-gray-300">
                              {!!extra_artist.role && `${extra_artist.role.name} - `}
                              <Link to="/artists/$slug"
                                    className="hover:underline text-red-600"
                                    params={{slug: extra_artist.slug}}>{extra_artist.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  )
}