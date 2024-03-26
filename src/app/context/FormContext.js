"use client";
import { createContext, useState, useEffect, useContext } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    displayName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const emailForSignIn = localStorage.getItem("emailForSignIn");
      if (emailForSignIn) {
        setFormData((prevData) => ({ ...prevData, email: emailForSignIn }));
      }
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "email" || e.target.name === "password") {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: [e.target.vale],
      }));
    }
  };

  const handlesubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/pages/signUp", {
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

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handlesubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
