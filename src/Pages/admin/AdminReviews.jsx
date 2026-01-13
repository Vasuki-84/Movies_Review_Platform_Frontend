import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import { toast } from "react-toastify";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAdminReviews();
  }, []);

  const fetchAdminReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${baseUrl}/admin/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews(res.data);
    } catch (error) {
      toast.error("Failed to load admin reviews");
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
            <div key={r._id} className="bg-[#1a1a1a] p-4 rounded">
              <h2 className="font-semibold">{r.movieId?.movieName}</h2>
              <p className="text-sm text-gray-400">
                By {r.userId?.name} ({r.userId?.email})
              </p>
              <p className="mt-2">{r.review}</p>
              <div className="text-yellow-400 text-sm">
                {"⭐".repeat(r.rating)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
