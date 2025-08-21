import { useLanguage } from "../contexts/LanguageContext";

export const useLocalizedContent = () => {
  const { currentLanguage } = useLanguage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocalizedMovieTitle = (movie: any) => {
    return (
      movie[`title_${currentLanguage.abbr}`] ||
      movie.title ||
      movie.original_title
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocalizedMovieOverview = (movie: any) => {
    return movie[`overview_${currentLanguage.abbr}`] || movie.overview;
  };

  return {
    getLocalizedMovieTitle,
    getLocalizedMovieOverview,
    currentLanguage,
  };
};
