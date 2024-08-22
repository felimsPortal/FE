import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const languageMap = {
  ar: "Arabic",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  fr: "French",
  de: "German",
  it: "Italian",
  ko: "Korean",
  zh: "Manadarin",
  ro: "Romanian",
  ru: "Russian",
  es: "Spanish",
  sv: "Swedish",
  tr: "Turkish",
};

export const getLanguageNames = (languageIds = []) => {
  if (typeof languageIds === "string") {
    languageIds = [languageIds];
  }

  if (!Array.isArray(languageIds)) {
    console.error("Expected an array or string but got:", typeof languageIds);
    return ["Unknown Language"];
  }

  return languageIds.map((id) => languageMap[id] || "Unknown Language");
};

const Languages = ({ selectedValues, onChange }) => {
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
        <option value="ar">Arabic</option>
        <option value="da">Danish</option>
        <option value="nl">Dutch</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="ko">Korean</option>
        <option value="zh">Mandarin</option>
        <option value="ro">Romanian</option>
        <option value="ru">Russian</option>
        <option value="es">Spanish</option>
        <option value="sv">Swedish</option>
        <option value="tr">Turkish</option>
      </select>
    </div>
  );
};

export default Languages;
