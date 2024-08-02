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
