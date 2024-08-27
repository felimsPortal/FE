"use client";
import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const fetchMovies = useCallback(async (firebase_uid, pageNumber = page) => {
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

      const movieData = response.data.movies.map((movie) => {
        console.log("Processing movie:", movie);
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          original_language: movie.original_language,
          poster_path: movie.poster_path,
          genre_ids: movie.genre_ids || [],
        };
      });

      console.log("Processed movie data:", movieData);

      setMovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map((movie) => movie.id));
        const newMovies = movieData.filter(
          (movie) => !existingIds.has(movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, []);

  return (
    <MovieContext.Provider value={{ movies, totalPages, page, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
