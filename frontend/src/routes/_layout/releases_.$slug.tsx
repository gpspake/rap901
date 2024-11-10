import {createFileRoute, Link} from '@tanstack/react-router'
import {ReleaseLabelLink, ReleasesService} from "../../client";
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
  } = useQuery({
    ...getReleaseQueryOptions({slug}),
    placeholderData: (prevData) => prevData,
  })

  const frontImage = release?.images && release.images
    .find(image => image.display_type === "front")
  const backImage = release?.images && release.images
    .find(image => image.display_type === "back")

  // Separate label links in to labels and companies
  const { labels, companies } = (release?.label_links || []).reduce<{
    labels: ReleaseLabelLink[];
    companies: ReleaseLabelLink[];
  }>(
    (result, labelLink) => {
      if (labelLink.entity_type?.name === "Label") {
        result.labels.push(labelLink);
      } else {
        result.companies.push(labelLink);
      }
      return result;
    },
    { labels: [], companies: [] }
  );

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
                          className="-rotate-3 rounded bg-zinc-800 object-cover shadow-lg shadow-black"
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
                          className="inline-block md:block rotate-3 rounded object-cover bg-zinc-800 shadow-lg shadow-black"
                          style={{color: "transparent"}}
                          sizes="(min-width: 1024px) 32rem, 20rem"
                          placeholderSrc={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${backImage.cloudflare_id}/loading`}
                          src={`https://imagedelivery.net/br00h4PfwSBLLXuS3E5D-g/${backImage.cloudflare_id}/lg`}
                      />}
                    </div>
                  </div>

                  <div className="lg:order-first lg:row-span-2">
                    <p className="text-2xl font-bold tracking-tight sm:text-2xl text-zinc-100">
                      {release.artist_links && (
                        <ReleaseArtistsLink
                          className={'mt-2 block truncate '}
                          releaseArtists={release.artist_links}
                        />
                      )}
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-100">
                      {release.discogs_title}
                    </h1>
                    <p className="font-bold tracking-tight text-xl text-zinc-100">
                      {release.year}
                    </p>

                    <div className="flex items-center py-4">
                      {labels && labels
                        .filter(labelLink => labelLink.entity_type?.name === "Label")
                        .map(label_link => (
                          <div
                            className="flex space-x-1 rounded-lg bg-zinc-700 p-1 mr-4"
                            role="tablist"
                            aria-orientation="horizontal"
                            key={label_link.id}>
                            <button
                              className="flex items-center rounded-md py-[0.4375rem] px-2 text-sm font-semibold bg-zinc-800 shadow"
                              id="headlessui-tabs-tab-:R9d6aj:" role="tab" type="button" aria-selected="true"
                              data-headlessui-state="selected" data-selected=""
                              aria-controls="headlessui-tabs-panel-:R1l6aj:">
                              <Link to="/labels/$slug" params={{slug: label_link.label?.slug || ""}}>
                                <span className="text-xs text-zinc-300">{label_link.label?.name}</span>
                              </Link>
                            </button>
                            <button
                              className="flex items-center rounded-md py-[0.4375rem] text-xs"
                              id="headlessui-tabs-tab-:Rhd6aj:" role="tab" type="button" aria-selected="false"
                              data-headlessui-state="" aria-controls="headlessui-tabs-panel-:r3:">
                              <span className="px-2 text-slate-300">{label_link.catalog_number}</span>
                            </button>
                          </div>
                        ))}
                    </div>

                    {release.discogs_url && release.discogs_url !== "Sealed" && (
                      <a href={release.discogs_url}
                         className="font-medium text-sky-600 hover:underline">
                        View on Discogs
                      </a>
                    )}

                    <div className="mt-6 space-y-7 text-base text-zinc-400">
                      <h2
                        className="font-bold tracking-tight text-xl text-zinc-100">
                        Tracklist
                      </h2>
                      {release.tracks && <TrackList tracks={release.tracks}/>}
                    </div>


                    {!!companies.length && (
                      <>
                        <h2
                          className="mt-6 mb-4 font-bold tracking-tight text-xl text-zinc-100">
                          Companies
                        </h2>
                        <ul>
                          {companies.map(releaseLabel => (
                            <li className="text-gray-300" key={releaseLabel.id}>
                              {!!releaseLabel?.entity_type?.name && `${releaseLabel.entity_type.name} - `}
                              <Link
                                to="/labels/$slug"
                                className="hover:underline text-red-600"
                                params={{slug: releaseLabel.label.slug || ""}}
                              >
                                {releaseLabel.label.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {!!release.artist_links?.length && (
                      <>
                        <h2 className="mt-6 mb-4 font-bold tracking-tight text-xl text-zinc-100">
                          Credits
                        </h2>
                        <ul>
                          {release.artist_links
                            .filter(releaseArtistLink => !!releaseArtistLink?.role?.name)
                            .map(release_artist_link => (
                              <li className="text-gray-300" key={release_artist_link.id}>
                                {!!release_artist_link.role && `${release_artist_link.role.name} - `}
                                <Link
                                  to="/artists/$slug"
                                  className="hover:underline text-red-600"
                                  params={{slug: release_artist_link.artist.slug}}>{release_artist_link.artist.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </>
                    )}

                    {!!release.identifiers?.length && (
                      <>
                        <h2 className="mt-6 mb-4 font-bold tracking-tight text-xl text-zinc-100">
                          Identifiers
                        </h2>
                        <ul>
                          {release.identifiers.map(identifier => {
                            return (
                              <li className="text-gray-300" key={`${identifier.type}-${identifier.value}`}>
                                {!!identifier.type && `${identifier.type} - `}
                                {identifier.value}
                              </li>
                            )
                          })}
                        </ul>
                      </>
                    )}
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