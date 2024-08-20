"use client";
import Navbar from "@/app/components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchMovies = async (pageNumber) => {
    try {
      const response = await axios.get("http://localhost:3001/api/movies", {
        params: {
          page: pageNumber,
          page_size: 20,
        },
      });

      // Remove duplicates before setting state
      setMovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map((movie) => movie.id));
        const newMovies = response.data.movies.filter(
          (movie) => !existingIds.has(movie.id)
        );
        return [...prevMovies, ...newMovies];
      });
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(page);
    console.log("Current page:", page);
    console.log("Total pages:", totalPages);
  }, [page]);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url(${movie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                aspectRatio: "2/3",
              }}
            >
              <p className="absolute bottom-0 left-0 w-full text-center text-white font-bold bg-black bg-opacity-50 p-2">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
        {page < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Movies;

// "use client";
// import Navbar from "@/app/components/navbar/navbar";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Movies = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   // const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

// const fetchMovies = async (page) => {
//   setLoading(true);
//   try {
//     const response = await axios.get("http://localhost:3001/api/movies", {
//       params: { page: page, page_size: 20 },
//     });
//     setMovies((prevMovies) => [...prevMovies, ...response.data.movies]);
//     setTotalPages(response.data.total_pages);
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//   }
//   setLoading(false);
// };

// const fetchMovies = async (pageNumber) => {
//   try {
//     const response = await axios.get("http://localhost:3001/api/movies", {
//       params: {
//         page: pageNumber,
//         page_size: 20,
//       },
//     });

//     // Remove duplicates before setting state
//     setMovies((prevMovies) => {
//       const existingIds = new Set(prevMovies.map((movie) => movie.id));
//       const newMovies = response.data.movies.filter(
//         (movie) => !existingIds.has(movie.id)
//       );
//       return [...prevMovies, ...newMovies];
//     });
//     setTotalPages(response.data.total_pages);
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//   }
// };

// useEffect(() => {
//   fetchMovies(page);
// }, [page]);
//         useEffect(() => {

//   fetchMovies(currentPage);
// }, [currentPage]);

// const loadMoreMovies = () => {
//   if (currentPage < totalPages) {
//     setCurrentPage((prevPage) => prevPage + 1);
//   }
// };
// useEffect(() => {
//   const handleScroll = () => {
//     const scrollTop = window.scrollY;
//     setIsScrolled(scrollTop > 0);
//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

// useEffect(() => {
//   const fetchMovies = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/movies");
//       setMovies(response.data);
//     } catch (error) {
//       console.error("error fetching movies", error);
//     }
//   };
//   fetchMovies();
// }, []);

// return (
//   <div className="w-screen h-screen">
//     <div
//       className={`fixed w-full h-32 z-10 transition-opacity ${
//         isScrolled ? "bg-gradient-to-b from-black to-black" : "bg-transparent"
//       }`}
//       style={{
//         background: isScrolled
//           ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))"
//           : "transparent",
//       }}
//     >
//       <Navbar />
//     </div>
{
  /* <div className="w-full h-full p-4 ">
        <h1 className="text-2xl font-bold mt-36 ">Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url(${movie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                aspectRatio: "2/3",
              }}
            >
              <p className="absolute bottom-0 left-0 w-full text-center text-white font-bold bg-black bg-opacity-50 p-2">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
        {page < totalPages && (
          <button
            onClick={loadMoreMovies}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        )} */
}
{
  /* {loading && <p>Loading...</p>}
        <button
          onClick={loadMoreMovies}
          disabled={currentPage >= totalPages}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Loading..." : "Next"}
        </button> */
}
// </div>

{
  /* <div className="w-full h-full p-4 ">
        <h1 className="text-2xl font-bold mt-36 ">Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url(${movie.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                aspectRatio: "2/3",
              }}
            >
              <p className="absolute bottom-0 left-0 w-full text-center text-white font-bold bg-black bg-opacity-50 p-2">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div> */
}
// </div>
// );
// };

// export default Movies;
