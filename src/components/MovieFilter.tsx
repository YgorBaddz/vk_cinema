import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import { Movie, MovieFilterProps } from "../types/Types";
import { APIKey } from "../api/APIKey";
import SearchFilter from "./filters/SearchFilter";
import GenreFilter from "./filters/GenreFilter";
import YearFilter from "./filters/YearFilter";
import RatingFilter from "./filters/RatingFilter";
import Modal from "./Modal";

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
  const [showModal, setShowModal] = useState(false);

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
                `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${APIKey}`
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

  const handleFilter = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <button
        className="text-white bg-[#0077FF] shadow-md shadow-black p-2 rounded-sm fixed top-0 right-0 mr-6 mt-24 hover:-translate-y-2 transition-all z-30"
        onClick={handleFilter}
      >
        Filter Movies
      </button>
      {showModal ? (
        <>
          <Modal onClose={handleModalClose}>
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
          </Modal>
        </>
      ) : (
        <MovieList movies={filteredMovies} />
      )}
    </div>
  );
};

export default MovieFilter;
