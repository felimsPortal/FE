"use client";
import { useState, useEffect, useRef } from "react";
import Languages from "../lanuages/languages";
import { Poiret_One } from "next/font/google";
import Genres from "../genres/genres";
import Sliders from "../sliders/sliders";
import axios from "axios";
import { useRouter } from "next/navigation";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const DropdownFilter = ({ isOpen, closeDropdown }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imdbScore, setImdbScore] = useState({ min: 0, max: 10 });
  const [releaseYear, setReleaseYear] = useState({ min: 1906, max: 2024 });

  const router = useRouter();

  const handleSelection = (type) => {
    setSelectedType(type);
    console.log("Selected Category:", type);
  };
  const handleLanguageChange = (newSelectedValues) => {
    console.log("Parent component received Language:", newSelectedValues);
    setSelectedLanguage(newSelectedValues);
  };
  const handleGenreChange = (newSelectedValues) => {
    console.log("Parent component received Genre:", newSelectedValues);
    setSelectedGenres(newSelectedValues);
  };

  const handleImdbScoreChange = (score) => {
    console.log("Updated IMDb Score:", score);
    setImdbScore(score);
  };

  const handleReleaseYearChange = (yearRange) => {
    console.log("Updated Release Year Range:", yearRange);
    setReleaseYear(yearRange);
  };

  const handleSearch = async () => {
    try {
      // Filter out falsy values (such as empty strings) from selectedLanguage
      const validLanguages = selectedLanguage.filter(Boolean);

      const filters = {
        imdbMin: imdbScore.min,
        imdbMax: imdbScore.max,
        yearMin: releaseYear.min,
        yearMax: releaseYear.max,
        language:
          validLanguages.length > 0 ? validLanguages.join(",") : undefined,
        genre: selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
        page: 1, // Start with the first page
      };

      console.log("Sending filters to backend:", filters);
      console.log("Valid languages:", validLanguages);

      const response = await axios.get(
        "http://localhost:3001/api/tmdb/filtered",
        {
          params: filters,
        }
      );

      const { movies, total_pages } = response.data; // Correct destructuring
      console.log("Filtered movies from TMDB:", movies);
      console.log("Total pages from API:", total_pages); // Logging total_pages

      // Store movies and totalPages in sessionStorage
      sessionStorage.setItem("filteredMovies", JSON.stringify(movies));
      sessionStorage.setItem("totalPages", total_pages); // Store total pages
      sessionStorage.setItem("filters", JSON.stringify(filters)); // Store filters for pagination

      // Log values being stored
      console.log("Movies stored in sessionStorage:", movies);
      console.log("Total pages stored in sessionStorage:", total_pages);

      window.location.href = "/pages/filteredResults";
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`absolute w-[620px] mt-2 ${Poiret.className}`}>
      <div className="w-full top-16 right-0 bg-gray-800 p-4 rounded-lg shadow-lg z-50">
        <div className="text-white space-y-4">
          {/* Categories */}
          <div className="filter-section tracking-wider">
            <h4 className="mb-2 tracking-wider font-semibold text-2xl text-center">
              Category
            </h4>
            <hr />
            <br />
            <div className="flex justify-around text-2xl space-x-2">
              <button
                className={`px-4 py-2 rounded hover:scale-110 ${
                  selectedType === "movies"
                    ? "bg-red-900 text-white border border-white"
                    : "bg-green-700"
                }`}
                onClick={() => handleSelection("movies")}
              >
                Movies
              </button>

              <button
                className={`px-4 py-2 rounded hover:scale-110 ${
                  selectedType === "tvshows"
                    ? "bg-red-900 text-white border  border-white"
                    : "bg-green-700"
                }`}
                onClick={() => handleSelection("tvshows")}
              >
                TV Shows
              </button>

              <button
                className={`px-4 py-2 rounded hover:scale-110 ${
                  selectedType === "documentaries"
                    ? "bg-red-900 text-white border  border-white"
                    : "bg-green-700"
                }`}
                onClick={() => handleSelection("documentaries")}
              >
                Documentaries
              </button>
            </div>
          </div>
          <hr />

          {/* Languages and Genres */}
          <div className="filter-section flex flex-col items-center justify-center">
            <div className="w-full flex justify-around">
              <div className="flex flex-col h-full justify-around">
                <h4 className="font-semibold tracking-wider text-center text-2xl mb-4">
                  Languages
                </h4>
                <Languages
                  selectedValues={selectedLanguage}
                  onChange={handleLanguageChange}
                />
                <p>
                  Selected Languages:{" "}
                  {Array.isArray(selectedLanguage) &&
                  selectedLanguage.length > 0
                    ? selectedLanguage.join(", ")
                    : "None"}
                </p>
              </div>
              <div className="flex flex-col h-full justify-around">
                <h4 className="font-semibold tracking-wider text-center text-2xl mb-4">
                  Genres
                </h4>
                <Genres
                  selectedValues={selectedGenres}
                  onChange={handleGenreChange}
                />
                <p>
                  Selected Genres:{" "}
                  {Array.isArray(selectedGenres) && selectedGenres.length > 0
                    ? selectedGenres.join(", ")
                    : "None"}
                </p>
              </div>
            </div>
          </div>
          <br />

          {/* Release Year */}
          <div className="filter-section flex flex-col space-y-4 p-4">
            <Sliders
              onImdbScoreChange={handleImdbScoreChange}
              onReleaseYearChange={handleReleaseYearChange}
            />
          </div>
          <br />
          <div className="w-full flex justify-center mt-5">
            <button
              className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;
