import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import { Movie, MovieFilterProps } from "../types/Types";
import { APIKey } from "../api/APIKey";

const MovieFilter: React.FC<MovieFilterProps> = ({
  searchString,
  setSearchString,
  handleSearch,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(e.target.value);
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

      <div className="w-full max-w-md mb-8">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Biography">Biography</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Music">Music</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Sport">Sport</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
        </select>
      </div>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Filter by year"
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Filter by rating"
          value={selectedRating}
          onChange={handleRatingChange}
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
