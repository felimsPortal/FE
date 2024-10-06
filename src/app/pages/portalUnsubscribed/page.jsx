"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import EmblaCarousel from "../../components/carousel/carouselForYou";
import EmblaCarouselHero from "../../components/carousel/carouselHero";
import Loader from "../../components/loader/loader";
import { Odibee_Sans } from "next/font/google";
import { UserAuth } from "../../context/AuthContext";
import { useMovies } from "../../context/MovieContext";

const Odibee = Odibee_Sans({
  weight: "400",
  subsets: ["latin"],
});

const Portal = () => {
  const { user } = UserAuth();
  const firebaseUid = user?.uid;
  const { page, fetchMovies, fetchMoviesByLanguage } = useMovies();

  const [isScrolled, setIsScrolled] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (!firebaseUid) return;

    const loadUserData = async () => {
      if (!hasMounted) {
        // Only trigger the global loader during the first mount
        setInitialLoading(true);
      }

      try {
        await fetchMoviesByLanguage(firebaseUid, page);
        await fetchMovies(firebaseUid, page);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setInitialLoading(false);
        setHasMounted(true); // Set to true after initial load is completed
        setTimeout(() => {
          setIsContentVisible(true); // Enable content visibility after loader
        }, 200); // Adjust the timeout for a smoother transition
      }
    };

    loadUserData();
  }, [firebaseUid, page, fetchMovies, fetchMoviesByLanguage, hasMounted]);

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

  if (!firebaseUid || initialLoading) {
    return <Loader />; // Show loader only during the initial load
  }

  return (
    <div className="w-screen h-screen">
      <div
        className={`transition-opacity duration-700 ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`fixed w-full h-32 z-10 transition-opacity ${
            isScrolled
              ? "bg-gradient-to-b from-black to-black"
              : "bg-transparent"
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
        <div className="relative w-full h-full flex items-center">
          <div className="relative w-full h-full flex items-center">
            <EmblaCarouselHero selectedLanguage={preferredLanguage} />
          </div>
        </div>

        <div className="w-full h-full p-4">
          <h1
            className={`text-7xl text-center font-bold mt-24 ${Odibee.className}`}
          >
            For You
          </h1>
          <EmblaCarousel firebase_uid={firebaseUid} pageNumber={page} />
        </div>

        {/* Continue Watching Section */}
        <div className="w-screen h-screen bg-black mt- pr-5">
          <div
            className={`w-full flex flex-col text-7xl h-1/4 bg-purple-500 mt-48 ml-10 ${Odibee.className}`}
          >
            CONTINUE WATCHING
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Portal;
