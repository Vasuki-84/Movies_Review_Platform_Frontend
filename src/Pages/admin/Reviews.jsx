import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("/review").then(res => setReviews(res.data));
  }, []);

  const remove = async (id) => {
    await axios.delete(`/review/${id}`);
    setReviews(reviews.filter(r => r._id !== id));
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(r => (
        <div key={r._id}>
          <p><b>{r.userName}</b> - {r.review}</p>
          <button onClick={() => remove(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
