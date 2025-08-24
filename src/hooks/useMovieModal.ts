import { useState } from "react";
import type { Movie } from "../components/TrendingMovies/types";

export const useMovieModal = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 200);
  };

  return {
    selectedMovie,
    isModalOpen,
    openModal,
    closeModal,
  };
};
