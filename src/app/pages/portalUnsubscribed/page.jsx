"use client";
import Link from "next/link";
import Image from "next/image";
import { FaHome, FaFilter, FaSearch, FaHeart } from "react-icons/fa";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import VideoPlayer from "react-video-js-player";
import Kingdom from "../../../../public/MY_VIDEO.mp4";

const Portal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  // const playerRef = useRef(null);

  const videoSrc = Kingdom;
  const poster =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.themoviedb.org%2Fmovie%2F653346-kingdom-of-the-planet-of-the-apes%2Fimages%2Fposters&psig=AOvVaw1GI2BXTXz4LPLoD0k2NQwS&ust=1715248124025000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCLCGpq7j_YUDFQAAAAAdAAAAABAE";

  // const onPlayerReady = (player) => {
  //   console.log("Player is ready: ", player);
  //   playerRef.current = player;
  // };

  // const onVideoPlay = (duration) => {
  //   console.log("Video played at: ", duration);
  // };

  // const onVideoPause = (duration) => {
  //   console.log("Video paused at: ", duration);
  // };

  // const onVideoTimeUpdate = (duration) => {
  //   console.log("Time updated: ", duration);
  // };

  // const onVideoSeeking = (duration) => {
  //   console.log("Video seeking: ", duration);
  // };

  // const onVideoSeeked = (from, to) => {
  //   console.log(`Video seeked from ${from} to ${to}`);
  // };

  // const onVideoEnd = () => {
  //   console.log("Video ended");
  // };

  return (
    <div className="h-screen w-screen overflow-y-scroll  ">
      <div className="w-full h-24 bg-green-700 flex justify-evenly items-center">
        <Link href="/pages/paymentPage">
          <button className="bg-gray-900 w-40 h-14 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
            Get Premium Access
          </button>
        </Link>
        <h1 className="font-bold text-2xl">
          Currently you can only view trailers - Subscribe for Premium access
        </h1>
        <Link href="/pages/paymentPage">
          <button className="bg-gray-900  w-40 h-14 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
            Get Premium Access
          </button>
        </Link>
      </div>
      <div ref={containerRef}>
        <div className="h-20 w-full bg-red-800 items-center">
          <div className="h-full w-full items-center flex justify-between px-10 ">
            <div className="group w-full flex justify-between items-center">
              <div className="relative w-1/2">
                <div className=" flex" onClick={() => setIsOpen(!isOpen)}>
                  <div>
                    <FaSearch size={40} />
                  </div>
                  {isOpen && (
                    <div className="ml-10 bg-white shadow-md rounded-md w-3/5 z-50 ">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search felims"
                        className="w-full p-2 border-gray-300 rounded-md focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute invisible group-hover:visible bg-gray-800 text-white px-2 py-1 rounded-md bottom-full left-0  text-center">
                Search
              </div>
            </div>

            <div className="flex w-1/2 justify-evenly">
              <Link href="/portalSubscribed">
                <FaHome size={40} />
              </Link>
              <Link href="/portalSubscribed">
                <FaFilter size={40} />
              </Link>
              <Link href="/portalSubscribed">
                <FaHeart size={40} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <VideoPlayer src={videoSrc} poster={poster} />
    </div>
  );
};

export default Portal;
