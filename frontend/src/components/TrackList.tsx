import {TrackArtistPublic, TrackPublic} from "../client";
import {TrackArtistsLink} from "./TrackArtistLink.tsx";

interface JoinedArtistLinksProps {
  trackArtists: TrackArtistPublic[]
}

const JoinedArtistLinks = (props: JoinedArtistLinksProps) => {
  const {trackArtists} = props

  return trackArtists.map((trackArtist, index) => (
    <>
      <TrackArtistsLink trackArtist={trackArtist}/>
      {/*<a href={`/artists/${trackArtist.artist?.id}`}>{trackArtist.artist?.name}</a>*/}
      {index < trackArtists.length - 1 && ', '}
    </>
  ))
}



type TrackArtists = {
  artists: TrackArtistPublic[],
  extra_artists: Record<string, TrackArtistPublic[]>
}

const getTrackArtists = (trackArtists: TrackArtistPublic[] = []): TrackArtists   => {
  return trackArtists
    .reduce((acc: TrackArtists, obj: TrackArtistPublic) => {
      const key = obj.role?.name;
      if(key) {
        if (!acc['extra_artists'][key]) {
          acc['extra_artists'][key] = [];
        }
        acc['extra_artists'][key].push(obj);
      }
      else {

        acc['artists'].push(obj)
      }
      return acc;
    }, {artists: [], extra_artists: {}});
}

interface TrackArtistsProps {
  trackArtists: TrackArtists
}

const TrackArtists = (props: TrackArtistsProps) => {
  const {trackArtists} = props
  return (
    <>
      {Object.keys(trackArtists.extra_artists).map(group => (
        <>{group} - <JoinedArtistLinks trackArtists={trackArtists.extra_artists[group]} /><br/></>
      ))}
    </>
  )
}


interface TrackListProps {
  tracks: TrackPublic[]
}

export const TrackList = (props: TrackListProps) => {
  const {tracks} = props

  // Todo:
  //  handle headers like "Bonus Tracks:" - Ex Most Known Unknown
  //  handle "Double Disk:" - Ex Smoked Out
  const sortedTracks = tracks.sort((a,b): number => Number(a.position) - Number(b.position))

  return (
    <div className="mt-6 border-t border-white/10">
      <dl className="divide-y divide-white/10">
        {sortedTracks.map(track => {
          const trackArtists = getTrackArtists(track.artist_links || [])
          return (
            <div className="px-4 py-1 grid grid-cols-8 sm:gap-8 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-white">{track.position}</dt>
              <dt className="text-sm font-medium leading-6 col-span-6 text-white">
                <JoinedArtistLinks
                  // className={'mt-2 block truncate'}
                  trackArtists={trackArtists.artists}
                /> {track.title} <br/>
                <p className="text-xs font-light leading-6 sm:col-span-6 text-white">
                  {track.artist_links && <TrackArtists trackArtists={trackArtists} />}
                </p>
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-400 sm:mt-0">
                {track.duration}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
