import { useState, useEffect } from "react";
import axios from "axios";
import { APIKey } from "../api/APIKey";
import MovieList from "./MovieList";

const MovieFilter = ({ searchString, setSearchString, handleSearch }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchInput = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    const filterMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${searchString}&apikey=${APIKey}`
        );
        setFilteredMovies(response.data.Search);
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
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieFilter;
