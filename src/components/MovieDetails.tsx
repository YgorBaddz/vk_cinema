import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Types";
import { APIKey } from "../api/APIKey";
import { fakeMovies } from "../helpers/FakeData";

const MovieDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <div className="">Error: the movie does not exist =(</div>;
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // axios
    //   .get(`http://www.omdbapi.com/?i=${id}&apikey=${APIKey}`)
    //   .then((res) => {
    //     setMovie(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //Фейковые детали
    const fakeMovie = fakeMovies.find((movie) => movie.imdbID === id);
    if (fakeMovie) {
      setMovie(fakeMovie);
    }
  }, [id]);
  return (
    <div>
      {movie ? (
        <div className="">
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p>Rating: {movie.imdbRating}</p>
          <p>Release Date: {movie.Released}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Plot: {movie.Plot}</p>
        </div>
      ) : (
        <div className="">Loading...</div>
      )}
    </div>
  );
};

export default MovieDetails;
