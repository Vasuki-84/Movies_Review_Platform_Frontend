import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api";

export default function Reviews() {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie/${movieId}`);
      setMovie(res.data);
    } catch (error) {
      console.error("Movie fetch error:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/review/get`);
      const filtered = res.data.filter(
        (r) => r.movieId === movieId || r.movieId?._id === movieId
      );
      setReviews(filtered);
    } catch (error) {
      console.error("Reviews fetch error:", error);
    }
  };

  const submitReview = async () => {
    if (!reviewText.trim()) return;

    try {
      await axios.post(`${baseUrl}/review/add`, {
        movieId,
        review: reviewText,
      });
      setReviewText("");
      fetchReviews();
    } catch (error) {
      console.error("Add review error:", error);
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Movie not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 mt-20 flex justify-center relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-8 bg-blue-700 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        &larr; Back
      </button>
      <div className="max-w-3xl w-full bg-[#111] rounded-xl overflow-hidden shadow-xl">
        {/* Poster */}
        <img
          src={movie.posterImage || "https://via.placeholder.com/300x450"}
          alt={movie.movieName}
          className="h-[450px] w-full object-cover"
        />

        {/* Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold">{movie.movieName}</h1>
          <p className="text-gray-400 mt-1">
            {movie.releaseDate
              ? new Date(movie.releaseDate).getFullYear()
              : "N/A"}{" "}
            • {movie.genres} • {movie.language}
          </p>
          <p className="mt-3 text-sm text-gray-300">{movie.description}</p>
        </div>

        {/* Add Review */}
        <div className="p-6 border-t border-gray-700">
          <textarea
            rows="3"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-3 rounded bg-[#1a1a1a] text-white outline-none resize-none"
          />

          <button
            onClick={submitReview}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
          >
            Add Review
          </button>

          {/* Show / Hide Reviews */}
          {reviews.length > 0 && (
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="w-full mt-3 text-sm text-blue-400 hover:underline"
            >
              {showReviews
                ? "Hide reviews"
                : `Show all reviews (${reviews.length})`}
            </button>
          )}

          {/* Reviews */}
          {showReviews && (
            <div className="mt-4 space-y-3 max-h-56 overflow-y-auto">
              {reviews.map((r) => (
                <div key={r._id} className="bg-[#1a1a1a] p-3 rounded text-sm">
                  <b>{r.userName || "User"}:</b> {r.review}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
