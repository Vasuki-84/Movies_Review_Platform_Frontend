import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";

import React, { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../Components/MovieCard";

function Hollywood() {
  const navigate = useNavigate();
const { movies, loading } = useMovies();

  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const canReview = isLoggedIn && role === "user";

  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
    const [search, setSearch] = useState("");

 

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
