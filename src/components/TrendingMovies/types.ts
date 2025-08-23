export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  rank: number;
  imdbID: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string[];
  director: string[];
  writer: string[];
  actors: string[];
  plot: string;
  language: string[];
  country: string[];
  awards: string;
  poster: string;
  localPoster: string;
  ratings: Rating[];
  metascore: number;
  imdbRating: number;
  imdbVotes: number;
  type: string;
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
  isMovie: boolean;
  isSeries: boolean;
  hasHighRating: boolean;
  releaseYear: number;
}
