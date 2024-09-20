import {ReleaseArtistOut} from "../client";
import {Link} from "@tanstack/react-router";

export const getReleaseArtists = (
  artists: ReleaseArtistOut[]
): ReleaseArtistOut[] => (
  artists
    .filter(artist => !artist.role || !artist.role.name)
    .sort((a, b) => a.sort_order - b.sort_order)
)

interface ReleaseArtistsLinkProps {
  releaseArtists: ReleaseArtistOut[]
  className?: string
}

export const ReleaseArtistsLink = (props: ReleaseArtistsLinkProps) => {
  const {releaseArtists, className} = props
  const getArtistName = (releaseArtist: ReleaseArtistOut): string => {
    const artistName = releaseArtist.anv ? releaseArtist.anv : releaseArtist.name
    return artistName || ""
  }

  return (
    <span className={className}>
      {releaseArtists.map(releaseArtist => (
        <>
          <Link
            className="hover:underline font-semibold"
            to={'/artists/$slug'}
            params={{slug: releaseArtist.slug}}
          >
            {getArtistName(releaseArtist)}
          </Link>
          {releaseArtist.join && ` ${releaseArtist.join} `}
        </>
      ))}
    </span>
  )
}
