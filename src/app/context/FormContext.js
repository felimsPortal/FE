"use client";
import { createContext, useState, useContext, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    language: [],
    genre: [],
    firebase_uid: "",
  });

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

  const handleUserCreation = async (firebase_uid) => {
    console.log(
      "Before setting firebase_uid handleUserCreation log:",
      formData.firebase_uid
    );
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        firebase_uid: firebase_uid,
      };
      console.log(
        "After setting firebase_uid handleUserCreation log:",
        updatedFormData.firebase_uid
      );
      return updatedFormData;
    });
    console.log(
      "Firebase UID set in formDatahandleUserCreation log:",
      firebase_uid
    );
  };

  const handleSubmit = async (firebase_uid) => {
    try {
      const user = {
        display_name: formData.display_name,
        email: formData.email,
        password: formData.password,
        firebase_uid: firebase_uid,
      };

      console.log("Attempting to create user with data:", user);
      console.log(
        "Firebase UID Formdata handlesubmit log:",
        formData.firebase_uid
      );
      const response = await fetch("http://localhost:3001/api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("User created:", result);
    } catch (error) {
      console.error("An error has occurred", error);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        updateFormData,
        handleUserCreation,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
