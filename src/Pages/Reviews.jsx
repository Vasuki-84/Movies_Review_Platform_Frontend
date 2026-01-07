import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api";

export default function Reviews() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState({});
  const [showReviews, setShowReviews] = useState({}); // ⭐ NEW

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const moviesRes = await axios.get(`${baseUrl}/movie`);
      const reviewsRes = await axios.get(`${baseUrl}/review/get`);
      setMovies(moviesRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const submitReview = async (movieId) => {
    if (!reviewText[movieId]) return;

    try {
      await axios.post(`${baseUrl}/review/add`, {
        movieId,
        review: reviewText[movieId],
      });

      setReviewText({ ...reviewText, [movieId]: "" });
      fetchData();
    } catch (error) {
      console.error("Add review error:", error);
    }
  };

  const toggleReviews = (movieId) => {
    setShowReviews((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Movie Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {movies.map((movie) => {
          const movieReviews = reviews.filter(
            (r) =>
              r.movieId === movie._id || r.movieId?._id === movie._id
          );

          return (
            <div
              key={movie._id}
              className="bg-[#111] rounded-xl overflow-hidden shadow-lg flex flex-col   hover:-translate-y-2
  hover:shadow-2xl hover:shadow-black/50
"
            >
              {/* Movie Poster */}
              <img
                src={movie.posterImage || "https://via.placeholder.com/300x450"}
                alt={movie.movieName}
                className="h-64 w-full object-cover"
              />

              {/* Movie Details */}
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold">{movie.movieName}</h2>
                <p className="text-sm text-gray-400">
                  {movie.releaseDate} • {movie.country}
                </p>
              </div>

              {/* Add Review */}
              <div className="p-4 border-t border-gray-700">
                <textarea
                  rows="2"
                  placeholder="Write your review..."
                  value={reviewText[movie._id] || ""}
                  onChange={(e) =>
                    setReviewText({
                      ...reviewText,
                      [movie._id]: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-[#1a1a1a] text-white outline-none resize-none"
                />

                <button
                  onClick={() => submitReview(movie._id)}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
                >
                  Add Review
                </button>

                {/* Show / Hide Reviews Button */}
                {movieReviews.length > 0 && (
                  <button
                    onClick={() => toggleReviews(movie._id)}
                    className="w-full mt-2 text-sm text-blue-400 hover:underline"
                  >
                    {showReviews[movie._id]
                      ? "Hide reviews"
                      : `Show all reviews (${movieReviews.length})`}
                  </button>
                )}

                {/* Reviews (Hidden by default) */}
                {showReviews[movie._id] && (
                  <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                    {movieReviews.map((r) => (
                      <div
                        key={r._id}
                        className="bg-[#1a1a1a] p-2 rounded text-sm"
                      >
                        <b>{r.userName || "User"}:</b> {r.review}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
