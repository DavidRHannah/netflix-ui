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
import { useLanguage } from "../../contexts/LanguageContext";

interface MovieModalI {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({ movie, isOpen, onClose }: MovieModalI) {
  const { t } = useLanguage();

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

      <div className="modal-content-container relative bg-zinc-900 rounded-lg max-w-5xl w-full mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="close-button absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-zinc-800 hover:bg-zinc-700 rounded-full p-1.5 sm:p-2 transition-colors"
          aria-label="Close modal"
        >
          <Close className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        <div className="modal-hero relative">
          <div className="modal-background-img h-48 sm:h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img
              src={movie.localPoster}
              alt={movie.title}
              className="w-full h-full object-cover blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-zinc-900/20" />
          </div>
          <div className="content-overlay absolute inset-0 flex items-end p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-6 w-full">
              <div className="poster flex-shrink-0">
                <img
                  src={movie.localPoster}
                  alt={movie.title}
                  className="w-20 sm:w-32 md:w-48 rounded-lg shadow-2xl"
                />
              </div>

              <div className="movie-info flex-1 text-white">
                <div className="inline-flex items-center bg-red-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                  #{movie.rank} {t("movieModal.trending")}
                </div>

                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                  {movie.title}
                </h2>
                <p className="text-sm sm:text-lg text-gray-300 mb-2 sm:mb-4">
                  {movie.year} • {movie.rated} • {movie.runtime}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <span className="text-sm sm:text-lg font-semibold">
                      {movie.imdbRating}
                    </span>
                    <span className="text-gray-300 text-xs sm:text-base">
                      ({movie.imdbVotes.toLocaleString()}{" "}
                      {t("movieModal.votes")})
                    </span>
                  </div>
                  {movie.metascore > 0 && (
                    <div className="bg-green-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm font-bold">
                      {movie.metascore} {t("movieModal.metascore")}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button className="bg-white text-black px-3 py-1.5 sm:px-6 sm:py-3 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-gray-200 transition-colors font-semibold text-sm sm:text-base">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t("movieModal.play")}</span>
                  </button>
                  <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg transition-colors">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-2 py-1.5 sm:px-4 sm:py-3 rounded-lg transition-colors">
                    <ThumbUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-6">
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="modal-main-content lg:col-span-2 space-y-3 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t("movieModal.overview")}
                </h3>
                <p className="text-gray-300 text-sm sm:text-lg leading-5 sm:leading-relaxed">
                  {movie.plot}
                </p>
              </div>

              {movie.awards && movie.awards !== "N/A" && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                    {t("movieModal.awards")}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-5">
                    {movie.awards}
                  </p>
                </div>
              )}

              {movie.ratings && movie.ratings.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                    {t("movieModal.ratings")}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:hidden">
                    {movie.ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="bg-zinc-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <span className="text-gray-400 font-medium">
                          {rating.Source}:
                        </span>
                        <span className="text-white font-semibold">
                          {rating.Value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-3">
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
            <div className="modal-sidebar flex justify-between sm:flex-col space-y-0 sm:space-y-6">
              <div className="sidebar-priority-one flex flex-col gap-2">
                <div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                    {t("movieModal.director")}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base leading-5">
                    {formatDirectors(movie.director)}
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                    {t("movieModal.cast")}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base leading-5">
                    {formatActors(movie.actors)}
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                    {t("movieModal.genres")}
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {movie.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-zinc-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs sm:text-sm text-gray-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sidebar-priority-two flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>
                    {t("movieModal.released")}: {movie.released}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>
                    {t("movieModal.runtime")}: {movie.runtime}
                  </span>
                </div>
                {movie.language && movie.language.length > 0 && (
                  <div className="text-gray-300 text-sm sm:text-base leading-5">
                    <span className="font-medium">
                      {t("movieModal.languages")}:{" "}
                    </span>
                    {movie.language.join(", ")}
                  </div>
                )}
                {movie.country && movie.country.length > 0 && (
                  <div className="text-gray-300 text-sm sm:text-base leading-5">
                    <span className="font-medium">
                      {t("movieModal.country")}:{" "}
                    </span>
                    {movie.country.join(", ")}
                  </div>
                )}
                {movie.boxOffice && movie.boxOffice !== "N/A" && (
                  <div className="text-gray-300 text-sm sm:text-base leading-5">
                    <span className="font-medium">
                      {t("movieModal.boxOffice")}:{" "}
                    </span>
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
