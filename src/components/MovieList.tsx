import { Movie } from "../types/Types";

type MovieListProps = {
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie, id) => (
        <li key={id}>
          <img src={movie.Poster} alt={movie.Title} />
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <p>{movie.imdbRating}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
