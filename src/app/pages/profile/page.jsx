"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/app/components/footer/footer";
import Languages from "@/app/components/lanuages/languages";
import Genres from "@/app/components/genres/genres";
import { useFormContext } from "../../context/FormContext";
import { Fjalla_One } from "next/font/google";
import { ToastContainer, Zoom } from "react-toastify";
import { useRouter } from "next/navigation";

const Fjalla = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const Profile = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { formData } = useFormContext();
  const router = useRouter();

  const handleGenreChange = (newSelectedGenres) => {
    console.log("Updated Genres State:", newSelectedGenres);
    setSelectedGenres(newSelectedGenres);
  };

  const handleNextClick = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };
  const handlePreviousClick = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: formData.userId,
          languages: selectedLanguages,
          genres: selectedGenres,
        }),
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      router.push("/pages/portalUnsubscribed");
    } catch (error) {
      console.error("Error saving movie preferences:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-screen h-screen">
        <div className="w-full h-5/6 flex flex-col items-center justify-center ">
          <div className="border-b-4 border-red-900 w-full h-full flex item justify-center py-5">
            <div
              className={`h-full w-full flex item justify-center ${Fjalla.className}`}
            >
              <h1 className="text-5xl font-bold mt-5 tracking-widest ">
                Create Your Felim List
              </h1>
            </div>
          </div>

          <div className="w-full h-5/6 flex items-center justify-center p-4 ">
            <div className="w-1/2 h-full flex items-center justify-center ">
              <Image
                src="/handala.jpg"
                alt="handala"
                width={250}
                height={250}
                className="w-3/5 mt-28"
              />
            </div>
            {/* Profile container */}
            <div className="relative w-2/3 h-full mt-40 py-4 rounded-lg mr-28">
              <div className="absolute inset-0 w-full h-full blur-3xl bg-green-700  opacity-40 "></div>

              {/* Languages Section */}
              {currentSection === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center transition-transform transform duration-700">
                  <div className="w-full h-1/3 flex flex-col items-center justify-center ">
                    <div
                      className={`h-full w-full flex flex-col items-center justify-center ${Fjalla.className}`}
                    >
                      <h1 className="text-4xl tracking-wider ">LANGUAGES</h1>
                      <h1 className="text-2xl mt-5 tracking-wider">
                        You can choose from 1 - 3 languages
                      </h1>
                    </div>
                  </div>

                  <div className="w-full h-1/3 flex items-center justify-around ">
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Languages
                        selectedValues={selectedLanguages}
                        onChange={setSelectedLanguages}
                      />
                      <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition={Zoom}
                      />
                    </div>
                  </div>
                  <div className="w-full h-1/3 flex justify-center items-center">
                    <button
                      onClick={handleNextClick}
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Genres Section */}
              {currentSection === 1 && (
                <div className="w-full h-full flex flex-col items-center justify-center transition-transform transform duration-700">
                  <div className="w-full h-1/3 flex flex-col items-center justify-center ">
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center ${Fjalla.className}`}
                    >
                      <h1 className="text-4xl tracking-wider">GENRES</h1>
                      <h1 className="text-2xl mt-5 tracking-wider">
                        Choose from 1 - 3 genres
                      </h1>
                    </div>
                  </div>

                  <div className="w-full h-1/3  flex items-center justify-around">
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Genres
                        selectedValues={selectedGenres}
                        onChange={handleGenreChange}
                      />
                      <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition={Zoom}
                      />
                    </div>
                  </div>
                  <div className="flex justify-around items-center  w-2/3  h-1/3">
                    <button
                      onClick={handlePreviousClick}
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500"
                    >
                      Previous
                    </button>

                    <button
                      type="submit"
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500"
                    >
                      Finish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </form>
  );
};

export default Profile;
