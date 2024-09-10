"use client";
import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [preferredLanguage, setPreferredLanguage] = useState(null);
  const [movieHero, setMovieHero] = useState([]);
  const [heroTotalPages, setHeroTotalPages] = useState(0);

  const fetchUserProfile = async (firebaseUid) => {
    try {
      const response = await axios.get(`/api/userdata/${firebaseUid}`);
      console.log("User profile data:", response.data);

      const { results } = response.data;
      return {
        moviesAndTvShows: results,
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return "en"; // Fallback to "en" in case of error
    }
  };

  const fetchMovies = useCallback(
    async (firebase_uid, pageNumber = page) => {
      console.log(
        `Fetching movies for firebase_uid: ${firebase_uid}, pageNumber: ${pageNumber}`
      );
      if (!firebase_uid || !pageNumber || isNaN(pageNumber)) {
        console.error("Invalid firebase_uid or pageNumber:", {
          firebase_uid,
          pageNumber,
        });
        return;
      }
      try {
        const url = `http://localhost:3001/api/movies/${firebase_uid}`;
        const response = await axios.get(url, {
          params: {
            page: pageNumber,
            page_size: 20,
          },
        });
        console.log("API Response:", response.data);

        const {
          movies: movieData,
          total_pages,
          preferred_language,
        } = response.data;
        console.log("Processed movie data:", movieData);

        setMovies((prevMovies) => {
          const existingIds = new Set(prevMovies.map((movie) => movie.id));
          const newMovies = movieData.filter(
            (movie) => !existingIds.has(movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(total_pages);
        setPreferredLanguage(preferred_language);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    [page]
  );

  const fetchLatestTVShows = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/movies/latest-tv", // Call your route
        {
          params: { page: pageNumber },
        }
      );

      // Update the state without duplicating the first set of TV shows
      setTvShows((prevTvShows) => {
        // Filter out duplicates by checking if the show is already in the state
        const newTvShows = response.data.tvShows.filter(
          (newShow) =>
            !prevTvShows.some((prevShow) => prevShow.id === newShow.id)
        );

        return [...prevTvShows, ...newTvShows];
      });

      setTotalPages(response.data.total_pages);
      console.log("response with TV shows data", response.data.tvShows);
    } catch (error) {
      console.error("Error fetching latest TV shows:", error);
    }
  };

  const fetchMoviesByLanguage = useCallback(
    async (firebaseUid, pageNumber = 1) => {
      console.log(
        `Fetching movies for firebaseUid: ${firebaseUid}, page: ${pageNumber}`
      );

      try {
        const url = `http://localhost:3001/api/movies/language/${firebaseUid}`;
        const response = await axios.get(url, {
          params: { page: pageNumber },
        });

        console.log("Movies fetched by language:", response.data.movies);
        setMovieHero(response.data.movies);
        console.log("MovieHero updated:", response.data.movies); // Log after setting movieHero

        setHeroTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies by language:", error);
      }
    },
    []
  );

  const fetchTrailerForTvShow = async (tmdbId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/tmdb/tv/${tmdbId}/trailer`
      );
      return response.data.youtubeTrailerId; // Return the trailer ID
    } catch (error) {
      console.error(`Error fetching trailer for TV show ${tmdbId}:`, error);
      return null; // Return null if there's an error
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        tvShows,
        movieHero,
        heroTotalPages,
        totalPages,
        page,
        preferredLanguage,
        setPage,
        fetchMovies,
        fetchLatestTVShows,
        fetchMoviesByLanguage,
        fetchUserProfile,
        fetchTrailerForTvShow,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
