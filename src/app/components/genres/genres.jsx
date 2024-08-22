import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Musical",
  9648: "Mystery",
  10770: "Reality TV",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const getGenreNames = (genreIds = []) => {
  return genreIds.map((id) => genreMap[id] || "Unknown Genre");
};

const Genres = ({ selectedValues, onChange }) => {
  const handleChange = (e) => {
    const clickedOption = e.target.value;
    const isSelected = selectedValues.includes(clickedOption);

    let newSelectedValues;
    if (isSelected) {
      newSelectedValues = selectedValues.filter(
        (value) => value !== clickedOption
      );
    } else {
      if (selectedValues.length < 3) {
        newSelectedValues = [...selectedValues, clickedOption];
      } else {
        toast.error("Thanks 3 is good for now");
        return;
      }
    }
    onChange(newSelectedValues);
  };

  return (
    <div>
      <select
        multiple
        value={selectedValues}
        onChange={handleChange}
        className="w-60 h-48  rounded-xl text-gray-200 bg-gray-900 text-lg tracking-wide border-2 border-gray-600 focus:border-red-900 transition duration-200 ease-in-out px-2"
      >
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Musical</option>
        <option value="9648">Mystery</option>
        <option value="10770">Reality TV</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>
    </div>
  );
};

export default Genres;
