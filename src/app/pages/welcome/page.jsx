import Image from "next/image";
import Link from "next/link";
import { Fjalla_One } from "next/font/google";

const Fjalla = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const Welcome = () => {
  return (
    <div className="w-screen h-screen">
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
      <div className="relative w-full h-5/6 flex items-center justify-center">
        <Image
          className="opacity-20"
          src="/welcomeCollage.png"
          alt="Welcome Image"
          width={1450}
          height={200}
        />
        <div className="absolute flex flex-col justify-center items-center w-full h-full px-5">
          <div className="absolute w-2/3 h-1/2 bg-green-800   blur-3xl opacity-100 rounded-tl-3xl rounded-br-3xl -z-10"></div>
          <div className={Fjalla.className}>
            <h1 className="text-7xl text-center tracking-wide">
              Welcome to the Felims Portal
            </h1>
            <h1 className="text-2xl text-center mt-6 tracking-wider">
              Watch your favourite Felims Online in HD
            </h1>
            <h1 className="text-2xl text-center mt-6 tracking-wider">
              50% of your subscriptions are treated as donations supporting
              families listed in Project Olive Branch
            </h1>
          </div>
          <Link href="/pages/favourites">
            <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500 mt-12">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
