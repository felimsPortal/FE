"use client";
import Navbar from "@/app/components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("error fetching movies", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div
        className={`fixed w-full h-32 z-10 transition-opacity ${
          isScrolled ? "bg-gradient-to-b from-black to-black" : "bg-transparent"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))"
            : "transparent",
        }}
      >
        <Navbar />
      </div>

      <div className="w-full h-full p-4 bg-purple-700">
        <h1 className="text-2xl font-bold mt-36 bg-red-800 ">Movies</h1>
        <div className="w-full h-full grid grid-cols-4 gap-6 bg-orange-600">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-gray-800"
              style={{ backgroundImage: `url(${movie.poster_path})` }}
            >
              <p className="text-white font-bold bg-black bg-opacity-50 p-2">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
