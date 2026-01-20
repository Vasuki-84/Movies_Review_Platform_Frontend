import React, { useEffect, useState } from "react";

const movies = [
  {
    title: "Zootopia 2",
    image:
      "https://i.pinimg.com/736x/ef/ba/15/efba154a024eb81349eee7b27a315068.jpg",
    rating: "7.6",
    genres: ["Animation", "Comedy"],
    description:
      "After cracking the biggest case in Zootopia's history, rookie cops Judy Hopps and Nick Wilde find themselves on a twisting trail of a great mystery...",
  },
  {
    title: "Jana Nayagan",
    image:
      "https://i.pinimg.com/1200x/7d/fe/d2/7dfed2e5ff26c1d9667c4a4de99d2263.jpg",
    rating: "7.8",
    genres: ["Action", "Political", "Drama"],
    description:
      "A high-octane political action entertainer starring Vijay as a charismatic leader fighting for justice and the people, blending mass action with a message‑driven narrative.",
  },
  {
    title: "Inside Out 2",
    image:
      "https://i.pinimg.com/736x/ae/17/ca/ae17ca455836c1626cd63191a3042bb3.jpg",
    rating: "8.1",
    genres: ["Animation", "Family"],
    description:
      "Riley enters her teenage years and experiences brand-new emotions that shake things up inside headquarters.",
  },
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const movie = movies[currentIndex];

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 text-white  ">
            {movie.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="border border-green-400 text-green-400 px-3 py-1 rounded-full text-sm">
              {movie.rating}
            </span>

            {movie.genres.map((genre, index) => (
              <span
                key={index}
                className="bg-red-600 px-3 py-1 rounded-full text-sm hover:bg-black/40 hover:backdrop-blur-md hover:text-white"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {movie.description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex gap-2 z-10">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-6 rounded-full ${
              index === currentIndex ? "bg-red-600" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
