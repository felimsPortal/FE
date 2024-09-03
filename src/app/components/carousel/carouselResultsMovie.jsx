"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getGenreNames } from "../genres/genres.jsx";
import { getLanguageNames } from "../lanuages/languages.jsx";
import { DotButton, useDotButton } from "./emblaCarouselDotButton.jsx";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./emblaCarouselArrowButtons.jsx";
import useEmblaCarousel from "embla-carousel-react";
import { FcLike } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import { useMovies } from "../../context/MovieContext.js";
import Modal from "../modal/modal.js";

const EmblaCarouselResults = (props) => {
  const { options } = props;
  const { movies } = useMovies(); // Get movies from context
  const [currentMovies, setCurrentMovies] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const slidesPerGroup = 5;
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedTrailerId, setSelectedTrailerId] = useState(null); // Trailer ID state

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    slidesPerGroup
  );
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

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesStored = localStorage.getItem("movies");
      console.log("Raw data from localStorage:", moviesStored);

      if (!moviesStored) {
        console.log("No movies found in localStorage");
        return;
      }

      let parsedMovies;
      try {
        parsedMovies = JSON.parse(moviesStored);
        console.log("Parsed Movies:", parsedMovies);
      } catch (error) {
        console.error("Error parsing stored movies:", error);
        return;
      }

      const moviesArray = parsedMovies.results || parsedMovies;
      console.log("Movies Array:", moviesArray);

      if (!Array.isArray(moviesArray)) {
        console.log("Parsed movies is not an array:", moviesArray);
        setCurrentMovies([]);
        return;
      }

      // Function to fetch Radarr data
      const fetchRadarrData = async (tmdbId) => {
        try {
          console.log(`Fetching Radarr data for movie ID: ${tmdbId}`);
          const response = await fetch(
            `http://localhost:3001/api/radar/movies/${tmdbId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Radarr data");
          }
          const radarrData = await response.json();
          console.log("Radarr Data:", radarrData);
          return radarrData;
        } catch (error) {
          console.error("Error fetching Radarr data:", error);
          return null;
        }
      };

      // Fetch data and combine TMDB and Radarr data
      const mappedMovies = await Promise.all(
        moviesArray.map(async (movie) => {
          console.log("Mapping movie object:", movie);
          // const tmdbData = await fetchTmdbData(movie.id);
          const radarrData = await fetchRadarrData(movie.id);
          const tmdbId = movie.id;

          const title = radarrData?.title || movie.title;
          const originalLanguage =
            radarrData?.originalLanguage || movie.original_language || "N/A";
          const overview =
            radarrData?.overview || movie.overview || "No overview available.";
          const year =
            radarrData?.year ||
            (movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A");
          const youtubeTrailerId = radarrData?.youtubeTrailerId || null;
          const genres =
            radarrData?.genres || getGenreNames(movie.genre_ids || []);
          const imdbRating =
            radarrData?.imdbRating || movie.vote_average || "N/A";

          return {
            tmdbId,
            src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title,
            originalLanguage,
            overview,
            year,
            youtubeTrailerId,
            genres,
            imdbRating,
          };
        })
      );

      console.log("Mapped Movies:", mappedMovies);
      setCurrentMovies(mappedMovies);
    };

    // Initial load
    fetchMoviesData();

    // Listen to changes in localStorage
    window.addEventListener("storage", fetchMoviesData);

    // Clean up the event listener
    return () => {
      window.removeEventListener("storage", fetchMoviesData);
    };
  }, []);

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
      }
      const errorData = await response.json(); // Get more details from the response
      console.error("Error details:", errorData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {currentMovies.map((movie, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={movie.src}
                alt={`Slide ${index + 1}`}
                className="embla__slide__img rounded-xl"
              />

              {/* Overlay */}
              <div className="embla__slide__overlay flex flex-col ">
                <div className=" w-full flex justify-evenly items-center mt-10">
                  <button onClick={() => handlePlayClick(movie.tmdbId)}>
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

                <div className="p-6">
                  <p className="text-xl text-center">
                    {movie.radarr ? movie.radarr.title : movie.title}
                  </p>
                  <br />

                  <p>Language: {movie.originalLanguage || "N/A"}</p>

                  <p>Year: {movie.year || "N/A"}</p>
                  <p>IMDb Rating: {movie.imdbRating || "N/A"}</p>
                  <p>
                    Genres:{" "}
                    {movie.radarr
                      ? movie.radarr.genres.join(", ")
                      : movie.genres.join(", ")}
                  </p>
                  <br />
                  <hr />
                  <br />
                  <p className="text-center">
                    {movie.radarr
                      ? truncateText(movie.radarr.overview, 128)
                      : truncateText(movie.overview, 128)}
                  </p>
                  <br />

                  {/* Trailer Button */}
                  {movie.youtubeTrailerId && (
                    <div className="text-center">
                      <button
                        onClick={() =>
                          handleTrailerClick(movie.youtubeTrailerId)
                        }
                        className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Watch Trailer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        youtubeTrailerId={selectedTrailerId}
      />

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarouselResults;
