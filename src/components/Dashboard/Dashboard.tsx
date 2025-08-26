// import { useAuth } from "../../contexts/AuthContext";
import { PlayArrow, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Movie } from "../TrendingMovies/types";

export default function Dashboard() {
  // const { currentUser } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/movie_data/movie_data.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.trendingMovies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load movie data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  const heroMovie = movies[0];

  return (
    <div className="text-white bg-black">
      {heroMovie && (
        <div
          className="relative h-[60vh] flex flex-col justify-end p-8"
          style={{
            backgroundImage: `url(/movie_data/posters/${heroMovie.localPoster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl font-bold">{heroMovie.title}</h1>
          <p className="max-w-xl mt-2">{heroMovie.plot}</p>
          <div className="flex gap-4 mt-4">
            <button className="bg-white text-black px-4 py-2 rounded flex items-center gap-2">
              <PlayArrow /> Play
            </button>
            <button className="bg-gray-600 px-4 py-2 rounded flex items-center gap-2">
              <Add /> My List
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-300">
            ⭐ IMDb {heroMovie.imdbRating} | {heroMovie.releaseYear} •{" "}
            {heroMovie.runtime}
          </p>
        </div>
      )}

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>
        <div className="flex gap-4 overflow-x-auto">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="w-[150px] flex-shrink-0">
              <img
                src={`/movie_data/posters/${movie.localPoster}`}
                alt={movie.title}
                className="rounded-lg shadow"
              />
              <p className="mt-2 text-sm font-medium">{movie.title}</p>
              <p className="text-xs text-gray-400">
                {movie.releaseYear} • ⭐ {movie.imdbRating}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
