"use client";
import React from "react";
import Navbar from "@/app/components/navbar/navbar";
import { Poiret_One } from "next/font/google";
import Image from "next/image";

const Poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
});

const Portal = () => {
  return (
    <div className="w-screen h-screen ">
      <div className="">
        <Navbar />
      </div>
      <div className=" w-full h-5/6 flex items-center">
        <div className="w-full h-full px-14 py-10">
          <video
            className="w-full h-full object-cover rounded-3xl "
            src="/homePage.mp4
        "
            autoPlay
            loop
            muted
          />
        </div>

        <div className="absolute h-2/3 w-1/4 flex flex-col items-center justify-center ml-24 mt-48  px-10">
          <div className="w-full h-1/3 ">
            <h1
              className={`text-7xl font-extrabold text-white mt-10 ${Poiret.className}`}
            >
              MOVIE TITLE
            </h1>
          </div>
          <div className="w-full h-1/3">
            <h1 className="mt-5">
              Synopsis: Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and
            </h1>
          </div>
          <div className="flex w-full h-1/3">
            <Image
              width={55}
              height={100}
              loading="lazy"
              className="h-1/4"
              src="/4k.png"
              alt="4K"
            />
            <Image
              width={475}
              height={100}
              loading="lazy"
              className="h-1/4 ml-5"
              src="/details.png"
              alt="4K"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
