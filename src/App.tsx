import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "./types/Types";
import { APIKey } from "./api/APIKey";
import Pagination from "./components/Pagination";
import MovieFilter from "./components/MovieFilter";
import MovieList from "./components/MovieList";
import NoMoviesFound from "./components/NoMoviesFound";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const fetchMovies = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=movie&apikey=${APIKey}&page=${currentPage}`
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

        setMovies(movieDetails);
        setFilteredMovies(movieDetails);
        setTotalItems(response.data.totalResults);
      } else {
        console.error("No movie data found in the response");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    filterMoviesByGenreAndYearAndRating();
  }, [movies, selectedGenre, selectedYear, selectedRating, searchString]);

  const handlePageChange = (page: number) => {
    setSearchString("");
    setFilteredMovies([]);
    setCurrentPage(page);
    fetchMovies();
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${APIKey}`
      );
      setFilteredMovies(response.data.Search);
      filterMoviesByGenreAndYearAndRating();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    filterMoviesByGenreAndYearAndRating();
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(e.target.value);
    filterMoviesByGenreAndYearAndRating();
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(e.target.value);
    filterMoviesByGenreAndYearAndRating();
  };

  const filterMoviesByGenreAndYearAndRating = () => {
    let filteredMovies = movies;

    if (selectedGenre !== "") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.Genre.includes(selectedGenre)
      );
    }

    if (selectedYear !== "") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.Year.includes(selectedYear)
      );
    }

    if (selectedRating !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) => parseFloat(movie.imdbRating) === parseFloat(selectedRating)
      );
    }

    if (searchString !== "") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    setFilteredMovies(filteredMovies);
  };

  return (
    <main className=" w-screen h-screen flex justify-center ">
      <div className=" w-4/5 flex justify-center px-2 py-6">
        {loading ? (
          <div className="">Loading...</div>
        ) : (
          <div className="w-full ">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
            <MovieFilter
              searchString={searchString}
              setSearchString={setSearchString}
              handleSearch={handleSearch}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />

            {filteredMovies.length > 0 ? (
              <div className="h-screen overflow-y-auto">
                <MovieList movies={filteredMovies} />
              </div>
            ) : (
              <NoMoviesFound />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
