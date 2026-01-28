import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api";
import HeroSection from "./HeroSection";

function Hollywood() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const canReview = isLoggedIn && role === "user";

  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/movie/public`);

      const tamilMovies = res.data.filter(
        (movie) => movie.language === "English",
      );

      const roleBasedMovies =
        isLoggedIn && role === "admin"
          ? tamilMovies.filter(
              (movie) =>
                movie.createdBy && movie.createdBy.toString() === userId,
            )
          : tamilMovies;

      setMovies(roleBasedMovies);
    } catch (error) {
      console.error("Fetch movies error:", error);
    } finally {
      setLoading(false);
    }
  };

  const years = [
    ...new Set(
      movies
        .map((m) =>
          m.releaseDate
            ? new Date(m.releaseDate).getFullYear().toString()
            : null,
        )
        .filter(Boolean),
    ),
  ];

  const genres = [...new Set(movies.map((m) => m.genres).filter(Boolean))];

  const filteredMovies = movies.filter((movie) => {
    const movieYear = movie.releaseDate
      ? new Date(movie.releaseDate).getFullYear().toString()
      : "";

    const matchesSearch = movie.movieName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return (
      matchesSearch &&
      (!year || movieYear === year) &&
      (!genre || movie.genres === genre)
    );
  });

  return (
    <div className="bg-black min-h-screen py-6 text-white">
      <HeroSection title="Hollywood Movies" />

      {/* Search */}
      <div className="flex justify-center px-2 md:px-4 mt-6">
        <input
          type="text"
          placeholder="Search English movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            sm:w-[300px]
            md:w-[600px]
            lg:w-[800px]
            bg-gray-800 text-white
            px-3 py-2
            rounded-lg
            outline-none
            focus:ring-2 focus:ring-red-500
          "
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mt-10 mb-6 px-4">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-400 mt-10">
          Loading Tamil movies...
        </p>
      )}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center px-3">
          {filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className={`relative group w-full sm:w-[180px] md:w-[200px]
                ${canReview ? "cursor-pointer" : "cursor-default"}
              `}
              onClick={() => canReview && navigate(`/review/${movie._id}`)}
            >
              <img
                src={movie.posterImage || "https://via.placeholder.com/300x450"}
                alt={movie.movieName}
                className="rounded-lg w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover transition group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 rounded-lg">
                <h3 className="text-sm font-semibold">{movie.movieName}</h3>
                <p className="text-xs text-gray-300">
                  {new Date(movie.releaseDate).getFullYear()} • {movie.genres}
                </p>
              </div>
            </div>
          ))}

          {!filteredMovies.length && (
            <p className="text-gray-400 col-span-full text-center mt-10">
              No English movies found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Hollywood;
