import { PlayArrow, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Movie } from "../TrendingMovies/types";
import MovieRow from "../TrendingMovies/MovieRow";

export default function Dashboard() {
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

  const getMoviesByGenre = (genreName: string) => {
    return movies.filter(movie => 
      movie.genre && movie.genre.some((g: string) => 
        g.toLowerCase().includes(genreName.toLowerCase())
      )
    );
  };

  const getMoviesByRating = (minRating: number) => {
    return movies.filter(movie => 
      movie.imdbRating && movie.imdbRating >= minRating
    ).sort((a, b) => b.imdbRating - a.imdbRating);
  };

  const getMoviesByDecade = (startYear: number, endYear: number) => {
    return movies.filter(movie => {
      const year = movie.releaseYear;
      return year >= startYear && year <= endYear;
    }).sort((a, b) => b.releaseYear - a.releaseYear);
  };

  const getRecentMovies = () => {
    const currentYear = new Date().getFullYear();
    return movies.filter(movie => 
      movie.releaseYear >= currentYear - 3
    ).sort((a, b) => b.releaseYear - a.releaseYear);
  };

  const getHighRatedMovies = () => {
    return movies.filter(movie => movie.hasHighRating);
  };

  const getMoviesOnly = () => {
    return movies.filter(movie => movie.isMovie);
  };

  const getSeriesOnly = () => {
    return movies.filter(movie => movie.isSeries);
  };

  const getAwardWinners = () => {
    return movies.filter(movie => 
      movie.awards && movie.awards.toLowerCase().includes('won')
    ).sort((a, b) => b.imdbRating - a.imdbRating);
  };

  const shuffleArray = (array: Movie[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;

  const heroMovie = movies[0];
  
  // Create different movie categories
  const trendingNow = movies.slice(0, 10);
  const continueWatching = movies.slice(7, 10);
  const topRated = getMoviesByRating(8.0).slice(0, 10);
  const highRated = getHighRatedMovies().slice(0, 10);
  const moviesOnly = getMoviesOnly().slice(0, 10);
  const seriesOnly = getSeriesOnly().slice(0, 10);
  const awardWinners = getAwardWinners().slice(0, 10);
  const actionMovies = getMoviesByGenre("action").slice(0, 10);
  const dramaMovies = getMoviesByGenre("drama").slice(0, 10);
  const comedyMovies = getMoviesByGenre("comedy").slice(0, 10);
  const horrorMovies = getMoviesByGenre("horror").slice(0, 10);
  const sciFiMovies = getMoviesByGenre("sci-fi").slice(0, 10);
  const thrillerMovies = getMoviesByGenre("thriller").slice(0, 10);
  const crimeMovies = getMoviesByGenre("crime").slice(0, 10);
  const recentReleases = getRecentMovies().slice(0, 10);
  const nineties = getMoviesByDecade(1990, 1999).slice(0, 10);
  const twoThousands = getMoviesByDecade(2000, 2009).slice(0, 10);
  const twentyTens = getMoviesByDecade(2010, 2019).slice(0, 10);
  const becauseYouWatched = shuffleArray(movies).slice(0, 10);
  const popularOnNetflix = shuffleArray(movies).slice(10, 20);

  return (
    <>
      <div className="text-white bg-black">
        {/* Hero Section */}
        {heroMovie && (
          <div
            className="relative h-[60vh] flex flex-col justify-end p-8"
            style={{
              backgroundImage: `url(/movie_data/posters/${heroMovie.localPoster})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold">{heroMovie.title}</h1>
              <p className="max-w-xl mt-2">{heroMovie.plot}</p>
              <div className="flex gap-4 mt-4">
                <button className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200 transition">
                  <PlayArrow /> Play
                </button>
                <button className="bg-gray-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-500 transition">
                  <Add /> My List
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                IMDb {heroMovie.imdbRating} | {heroMovie.releaseYear} • {heroMovie.runtime}
              </p>
            </div>
          </div>
        )}

        {/* Movie Categories */}
        <div className="pb-20">
          {continueWatching.length > 0 && (
            <MovieRow
              title="Continue Watching"
              movies={continueWatching}
              showTrendingRank={false}
            />
          )}

          {trendingNow.length > 0 && (
            <MovieRow
              title="Trending Now"
              movies={trendingNow}
              showTrendingRank={true}
            />
          )}

          {topRated.length > 0 && (
            <MovieRow
              title="Top Rated Movies"
              movies={topRated}
              showTrendingRank={false}
            />
          )}

          {popularOnNetflix.length > 0 && (
            <MovieRow
              title="Popular on Netflix"
              movies={popularOnNetflix}
              showTrendingRank={false}
            />
          )}

          {recentReleases.length > 0 && (
            <MovieRow
              title="New Releases"
              movies={recentReleases}
              showTrendingRank={false}
            />
          )}

          {actionMovies.length > 0 && (
            <MovieRow
              title="Action & Adventure"
              movies={actionMovies}
              showTrendingRank={false}
            />
          )}

          {dramaMovies.length > 0 && (
            <MovieRow
              title="Dramas"
              movies={dramaMovies}
              showTrendingRank={false}
            />
          )}

          {comedyMovies.length > 0 && (
            <MovieRow
              title="Comedies"
              movies={comedyMovies}
              showTrendingRank={false}
            />
          )}

          {sciFiMovies.length > 0 && (
            <MovieRow
              title="Sci-Fi Movies"
              movies={sciFiMovies}
              showTrendingRank={false}
            />
          )}

          {horrorMovies.length > 0 && (
            <MovieRow
              title="Horror Movies"
              movies={horrorMovies}
              showTrendingRank={false}
            />
          )}

          {becauseYouWatched.length > 0 && (
            <MovieRow
              title="Because You Watched Action Movies"
              movies={becauseYouWatched}
              showTrendingRank={false}
            />
          )}

          {highRated.length > 0 && (
            <MovieRow
              title="Highly Rated"
              movies={highRated}
              showTrendingRank={false}
            />
          )}

          {awardWinners.length > 0 && (
            <MovieRow
              title="Award Winners"
              movies={awardWinners}
              showTrendingRank={false}
            />
          )}

          {moviesOnly.length > 0 && (
            <MovieRow
              title="Movies"
              movies={moviesOnly}
              showTrendingRank={false}
            />
          )}

          {seriesOnly.length > 0 && (
            <MovieRow
              title="TV Shows & Series"
              movies={seriesOnly}
              showTrendingRank={false}
            />
          )}

          {thrillerMovies.length > 0 && (
            <MovieRow
              title="Thrillers"
              movies={thrillerMovies}
              showTrendingRank={false}
            />
          )}

          {crimeMovies.length > 0 && (
            <MovieRow
              title="Crime Movies"
              movies={crimeMovies}
              showTrendingRank={false}
            />
          )}

          {twentyTens.length > 0 && (
            <MovieRow
              title="Movies from the 2010s"
              movies={twentyTens}
              showTrendingRank={false}
            />
          )}

          {nineties.length > 0 && (
            <MovieRow
              title="90s Movies"
              movies={nineties}
              showTrendingRank={false}
            />
          )}

          {twoThousands.length > 0 && (
            <MovieRow
              title="Movies from the 2000s"
              movies={twoThousands}
              showTrendingRank={false}
            />
          )}
        </div>
      </div>
    </>
  );
}