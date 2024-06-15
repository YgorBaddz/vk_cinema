import { useEffect, useState } from "react";
import { Movie } from "./types/Types";
import axios from "axios";
import Pagination from "./components/Pagination";
import MovieList from "./components/MovieList";
import { fakeMovies } from "./helpers/FakeData";
import { APIKey } from "./api/APIKey";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);

    const response = await axios.get(
      `http://www.omdbapi.com/?s=movie&apikey=${APIKey}&page=${currentPage}`
    );

    setMovies(response.data.Search);
    setTotalItems(response.data.totalResults);

    //Тестируем на фейковых данных чтобы не тратить free tier запросы
    // setMovies(fakeMovies);
    // setTotalItems(fakeMovies.length);

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMovies();
  };

  return (
    <main className="">
      {loading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />

          <MovieList movies={movies} />
        </div>
      )}
    </main>
  );
}

export default App;
