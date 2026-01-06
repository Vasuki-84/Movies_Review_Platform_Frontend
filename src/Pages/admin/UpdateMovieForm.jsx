import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../api";

export default function UpdateMovieForm() {
  const { id } = useParams();
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

  // Fetch existing movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${baseUrl}/movie/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm(response.data); // assuming API returns movie object
      } catch (error) {
        console.error("Fetch movie error:", error);
      }
    };

    fetchMovie();
  }, [id]);

  // Update movie function
  const submit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.put(`${baseUrl}/movie/update/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Movie updated successfully");
    } catch (error) {
      console.error("Update movie error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 md:p-8 mt-20">
      <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Movie</h2>

        {/* Movie Name */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Movie Title
        </label>
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Movie Name"
          value={form.movieName}
          onChange={(e) => setForm({ ...form, movieName: e.target.value })}
        />

        {/* Poster Image URL */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Poster Image
        </label>
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Poster Image URL"
          value={form.posterImage}
          onChange={(e) => setForm({ ...form, posterImage: e.target.value })}
        />

        {/* Release Date */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Release Date
        </label>
        <input
          type="date"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.releaseDate}
          onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
        />

        {/* Language */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Language
        </label>
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Language"
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })}
        />

        {/* Duration */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Duration
        </label>
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Duration (e.g., 2h 15m)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        {/* Genres */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Genres
        </label>
        <select
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.genres}
          onChange={(e) => setForm({ ...form, genres: e.target.value })}
        >
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>

        {/* Description */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Description
        </label>
        <textarea
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Country */}
        <label className="block mb-1 text-sm font-medium text-gray-300">
          Country
        </label>
        <input
          className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />

        {/* Submit Button */}
        <button
          onClick={submit}
          className="w-full bg-teal-600 hover:bg-teal-700 transition-colors text-white font-semibold py-3 rounded-lg"
        >
          Update Movie
        </button>
      </div>
    </div>
  );
}
