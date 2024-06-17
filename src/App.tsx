import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "./types/Types";
import { APIKey } from "./api/APIKey";
import Pagination from "./components/Pagination";
import MovieFilter from "./components/MovieFilter";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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
    filterMoviesByGenreAndYear();
  }, [movies, selectedGenre, selectedYear]);

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
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    filterMoviesByGenreAndYear();
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(e.target.value);
    filterMoviesByGenreAndYear();
  };

  const filterMoviesByGenreAndYear = () => {
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
            />

            {searchString ? (
              <div className=""></div>
            ) : (
              <div className="h-screen overflow-y-auto">
                <MovieList movies={filteredMovies} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
