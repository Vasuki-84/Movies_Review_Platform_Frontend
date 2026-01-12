import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../api";
import { toast } from "react-toastify";

export default function UpdateMovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    movieName: "",
    posterImage: "",
    releaseDate: "",
    language: "",
    duration: "",
    genres: "",
    description: "",
    country: "",
  });

  // Fetch movie
  useEffect(() => {
    if (!id) return;
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie/get/${id}`);
      const movie = res.data;

      setForm({
        movieName: movie.movieName || "",
        posterImage: movie.posterImage || "",
        releaseDate: movie.releaseDate ? movie.releaseDate.split("T")[0] : "",
        language: movie.language || "",
        duration: movie.duration || "",
        genres: movie.genres || "",
        description: movie.description || "",
        country: movie.country || "",
      });
    } catch (error) {
      console.error("Fetch movie error:", error);
      alert("Failed to load movie data");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE movie
  const submit = async () => {
    try {
      if (!token) {
        toast.error("Please Login as Admin", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      for (let key in form) {
        if (!form[key]) {
          toast.error("Please fill all the fields", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
      }

      setLoading(true);

      await axios.put(`${baseUrl}/movie/update/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.error("Movie updated Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin/layout");
    } catch (error) {
      toast.error("Movie updation failure", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 mt-16">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-10 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Movie</h2>

        <input
          name="movieName"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Movie Name"
          value={form.movieName}
          onChange={handleChange}
        />

        <input
          name="posterImage"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Poster Image URL"
          value={form.posterImage}
          onChange={handleChange}
        />

        <input
          type="date"
          name="releaseDate"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          value={form.releaseDate}
          onChange={handleChange}
        />

        <input
          name="language"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />

        <input
          name="duration"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Duration (e.g., 2h 30m)"
          value={form.duration}
          onChange={handleChange}
        />

        <select
          name="genres"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          value={form.genres}
          onChange={handleChange}
        >
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>

        <textarea
          name="description"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 h-32 resize-none"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="country"
          className="w-full mb-6 p-3 rounded-lg bg-gray-700"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Movie"}
        </button>
      </div>
    </div>
  );
}
