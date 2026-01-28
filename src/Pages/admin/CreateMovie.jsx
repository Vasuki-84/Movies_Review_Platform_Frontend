import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../api";
import { toast } from "react-toastify";

export default function CreateMovie() {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login as Admin", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Basic validation
      for (let key in form) {
        if (!form[key]) {
          toast.error("Please enter all the fields", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
      }

      setLoading(true);

      await axios.post(`${baseUrl}/movie/create`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.error("Movie created Successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      setForm({
        movieName: "",
        posterImage: "",
        releaseDate: "",
        language: "",
        duration: "",
        genres: "",
        description: "",
        country: "",
      });

      // Redirect to dashboard
      navigate("/admin/layout");
    } catch (error) {
      console.error("Create movie error:", error);
      toast.error("Failed to Create Movie", {
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
        <h2 className="text-2xl font-bold mb-6 text-center">Create Movie</h2>

        {/* Movie Name */}
        <input
          name="movieName"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Movie Name"
          value={form.movieName}
          onChange={handleChange}
        />

        {/* Poster Image */}
        <input
          name="posterImage"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Poster Image URL"
          value={form.posterImage}
          onChange={handleChange}
        />

        {/* Release Date */}
        <input
          type="date"
          name="releaseDate"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          value={form.releaseDate}
          onChange={handleChange}
        />

        {/* Language */}
        <input
          name="language"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />

        {/* Duration */}
        <input
          name="duration"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          placeholder="Duration (e.g., 2h 30m)"
          value={form.duration}
          onChange={handleChange}
        />

        {/* Genres */}
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

        {/* Description */}
        <textarea
          name="description"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 h-32 resize-none"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        {/* Country */}
        <input
          name="country"
          className="w-full mb-6 p-3 rounded-lg bg-gray-700"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Movie"}
        </button>
      </div>
    </div>
  );
}
