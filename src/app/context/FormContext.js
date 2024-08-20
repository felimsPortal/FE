"use client";
import { createContext, useState, useContext, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userId: "",
    display_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    language: [],
    genre: [],
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: storedUserId,
      }));
    }
  }, []);
  useEffect(() => {
    if (formData.userId) {
      localStorage.setItem("userId", formData.userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [formData.userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("The form has been submitted");
        console.log(result);
        if (result && result.length > 0 && result[0].id) {
          updateFormData({ userId: result[0].id });
        }
      } else {
        console.error("failed to submit the form");
      }
    } catch (error) {
      console.error("an error has occured", error);
    }
  };

  // const handleLanguageChange = (e) => {
  //   const selectedLanguage = e.target.value;
  //   setFormData((prevData) => {
  //     // Check if the language is already selected
  //     const isAlreadySelected = prevData.languages.includes(selectedLanguage);

  //     // If selected, remove it; otherwise, add it to the array
  //     const updatedLanguages = isAlreadySelected
  //       ? prevData.languages.filter((lang) => lang !== selectedLanguage)
  //       : [...prevData.languages, selectedLanguage];

  //     return {
  //       ...prevData,
  //       languages: updatedLanguages,
  //     };
  //   });
  // };

  // const handleGenreChange = (e) => {
  //   const selectedGenre = e.target.value;
  //   setFormData((prevData) => {
  //     // Check if the genre is already selected
  //     const isAlreadySelected = prevData.genres.includes(selectedGenre);

  //     // If selected, remove it; otherwise, add it to the array
  //     const updatedGenres = isAlreadySelected
  //       ? prevData.genres.filter((genre) => genre !== selectedGenre)
  //       : [...prevData.genres, selectedGenre];

  //     return {
  //       ...prevData,
  //       genres: updatedGenres,
  //     };
  //   });
  // };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        // handleLanguageChange,
        // handleGenreChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
