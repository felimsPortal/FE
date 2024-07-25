import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar/navbar";
import { Fjalla_One } from "next/font/google";

const Fjalla = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const Welcome = () => {
  return (
    <div className="w-screen h-screen">
      <div className="h-1/6">
        <Navbar />
      </div>
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
              Subscriptions are treated as donations for the Palestine Children
              Fund
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
