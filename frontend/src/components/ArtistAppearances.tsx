import {useQuery} from "@tanstack/react-query";
import {TrackArtistsService} from "../client";
import {ArtistReleasesGrid} from "./ArtistReleasesGrid.tsx";


function getArtistAppearanceQueryOptions({artistId}: { artistId: string }) {
  return {
    queryFn: () =>
      TrackArtistsService.readArtistAppearances({artistId}),
    queryKey: ["artistAppearances", {artistId}],
  }
}

interface ArtistAppearancesProps {
  artistId: string
}

export function ArtistAppearances(props: ArtistAppearancesProps) {

  const {artistId} = props

  const {
    data: releases,
    // isPending,
    isLoading,
    // isPlaceholderData,
  } = useQuery({
    ...getArtistAppearanceQueryOptions({artistId}),
    placeholderData: (prevData) => prevData,
  })

  return (
    <>
      {isLoading ? "Loading" : (
        <p className="text-slate-300">
          {releases && (
            <>
              <h2 className="text-xl font-bold tracking-tight sm:text-xl text-zinc-100 pt-8 pb-4">Appearances</h2>
              <ArtistReleasesGrid releases={releases}/>
            </>
          )}
        </p>
      )}
    </>
  )
}