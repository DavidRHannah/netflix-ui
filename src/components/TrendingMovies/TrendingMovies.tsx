import trendingData from "./trending_movies.json";
import ScrollCarousel from "../ScrollCarousel/ScrollCarousel";
import { useScreenSize } from "../../hooks/useScreenSize";

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
  const screenWidth = useScreenSize();
  

  const renderMovieCard = (movie: Movie) => (
    <div className="movie-card relative group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="absolute -bottom-1 -left-1 text-white text-6xl drop-shadow-[0_3px_2px_rgba(255,0,0,1)] z-10 font-extrabold">
        {movie.rank}
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={`/trending/${movie.image}`}
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
              <p className="text-yellow-400">★ {movie.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="trending-movies-container mt-12 p-2 relative items-start flex flex-col w-fit">
      <div>
        <span className="trending-movies-text text-white font-semibold text-2xl md:text-3xl">
          Trending Movies
        </span>
      </div>

      <div className="mt-2">
        <ScrollCarousel
          data={movies}
          renderItem={renderMovieCard}
          scrollAmount={screenWidth === 'xs' ? 350 : 600}
          maxWidth={
            "max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl"
          }
          gap="gap-4 md:gap-6"
        />
      </div>
    </div>
  );
}
