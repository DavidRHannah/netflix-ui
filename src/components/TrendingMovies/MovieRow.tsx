import ScrollCarousel from "../ScrollCarousel/ScrollCarousel";
import { useScreenSize } from "../../hooks/useScreenSize";
import type { Movie } from "./types";
import { useMovieModal } from "../../hooks/useMovieModal";
import MovieModal from "./MovieModal";
import { useCallback } from "react";

interface MovieRowI {
  title: string;
  movies: Movie[];
  showTrendingRank: boolean;
}

export default function MovieRow({
  title,
  movies,
  showTrendingRank,
}: MovieRowI) {
  const screenWidth = useScreenSize();
  const { selectedMovie, isModalOpen, openModal, closeModal } = useMovieModal();

  const getScrollAmount = useCallback(() => {
    console.log(screenWidth);
    if (screenWidth === "xs") return 350;
    if (screenWidth === "sm") return 600;
    if (screenWidth === "md") return 600;
    if (screenWidth === "lg") return 1200;
    if (screenWidth === "xl") return 1400;
    return 2400;
  }, [screenWidth]);

  const renderMovieCard = useCallback(
    (movie: Movie) => (
      <div
        onClick={() => openModal(movie)}
        className="movie-card relative group cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        {showTrendingRank && (
          <div className="absolute -bottom-1 -left-1 text-white text-6xl drop-shadow-[0_3px_2px_rgba(255,0,0,1)] z-10 font-extrabold">
            {movie.rank}
          </div>
        )}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={`/movie_data/posters/${movie.localPoster}`}
            alt={movie.title}
            className="w-36 md:w-48 h-48 md:h-64 object-contain"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col text-center justify-between w-full h-full">
              <div className="top flex justify-center items-start mt-12">
                <h3 className="font-semibold text-sm sm:text-base">
                  {movie.title}
                </h3>
              </div>
              <div className="bottom w-full text-xs md:text-sm text-gray-300 font-medium text-right">
                <p className="">{movie.genre}</p>
                <p className="">{movie.year}</p>
                <p className="text-yellow-400">★ {movie.imdbRating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [openModal, showTrendingRank],
  );

  return (
    <>
      <div className="movie-row-container mt-12 p-2 relative items-start flex flex-col w-fit">
        <div>
          <span className="movie-row-text text-white font-semibold text-2xl md:text-3xl">
            {title}
          </span>
        </div>
        <div className="mt-2">
          <ScrollCarousel
            data={movies}
            renderItem={renderMovieCard}
            scrollAmount={getScrollAmount()}
            maxWidth={
              "max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-full"
            }
            gap="gap-4 md:gap-6"
          />
        </div>
      </div>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={closeModal}
        showTrendingRank={showTrendingRank}
      />
    </>
  );
}
