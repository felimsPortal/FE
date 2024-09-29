"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Modal from "../../components/modal/modal";
import Footer from "../../components/footer/footer";
import PlayerJs from "../../components/playerJs/playerJs";
import { Poiret_One } from "next/font/google";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"; // TMDB Image Base URL

const Play = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backdropPath, setBackdropPath] = useState(null); // Store the backdrop path
  const [credits, setCredits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState(null); // State to hold selected trailer ID

  const searchParams = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");

  const movieName =
    movieDetails?.original_title || movieDetails?.title || "Unknown Title";

  const handleTrailerClick = (youtubeTrailerId) => {
    setSelectedTrailerId(youtubeTrailerId);
    setIsModalOpen(true);
  };

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

  // Fetch movie details from your backend
  useEffect(() => {
    if (tmdbId) {
      const fetchMovieDetails = async () => {
        try {
          // Fetch the movie details from Radarr API
          const radarrResponse = await axios.get(
            `http://localhost:3001/api/radar/movies/${tmdbId}` // Radarr API call
          );
          console.log("movieDetails:", movieDetails);
          setMovieDetails(radarrResponse.data); // Set fetched movie data
          console.log("movieDetails From Radarr:", radarrResponse.data);

          // Now fetch the backdrop_path from the existing TMDB API route
          const tmdbResponse = await axios.get(
            `http://localhost:3001/api/tmdb/movies/${tmdbId}` // TMDB API call
          );
          console.log("TMDB API response:", tmdbResponse.data);

          // Prepend the TMDB image base URL to the backdrop_path
          const fullBackdropUrl = tmdbResponse.data.backdrop_path
            ? `${TMDB_IMAGE_BASE_URL}${tmdbResponse.data.backdrop_path}`
            : null;

          setBackdropPath(fullBackdropUrl); // Set full backdrop URL
          setLoading(false);
        } catch (error) {
          console.error("Error fetching movie details:", error);
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [tmdbId]);

  // Fetch movie credits (actors and directors)
  useEffect(() => {
    if (tmdbId) {
      const fetchMovieCredits = async () => {
        try {
          // Fetch the credits data from TMDB API
          const creditsResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );

          setCredits(creditsResponse.data.cast);
          console.log("Movie credits:", creditsResponse.data);

          // Extract the tmdbId from the credits response
          const fetchedTmdbId = creditsResponse.data.id;

          // If you need to use the tmdbId in movieDetails, you can set it here
          setMovieDetails((prevDetails) => ({
            ...prevDetails,
            tmdbId: fetchedTmdbId, // Add the tmdbId from credits
          }));
        } catch (error) {
          console.error("Error fetching movie credits:", error);
        }
      };

      fetchMovieCredits();
    }
  }, [tmdbId]);

  const actors = credits.filter(
    (person) => person.known_for_department === "Acting"
  );
  const directors = credits.filter(
    (director) => director.known_for_department === "Directing"
  );

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movieDetails) {
    return <div>No movie details found.</div>;
  }

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
      <div className="h-max  w-full pt-32 p-4 ">
        <div className="w-full h-full">
          <PlayerJs
            backdropUrl={backdropPath}
            movieName={movieDetails.original_title || movieDetails.title}
          />
          {/* Pass TMDB backdrop_path */}
        </div>
      </div>
      <div className="flex h-max w-full p-4">
        {/* Movie Poster */}
        <div className="flex h-full w-full p-4">
          {movieDetails.remotePoster && (
            <img
              src={movieDetails.remotePoster}
              alt={movieDetails.title}
              className="w-max object-contain"
            />
          )}
        </div>

        {/* Movie Details */}
        <div className={`flex flex-col p-4 ${Poiret.className}`}>
          <h1 className="text-white text-7xl text-center">
            <strong>{movieDetails.title}</strong>
          </h1>
          <br />
          <hr />
          <br />
          <br />
          <p className="text-white tracking-wider text-3xl w-5/6">
            <strong>Overview:</strong>
            {movieDetails.overview}
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Release Year:</strong> {movieDetails.year}
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Runtime:</strong> {movieDetails.runtime} minutes
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Language:</strong> {movieDetails.originalLanguage}
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Certification:</strong> {movieDetails.certification}
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Rating:</strong> {movieDetails.tmdbRating}
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Genre:</strong> {movieDetails.genre}
          </p>
          <br />
          {/* Actors with known_for_department as "Acting" */}

          <p className="text-white tracking-wider text-3xl ">
            <strong>Actors:</strong>
            {actors.slice(0, 5).map((actor, index) => (
              <span key={index}>
                {" "}
                {actor.name}
                {index < 4 ? ", " : ""}
              </span>
            ))}
          </p>
          <br />
          <p className="text-white tracking-wider text-3xl ">
            <strong>Directors:</strong>
            {directors.slice(0, 5).map((director, index) => (
              <span key={index}>
                {" "}
                {director.name}
                {index < 4 ? ", " : ""}
              </span>
            ))}
          </p>
          {movieDetails.youtubeTrailerId && (
            <div className="mt-10 ">
              <button
                onClick={() =>
                  handleTrailerClick(movieDetails.youtubeTrailerId)
                }
                className="text-white text-2xl font-bold bg-green-900 hover:bg-green-600 py-2 px-4 rounded-sm h-16 w-48"
              >
                Watch Trailer
              </button>
            </div>
          )}
        </div>
        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          youtubeTrailerId={selectedTrailerId}
        />
      </div>
      {/* Footer */}
      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default Play;
