import React from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="w-full">
        <Image
          className="rounded-md "
          src="/landingPageImageFilms.jpg"
          alt="landing page img"
          width={1300}
          height={800}
        />
      </div>
      <div className="relative w-1/4 h-full flex items-center justify-center">
        <div className="transform -rotate-90 border-t-[380px] border-t-red-700 border-l-[256px] border-l-transparent border-r-[256px] border-r-transparent"></div>

        <div className="w-72 h-2/3 bg-green-900 absolute rounded-tl-3xl rounded-br-3xl">
          <div className="relative flex justify-between">
            <h1 className="mt-8 ml-6 text-2xl font-semibold">Sign In</h1>
          </div>
          <div className="flex justify-center">
            <input
              className="mt-20 bg-transparent border-b-2 border-gray-600 z-50"
              type="text"
              placeholder="Username or email"
            />
          </div>
          <div className="flex justify-center">
            <input
              className="mt-10 bg-transparent border-b-2 border-gray-600 z-50"
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500">
              Go to Felims
            </button>
          </div>
          <div className="mt-10 ml-4 flex">
            <input type="checkbox" name="rememberMe" id="" className="z-50" />
            <div className="ml-1  text-xs ">Remember me</div>
            <Link className="ml-8 text-xs cursor-pointer z-50" href="#">
              Forgot Password
            </Link>
          </div>
          <div className="text-sm mt-6 flex justify-center ">
            Or continue with
          </div>
          <div className="mt-4 flex justify-center">
            <Image
              src="/Google__G__logo.svg.png"
              alt="googleLogo"
              width={20}
              height={110}
            />
            <button className="ml-2 cursor-pointer z-50">Google</button>
          </div>
          <div className="text-sm mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link
              href="pages/emailConfirm"
              className="ml-2 underline text-blue-400"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="absolute mb-36">
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

export default Home;
