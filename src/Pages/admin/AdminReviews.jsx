import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAdminReviews();
  }, []);

  const fetchAdminReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${baseUrl}/admin/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(res.data);
    } catch (error) {
      toast.error("Failed to load admin reviews");
    }
  };

  // === DELETE REVIEW WITH TOAST CONFIRMATION ===
  const confirmDelete = (reviewId) => {
    toast.info(
      <div className="flex flex-col space-y-2">
        <p>Are you sure you want to delete this review?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleDelete(reviewId)}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white text-sm"
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${baseUrl}/admin/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(reviews.filter((r) => r._id !== reviewId));
      toast.dismiss(); 
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 mt-20">Reviews for Your Movies</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="bg-[#1a1a1a] p-4 rounded relative">
              <h2 className="font-semibold">{r.movieId?.movieName}</h2>
              <p className="text-sm text-gray-400">
                By {r.userId?.name} ({r.userId?.email})
              </p>
              <p className="mt-2">{r.review}</p>
              <div className="text-yellow-400 text-sm">{"⭐".repeat(r.rating)}</div>

              <button
                onClick={() => confirmDelete(r._id)}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
