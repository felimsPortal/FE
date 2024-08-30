"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Poiret_One, Odibee_Sans } from "next/font/google";
import EmblaCarousel from "../../components/carousel/carousel";
import { UserAuth } from "../../context/AuthContext";
import { useMovies } from "../../context/MovieContext.js";

const Odibee = Odibee_Sans({
  weight: "400",
  subsets: ["latin"],
});

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const Portal = () => {
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

      <div className="relative w-full h-5/6 flex items-center ">
        <div className=" w-full h-full  flex justify-center px-10 mt-20">
          <video
            className="w-full h-5/6 object-cover rounded-3xl"
            src="/homePage.mp4"
            autoPlay
            loop
            muted
            controls
          />
          {/* Text Overlay */}
          <div className="absolute w-5/6 h-full bg-yellow-500 ">
            <div className=" w-1/3 h-2/3 flex flex-col justify-center mt-24">
              <h1
                className={`text-7xl font-extrabold text-white ${Poiret.className}`}
              >
                MOVIE TITLE
              </h1>
              <p className="mt-5 text-white">
                Synopsis: Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and
              </p>
              <div className="flex items-center mt-5 justify-center">
                <Image
                  width={55}
                  height={40}
                  loading="lazy"
                  className="h-10"
                  src="/4k.png"
                  alt="4K"
                />
                <Image
                  width={375}
                  height={100}
                  loading="lazy"
                  className=" ml-5 mt-10"
                  src="/details.png"
                  alt="details"
                />
              </div>
            </div>
          </div>
        </div>
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
