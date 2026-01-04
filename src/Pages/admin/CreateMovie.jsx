import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";

export default function CreateMovie() {
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

  const submit = async () => {
    try {
      await axios.post(`${baseUrl}/movie/create`, form);
      alert("Movie created successfully");
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
    } catch (error) {
      console.error("Create movie error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 md:p-8">
      <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Movie</h2>

        {/* Movie Name */}
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Movie Name"
          value={form.movieName}
          onChange={e => setForm({ ...form, movieName: e.target.value })}
        />

        {/* Poster Image URL */}
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Poster Image URL"
          value={form.posterImage}
          onChange={e => setForm({ ...form, posterImage: e.target.value })}
        />

        {/* Release Date */}
        <input
          type="date"
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={form.releaseDate}
          onChange={e => setForm({ ...form, releaseDate: e.target.value })}
        />

        {/* Language */}
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Language"
          value={form.language}
          onChange={e => setForm({ ...form, language: e.target.value })}
        />

        {/* Duration */}
        <input
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Duration (e.g., 2h 15m)"
          value={form.duration}
          onChange={e => setForm({ ...form, duration: e.target.value })}
        />

        {/* Genres */}
        <select
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={form.genres}
          onChange={e => setForm({ ...form, genres: e.target.value })}
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
          className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        {/* Country */}
        <input
          className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Country"
          value={form.country}
          onChange={e => setForm({ ...form, country: e.target.value })}
        />

        {/* Submit Button */}
        <button
          onClick={submit}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 rounded-lg"
        >
          Create Movie
        </button>
      </div>
    </div>
  );
}
