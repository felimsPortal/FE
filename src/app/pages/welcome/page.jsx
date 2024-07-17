import Image from "next/image";
import Link from "next/link";
import { Righteous } from "next/font/google";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
});

const Welcome = () => {
  return (
    <div className="w-screen h-screen">
      <div className={righteous.className}>
        <div className="flex justify-center">
          <h1 className="text-7xl mt-12 text-green-700">
            Welcome to the Felims Portal
          </h1>
        </div>
      </div>

      <div className={righteous.className}>
        <div className="flex justify-center">
          <h1 className="text-2xl mt-6">
            Watch Felims Online in HD with Felims Portal
          </h1>
        </div>
      </div>

      <div className="relative h-fit w-full flex items-center mt-10">
        <div className="w-fit h-fit absolute mb-36 z-0">
          <Image
            className="mb-96 ml-80"
            src="/bird.png"
            alt="bird"
            width={180}
            height={500}
          />
        </div>
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
        <div className="h-96 w-1/2 mt-16 flex-col">
          <div className="ml-52 w-fit h-fit flex">
            <Image
              className="rounded-xl"
              src="/DuneFilmWelcome.jpg"
              alt="bird"
              width={180}
              height={100}
            />

            <Image
              className="ml-12 rounded-xl"
              src="/HungerGamesWelcome.jpg"
              alt="bird"
              width={180}
              height={100}
            />
          </div>
          <div className="flex justify-center mt-11">
            <Link href="/pages/favourites">
              <button className="bg-green-700 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
                Continue
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="mt-8 w-32 h-fit flex justify-evenly">
              <div className="w-6 h-6 bg-red-700 rounded-full"></div>
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
