"use client";
import EmblaCarouselTv from "@/app/components/carousel/carouselTv";
import Navbar from "@/app/components/navbar/navbar";
import EmblaCarousel from "../../components/carousel/carousel";
import React, { useState, useEffect } from "react";
import Footer from "@/app/components/footer/footer";

const OPTIONSTV = { slidesToScroll: "auto" };
const SLIDE_COUNTTV = 10;
const SLIDESTV = Array.from(Array(SLIDE_COUNTTV).keys()).map(
  (i) => `/imagetv${i + 1}.jpg`
);
const OPTIONS = { slidesToScroll: "auto" };
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys()).map(
  (i) => `/image${i + 1}.jpg`
);

const Tvshows = () => {
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
        className={`top-0 fixed w-full h-32 z-10 transition-opacity ${
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
      <div className="w-full h-5/6 mt-36  flex items-center justify-center">
        <EmblaCarouselTv slides={SLIDESTV} options={OPTIONSTV} />
      </div>
      <div className="w-full h-4/6">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <Footer />
    </div>
  );
};

export default Tvshows;
