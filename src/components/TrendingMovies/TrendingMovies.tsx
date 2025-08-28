import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import MovieRow from "./MovieRow";
import type { Movie } from "./types";

export default function TrendingMovies() {
  const { t } = useLanguage();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("/movie_data/movie_data.json")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.trendingMovies || []);
      })
      .catch((err) => {
        console.error("Failed to load movie data:", err);
      });
  }, []);

  return (
    <MovieRow
      title={t("trendingMovies.header")}
      movies={movies}
      showTrendingRank={true}
    />
  );
}
