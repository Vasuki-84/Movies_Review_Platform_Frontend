import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateMovie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("movie").then(res => setMovies(res.data));
  }, []);

  const deleteMovie = async (id) => {
    await axios.delete(`/api/movies/${id}`);
    setMovies(movies.filter(m => m._id !== id));
  };

  return (
    <div>
      <h2>Update / Delete Movies</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.name}</h3>
          <button onClick={() => deleteMovie(movie._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
