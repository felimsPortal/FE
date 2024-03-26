import Link from "next/link";
import Image from "next/image";
import { FaHome, FaFilter, FaSearch, FaHeart } from "react-icons/fa";

const Portal = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
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
      <div className="h-full w-28 bg-red-800">
        <div className="h-2/3 flex flex-col items-center justify-evenly">
          <Link href="/portalSubscribed">
            <FaHome size={80} />
          </Link>
          <Link href="/portalSubscribed">
            <FaFilter size={80} />
          </Link>
          <Link href="/portalSubscribed">
            <FaSearch size={80} />
          </Link>
          <Link href="/portalSubscribed">
            <FaHeart size={80} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portal;
