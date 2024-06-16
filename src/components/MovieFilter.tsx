import { useState, useEffect } from "react";
import axios from "axios";
import { APIKey } from "../api/APIKey";
import MovieList from "./MovieList";
import { Movie } from "../types/Types";

interface MovieFilterProps {
  searchString: string;
  setSearchString: (searchString: string) => void;
  handleSearch: () => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({
  searchString,
  setSearchString,
  handleSearch,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

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
      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchString}
          onChange={handleSearchInput}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredMovies && filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieFilter;
