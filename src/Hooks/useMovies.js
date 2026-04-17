import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../api";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie/public`);
      setMovies(res.data);
    } catch (error) {
      console.error("Fetch movies error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log("Movies from hook:", movies);

  return { movies, loading };
};

export default useMovies;