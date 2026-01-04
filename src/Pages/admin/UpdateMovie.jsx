import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";

export default function UpdateMovie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie`);
      setMovies(res.data);
    } catch (error) {
      console.error("Fetch movies error:", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${baseUrl}/movie/${id}`);
      setMovies(movies.filter(m => m._id !== id));
    } catch (error) {
      console.error("Delete movie error:", error);
    }
  };

  return (
    <div>
      <h2>Update / Delete Movies</h2>

      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.name}</h3>
          <button onClick={() => deleteMovie(movie._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
