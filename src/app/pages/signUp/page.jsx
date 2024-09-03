"use client";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "../../context/FormContext";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Footer from "@/app/components/footer/footer";

const SignUp = () => {
  const { formData, handleChange, handleSubmit, handleUserCreation } =
    useFormContext();

  const { sendEmailLink, user, newUser } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log(
      "formData stored in localStorage:",
      localStorage.getItem("formData")
    );
  }, [formData]);

  const sendLink = async (e) => {
    e.preventDefault();
    const userEmail = formData.email.trim();
    const isValidEmail = (email) => {
      return email.includes("@");
    };
    if (userEmail === "") {
      console.log("email field is empty");
      toast("Please enter your email address");
      return;
    } else if (!isValidEmail(userEmail)) {
      console.log("email is invalid");
      toast("Please enter a valid email address");
      return;
    } else {
      try {
        await sendEmailLink(userEmail);
        router.push("/pages/emailSent");
      } catch (error) {
        errorCode = error.code;
        errorMessage - error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const newUserSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await newUser(formData.email, formData.password);

      if (!userCredential || !userCredential.user) {
        throw new Error("User creation failed or userCredential is undefined");
      }

      const firebase_uid = userCredential.user.uid;
      console.log("Firebase UID:", firebase_uid);

      handleUserCreation(firebase_uid);

      await handleSubmit(firebase_uid);
      console.log("User has signed up and data sent to backend");

      localStorage.setItem("firebase_uid", firebase_uid);
      console.log(
        "firebase_uid stored in localStorage:",
        localStorage.getItem("firebase_uid")
      );

      await sendLink(e);

      console.log("User has signed up and data sent to backend");
    } catch (error) {
      console.error("Error during signup process:", error);
    }
  };

  return (
    <form onSubmit={newUserSignUp} className="w-screen h-screen">
      <div className="w-full h-32 flex items-center justify-center ">
        <div className="h-32 w-1/4 pt-4 flex items-center justify-between">
          <Image
            className=""
            src="/Logo2.png"
            alt="logo"
            width={75}
            height={150}
          />
          <Image
            className=""
            src="/logoName.png"
            alt="logo"
            width={325}
            height={150}
          />
        </div>
      </div>
      <hr className="h-1 bg-gradient-to-r from-red-700 via-green-500 to-black border-0" />
      <div className="relative w-screen h-5/6 flex items-center justify-center ">
        <div className="w-full h-full flex items-center justify-center">
          <div className="">
            <Image
              className="rounded-md opacity-15"
              src="/signUpCollage2.png"
              alt="landing page img"
              width={1440}
              height={1240}
              loading="lazy"
              priority={false}
            />
          </div>
        </div>
        <div className="absolute w-72 h-1/2 bg-green-900 blur-3xl rounded-tl-3xl rounded-br-3xl mt-24"></div>
        <div className="absolute ">
          <div className="flex justify-center ">
            <input
              className="mt-14 bg-transparent border-b-2 border-gray-600 z-50 text-center"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Display name"
            />
          </div>

          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50 text-center"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50 text-center"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50 text-center"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex justify-center mt-8 z-50">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
              Sign Up
            </button>
          </div>

          <div className="text-sm mt-6 flex justify-center">
            Back to
            <Link href="/" className="ml-2 underline text-blue-400">
              Sign In
            </Link>
          </div>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </form>
  );
};

export default SignUp;
