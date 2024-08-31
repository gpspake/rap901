import {ReleaseArtistLink} from "../client";

export const getReleaseArtists = (
  artists: ReleaseArtistLink[]
): ReleaseArtistLink[] => (
  artists
    .filter(artist => !artist.role || !artist.role.name)
    .sort((a, b) => a.sort_order - b.sort_order)
)

interface ReleaseArtistLinkProps {
  releaseArtists: ReleaseArtistLink[]
  className: string
}

export const ReleaseArtistsLink = (props: ReleaseArtistLinkProps) => {
  const {releaseArtists, className} = props
  const getArtistName = (releaseArtist: ReleaseArtistLink): string => {
    const artistName = releaseArtist.anv ? releaseArtist.anv : releaseArtist.artist?.name
    return artistName || ""
  }


  return (
    <span className={className}>
      {releaseArtists.map(artist => (
        <>
          <a className="hover:underline font-semibold" href={`/artists/${artist.artist_id}`}>
            {getArtistName(artist)}
          </a>
          {artist.join && ` ${artist.join} `}
        </>
      ))}
    </span>
  )
}
