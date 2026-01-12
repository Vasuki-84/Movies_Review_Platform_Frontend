import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api";
import HeroSection from "./HeroSection";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

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

  const years = [
    ...new Set(
      movies
        .map((m) =>
          m.releaseDate
            ? new Date(m.releaseDate).getFullYear().toString()
            : null
        )
        .filter(Boolean)
    ),
  ];

  const genres = [...new Set(movies.map((m) => m.genres).filter(Boolean))];
  const languages = [...new Set(movies.map((m) => m.language).filter(Boolean))];

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
      (!genre || movie.genres === genre) &&
      (!language || movie.language === language)
    );
  });

  return (
    <div className="bg-black min-h-screen py-6 text-white">
      <HeroSection />
      <div className="flex justify-center px-20 mt-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
      w-full sm:w-[800px]
      bg-gray-800 text-white
      px-4 py-2
      rounded-lg
      outline-none
      focus:ring-2 focus:ring-red-500
    "
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-10 mb-8 px-4">
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

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-400 mt-10">Loading movies...</p>
      )}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center px-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className={`relative group w-[200px]
                ${isLoggedIn ? "cursor-pointer" : "cursor-default"}
              `}
              onClick={() => {
                if (isLoggedIn) {
                  navigate(`/review/${movie._id}`);
                }
              }}
            >
              <img
                src={movie.posterImage || "https://via.placeholder.com/300x450"}
                alt={movie.movieName}
                className="rounded-lg w-full h-[300px] object-cover
                  transition duration-300 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-black/60 opacity-0
                group-hover:opacity-100 transition
                flex flex-col justify-end p-3 rounded-lg"
              >
                <h3 className="text-sm font-semibold">{movie.movieName}</h3>

                <p className="text-xs text-gray-300">
                  {movie.releaseDate &&
                    new Date(movie.releaseDate).getFullYear()}{" "}
                  • {movie.genres}
                </p>

                {movie.rating && (
                  <p className="text-xs text-green-400">⭐ {movie.rating}</p>
                )}

                {!isLoggedIn && (
                  <p className="text-xs text-red-400 mt-1">
                    Login to add reviews
                  </p>
                )}
              </div>
            </div>
          ))}

          {!filteredMovies.length && (
            <p className="text-gray-400 col-span-full text-center mt-10">
              No movies found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
