"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import EmblaCarousel from "../../components/carousel/carousel";
import MovieModal from "../../components/modal/modal";
import { useFormContext } from "../../context/FormContext";
import { useMovies } from "../../context/MovieContext.js";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formData } = useFormContext();
  const { firebase_uid } = formData; // Update to use firebase_uid
  const { movies, totalPages, page, setPage, fetchMovies } = useMovies();

  useEffect(() => {
    console.log("Firebase UID:", firebase_uid); // Log the firebase_uid
    if (firebase_uid) {
      fetchMovies(firebase_uid, page); // Pass firebase_uid to fetchMovies
    }
    console.log("fetchMovies called");
  }, [firebase_uid, page, fetchMovies]); // Update dependency array to use firebase_uid

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

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
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
      <div className="w-full h-full p-4">
        <h1 className="text-2xl font-bold mt-36">Movies</h1>
        <EmblaCarousel
          slides={movies.map((movie) => movie.poster_path)}
          options={{ loop: true }}
          onSlideClick={(index) => openModal(movies[index])}
        />

        {page < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}

        {selectedMovie && (
          <MovieModal
            isOpen={isModalOpen}
            onClose={closeModal}
            movie={selectedMovie}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;
