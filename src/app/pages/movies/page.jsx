"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import EmblaCarousel from "../../components/carousel/carouselForYou";
import { UserAuth } from "../../context/AuthContext";
import { useMovies } from "../../context/MovieContext.js";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = UserAuth();
  const firebase_uid = user?.uid;
  const { totalPages, page, setPage, fetchMovies } = useMovies();

  useEffect(() => {
    console.log("Firebase UID:", firebase_uid);
    if (firebase_uid) {
      fetchMovies(firebase_uid, page);
    }
    console.log("fetchMovies called");
  }, [firebase_uid, page, fetchMovies]);

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

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (!firebase_uid) {
    return <div>Loading...</div>;
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
      <div className="w-full h-full p-4">
        <h1 className="text-2xl font-bold mt-36">Movies</h1>
        <EmblaCarousel firebase_uid={firebase_uid} pageNumber={page} />
        {page < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Movies;
