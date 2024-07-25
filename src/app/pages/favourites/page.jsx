import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar/navbar";
import { Fjalla_One } from "next/font/google";

const Fjalla = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const Favourites = () => {
  return (
    <div className="w-screen h-screen ">
      <div className="h-1/6">
        <Navbar />
      </div>
      <div className="w-full h-5/6 flex">
        <div className="w-2/3 ">
          <video className="" src="/navigation.mp4" autoPlay loop muted />
        </div>
        <div className="relative w-1/3 h-5/6 flex flex-col items-center justify-around px-16 ">
          <div className="absolute w-1/2 h-2/3 bg-green-900 blur-3xl rounded-tl-3xl rounded-br-3xl -z-10"></div>
          <div className={Fjalla.className}>
            <div className="text-center text-2xl  h-1/2 flex flex-col justify-evenly mt-24">
              <h1 className="">Hover over a Felim to for a brief synopsis</h1>
              <br />

              <h1>Add similar Felims to your profile</h1>

              <br />
              <h1>Bookmarks to watch later</h1>
            </div>
          </div>
          <Link href="/pages/watchLater">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500 mt-10 z-50">
              Continue
            </button>
          </Link>
        </div>
      </div>

      {/* <div className={righteous.className}>
        <div className="flex justify-center">
          <h1 className="text-7xl mt-12 text-green-700">
            Create your list of Felims and TV Shows
          </h1>
        </div>
      </div>

      <div className={righteous.className}>
        <div className="flex justify-center">
          <h1 className="text-2xl mt-6">Add them to your favourites</h1>
        </div>
      </div>

      <div className="relative h-fit w-full flex items-center mt-10">
   
        <div className="">
          <video
            className="w-full"
            src="/Untitled video - Made with Clipchamp (1).mp4"
            autoPlay
            loop
          />
        </div>
        <div className="absolute h-full flex items-center justify-center ml-[550px]">
          <div className="transform -rotate-90 border-t-[400px] border-t-red-700 border-l-[226px] border-l-transparent border-r-[226px] border-r-transparent"></div>
        </div>
        <div className="h-96 w-1/2 mt-0 flex-col">
          <div className="ml-52 w-fit h-fit flex">
            <div className="h-80 w-fit rounded-xl bg-green-600 ">
              <Image
                className="rounded-tr-xl rounded-tl-xl"
                src="/Favourites1.jpg"
                alt="favoritesMovie1"
                width={185}
                height={100}
              />
              <div className="flex mt-2 justify-evenly ">
                <div className="w-14 h-12 bg-black flex items-center justify-center">
                  <Image
                    className="object-contain "
                    src="/Like.png"
                    alt="Like"
                    width={40}
                    height={35}
                  />
                </div>
                <Image
                  src="/watchLater.png"
                  alt="Like"
                  width={50}
                  height={35}
                />
              </div>
            </div>
            <div className="h-80 w-fit ml-12 rounded-xl bg-green-600 ">
              <Image
                className="object-fit  rounded-tr-xl rounded-tl-xl"
                src="/Favourites2.jpg"
                alt="favoritesMovie2"
                width={185}
                height={100}
              />
              <div className="flex mt-2 justify-evenly ">
                <div className="w-14 h-12 bg-black flex items-center justify-center">
                  <Image
                    className="object-contain "
                    src="/Like.png"
                    alt="Like"
                    width={40}
                    height={35}
                  />
                </div>
                <Image
                  src="/watchLater.png"
                  alt="Like"
                  width={50}
                  height={35}
                />
              </div>
            </div>
          </div>
       
          <div className="flex justify-center">
            <div className="mt-8 w-32 h-fit flex justify-evenly">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <div className="w-6 h-6 bg-red-700 rounded-full"></div>
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Favourites;
