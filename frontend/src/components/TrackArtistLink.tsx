import {TrackArtistPublic} from "../client";
import {Link} from "@tanstack/react-router";

interface TrackArtistOutProps {
  trackArtist: TrackArtistPublic
  className?: string
}

export const TrackArtistsLink = (props: TrackArtistOutProps) => {
  const {trackArtist, className} = props
  const getArtistName = (trackArtist: TrackArtistPublic): string => {
    const artistName = trackArtist.anv ? trackArtist.anv : trackArtist.artist?.name
    return artistName || ""
  }

  return (
    <>
      {trackArtist.artist?.slug && <Link
        to={'/artists/$slug'}
        params={{slug: trackArtist.artist.slug}}
        className={`hover:underline text-red-600 font-semibold ${className}`}
      >
        {getArtistName(trackArtist)}
      </Link>}
    </>
  )
}
