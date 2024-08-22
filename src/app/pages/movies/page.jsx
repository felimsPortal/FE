"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import EmblaCarousel from "../../components/carousel/carousel";
import MovieModal from "../../components/modal/modal";
import { useFormContext } from "../../context/FormContext";
import { useMovies } from "../../context/MovieContext.js";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formData } = useFormContext();
  const { userId } = formData;
  const { movies, totalPages, page, setPage, fetchMovies } = useMovies();

  useEffect(() => {
    if (userId) {
      fetchMovies(userId, page);
    }
  }, [userId, page, fetchMovies]);

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

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
      <div className="w-full h-full p-4">
        <h1 className="text-2xl font-bold mt-36">Movies</h1>
        <EmblaCarousel
          slides={movies.map((movie) => movie.poster_path)}
          options={{ loop: true }}
          onSlideClick={(index) => openModal(movies[index])}
        />

        {page < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}

        {selectedMovie && (
          <MovieModal
            isOpen={isModalOpen}
            onClose={closeModal}
            movie={selectedMovie}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;

// import Navbar from "../../components/navbar/navbar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useFormContext } from "../../context/FormContext";
// import EmblaCarousel from "../../components/carousel/carousel";
// import MovieModal from "../../components/modal/modal";

// const Movies = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [page, setPage] = useState(1);
//   const [movies, setMovies] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { formData } = useFormContext();
//   const { userId } = formData;

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

//   const fetchMovies = async (userId, pageNumber) => {
//     console.log("fetchMovies called");
//     if (!userId || pageNumber === undefined) {
//       console.error("User ID or Page number is undefined");
//       return;
//     }
//     try {
//       const url = `http://localhost:3001/api/movies/${userId}`;
//       const response = await axios.get(url, {
//         params: {
//           page: pageNumber,
//           page_size: 20,
//         },
//       });

//       const movieData = response.data.movies.map((movie) => ({
//         id: movie.id,
//         title: movie.title,
//         overview: movie.overview,
//         release_date: movie.release_date,
//         vote_average: movie.vote_average,
//         original_language: movie.original_language,
//         poster_path: movie.poster_path,
//       }));

//       setMovies((prevMovies) => {
//         const existingIds = new Set(prevMovies.map((movie) => movie.id));
//         const newMovies = movieData.filter(
//           (movie) => !existingIds.has(movie.id)
//         );
//         return [...prevMovies, ...newMovies];
//       });
//       setTotalPages(response.data.total_pages);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchMovies(userId, page);
//       console.log("Current page:", page);
//       console.log("Total pages:", totalPages);
//     }
//   }, [userId, page]);

//   const openModal = (movie) => {
//     setSelectedMovie(movie);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedMovie(null);
//   };
//   const loadMoreMovies = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

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
//       <div className="w-full h-full p-4">
//         <h1 className="text-2xl font-bold mt-36">Movies</h1>
//         <EmblaCarousel
//           slides={movies.map((movie) => movie.poster_path)}
//           options={{ loop: true }}
//           onSlideClick={(index) => openModal(movies[index])}
//         />

//         {page < totalPages && (
//           <button
//             onClick={loadMoreMovies}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Load More
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Movies;
