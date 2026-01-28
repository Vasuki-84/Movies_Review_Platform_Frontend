import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../api";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch movies and reviews
      const [moviesRes, reviewsRes] = await Promise.all([
        axios.get(`${baseUrl}/movie/admin`, config),
        axios.get(`${baseUrl}/review/get`, config),
      ]);
      console.log("Admin movies response:", moviesRes.data);
      console.log("Reviews response:", reviewsRes.data);

      const adminMovies = moviesRes.data || [];
      const allReviews = reviewsRes.data || [];

      const adminMovieIds = adminMovies.map((m) => m._id);
      const adminReviews = allReviews.filter((r) =>
        adminMovieIds.includes(r.movieId?._id || r.movieId),
      );

      setMovies(adminMovies);
      setReviews(adminReviews);
    } catch (error) {
      console.error("Dashboard API error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white mt-10 bg-black text-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 text-white mt-10 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Top Stats */}
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
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>

      {/* Movies List */}
      <h2 className="text-2xl font-semibold mb-4">Top Content</h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies added yet.</p>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => {
            const reviewCount = reviews.filter(
              (r) => r.movieId === movie._id || r.movieId?._id === movie._id,
            ).length;

            return (
              <div
                key={movie._id}
                className="  bg-[#111] p-4 rounded-lg
          hover:bg-[#1a1a1a]
          flex flex-col sm:flex-row
          sm:items-center sm:justify-between
          gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <img
                    src={
                      movie.posterImage || "https://via.placeholder.com/60x80"
                    }
                    alt={movie.movieName}
                    className="w-12 h-16 sm:w-14 sm:h-20 object-cover rounded"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm sm:text-base break-words">
                      {movie.movieName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {movie.country}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end sm:justify-center">
                  <span className="text-sm sm:text-base font-bold bg-yellow-600/20 text-yellow-500 px-3 py-1 rounded-full">
                    Reviews: {reviewCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
