import { useEffect, useState } from "react";
import { Movie } from "./types/Types";
import axios from "axios";
import Pagination from "./components/Pagination";
import MovieList from "./components/MovieList";
import { fakeMovies } from "./helpers/FakeData";
import { APIKey } from "./api/APIKey";
import MovieFilter from "./components/MovieFilter";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMovies();
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${APIKey}`
      );
      setMovies(response.data.Search);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
            />

            <div className="h-screen overflow-y-auto">
              <MovieList movies={movies} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
