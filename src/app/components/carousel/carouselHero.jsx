"use client";
import React, { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useMovies } from "../../context/MovieContext";
import axios from "axios";
import { Poiret_One } from "next/font/google";
import Modal from "../modal/modal.js";
import { FcLike } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import Image from "next/image";
import Tooltip from "../tooltip/tooltip";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./emblaCarouselArrowButtons";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const EmblaCarouselHero = ({ selectedLanguage }) => {
  const autoplayIntervalRef = useRef(null);
  const { movieHero, fetchMoviesByLanguage, page } = useMovies();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [movieDetails, setMovieDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);
  const [tooltip, setTooltip] = useState({
    text: "",
    x: 0,
    y: 0,
    isVisible: false,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleTrailerClick = (youtubeTrailerId) => {
    setSelectedTrailerId(youtubeTrailerId);
    setIsModalOpen(true);
  };
  const handleMouseEnter = (text) => (e) => {
    setTooltip({
      text,
      x: e.pageX,
      y: e.pageY,
      isVisible: true,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, isVisible: false }));
  };

  const handleMouseMove = (e) => {
    setTooltip((prev) => ({
      ...prev,
      x: e.pageX,
      y: e.pageY,
    }));
  };

  const handlePlayClick = async (tmdbId) => {
    try {
      console.log("TMDB ID being sent:", tmdbId);

      const response = await fetch("http://localhost:3001/api/radar/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tmdbId }), // Pass the tmdbId here
      });

      if (response.ok) {
        console.log("Movie added to download queue");
      } else {
        console.error("Failed to add movie to download queue");
        const errorData = await response.json(); // Get more details from the response
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!emblaApi) {
      console.log("Embla API not available yet");
      return;
    }

    console.log("Embla API is available");

    const startAutoplay = () => {
      console.log("Starting autoplay with setInterval");
      clearAutoplay(); // Clear any existing interval before starting a new one

      autoplayIntervalRef.current = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          console.log("Scrolling to next slide");
          emblaApi.scrollNext();
        } else {
          console.log("Reached the end, scrolling back to start");
          emblaApi.scrollTo(0);
        }
      }, 3000); // Set your desired interval here
    };

    const clearAutoplay = () => {
      console.log("Stopping autoplay by clearing the interval");
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };

    const handleMouseEnter = () => {
      console.log("Mouse entered overlay, stopping autoplay");
      clearAutoplay(); // Stop the autoplay when the mouse enters the overlay
    };

    const handleMouseLeave = () => {
      console.log("Mouse left overlay, starting autoplay");
      startAutoplay(); // Restart the autoplay when the mouse leaves the overlay
    };

    movieHero.forEach((_, index) => {
      const overlayDiv = document.getElementById(`textOverlay-${index}`);
      if (overlayDiv) {
        overlayDiv.addEventListener("mouseenter", handleMouseEnter);
        overlayDiv.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    startAutoplay(); // Start autoplay on component mount

    // Cleanup on component unmount
    return () => {
      console.log(
        "Cleaning up event listeners and stopping autoplay on unmount"
      );
      movieHero.forEach((_, index) => {
        const overlayDiv = document.getElementById(`textOverlay-${index}`);
        if (overlayDiv) {
          overlayDiv.removeEventListener("mouseenter", handleMouseEnter);
          overlayDiv.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
      clearAutoplay(); // Ensure autoplay is stopped on unmount
    };
  }, [emblaApi, movieHero]);

  useEffect(() => {
    const fetchAllDetails = async () => {
      const detailsPromises = movieHero.map(async (movie) => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/radar/movies/${movie.id}`
          );
          return { [movie.id]: response.data };
        } catch (error) {
          console.error(
            `Error fetching details for movie ID ${movie.id}:`,
            error
          );
          return { [movie.id]: null };
        }
      });

      const detailsArray = await Promise.all(detailsPromises);
      const detailsMap = detailsArray.reduce(
        (acc, details) => ({ ...acc, ...details }),
        {}
      );
      setMovieDetails(detailsMap);
    };

    if (movieHero.length > 0) {
      fetchAllDetails();
    }
  }, [movieHero]);

  return (
    <section
      className="max-w-full mx-auto relative"
      style={{
        "--slide-height": "19rem",
        "--slide-spacing": "1rem",
        "--slide-size": "100%",
      }}
    >
      <Tooltip
        text={tooltip.text}
        x={tooltip.x}
        y={tooltip.y}
        isVisible={tooltip.isVisible}
      />
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__containerHero flex w-full h-1/2 m-0">
          {movieHero.map((movie, index) => {
            const details = movieDetails[movie.id] || {};
            return (
              <div
                className="embla__slideHero flex-[1_0_100%] w-full h-full p-0 relative flex"
                key={index}
              >
                <img
                  src={movie.backdrop_path}
                  alt={`Slide ${index + 1}`}
                  className="embla__slide__imgHero w-full h-4/5 object-cover object-center"
                />
                <div className="absolute inset-0 flex items-center bg-gradient-to-t from-black to-transparent px-24 ">
                  <div
                    className={`textOverlay w-1/2 h-2/3 flex flex-col pt-32 ${Poiret.className}`}
                    id={`textOverlay-${index}`}
                  >
                    <div className="absolute inset-y-72 bg-black opacity-40 w-1/2 h-3/5"></div>
                    <div className="max-w-full max-h-full pl-10 text-white z-10">
                      <p className="relative text-7xl font-bold mb-2 text-center">
                        {details.title || movie.title}
                      </p>
                      <hr />
                      <br />
                      <p className="relative mb-2 text-4xl">
                        Language:{" "}
                        {details.originalLanguage || movie.original_language}
                      </p>
                      <p className="relative mb-2 text-4xl">
                        Year: {details.year || "N/A"}
                      </p>
                      <p className="relative mb-2 text-4xl">
                        IMDb Rating: {details.imdbRating || "N/A"}
                      </p>
                      <p className="mb-4 text-4xl">
                        Genres:{" "}
                        {details.genres ? details.genres.join(", ") : "N/A"}
                      </p>
                      <p className="relative text-xl">
                        {truncateText(
                          details.overview || "No overview available.",
                          128
                        )}
                      </p>
                      <br />
                      <hr />
                      <br />
                      <div className="flex items-center justify-around ">
                        {/* Trailer Button */}
                        {details.youtubeTrailerId && (
                          <div className="text-center ">
                            <button
                              onClick={() =>
                                handleTrailerClick(details.youtubeTrailerId)
                              }
                              className="inline-block  text-white font-bold py-2 px-4  bg-gray-900 w-40 h-12 hover:scale-110 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500"
                            >
                              Watch Trailer
                            </button>
                          </div>
                        )}
                        <Image
                          src="/Logo3.png"
                          alt="logo"
                          width={60}
                          height={75.47}
                          className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                          onMouseEnter={handleMouseEnter("Play")}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={handleMouseMove}
                          onClick={() => handlePlayClick(movie.id)}
                        />
                        <div
                          className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                          onMouseEnter={handleMouseEnter("Save")}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={handleMouseMove}
                        >
                          <FcBookmark size={60} />
                        </div>
                        <div
                          className="transform transition-transform duration-300 hover:scale-150 cursor-pointer mb-1"
                          onMouseEnter={handleMouseEnter("Like")}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={handleMouseMove}
                        >
                          <FcLike size={63} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        youtubeTrailerId={selectedTrailerId}
      />

      <div className="embla__controlsHero absolute bottom-96 right-48 mb-4 mr-4 flex items-center justify-between w-auto pointer-events-none">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="pointer-events-auto bg-green-700 p-1 text-white hover:bg-green-600 w-16 h-16 flex items-center justify-center"
          style={{ fontSize: "32px" }}
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="pointer-events-auto bg-green-700 p-1 text-white hover:bg-green-600 w-16 h-16 flex items-center justify-center"
          style={{ fontSize: "32px" }}
        />
      </div>
    </section>
  );
};

export default EmblaCarouselHero;
