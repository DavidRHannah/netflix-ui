import { useEffect } from "react";
import {
  Close,
  PlayArrow as Play,
  Add as Plus,
  ThumbUp,
  Star,
  Event as Calendar,
  WatchLater as Clock,
  EmojiEvents as Award,
} from "@mui/icons-material";
import type { Movie } from "./types";

interface MovieModalI {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({ movie, isOpen, onClose }: MovieModalI) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const formatActors = (actors: string[]) => actors.slice(0, 5).join(", ");
  const formatDirectors = (directors: string[]) => directors.join(", ");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="modal-content-container relative bg-zinc-900 rounded-lg max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="close-button absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <Close className="w-6 h-6 text-white" />
        </button>

        <div className="modal-hero relative">
          <div className="modal-background-img h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img
              src={movie.localPoster}
              alt={movie.title}
              className="w-full h-full object-cover blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-zinc-900/20" />
          </div>
          <div className="content-overlay absolute inset-0 flex items-end p-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
              <div className="poster flex-shrink-0">
                <img
                  src={movie.localPoster}
                  alt={movie.title}
                  className="w-32 md:w-48 rounded-lg shadow-2xl"
                />
              </div>

              <div className="movie-info flex-1 text-white">
                <div className="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                  #{movie.rank} Trending
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {movie.title}
                </h2>
                <p className="text-lg text-gray-300 mb-4">
                  {movie.year} • {movie.rated} • {movie.runtime}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">
                      {movie.imdbRating}
                    </span>
                    <span className="text-gray-300">
                      ({movie.imdbVotes.toLocaleString()} votes)
                    </span>
                  </div>
                  {movie.metascore > 0 && (
                    <div className="bg-green-600 px-2 py-1 rounded text-sm font-bold">
                      {movie.metascore} Metascore
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-black px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors font-semibold">
                    <Play className="w-5 h-5" />
                    <span>Play</span>
                  </button>
                  <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <ThumbUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="modal-main-content lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Overview
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.plot}
                </p>
              </div>

              {movie.awards && movie.awards !== "N/A" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Awards
                  </h3>
                  <p className="text-gray-300">{movie.awards}</p>
                </div>
              )}

              {movie.ratings && movie.ratings.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Ratings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {movie.ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="bg-zinc-800 p-3 rounded-lg text-center"
                      >
                        <div className="text-gray-400 text-sm">
                          {rating.Source}
                        </div>
                        <div className="text-white font-semibold">
                          {rating.Value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="moedal-sidbar space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Director</h4>
                <p className="text-gray-300">
                  {formatDirectors(movie.director)}
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Cast</h4>
                <p className="text-gray-300">{formatActors(movie.actors)}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-zinc-700 px-2 py-1 rounded-full text-sm text-gray-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-details space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>Released: {movie.released}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Runtime: {movie.runtime}</span>
                </div>
                {movie.language && movie.language.length > 0 && (
                  <div className="text-gray-300">
                    <span className="font-medium">Languages: </span>
                    {movie.language.join(", ")}
                  </div>
                )}
                {movie.country && movie.country.length > 0 && (
                  <div className="text-gray-300">
                    <span className="font-medium">Country: </span>
                    {movie.country.join(", ")}
                  </div>
                )}
                {movie.boxOffice && movie.boxOffice !== "N/A" && (
                  <div className="text-gray-300">
                    <span className="font-medium">Box Office: </span>
                    {movie.boxOffice}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
