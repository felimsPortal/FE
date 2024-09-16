"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Use useSearchParams instead of useRouter
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Play = () => {
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const tmdbId = searchParams.get("tmdbId"); // Get the 'tmdbId' from query params
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details based on the tmdbId
  useEffect(() => {
    if (tmdbId) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/radar/movies/${tmdbId}`
          );
          setMovieDetails(response.data); // Set fetched movie data
          setLoading(false);
        } catch (error) {
          console.error("Error fetching movie details:", error);
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [tmdbId]); // This effect will run whenever tmdbId changes

  // If tmdbId is undefined, we wait for the query params to populate
  if (!tmdbId) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movieDetails) {
    return <div>No movie details found.</div>;
  }

  return (
    <div className="w-screen h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="pt-40 px-8 h-fit w-fit">
        {/* Movie Details */}
        <h1 className="text-white text-6xl">{movieDetails.title}</h1>
        <p className="text-white text-2xl">
          <strong>Overview:</strong> {movieDetails.overview}
        </p>
        <p className="text-white text-2xl">
          <strong>Release Year:</strong> {movieDetails.year}
        </p>
        <p className="text-white text-2xl">
          <strong>Runtime:</strong> {movieDetails.runtime} minutes
        </p>
        <p className="text-white text-2xl">
          <strong>Language:</strong> {movieDetails.originalLanguage}
        </p>
        <p className="text-white text-2xl">
          <strong>Certification:</strong> {movieDetails.certification}
        </p>
        <p className="text-white text-2xl">
          <strong>Rating:</strong> {movieDetails.tmdbRating}
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Play;
