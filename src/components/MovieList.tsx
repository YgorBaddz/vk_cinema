import { Movie } from "../types/Types";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center w-full h-full gap-4 my-4">
      {movies.map((movie, id) => (
        <MovieCard key={id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
