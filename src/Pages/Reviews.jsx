import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api";
import { toast } from "react-toastify";

export default function Reviews() {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    if (!movieId || movieId === ":id") {
      toast.error("Invalid movie ID");
      navigate("/");
      return;
    }

    fetchMovie();
    fetchReviews();
  }, [movieId]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie/get/${movieId}`);
      setMovie(res.data);
    } catch (error) {
      toast.error("Failed to load movie");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/review/get`);
      const filtered = res.data.filter(
        (r) => r.movieId === movieId || r.movieId?._id === movieId,
      );
      setReviews(filtered);
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to add a review");
      navigate("/login");
      return;
    }

    if (!reviewText.trim()) {
      toast.warning("Review cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/review/add`,
        {
          movieId,
          review: reviewText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Review added successfully!");
      setReviewText("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Failed to add review");
      }
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading movie...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10  flex justify-center relative">
      <div className="max-w-3xl w-full bg-[#111]  shadow-xl overflow-hidden mt-20">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 left-8 bg-blue-700 px-4 py-2 rounded mt-28"
        >
          ← Back
        </button>
        <img
          src={movie.posterImage || "https://via.placeholder.com/300x450"}
          alt={movie.movieName}
          className="h-[450px] w-full object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold">{movie.movieName}</h1>

          <div className="flex flex-wrap items-center gap-2 mt-5 text-xs sm:text-sm">
            {/* Year */}
            <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
              {movie.releaseDate
                ? new Date(movie.releaseDate).getFullYear()
                : "N/A"}
            </span>

            {/* Genre */}
            <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full font-medium">
              {movie.genres}
            </span>

            {/* Language */}
            <span className="bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
              {movie.language}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-300">{movie.description}</p>
        </div>

        {/* ADD REVIEW */}
        <div className="p-6 border-t border-gray-700">
          {/*  Rating */}
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full mb-3 p-2 rounded bg-[#1a1a1a] text-white"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <textarea
            rows="3"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="
    w-full p-3 rounded
    bg-[#1a1a1a] text-white
    outline-none
    border border-transparent
    hover:border-blue-500
    focus:border-blue-500
    transition-colors duration-200
  "
          />

          <button
            onClick={submitReview}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
          >
            Add Review
          </button>

          {/* REVIEWS */}
          {reviews.length > 0 && (
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="w-full mt-3 text-sm text-blue-400"
            >
              {showReviews
                ? "Hide reviews"
                : `Show all reviews (${reviews.length})`}
            </button>
          )}

          {showReviews && (
            <div className="mt-4 space-y-3 max-h-56 overflow-y-auto">
              {reviews.map((r) => (
                <div key={r._id} className="bg-[#1a1a1a] p-3 rounded text-sm">
                  <b>{r.userId?.name || "User"}:</b> {r.review}
                  <div className="text-yellow-400 text-xs">
                    {"⭐".repeat(r.rating || 0)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
