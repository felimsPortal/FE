"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "../../context/FormContext";
import Image from "next/image";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Poiret_One, Odibee_Sans } from "next/font/google";

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
  // const [userData, setUserData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [movies, setMovies] = useState([]);

  const { formData } = useFormContext();
  const { userId } = formData;

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

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       // Fetch user data
  //       const response = await fetch(
  //         `http://localhost:3001/api/movies/${userId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("User and Movies Data:", data);
  //       setUserData(data);

  //       const tmdbResponse = await fetch(
  //         `http://localhost:3001/api/tmdb/${userId}`
  //       );
  //       if (!tmdbResponse.ok) {
  //         throw new Error(`TMDB fetch error! status: ${tmdbResponse.status}`);
  //       }
  //       const tmdbData = await tmdbResponse.json();
  //       setMovies(tmdbData.movies);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       // Fetch user data
  //       const response = await fetch(
  //         `http://localhost:3001/api/movies/${userId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setUserData(data);

  //       // Fetch movies based on user data
  //       const tmdbResponse = await fetch(
  //         `http://localhost:3001/api/tmdb/${userId}`
  //       );
  //       if (!tmdbResponse.ok) {
  //         throw new Error(`TMDB fetch error! status: ${tmdbResponse.status}`);
  //       }
  //       const tmdbData = await tmdbResponse.json();
  //       setMovies(tmdbData.movies);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // // Check if userData is an array and has elements
  // if (!Array.isArray(userData) || !userData.length) {
  //   return <div>No data found.</div>;
  // }

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

      {/* continue watching */}
      <div className="w-screen h-screen bg-black mt- pr-5">
        <div
          className={`w-full flex flex-col text-7xl h-1/4 bg-purple-500 mb-5 ml-10 ${Odibee.className}`}
        >
          CONTINUE WATCHING
        </div>

        <div
          className={`w-full flex flex-col text-7xl  h-1/4 bg-blue-500 mt-16 ml-10 ${Odibee.className}`}
        >
          FOR YOU
          {/* <h1>User Data for ID: {userId}</h1>
          <div>
            <h2>User Details:</h2>
            <p>Name: {userData?.display_name}</p>
            <p>Email: {userData?.email}</p>
            <h2>Selected Languages:</h2>
            <ul>
              {userData?.languages && Array.isArray(userData.languages) ? (
                userData.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))
              ) : (
                <li>No languages selected.</li>
              )}
            </ul>
            <h2>Selected Genres:</h2>
            <ul>
              {userData?.genres && Array.isArray(userData.genres) ? (
                userData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))
              ) : (
                <li>No genres selected.</li>
              )}
            </ul>
            <div>
              <h2>Movies:</h2>
              <ul>
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <li key={movie.id}>
                      <h3>{movie.title}</h3>
                      {movie.poster_path && (
                        <img src={movie.poster_path} alt={movie.title} />
                      )}
                    </li>
                  ))
                ) : (
                  <li>No movies found.</li>
                )}
              </ul>
            </div>
          </div> */}
        </div>
        {/* <div
          className={`w-full flex flex-col text-7xl h-1/4 bg-purple-500  mt-16 ml-10 ${Odibee.className}`}
        >
          MOST WATCHED
        </div>
        <div
          className={`w-full flex flex-col text-7xl h-1/4 bg-purple-500  mt-16 ml-10 ${Odibee.className}`}
        >
          RECENTLY ADDED
        </div> */}
        <Footer />
      </div>
    </div>
  );
};

export default Portal;
