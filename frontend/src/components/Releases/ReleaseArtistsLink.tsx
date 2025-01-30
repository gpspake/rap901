import { Link } from "@tanstack/react-router"
import type { ReleaseArtistLink } from "../../client"

export const getReleaseArtists = (
  artistLinks: ReleaseArtistLink[],
): ReleaseArtistLink[] =>
  artistLinks
    .filter((artistLink) => !artistLink.role || !artistLink.role.name)
    .sort((a, b) => a.sort_order - b.sort_order)

interface ReleaseArtistsLinkProps {
  releaseArtists: ReleaseArtistLink[]
  className?: string
}

export const ReleaseArtistsLink = (props: ReleaseArtistsLinkProps) => {
  const { className } = props

  const releaseArtists = getReleaseArtists(props.releaseArtists)

  const getArtistName = (releaseArtistLink: ReleaseArtistLink): string => {
    const artistName = releaseArtistLink.anv
      ? releaseArtistLink.anv
      : releaseArtistLink.artist.name
    return artistName || ""
  }

  return (
    <span className={className}>
      {releaseArtists.map((releaseArtist) => (
        <span key={releaseArtist.id}>
          <Link
            className="transition-all duration-300 hover:text-red-500 hover:underline no-underline font-semibold text-red-600 "
            to={"/artists/$slug"}
            params={{ slug: releaseArtist.artist.slug }}
          >
            {getArtistName(releaseArtist)}
          </Link>
          {releaseArtist.join && ` ${releaseArtist.join} `}
        </span>
      ))}
    </span>
  )
}
