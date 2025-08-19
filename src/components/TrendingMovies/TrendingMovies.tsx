import { useRef } from "react";
import trendingData from "./trending_movies.json";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Movie {
  rank: number;
  title: string;
  image: string;
  genre: string;
  year: number;
  rating: number;
}

export default function TrendingMovies() {
  const movies: Movie[] = trendingData.trendingMovies;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -600,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="trending-movies-container mt-12 flex flex-col w-full items-center">
      <div className="trending-container-title">
        <span className="trending-movies-text text-white font-semibold text-2xl md:text-3xl">
          Trending Movies
        </span>
      </div>
      <div className="trending-movies flex mt-6 items-center p-0">
        <button
          className="left-browse bg-gray-800/60 hover:bg-gray-800/100 cursor-pointer rounded-l-xl h-32 w-9 transition-colors duration-300"
          onClick={scrollLeft}
        >
          <ChevronRightIcon className="!text-white !text-4xl !scale-x-[-1]" />
        </button>
        <div
          ref={scrollContainerRef}
          className="movie-row flex gap-6 overflow-x-auto overflow-y-hidden py-4 px-3 w-full max-w-5xl scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.rank}
              className="movie-card relative group cursor-pointer flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <div className="absolute -bottom-2 -left-2 text-white text-6xl drop-shadow-[0_3px_2px_rgba(255,0,0,1)] z-10 font-extrabold">
                {movie.rank}
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={`/trending/${movie.image}`}
                  alt={movie.title}
                  className="w-48 h-48 md:h-64 object-contain"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col text-center justify-between w-full h-full">
                    <div className="top flex items-start mt-12">
                      <h3 className="font-semibold text-base">{movie.title}</h3>
                    </div>
                    <div className="bottom w-full">
                      <p className="text-sm text-gray-300 font-medium text-right">
                        {movie.genre}
                      </p>
                      <p className="text-sm text-gray-300 font-medium text-right">
                        {movie.year}
                      </p>
                      <p className="text-sm text-yellow-400 font-semibold text-right">
                        ★ {movie.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="right-browse bg-gray-800/60 hover:bg-gray-800/100 cursor-pointer rounded-r-xl h-32 w-9 ml-2 transition-colors duration-300"
          onClick={scrollRight}
        >
          <ChevronRightIcon className="!text-white !text-4xl" />
        </button>
      </div>
    </div>
  );
}
