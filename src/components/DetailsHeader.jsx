import { Link } from "react-router-dom";

const DetailsHeader = ({
  songImg,
  songGenres,
  songArtist,
  songTitle,
  songid,
}) => {
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        {songImg ? (
          <img
            src={songImg}
            alt="name"
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
        ) : (
          <p className="text">no-img</p>
        )}

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {songTitle}
          </p>
          {
            <Link to={`/artists/${songid}`}>
              <p className="text-base text-gray-400 mt-2">{songArtist}</p>
            </Link>
          }

          <p className="text-base text-gray-400 mt-2">{songGenres}</p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
