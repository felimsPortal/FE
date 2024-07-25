import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar/navbar";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full h-full flex items-center">
        <div className="w-full mt-24 ">
          <Image
            className="rounded-md opacity-50"
            src="/landingPageCollage.png"
            alt="landing page img"
            width={1300}
            height={800}
          />
        </div>
        <div className="relative w-1/4 h-full flex items-center justify-center">
          <div className="transform -rotate-90 border-t-[380px] border-t-red-700 border-l-[256px] border-l-transparent border-r-[256px] border-r-transparent mt-28 opacity-45   "></div>
          <div className="w-72 h-2/3 bg-green-900  absolute rounded-tl-3xl rounded-br-3xl mt-24 ">
            <div className="w-full flex justify-center bg-pink-6">
              <h1 className="mt-8 text-gray-100 text-2xl">Sign In</h1>
            </div>
            <div className="flex justify-center">
              <input
                className="mt-12 text-center bg-transparent border-b-2 border-gray-600 z-50"
                type="text"
                placeholder="Username or email"
              />
            </div>
            <div className="flex justify-center">
              <input
                className="mt-10 text-center bg-transparent border-b-2 border-gray-600 z-50"
                type="text"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-center mt-16">
              <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500">
                Go to Felims
              </button>
            </div>
            <div className="mt-10 ml-8 flex">
              <input type="checkbox" name="rememberMe" id="" className="z-50" />
              <div className="ml-1  text-xs ">Remember me</div>
              <Link className="ml-4 text-xs cursor-pointer z-50" href="#">
                Forgot Password?
              </Link>
            </div>
            {/* <div className="text-sm mt-6 flex justify-center ">
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
            </div> */}
            <div className="text-lg  mt-12 flex justify-center">
              New to Felims?
              <Link
                href="pages/signUp"
                className="ml-2 font-extrabold underline"
              >
                Get started
              </Link>
            </div>
          </div>
          {/* <div className="absolute mb-36">
          <Image
            className="mb-96 ml-36"
            src="/bird.png"
            alt="bird"
            width={180}
            height={500}
          />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
