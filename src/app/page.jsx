"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAuth } from "./context/AuthContext";
import { useState } from "react";
import Footer from "./components/footer/footer";

const Home = () => {
  const router = useRouter();
  const { signIn } = UserAuth();
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogInData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const userEmail = logInData.email.trim();

    if (userEmail === "") {
      console.log("email is required");
      alert("email is required");
      return;
    } else if (!userEmail.includes("@")) {
      console.log("email is invalid");
      alert("email is invalid");
      return;
    }
    try {
      const userCredential = await signIn(logInData.email, logInData.password);

      if (!userCredential || !userCredential.user) {
        throw new Error("User sign-in failed or userCredential is undefined");
      }

      const firebase_uid = userCredential.user.uid;
      console.log("Firebase UID in Login Page:", firebase_uid);

      const response = await fetch(
        `http://localhost:3001/api/userdata/${firebase_uid}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log("User data fetched:", userData);

      const { moviePreferences } = userData;

      if (
        moviePreferences.languages.length === 0 ||
        moviePreferences.genres.length === 0
      ) {
        router.push("/pages/profile");
      } else if (userData.subscribed) {
        router.push("/pages/portalSubscribed");
      } else {
        router.push("/pages/portalUnsubscribed");
      }
    } catch (error) {
      console.log(error);
      alert("Email or password is incorrect");
    }
  };

  return (
    <div className="relative w-screen h-screen">
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
      <div className=" w-full h-5/6 flex items-center">
        <div className="w-full">
          <Image
            className="rounded-md opacity-50 mb-2"
            src="/landingPageCollage.png"
            alt="landing page img"
            width={1300}
            height={800}
            priority={true}
          />
        </div>
        <div className="relative w-1/4 h-full flex items-center justify-center">
          <div className="transform -rotate-90 border-t-[380px] border-t-red-700 border-l-[256px] border-l-transparent border-r-[256px] border-r-transparent opacity-45   "></div>
          <div className=" w-72 h-3/4 bg-green-900  absolute rounded-tl-3xl rounded-br-3xl">
            <div className="w-full flex justify-center bg-pink-6">
              <h1 className="mt-8 text-gray-100 text-2xl">Sign In</h1>
            </div>
            <div className="flex justify-center">
              <input
                className="mt-12 text-center bg-transparent border-b-2 border-gray-600 z-50"
                id="email"
                type="email"
                name="email"
                value={logInData.email}
                onChange={handleChange}
                placeholder="Username or email"
              />
            </div>
            <div className="flex justify-center">
              <input
                className="mt-10 text-center bg-transparent border-b-2 border-gray-600 z-50"
                id="password"
                type="password"
                name="password"
                value={logInData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="flex justify-center mt-16">
              <button
                className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50  border border-red-500"
                onClick={handleSignIn}
              >
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
