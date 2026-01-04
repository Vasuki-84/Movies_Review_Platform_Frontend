import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/review`);
      setReviews(res.data);
    } catch (error) {
      console.error("Fetch reviews error:", error);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${baseUrl}/review/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (error) {
      console.error("Delete review error:", error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>

      {reviews.map(r => (
        <div key={r._id}>
          <p>
            <b>{r.userName}</b> - {r.review}
          </p>
          <button onClick={() => remove(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
