import {TrackPublic} from "../client";

interface TrackListProps {
  tracks: TrackPublic[]
}

export const TrackList = (props: TrackListProps) => {
  const {tracks} = props

  return (
    <span>
      {tracks.map(track => (
        <span>
          {track.title} {track.duration} <br/>
        </span>
      ))}
    </span>
  )
}
