import { Link } from "react-router-dom";
import { Movie } from "../types/Types";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <p>Rating: {movie.imdbRating}</p>

      <Link to={`/movie/${movie.imdbID}`}>
        <button>Learn More</button>
      </Link>
    </div>
  );
};

export default MovieCard;
