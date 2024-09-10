"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Modal from "../../components/modal/modal.js";
import { FcLike } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import Image from "next/image";
import { useMovies } from "../../context/MovieContext";
import { useRouter } from "next/navigation";

const TVShows = () => {
  const [page, setPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredTvShow, setHoveredTvShow] = useState(null);
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [youtubeTrailerId, setYoutubeTrailerId] = useState(null);

  const { tvShows, totalPages, fetchTrailerForTvShow, fetchLatestTVShows } =
    useMovies();

  const router = useRouter();

  const fetchTvShowDetails = async (tmdbId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/sonar/tvshows/${tmdbId}` // Update the API route
      );
      setTvShowDetails(response.data);
      console.log("TV show details:", response.data);
      // Set the fetched TV show details in the state
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    }
  };

  const handlePlayTrailer = async (tmdbId) => {
    const trailerId = await fetchTrailerForTvShow(tmdbId); // Fetch trailer
    if (trailerId) {
      setYoutubeTrailerId(trailerId); // Set the trailer ID
      setModalOpen(true); // Open the modal
    } else {
      console.error("No trailer available for this TV show.");
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handlePlayClick = (tvShowId) => {
    console.log("tvShowId captured:", tvShowId); // Log the tvShowId being captured
    if (tvShowId) {
      // Open the seasons page in a new tab with the tvShowId
      window.open(`/pages/seasons?tvShowId=${tvShowId}`, "_blank");
    } else {
      console.error("tvShowId is undefined");
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

  // useEffect to call API on component mount
  useEffect(() => {
    fetchLatestTVShows(page); // Trigger the API call when the component mounts
  }, [page]); // The effect will run whenever "page" changes

  // Scroll handler to change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0); // Update isScrolled state here
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleMouseEnter = (tvShows) => {
    setHoveredTvShow(tvShows);
    fetchTvShowDetails(tvShows.id);
  };

  const handleMouseLeave = () => {
    setHoveredTvShow(null);
    setTvShowDetails(null);
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

      <div className="container mx-auto pt-32">
        <h1 className="text-white text-3xl mb-8">Latest TV Shows</h1>
        <div className="grid grid-cols-4 gap-8">
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <div
                key={tvShow.id}
                className="text-white relative"
                onMouseEnter={() => handleMouseEnter(tvShow)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={tvShow.poster_path}
                  alt={tvShow.title}
                  className="w-full rounded-lg"
                />
                {/* Overlay: Show detailed info on hover */}
                {hoveredTvShow?.id === tvShow.id && tvShowDetails && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 p-4 flex flex-col">
                    <div className="w-full flex justify-evenly items-center mt-10">
                      {/* Update the handlePlayClick to pass tvShow.id */}
                      <button onClick={() => handlePlayClick(tvShow.id)}>
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
                    <h3 className="text-lg font-bold text-center">
                      {tvShowDetails.title}
                    </h3>
                    <br />
                    <p>
                      <strong>Year:</strong> {tvShowDetails.year}
                    </p>
                    <p>
                      <strong>Language:</strong>{" "}
                      {tvShowDetails.originalLanguage.name}
                    </p>
                    <p>
                      <strong>Genres:</strong>{" "}
                      {tvShowDetails.genres
                        .map((genre) =>
                          typeof genre === "string" ? genre : genre.name
                        )
                        .join(", ")}
                    </p>
                    <p>
                      <strong>IMDb Rating:</strong> {tvShowDetails.imdbRating}
                    </p>
                    <br />
                    <hr />
                    <p>{truncateText(tvShowDetails.overview, 128)}</p>

                    {/* Trailer Button */}
                    <button
                      onClick={() => handlePlayTrailer(tvShow.id)} // Fetch trailer on click
                      className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg"
                    >
                      Play Trailer
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">No TV shows available</p>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          youtubeTrailerId={youtubeTrailerId}
        />
      </div>
      <button
        onClick={() => {
          console.log("Load More button clicked");
          loadMoreMovies();
        }}
        className="bg-green-700 w-[6.6rem] h-[7.6rem] text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        type="button"
      >
        Load More
      </button>
    </div>
  );
};

export default TVShows;
