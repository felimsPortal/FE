"use client";
import { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    displayName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", formData);
  };

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
