export type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
  Released?: string;
  Genre: string;
  Plot?: string;
};

export type MovieFilterProps = {
  searchString: string;
  setSearchString: (searchString: string) => void;
  handleSearch: () => void;
  selectedGenre: string;
  setSelectedGenre: (selectedGenre: string) => void;
  selectedYear: string;
  setSelectedYear: (selectedYear: string) => void;
  selectedRating: string;
  setSelectedRating: (selectedRating: string) => void;
};
