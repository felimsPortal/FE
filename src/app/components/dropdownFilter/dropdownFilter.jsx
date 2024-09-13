"use client";
import { useState, useEffect, useRef } from "react";
import Languages from "../lanuages/languages";
import { Poiret_One } from "next/font/google";
import Genres from "../genres/genres";
import Sliders from "../sliders/sliders";
// import noUiSlider from "nouislider";
// import "nouislider/dist/nouislider.css";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const DropdownFilter = ({ isOpen, closeDropdown }) => {
  const [selectedType, setSelectedType] = useState("");

  const handleSelection = (type) => {
    setSelectedType(type);
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
                <Languages />
              </div>
              <div className="flex flex-col h-full justify-around">
                <h4 className="font-semibold tracking-wider text-center text-2xl mb-4">
                  Genres
                </h4>
                <Genres />
              </div>
            </div>
          </div>
          <br />

          {/* Release Year */}
          <div className="filter-section flex flex-col space-y-4 p-4">
            <Sliders />
          </div>
          <br />
          <div className="w-full flex justify-center mt-5">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;
