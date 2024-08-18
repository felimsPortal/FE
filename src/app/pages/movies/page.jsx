"use client";
import Navbar from "@/app/components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

// const cardColors = [
//   { color: "bg-blue-500", label: "Blue" },
//   { color: "bg-yellow-500", label: "Yellow" },
//   { color: "bg-green-500", label: "Green" },
//   { color: "bg-pink-500", label: "Pink" },
// ];
const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("error fetching movies", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div
        className={`fixed w-full h-32 z-10 transition-opacity ${
          isScrolled ? "bg-gradient-to-b from-black to-black" : "bg-transparent"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))"
            : "transparent",
        }}
      >
        <Navbar />
      </div>

      <div className="w-full h-full p-4 bg-purple-700">
        <h1 className="text-2xl font-bold mt-36 bg-red-800 ">Movies</h1>
        <div className="w-full h-full grid grid-cols-4 gap-6 bg-orange-600">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-gray-800"
              style={{ backgroundImage: `url(${movie.poster_path})` }}
            >
              <p className="text-white font-bold bg-black bg-opacity-50 p-2">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;

// import Footer from "@/app/components/footer/footer";
// import Navbar from "@/app/components/navbar/navbar";
// import { useEffect, useState } from "react";

// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsScrolled(scrollTop > 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:3001/api/movies")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMovies(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="w-screen h-screen">
//       <div
//         className={`fixed w-full h-32 z-10 transition-opacity ${
//           isScrolled ? "bg-gradient-to-b from-black to-black" : "bg-transparent"
//         }`}
//         style={{
//           background: isScrolled
//             ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))"
//             : "transparent",
//         }}
//       >
//         <Navbar />
//       </div>
// <div className="p-4">
//   <h1 className="text-2xl font-bold mt-36">Movies</h1>

//   <div className="grid grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <div key={movie.id} className="relative rounded-lg shadow-lg">
//               <img
//                 src={`http://localhost:3001${movie.poster}`}
//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-green-800 bg-opacity-98 flex flex-col justify-around items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
//                 <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
//                 <h2 className="text-sm text-black font-semibold mb-2">
//                   {movie.synopsis}
//                 </h2>
//                 <p className="mb-2">
//                   Release Date:{" "}
//                   {new Date(movie.releaseDate).toLocaleDateString()}
//                 </p>
//                 <p className="mb-2">Genres: {movie.genres.join(", ")}</p>
//                 <div className="w-full flex justify-center">
//                   <button className="bg-gray-900 w-32 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
//                     <a
//                       href={`http://localhost:3001${movie.movie}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Watch
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Movies;

// "use client";
// import Footer from "@/app/components/footer/footer";
// import Navbar from "@/app/components/navbar/navbar";
// import { useEffect, useState, useCallback } from "react";

// const Movies = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [currentMovie, setCurrentMovie] = useState(null);

//   const openModal = (movie) => {
//     setCurrentMovie(movie);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentMovie(null);
//   };

//   // Close the modal when clicking outside of it
//   const handleOutsideClick = useCallback((event) => {
//     if (event.target.classList.contains("modal-overlay")) {
//       closeModal();
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsScrolled(scrollTop > 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:3001/api/movies")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMovies(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const extractYouTubeVideoId = (url) => {
//     const regex =
//       /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="w-screen h-screen">
//       <div
//         className={`fixed w-full h-32 z-10 transition-opacity ${
//           isScrolled ? "bg-gradient-to-b from-black to-black" : "bg-transparent"
//         }`}
//         style={{
//           background: isScrolled
//             ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))"
//             : "transparent",
//         }}
//       >
//         <Navbar />
//       </div>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mt-36">Movies</h1>

//         <div className="grid grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <div key={movie.id} className="relative rounded-lg shadow-lg">
//               <img
//                 src={`http://localhost:3001${movie.poster}`}
//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-green-800 bg-opacity-98 flex flex-col justify-around items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
//                 <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
//                 <h2 className="text-sm text-black font-semibold mb-2">
//                   {movie.synopsis}
//                 </h2>
//                 <p className="mb-2">
//                   Release Date:{" "}
//                   {new Date(movie.releaseDate).toLocaleDateString()}
//                 </p>
//                 <p className="mb-2">Genres: {movie.genres.join(", ")}</p>
//                 <div className="w-full flex justify-between">
//                   <button
//                     onClick={() => openModal(movie)}
//                     className="bg-gray-900 w-32 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500"
//                   >
//                     Trailer
//                   </button>
//                   <button className="bg-gray-900 w-32 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
//                     <a
//                       href={`http://localhost:3001${movie.movie}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Watch
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {isModalOpen && currentMovie && (
//           <div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 modal-overlay"
//             onClick={handleOutsideClick}
//           >
//             <div className="relative bg-black rounded-lg overflow-hidden w-11/12 max-w-3xl h-[0vh]">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-2 right-2  text-5xl font-bold cursor-pointer text-white"
//               >
//                 ×
//               </button>
//               <iframe
//                 className="py-12"
//                 width="100%"
//                 height="100%"
//                 src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
//                   currentMovie.trailerLink
//                 )}?autoplay=1`}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Movies;

// "use client";
// import Footer from "@/app/components/footer/footer";
// import Navbar from "@/app/components/navbar/navbar";
// import { useEffect, useState } from "react";

// const Movies = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [currentMovie, setCurrentMovie] = useState(null); // Track the current movie for modal

//   const openModal = (movie) => {
//     setCurrentMovie(movie);
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentMovie(null);
//   };
//   const handleOutsideClick = useCallback((event) => {
//     if (event.target.classList.contains('modal-overlay')) {
//       closeModal();
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       setIsScrolled(scrollTop > 0);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     // Fetch data from the backend
//     fetch("http://localhost:3001/api/movies")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMovies(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const extractYouTubeVideoId = (url) => {
//     const regex =
//       /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="w-screen h-screen">
//       <div
//         className={`fixed w-full h-32 z-10 transition-opacity ${
//           isScrolled ? "bg-gradient-to-b from-black to-black" : "bg-transparent"
//         }`}
//         style={{
//           background: isScrolled
//             ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))"
//             : "transparent",
//         }}
//       >
//         <Navbar />
//       </div>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mt-36">Movies</h1>

//         <div className="grid grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <div
//               key={movie.id}
//               className="relative border rounded-lg shadow-lg"
//             >
//               <img
//                 src={`http://localhost:3001${movie.poster}`}
//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-green-800 bg-opacity-98 flex flex-col justify-around items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
//                 <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
//                 <h2 className="text-sm text-black font-semibold mb-2">
//                   {movie.synopsis}
//                 </h2>
//                 <p className="mb-2">
//                   Release Date:{" "}
//                   {new Date(movie.releaseDate).toLocaleDateString()}
//                 </p>
//                 <p className="mb-2">Genres: {movie.genres.join(", ")}</p>
//                 <div className="w-full flex justify-between">
//                   <button
//                     onClick={() => openModal(movie)}
//                     className="bg-gray-900 w-32 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500"
//                   >
//                     Trailer
//                   </button>
//                   <button className="bg-gray-900 w-32 h-12 rounded-lg shadow-sm shadow-gray-500 cursor-pointer z-50 border border-red-500">
//                     <a
//                       href={`http://localhost:3001${movie.movie}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Watch
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {isModalOpen && currentMovie && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
//             <div className="relative bg-white rounded-lg overflow-hidden w-11/12 max-w-3xl">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-2 right-2 text-black text-2xl font-bold cursor-pointer"
//                 onClick={handleOutsideClick}
//               >
//                 ×
//               </button>
//               <iframe
//                 width="100%"
//                 height="100%"
//                 src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
//                   currentMovie.trailerLink
//                 )}?autoplay=1`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Movies;
