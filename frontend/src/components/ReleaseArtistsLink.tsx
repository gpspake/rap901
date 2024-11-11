import { Link } from "@tanstack/react-router"
import type { ReleaseArtistLink } from "../client"

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
    console.log("get artist name", releaseArtistLink)
    const artistName = releaseArtistLink.anv
      ? releaseArtistLink.anv
      : releaseArtistLink.artist.name
    return artistName || ""
  }

  return (
    <span className={className}>
      {releaseArtists.map((releaseArtist) => (
        <>
          <Link
            className="hover:underline font-semibold text-red-500"
            to={"/artists/$slug"}
            params={{ slug: releaseArtist.artist.slug }}
          >
            {getArtistName(releaseArtist)}
          </Link>
          {releaseArtist.join && ` ${releaseArtist.join} `}
        </>
      ))}
    </span>
  )
}
