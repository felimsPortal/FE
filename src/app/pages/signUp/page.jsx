"use client";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/app/components/navbar/navbar";

const SignUp = () => {
  const { formData, handleChange } = useFormContext();
  const { sendEmailLink } = UserAuth();
  const router = useRouter();
  const [email, setEmail] = useState({
    email: "",
  });

  const handleEmailChange = (e) => {
    setEmail((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(email);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    const userEmail = email.email.trim();
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
  return (
    <form onSubmit={sendLink}>
      <Navbar />
      <div className="relative w-screen h-screen flex items-center justify-center ">
        <div className="w-full h-4/6 flex items-center justify-center mt-24 ">
          <div className="">
            <Image
              className="rounded-md opacity-15 mt-16"
              src="/signUpCollage2.png"
              alt="landing page img"
              width={1440}
              height={800}
              priority={false}
            />
          </div>
        </div>
        <div className="absolute w-72 h-1/2 bg-green-900 blur-3xl rounded-tl-3xl rounded-br-3xl mt-24"></div>
        <div className="absolute ">
          <div className="flex justify-center ">
            <input
              className="mt-14 bg-transparent border-b-2 border-gray-600 z-50 text-center"
              name="displayName"
              value={formData.displayName}
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
              value={email.email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50 text-center"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50 text-center"
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
    </form>
  );
};

export default SignUp;
