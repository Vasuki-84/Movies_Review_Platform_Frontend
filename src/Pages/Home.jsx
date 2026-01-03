import React from "react";
import HeroSection from "./HeroSection";

const movies = [
  {
    id: 1,
    title: "Avatar: Fire and Ash",
    year: "2025",
    rating: "7.3",
    image:
      "https://i.pinimg.com/736x/e9/c5/f3/e9c5f358d6c426cce819f15b0350e4eb.jpg",
  },
  {
    id: 2,
    title: "Baahubali 2: The Conclusion",
    year: "2017",
    rating: "8.2",
    image:
      "https://i.pinimg.com/736x/ef/ed/c5/efedc511f55d93228070acb886f7bb1b.jpg",
  },
  {
    id: 3,
    title: "Zootopia 2",
    year: "2025",
    rating: "8.5",
    image:
      "https://i.pinimg.com/736x/e1/36/09/e13609f69590e3e472e4908a9ff1a328.jpg",
  },
  {
    id: 4,
    title: "Jurassic World: Dominion",
    year: "2022",
    rating: "5.6",
    image: "https://i.pinimg.com/736x/20/01/c3/2001c370cf737c4a74a25410463110ad.jpg",
  },
  {
    id: 5,
    title: "Five Nights at Freddy's 2",
    year: "2024",
    rating: "6.8",
    image:
      "https://i.pinimg.com/736x/3c/1f/dc/3c1fdc9601741a91a2876a08d32a4ad0.jpg",
  },
];

function Home() {
  return (
    <div className="bg-black min-h-screen   py-6 text-white">
      <HeroSection />

      <div className="max-w-xl mx-auto mb-8 mt-10 mb-10">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <h2 className="text-xl font-bold mb-6 text-start px-5 mt-5">
        <span className="border-b-4 border-red-600 pb-0">POPULAR MOVIES</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group w-[160px] md:w-[200px]">
            <img
              src={movie.image}
              alt={movie.title}
              className="rounded-lg w-full h-[240px] object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 rounded-lg">
              <h3 className="text-sm font-semibold">{movie.title}</h3>
              {movie.year && (
                <p className="text-xs text-gray-300">{movie.year}</p>
              )}
              {movie.rating && (
                <p className="text-xs text-green-400">⭐ {movie.rating}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
