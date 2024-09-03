"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Odibee_Sans } from "next/font/google";
import EmblaCarousel from "../../components/carousel/carouselForYou";
import EmblaCarouselHero from "../../components/carousel/carouselHero";
import { UserAuth } from "../../context/AuthContext";
import { useMovies } from "../../context/MovieContext.js";

const Odibee = Odibee_Sans({
  weight: "400",
  subsets: ["latin"],
});

const Portal = () => {
  const { user } = UserAuth();
  const firebaseUid = user?.uid;

  const { totalPages, page, setPage, fetchMovies, fetchMoviesByLanguage } =
    useMovies();

  const [isScrolled, setIsScrolled] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(null);

  useEffect(() => {
    if (!firebaseUid) {
      console.log("Waiting for Firebase UID...");
      return; // Exit early if firebaseUid is not available
    }

    const loadUserData = async () => {
      try {
        console.log("Fetching user data for firebaseUid:", firebaseUid);

        fetchMoviesByLanguage(firebaseUid, page); // Fetch movies by language

        fetchMovies(firebaseUid, page); // Fetch movies by other preferences
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    loadUserData();
  }, [firebaseUid, page, fetchMovies, fetchMoviesByLanguage]);

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

  if (!firebaseUid) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-screen h-screen">
      <div
        className={`fixed w-full h-32  z-10 transition-opacity ${
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

      {/* Hero Section */}

      <div className="relative w-full h-full flex items-center ">
        <div className="relative w-full h-full flex items-center bg-pink-500">
          <EmblaCarouselHero selectedLanguage={preferredLanguage} />
        </div>
      </div>

      <div className="w-full h-full p-4">
        <h1 className="text-2xl font-bold mt-36">Movies</h1>
        <EmblaCarousel firebase_uid={firebaseUid} pageNumber={page} />
        {page < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}
      </div>
      {/* continue watching */}
      <div className="w-screen h-screen bg-black mt- pr-5">
        <div
          className={`w-full flex flex-col text-7xl h-1/4 bg-purple-500 mb-5 ml-10 ${Odibee.className}`}
        >
          CONTINUE WATCHING
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Portal;
