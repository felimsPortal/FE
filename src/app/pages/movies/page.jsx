"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Image from "next/image";
import Modal from "../../components/modal/modal.jsx";
import Loader from "../../components/loader/loader"; // Import Loader
import { FcLike, FcBookmark } from "react-icons/fc";
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
  const [initialLoading, setInitialLoading] = useState(true); // State for initial loading
  const [isContentVisible, setIsContentVisible] = useState(false); // Control content visibility
  const [hasMounted, setHasMounted] = useState(false); // Track component mount

  // Ensure component is mounted before making state updates
  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch movies on mount and manage loader state
  useEffect(() => {
    if (!hasMounted) return; // Skip if the component hasn't mounted yet

    const fetchMoviesData = async () => {
      try {
        setInitialLoading(true);
        await fetchLatestMovies(page); // Load movies for the current page
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setInitialLoading(false);
        setIsContentVisible(true); // Show content after data is loaded
      }
    };

    fetchMoviesData();
  }, [page, hasMounted]);

  // Scroll handler to change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
    fetchMovieDetails(movie.id);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
    setMovieDetails(null);
  };

  const handlePlayClick = async (tmdbId) => {
    try {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleTrailerClick = (youtubeTrailerId) => {
    setSelectedTrailerId(youtubeTrailerId);
    setIsModalOpen(true);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Render Loader if still loading
  if (initialLoading && !isContentVisible) {
    return <Loader />;
  }

  return (
    <div className="w-screen h-screen">
      {/* Navbar Section */}
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

      {/* Main Content */}
      <div
        className={`container mx-auto pt-32 transition-opacity duration-700 ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-full h-24 p-4 flex justify-center items-center">
          <h1 className={`text-white text-6xl ${Poiret.className}`}>
            Latest Movies
          </h1>
        </div>
        <hr className="h-1 bg-gradient-to-r from-red-700 via-green-500 to-black border-0" />

        <div className="grid grid-cols-4 gap-8 mt-4">
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
                  <div className="absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col">
                    <div className="w-full flex justify-evenly items-center mt-10">
                      <button onClick={() => handlePlayClick(movie.id)}>
                        <Image
                          src="/Logo3.png"
                          alt="logo"
                          width={50}
                          height={75}
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
                    <h3 className="text-lg font-bold text-center">
                      {movieDetails.title}
                    </h3>
                    <p>{truncateText(movieDetails.overview, 128)}</p>
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

      {/* Load More Button */}
      <div className="w-full h-24 p-4 flex justify-center items-center">
        <button
          onClick={loadMoreMovies}
          className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer border border-red-500 hover:bg-blue-700 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
