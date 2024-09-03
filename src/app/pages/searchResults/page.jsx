"use client";
import React, { useState, useEffect } from "react";

import Navbar from "../../components/navbar/navbar";
import EmblaCarouselResults from "../../components/carousel/carouselResultsMovie";
import EmblaCarouselResultsTv from "../../components/carousel/carouselResultsTv";

const SearchResults = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="w-full h-fit pt-36">
        <EmblaCarouselResults />
      </div>
      <div className="w-full h-fit">
        <EmblaCarouselResultsTv />
      </div>
    </div>
  );
};

export default SearchResults;
