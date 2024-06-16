export type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
  Released?: string;
  Genre?: string;
  Plot?: string;
};

export interface MovieFilterProps {
  searchString: string;
  setSearchString: (newString: string) => void;
  handleSearch: () => Promise<void>;
  setMovies: (newMovies: Movie[]) => void;
  genreFilter: string;
  setGenreFilter: (newFilter: string) => void;
  yearFilter: string;
  setYearFilter: (newFilter: string) => void;
  ratingFilter: string;
  setRatingFilter: (newFilter: string) => void;
}
