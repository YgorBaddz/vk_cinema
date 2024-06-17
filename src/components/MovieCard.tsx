import { Link } from "react-router-dom";
import { Movie } from "../types/Types";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="w-[300px] h-[660px] rounded-xl p-2 bg-[#0077FF] hover:-translate-y-1 hover:shadow-md hover:shadow-white transition-all duration-[100ms]">
        <div className="h-[450px] w-full">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-full w-full object-cover border-white border-2 rounded-lg"
          />
        </div>

        <div className="h-[150px] overflow-y-auto p-2 bg-white rounded-md m-2">
          <h2 className="text-[#0077FF] font-semibold">{movie.Title}</h2>
          <p>Released: {movie.Year}</p>
          <p>Rating: {movie.imdbRating}</p>
        </div>

        <button className="text-white hover:border-b-white hover:border-b-[1px] transition-all duration-[100ms] ml-3">
          Learn More
        </button>
      </div>
    </Link>
  );
};

export default MovieCard;
