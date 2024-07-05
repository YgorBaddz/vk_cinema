import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../types/Types";
import { APIKey } from "../api/APIKey";
import Loading from "../components/helpers/Loading";
import pageTransition from "../animations/pageTransition";

const MovieDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <div className="">Error: the movie does not exist =(</div>;
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${id}&apikey=${APIKey}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="flexCenter flex-col text-white w-[600px] ">
      {movie ? (
        <div className="flexCenter flex-col gap-12 ">
          <div className=" w-[300px] h-[445px] ">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-auto object-cover border-white border-8 rounded-lg hover:border-blue-400 hover:-translate-y-4 transition-all"
            />
          </div>

          <div className="relative flex gap-6 flex-col bg-white rounded-xl p-8 h-[335px] overflow-y-auto text-black">
            <h2 className="text-xl text-center text-blue-400 font-bold">
              {movie.Title}
            </h2>

            <div className="flex gap-4 flex-col text-lg">
              <p>
                Rating:{" "}
                <span className="text-blue-400 ">{movie.imdbRating}</span>{" "}
              </p>
              <p>
                Release Date:{" "}
                <span className="text-blue-400 ">{movie.Released}</span>{" "}
              </p>
              <p>
                Genre: <span className="text-blue-400 ">{movie.Genre}</span>{" "}
              </p>
              <p>
                Plot: <span className="text-blue-400 ">{movie.Plot}</span>{" "}
              </p>
            </div>

            <p
              onClick={() => navigate(-1)}
              className="absolute top-0 left-0 ml-2 text-3xl cursor-pointer text-red-500 hover:text-red-700"
            >
              x
            </p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default pageTransition(MovieDetails);
