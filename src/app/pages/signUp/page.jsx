"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "@/app/context/FormContext";

const SignUp = () => {
  const { formData, handleChange } = useFormContext();

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="w-full">
        <Image
          className="rounded-md "
          src="/signUpCollage.jpg"
          alt="landing page img"
          width={1200}
          height={800}
          priority={false}
        />
      </div>
      <div className="relative w-1/4 h-full flex items-center justify-center">
        <div className="transform -rotate-90 border-t-[380px] border-t-red-700 border-l-[256px] border-l-transparent border-r-[256px] border-r-transparent"></div>

        <div className="w-72 h-3/4 bg-green-900 absolute rounded-tl-3xl rounded-br-3xl">
          <div className="flex justify-center">
            <input
              className="mt-24 bg-transparent border-b-2 border-gray-600 z-50"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Display name"
            />
          </div>

          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-8 bg-transparent border-b-2 border-gray-600 z-50"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex justify-center mt-8 z-50">
            <Link href="/pages/welcome" className="z-50 cursor-pointer">
              <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
                Sign Up
              </button>
            </Link>
          </div>

          <div className="text-sm mt-6 flex justify-center ">
            Or continue with
          </div>
          <div className="mt-4 flex justify-center">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500 flex items-center justify-center">
              <Image
                className="mr-2"
                src="/Google__G__logo.svg.png"
                alt="googleLogo"
                width={20}
                height={110}
              />
              Google
            </button>
          </div>
          <div className="text-sm mt-6 flex justify-center">
            Back to
            <Link href="/" className="ml-2 underline text-blue-400">
              Sign In
            </Link>
          </div>
        </div>
        <div className="w-fit h-fit absolute mb-36 z-0">
          <Image
            className="mb-96 ml-36"
            src="/bird.png"
            alt="bird"
            width={180}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
