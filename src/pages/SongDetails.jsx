import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songData, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingSongDetails) return <Loader title="Searching song details..." />;
  if (error) return <Error />;

  const songImg = songData.resources["shazam-songs"][songid].attributes.images.coverArt;
  const songGenres = songData.resources["shazam-songs"][songid].attributes.genres.primary;
  const songArtist = songData.resources["shazam-songs"][songid].attributes.artist;
  const songTitle = songData.resources["shazam-songs"][songid].attributes.title;

  const songDataDetails = songData && songData.resources && songData.resources;
  const songDataLyrics = songDataDetails.lyrics;
  const songDataLyricsId = Object.getOwnPropertyNames(songDataLyrics).toString();
  const lyricsText = songDataLyrics[songDataLyricsId].attributes.text;
  const lyricsFooter = songDataLyrics[songDataLyricsId].attributes.footer;

  // console.log(songData);

  return (
    <div className="flex flex-col animate-slideright">
      <DetailsHeader
        songid={songid}
        songTitle={songTitle}
        songImg={songImg}
        songGenres={songGenres}
        songArtist={songArtist}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyricsText ? (
            lyricsText.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
          )}

          {lyricsText ? <p className="text-gray-600 text-lg my-4">{lyricsFooter}</p> : null}
        </div>
      </div>

      {/* <RelatedSongs */}
      {/*   isPlaying={isPlaying} */}
      {/*   activeSong={activeSong} */}
      {/*   handlePauseClick={handlePauseClick} */}
      {/*   handlePlayClick={handlePlayClick} */}
      {/* /> */}
    </div>
  );
};

export default SongDetails;
