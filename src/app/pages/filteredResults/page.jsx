"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Poiret_One } from "next/font/google";
import axios from "axios";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { FcLike, FcBookmark } from "react-icons/fc";
import Modal from "../../components/modal/modal";
import { useRouter } from "next/navigation";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const FilteredResults = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortTriggered, setSortTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState(null); // Track hover state
  const [movieDetails, setMovieDetails] = useState({}); // Store fetched movie details
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleDownloadAndNavigate = async (tmdbId) => {
    try {
      console.log("TMDB ID being sent:", tmdbId);

      // Check if the movie already exists in Radarr
      const checkResponse = await fetch(
        `http://localhost:3001/api/radar/check/${tmdbId}`
      );

      if (!checkResponse.ok) {
        throw new Error("Failed to check movie in Radarr");
      }

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        // Movie already exists, skip download and navigate to the play page
        console.log("Movie already exists, navigating to play page");
        router.push(`/pages/play?tmdbId=${tmdbId}`);
      } else {
        // Movie does not exist, proceed with downloading
        const downloadResponse = await fetch(
          "http://localhost:3001/api/radar/download",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tmdbId }), // Send tmdbId in the request body
          }
        );

        if (downloadResponse.ok) {
          console.log("Movie added to download queue");
          // After the download is triggered, navigate to the play page
          router.push(`/pages/play?tmdbId=${tmdbId}`);
        } else {
          const errorData = await downloadResponse.json();
          console.error("Error details:", errorData);
          console.error("Failed to add movie to download queue");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleDownloadAndNavigate = async (tmdbId) => {
  //   try {
  //     // Trigger the movie download
  //     console.log("TMDB ID being sent:", tmdbId);

  //     const response = await fetch("http://localhost:3001/api/radar/download", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ tmdbId }), // Send tmdbId in the request body
  //     });

  //     if (response.ok) {
  //       console.log("Movie added to download queue");
  //       // After the download is triggered, navigate to the play page
  //       router.push(`/pages/play?tmdbId=${tmdbId}`);
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Error details:", errorData);
  //       console.error("Failed to add movie to download queue");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleTrailerClick = (youtubeTrailerId) => {
    setSelectedTrailerId(youtubeTrailerId);
    setIsModalOpen(true);
  };

  // Function to fetch movie details from Radarr API
  const fetchMovieDetails = async (tmdbId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/radar/movies/${tmdbId}`
      );
      setMovieDetails((prevDetails) => ({
        ...prevDetails,
        [tmdbId]: response.data,
      })); // Store details in movieDetails state keyed by tmdbId
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle hover to fetch data and show overlay
  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie.id);
    if (!movieDetails[movie.id]) {
      fetchMovieDetails(movie.id); // Fetch movie details only if not already fetched
    }
  };

  // Handle mouse leave to hide overlay
  const handleMouseLeave = () => {
    setHoveredMovie(null); // Reset hovered state
  };

  // Handle scrolling for navbar
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

  // Retrieve movies and total pages from sessionStorage
  useEffect(() => {
    const storedMovies = sessionStorage.getItem("filteredMovies");
    const storedTotalPages = sessionStorage.getItem("totalPages");

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
    if (storedTotalPages) {
      setTotalPages(parseInt(storedTotalPages));
    }
  }, []);

  // Sorting logic
  const sortMovies = (movies) => {
    if (!sortTriggered) return movies;
    switch (sortOption) {
      case "yearAsc":
        return [...movies].sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      case "yearDesc":
        return [...movies].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "alpha":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case "rating":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      default:
        return movies;
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setSortTriggered(true);
  };

  // Function to load more movies (fetch next page)
  const loadMoreMovies = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      try {
        const filters = JSON.parse(sessionStorage.getItem("filters"));
        const response = await axios.get(
          "http://localhost:3001/api/tmdb/filtered",
          {
            params: { ...filters, page: nextPage },
          }
        );

        const newMovies = response.data.movies;
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error("Error fetching more movies:", error);
      }
    }
  };

  const sortedMovies = sortMovies(movies);

  // Smooth scroll function for up/down navigation
  const scrollByViewport = (direction) => {
    const viewportHeight = window.innerHeight; // Get the viewport height
    const scrollDistance = viewportHeight * 2; // Scroll by 2 viewports

    if (direction === "down") {
      window.scrollBy({
        top: scrollDistance, // Scroll down
        behavior: "smooth",
      });
    } else if (direction === "up") {
      window.scrollBy({
        top: -scrollDistance, // Scroll up
        behavior: "smooth",
      });
    }
  };
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-screen h-screen">
      {/* Navbar */}
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

      {/* Sort Dropdown */}
      <div className={`pt-40 px-8 h-fit w-fit ${Poiret.className}`}>
        <div className="w-full h-24 flex">
          {/* Filtered Movie Results */}
          <div className="w-1/2 p-4 flex justify-center items-center ">
            <h1 className="text-white text-6xl">Filtered Results</h1>
          </div>
          <div className="w-1/2 text-2xl  flex items-center justify-center ">
            <label className="text-white mr-4">Sort by:</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 h-12 rounded bg-gray-800 text-white"
            >
              <option value="">None</option>
              <option value="yearDesc">Year Descending</option>
              <option value="yearAsc">Year Ascending</option>
              <option value="alpha">Alphabetical (A-Z)</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        <br />
        <hr className="h-1 bg-gradient-to-r from-red-700 via-green-500 to-black border-0" />
        <br />

        {/* Movie Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMovies.length > 0 ? (
            sortedMovies.map((movie) => (
              <div
                key={movie.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background Layer */}
                <div className="absolute inset-0 rounded-lg border border-black -z-10">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Frosted Glass Effect */}
                <div className="bg-gray/10 backdrop-blur-md p-4 rounded-lg shadow-lg tracking-wider relative">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-auto mb-4 rounded-lg"
                  />

                  {/* Hover Overlay */}
                  {hoveredMovie === movie.id && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-white p-4 rounded-b-lg w-full h-full">
                      {loading ? (
                        <p>Loading...</p>
                      ) : movieDetails && movieDetails[movie.id] ? ( // Added null check for movieDetails
                        <div>
                          <div className="w-full flex justify-evenly items-center mt-5">
                            <button
                              onClick={() =>
                                handleDownloadAndNavigate(movie.id)
                              }
                              className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                            >
                              <Image
                                src="/Logo3.png"
                                alt="logo"
                                width={50}
                                height={75.47}
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
                          <hr />
                          <br />
                          <p className="text-3xl text-white text-center ">
                            {truncateText(movieDetails[movie.id].title, 10)}
                          </p>
                          <br />
                          <hr />
                          <br />
                          <p className="text-white text-2xl tracking-wide ">
                            <strong>Language:</strong>{" "}
                            {movieDetails[movie.id].originalLanguage}
                          </p>
                          <br />
                          <p className="text-white text-2xl tracking-wide ">
                            <strong>Overview:</strong>
                            {truncateText(movieDetails[movie.id].overview, 100)}
                          </p>
                          <br />
                          <p className="text-white text-2xl tracking-wide ">
                            <strong>Year:</strong> {movieDetails[movie.id].year}
                          </p>
                          <p className="text-white text-2xl tracking-wide ">
                            <strong>Runtime:</strong>{" "}
                            {movieDetails[movie.id].runtime} minutes
                          </p>
                          <p className="text-white text-2xl tracking-wide ">
                            <strong>Certification:</strong>{" "}
                            {movieDetails[movie.id].certification}
                          </p>
                          <p className="text-white text-2xl tracking-wide ">
                            <strong>Rating:</strong>{" "}
                            {movieDetails[movie.id].tmdbRating}
                          </p>
                          {movieDetails[movie.id].youtubeTrailerId && (
                            <div className="text-center mt-5 ">
                              <button
                                onClick={() =>
                                  handleTrailerClick(
                                    movieDetails[movie.id].youtubeTrailerId
                                  )
                                }
                                className="text-white bg-green-900 hover:bg-green-600 py-2 px-4 rounded-sm  h-12 w-32"
                              >
                                Watch Trailer
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>No details available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>

      {/* Load More and Scroll Arrows */}
      <div className="w-full h-24 p-4 flex justify-center items-center gap-4">
        {currentPage < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer border border-red-500 hover:bg-blue-700 transition"
            type="button"
          >
            Load More
          </button>
        )}
        <div className="fixed bottom-8 right-8 flex flex-col gap-2 items-center mr-2 z-50">
          <button
            onClick={() => scrollByViewport("up")}
            className="bg-gray-900 w-16 h-16 flex justify-center items-center rounded-lg shadow-sm  cursor-pointer border border-gray-900 hover:bg-gray-700 hover:scale-110 transition"
          >
            <SlArrowUp className="text-white text-xl" />
          </button>
          <button
            onClick={() => scrollByViewport("down")}
            className="bg-gray-900 w-16 h-16 flex justify-center items-center rounded-lg shadow-sm  cursor-pointer border border-gray-900 hover:bg-gray-700 hover:scale-110 transition"
          >
            <SlArrowDown className="text-white text-xl" />
          </button>
        </div>
        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          youtubeTrailerId={selectedTrailerId}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FilteredResults;
