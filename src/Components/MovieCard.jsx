import React from "react";

const MovieCard = React.memo(({ movie, canReview, navigate }) => {
  return (
    <div
      className={`relative group w-full sm:w-[180px] md:w-[200px]
      ${canReview ? "cursor-pointer" : "cursor-default"}`}
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
  );
});

export default MovieCard;