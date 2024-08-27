import React from "react";
import Link from "next/link";
import { Fjalla_One } from "next/font/google";
import Image from "next/image";

const Fjalla = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const Favourites = () => {
  return (
    <div className="w-screen h-screen ">
      <div className="h-32  flex items-center justify-center ">
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
          <Link href="/pages/profile">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer border border-red-500 mt-10">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
