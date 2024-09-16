"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import { FcLike } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import Image from "next/image";
import Modal from "../../components/modal/modal.jsx";
import { Poiret_One } from "next/font/google";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleTrailerClick = (youtubeTrailerId) => {
    setSelectedTrailerId(youtubeTrailerId);
    setIsModalOpen(true);
  };

  const handlePlayClick = async (tmdbId) => {
    try {
      console.log("TMDB ID being sent:", tmdbId);
      const response = await fetch("http://localhost:3001/api/radar/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tmdbId }),
      });

      if (response.ok) {
        console.log("Movie added to download queue");
      } else {
        console.error("Failed to add movie to download queue");
      }
      const errorData = await response.json();
      console.error("Error details:", errorData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const loadMoreMovies = () => {
    console.log("loadMoreMovies function triggered");
    console.log("Current page:", page);
    console.log("Total pages:", totalPages);

    if (page < totalPages) {
      console.log("Loading more movies...");
      setPage((prevPage) => prevPage + 1);
    } else {
      console.log("No more pages to load");
    }
  };

  const fetchLatestMovies = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/movies/latest",
        {
          params: { page: pageNumber },
        }
      );
      setMovies((prevMovies) => [...prevMovies, ...response.data.movies]);
      setTotalPages(response.data.total_pages);
      console.log("response with data from moviesPage", response.data.movies);
    } catch (error) {
      console.error("Error fetching latest movies:", error);
    }
  };

  const fetchMovieDetails = async (tmdbId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/radar/movies/${tmdbId}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchLatestMovies(page);
  }, [page]);

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

  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
    fetchMovieDetails(movie.id);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
    setMovieDetails(null);
  };

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

      <br />
      <div className="container mx-auto pt-32">
        <div className="w-full h-24 p-4 flex justify-center items-center">
          <h1 className={`text-white text-6xl ${Poiret.className}`}>
            Latest Movies
          </h1>
        </div>
        <br />
        <hr className="h-1 bg-gradient-to-r from-red-700 via-green-500 to-black border-0" />
        <br />
        <div className="grid grid-cols-4 gap-8">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="text-white relative"
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full rounded-lg"
                />
                {/* Overlay: Show detailed info on hover */}
                {hoveredMovie?.id === movie.id && movieDetails && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col ">
                    <div className=" w-full flex justify-evenly items-center mt-10">
                      <button onClick={() => handlePlayClick(movie.id)}>
                        <Image
                          src="/Logo3.png"
                          alt="logo"
                          width={50}
                          height={75.47}
                          className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                        />
                      </button>
                      <div className="transform transition-transform duration-300 hover:scale-150 cursor-pointer">
                        <FcBookmark size={40} />
                      </div>
                      <div className="transform transition-transform duration-300 hover:scale-150 cursor-pointer">
                        <FcLike size={43} />
                      </div>
                    </div>
                    <br />
                    <h3 className="text-lg font-bold text-center ">
                      {movieDetails.title}
                    </h3>

                    <br />
                    <p>
                      <strong>Year:</strong> {movieDetails.year}
                    </p>
                    <p>
                      <strong>Language:</strong> {movieDetails.originalLanguage}
                    </p>
                    <p>
                      <strong>Genres:</strong> {movieDetails.genres.join(", ")}
                    </p>
                    {movieDetails.imdbRating !== "TBD" && (
                      <p>
                        <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
                      </p>
                    )}
                    <p>
                      <strong>General Rating:</strong> {movieDetails.tmdbRating}
                    </p>
                    <p>
                      <strong>Run Time - mins:</strong> {movieDetails.runtime}
                    </p>
                    <p>
                      <strong>Cert:</strong> {movieDetails.certification}
                    </p>
                    <br />
                    <hr />
                    <p>{truncateText(movieDetails.overview, 128)}</p>

                    {/* Trailer Button */}
                    {movieDetails.youtubeTrailerId && (
                      <div className="text-center">
                        <button
                          onClick={() =>
                            handleTrailerClick(movieDetails.youtubeTrailerId)
                          }
                          className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        >
                          Watch Trailer
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">No movies available</p>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          youtubeTrailerId={selectedTrailerId}
        />
      </div>
      <div className="w-full h-24  p-4 flex justify-center items-center ">
        <button
          onClick={() => {
            console.log("Load More button clicked");
            loadMoreMovies();
          }}
          className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500  hover:bg-blue-700 transition"
          type="button"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
