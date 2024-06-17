import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import { Movie, MovieFilterProps } from "../types/Types";
import { APIKey } from "../api/APIKey";
import SearchFilter from "./filters/SearchFilter";
import GenreFilter from "./filters/GenreFilter";
import YearFilter from "./filters/YearFilter";
import RatingFilter from "./filters/RatingFilter";

const MovieFilter: React.FC<MovieFilterProps> = ({
  searchString,
  setSearchString,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const filterMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${searchString}&apikey=${APIKey}`
        );

        if (response.data.Search) {
          const movieDetails = await Promise.all(
            response.data.Search.map(async (movie: any) => {
              const detailsResponse = await axios.get(
                `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${APIKey}`
              );
              return {
                ...movie,
                Poster: detailsResponse.data.Poster,
                Title: detailsResponse.data.Title,
                Year: detailsResponse.data.Year,
                imdbRating: detailsResponse.data.imdbRating,
                Released: detailsResponse.data.Released,
                Genre: detailsResponse.data.Genre,
                Plot: detailsResponse.data.Plot,
              };
            })
          );
          setFilteredMovies(movieDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    filterMovies();
  }, [searchString]);

  return (
    <div className="w-full flex flex-col items-center">
      <SearchFilter
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <YearFilter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <RatingFilter
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      {filteredMovies && filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieFilter;
