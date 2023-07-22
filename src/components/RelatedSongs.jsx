import { logo } from "../assets";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import SongBar from "./SongBar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RelatedSongs = ({ handlePauseClick, handlePlayClick }) => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: sd,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  // const relatedTracksIdArr =
  //   relatedData &&
  //   relatedData?.resources["shazam-song-lists"][
  //     `track-similarities-id-${songid}`
  //   ]["relationships"]["tracks"]["data"];
  const { data: rd } = useGetSongRelatedQuery({ songid });

  const relatedTracksIdArr =
    rd &&
    rd?.resources["shazam-song-lists"][`track-similarities-id-${songid}`][
      "relationships"
    ]["tracks"]["data"].map((id) => id.id);

  console.log(relatedTracksIdArr);

  const songDataTracks =
    sd && sd.resources["shazam-songs"][`${songid}`]["attributes"];

  console.log(songDataTracks);

  // relatedTracksIdArr.map((track) => songDataTracks);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {/* {relatedTracksIdArr.map( */}
        {/*   (rtId) => */}
        {/*     songData && */}
        {/*     songData.resources["shazam-songs"].rtId.["attributes"] */}
        )}
        {/*    */}
        {/*   console.log(rtId.id) */}
        {/* )} */}
        {/*  */}
        {/* <div>{songid}</div> */}
        {/* {relatedTracksIdArr.map((s) => console.log(s))} */}
        {/* {relatedTracksIdArr?.map((relatedSong, i) => ( */}
        {/*   <SongBar */}
        {/*     key={relatedSong.key} */}
        {/*     relatedSong={relatedSong} */}
        {/*     i={i} */}
        {/*     isPlaying={isPlaying} */}
        {/*     activeSong={activeSong} */}
        {/*     handlePauseClick={handlePauseClick} */}
        {/*     handlePlayClick={handlePlayClick} */}
        {/*   /> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default RelatedSongs;
