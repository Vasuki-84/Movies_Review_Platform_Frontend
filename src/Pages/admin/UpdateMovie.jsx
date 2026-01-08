import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import { useNavigate } from "react-router-dom";

export default function UpdateMovie() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie`);
      setMovies(res.data);
    } catch (error) {
      console.error("Fetch movies error:", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${baseUrl}/movie/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Delete movie error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 mt-20 bg-white/10 backdrop-blur-lg rounded p-6 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Update \ Delete Movies
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
          >
            <img
              src={movie.posterImage}
              alt={movie.movieName}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">
                {movie.movieName}
              </h3>

              <p className="text-sm text-gray-400 mb-3">
                {movie.language} • {movie.duration}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/layout/update/${movie._id}`)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 transition rounded-lg py-2 text-sm font-semibold"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteMovie(movie._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 transition rounded-lg py-2 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No movies found</p>
      )}
    </div>
  );
}
