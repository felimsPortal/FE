"use client";
import { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
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
        console.log("The form has been submitted");
      } else {
        console.error("failed to submit the form");
      }
    } catch (error) {
      console.error("an error has occured", error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data", formData);
  // };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
