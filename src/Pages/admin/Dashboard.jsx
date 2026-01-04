import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const moviesRes = await axios.get(`${baseUrl}/movie`);
      const reviewsRes = await axios.get(`${baseUrl}/review`);

      setMovies(moviesRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  };

  return (
    <div className="p-6 text-white">
      {/* ===== DASHBOARD TITLE ===== */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl">
          <h3 className="text-lg">Movies</h3>
          <p className="text-4xl font-bold">{movies.length}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-xl">
          <h3 className="text-lg">Reviews</h3>
          <p className="text-4xl font-bold">{reviews.length}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl">
          <h3 className="text-lg">Users</h3>
          <p className="text-4xl font-bold">—</p>
        </div>
      </div>

      {/* ===== MOVIES LIST ===== */}
      <h2 className="text-2xl font-semibold mb-4">Top Content</h2>

      <div className="space-y-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="flex items-center justify-between bg-[#111] p-4 rounded-lg hover:bg-[#1a1a1a]"
          >
            <div className="flex items-center gap-4">
              <img
                src={movie.image || "https://via.placeholder.com/60x80"}
                alt={movie.name}
                className="w-14 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{movie.name}</h3>
                <p className="text-sm text-gray-400">{movie.year}</p>
              </div>
            </div>

            <div className="text-gray-300">
              Reviews:{" "}
              {
                reviews.filter(
                  (r) => r.movieId === movie._id || r.movieId?._id === movie._id
                ).length
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
