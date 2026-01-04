import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("/movie").then(res => setMovies(res.data));
    axios.get("/review").then(res => setReviews(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Movies: {movies.length}</p>
      <p>Reviews: {reviews.length}</p>
    </div>
  );
}
