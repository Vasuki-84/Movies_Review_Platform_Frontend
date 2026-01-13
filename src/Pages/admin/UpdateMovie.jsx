import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateMovie() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movie
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(res.data);
    } catch (error) {
      console.error("Fetch movies error:", error);
    }
  };

  // Delete Movie
  const deleteMovie = async (id) => {
     toast.error(
    ({ closeToast }) => (
      <div>
        <p className="font-semibold mb-2">
          Are you sure you want to delete this movie?
        </p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              closeToast();
              await confirmDelete(id);
            }}
            className="bg-red-600 px-3 py-1 rounded text-white text-sm"
          >
            Yes, Delete
          </button>

          <button
            onClick={closeToast}
            className="bg-gray-600 px-3 py-1 rounded text-white text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      position: "top-right",
      autoClose: false,
      closeOnClick: false,
    }
  );
    try {
      await axios.delete(`${baseUrl}/movie/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Delete movie error:", error);
        toast.error("Failed to delete movie", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-lg text-white p-4 md:p-8 mt-20 rounded">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Update / Delete Movies
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
        <p className="text-center text-gray-400 mt-10">No movies found..</p>
      )}
    </div>
  );
}
