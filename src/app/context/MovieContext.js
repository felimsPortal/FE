"use client";
import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

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

        const { movies: movieData, total_pages } = response.data;
        console.log("Processed movie data:", movieData);

        setMovies((prevMovies) => {
          const existingIds = new Set(prevMovies.map((movie) => movie.id));
          const newMovies = movieData.filter(
            (movie) => !existingIds.has(movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    [page]
  );

  return (
    <MovieContext.Provider
      value={{ movies, setPage, totalPages, page, fetchMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
