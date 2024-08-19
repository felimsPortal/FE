"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/footer/footer";
import Languages from "@/app/components/lanuages/languages";
import Genres from "@/app/components/genres/genres";

const Profile = () => {
  const [currentSection, setCurrentSection] = useState(0);

  //   const handleNextClick = () => {
  //     setCurrentSection((prevSection) => prevSection + 1);
  //   };

  const handlePreviousClick = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  const handleFinishClick = async () => {
    await fetchMovies(); // Fetch the movies based on user's selections
    try {
      const response = await fetch(
        `http://localhost:3001/api/userdata/${formData.userId}/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movies }),
        }
      );

      if (response.ok) {
        window.location.href = "/pages/portalUnsubscribed";
      } else {
        console.error("Failed to save movies");
      }
    } catch (error) {
      console.error("An error occurred while saving movies:", error);
    }
  };
  //   const handleFinishClick = async () => {
  //     await fetchMovies();
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/api/userdata/${formData.userId}/movies`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ movies }),
  //         }
  //       );

  //       if (response.ok) {
  //         window.location.href = "/pages/portalUnsubscribed";
  //       } else {
  //         console.error("Failed to save movies");
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while saving movies:", error);
  //     }
  //   };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="w-screen h-screen">
        <div className="w-full h-5/6 flex flex-col items-center justify-center ">
          <div className="border-b-4 border-red-900 w-full h-full flex item justify-center py-5">
            <h1 className="text-5xl font-bold mt-5">Create Your Felim List</h1>
          </div>

          <div className="w-full h-5/6 flex items-center justify-center p-4">
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
            <div className="relative w-2/3 h-2/3 mt-28 overflow-hidden py-4 rounded-lg mr-28 ">
              <div className="absolute inset-0 w-full h-full blur-3xl   bg-green-700 opacity-40 "></div>

              {/* Regions Section */}
              {currentSection === 0 && (
                <div className="w-full h-full overflow-hidden py-4 rounded-lg mr-28 z-10">
                  <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform transform duration-700">
                    <h1 className="text-3xl">REGIONS</h1>
                    <div className="w-full flex items-center justify-around h-2/3">
                      <div className="w-full h-full flex justify-center items-center text-xl">
                        <h1 className="mr-5">Middle East</h1>
                        <input
                          type="checkbox"
                          className="w-8 h-8  rounded-3xl shadow-sm shadow-gray-500 accent-red-900"
                        />
                      </div>
                      <div className="w-full h-full flex justify-center items-center text-xl">
                        <h1 className="mr-5">Far East</h1>
                        <input type="checkbox" className="w-8 h-8" />
                      </div>
                      <div className="w-full h-full flex justify-center items-center text-xl">
                        <h1 className="mr-5">Western</h1>
                        <input type="checkbox" className="w-8 h-8" />
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentSection(1)}
                      className="bg-gray-900 w-40 h-12 rounded-lg mt-12"
                    >
                      Next
                    </button>
                    {/* <button
                      onClick={handleNextClick}
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500 mt-12"
                    >
                      Next
                    </button> */}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {currentSection === 1 && (
                <div className="w-full h-full flex flex-col items-center justify-center transition-transform transform duration-700">
                  <h1 className="text-3xl mt-10">LANGUAGES</h1>
                  <h1 className="text-sm mt-5">
                    You can choose upto 3 languages
                  </h1>

                  <div className="w-full h-full flex items-center justify-around">
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Languages />
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Languages />
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Languages />
                    </div>
                  </div>
                  <div className="flex justify-between w-2/3 h-fit mb-5">
                    <button
                      onClick={handlePreviousClick}
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500 mt-12"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentSection(2)}
                      className="bg-gray-900 w-40 h-12 rounded-lg mt-12"
                    >
                      Next
                    </button>
                    {/* <button
                      onClick={handleNextClick}
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500 mt-12"
                    >
                      Next
                    </button> */}
                  </div>
                </div>
              )}

              {/* Genres Section */}
              {currentSection === 2 && (
                <div className="w-full h-full flex flex-col items-center justify-center transition-transform transform duration-700">
                  <h1 className="text-3xl mt-10">GENRES</h1>
                  <h1 className="text-sm mt-5">Choose 3 geners</h1>
                  <div className="w-full h-full flex items-center justify-around">
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Genres />
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Genres />
                    </div>
                    <div className="w-1/3 h-full flex flex-col items-center justify-around">
                      <Genres />
                    </div>
                  </div>
                  <div className="flex justify-between w-2/3 h-fit mb-5">
                    <button
                      onClick={handlePreviousClick}
                      className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500 mt-12"
                    >
                      Previous
                    </button>
                    <Link href="/pages/portalUnsubscribed">
                      <button
                        onClick={handleFinishClick}
                        className="bg-gray-900 w-40 h-12 rounded-lg mt-12"
                      >
                        Finish
                      </button>
                      {/* <button className="bg-gray-900 w-40 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer  border border-red-500 mt-12">
                        Finish
                      </button> */}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </form>
  );
};

export default Profile;
