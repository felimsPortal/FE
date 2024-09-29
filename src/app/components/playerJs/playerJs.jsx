import React, { useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

const PlayerJs = ({ backdropUrl, movieName }) => {
  const [movieUrl, setMovieUrl] = useState(null); // State to hold the movie URL
  const [isPlaying, setIsPlaying] = useState(false); // State to control playback
  const [errorMessage, setErrorMessage] = useState(""); // To display an error if something goes wrong

  // Function to handle fetching the downloaded movie by name
  const handlePlay = async () => {
    try {
      console.log("Fetching movie:", movieName);

      if (!movieName) {
        console.error("No movie name provided");
        setErrorMessage("No movie name provided.");
        return;
      }

      // Fetch the movie URL from the backend by movie name
      const response = await fetch(
        "http://localhost:3001/api/movie/list-files"
      );

      const data = await response.json();

      console.log("Files available on server:", data.files);

      // Search for the movie by name within the returned files
      const foundFile = data.files.find((file) =>
        file.toLowerCase().includes(movieName.toLowerCase())
      );

      if (!foundFile) {
        console.error("Movie not found");
        setErrorMessage("Movie not found.");
        return;
      }

      // Set the movie URL with the correct file path to play
      const moviePath = `http://localhost:3001/api/movie/play/${encodeURIComponent(
        foundFile
      )}`;

      setMovieUrl(moviePath);
      setIsPlaying(true); // Set playing state to true
      setErrorMessage(""); // Clear any existing errors
    } catch (error) {
      console.error("Error fetching movie:", error);
      setErrorMessage("Error fetching movie.");
    }
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black">
      {/* Display error if something goes wrong */}
      {errorMessage && <p className="text-white">{errorMessage}</p>}

      {/* Check if we have a movie URL to play */}
      {movieUrl ? (
        <ReactPlayer
          url={movieUrl} // The URL of the video file to play
          playing={isPlaying}
          controls
          width="100%"
          height="100%"
        />
      ) : (
        <div>
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt="Backdrop"
              className="w-full h-auto object-cover"
            />
          ) : (
            <p className="text-white">No backdrop available</p>
          )}

          {/* Overlayed Play button */}
          <div className="absolute inset-0 flex justify-center items-center">
            <button onClick={handlePlay}>
              <Image
                src="/Logo3.png" // The logo image to display as a play button
                alt="Play logo"
                width={180}
                height={75.47}
                className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerJs;

// import React, { useState } from "react";
// import Image from "next/image";
// import ReactPlayer from "react-player";

// const PlayerJs = ({ backdropUrl, movieName }) => {
//   // Update to accept movieName dynamically
//   const [movieUrl, setMovieUrl] = useState(null); // State to hold the movie URL
//   const [isPlaying, setIsPlaying] = useState(false); // State to control playback

//   // Function to handle fetching the downloaded movie by name
//   const handlePlay = async () => {
//     try {
//       console.log("Fetching movie:", movieName);

//       if (!movieName) {
//         console.error("No movie name provided");
//         return;
//       }

//       // Fetch the movie URL from the backend by movie name
//       const moviePath = `http://localhost:3001/api/movie/play/${encodeURIComponent(
//         movieName
//       )}`;

//       // Set the movie URL in state to play it in ReactPlayer
//       setMovieUrl(moviePath);
//       setIsPlaying(true); // Set playing state to true
//     } catch (error) {
//       console.error("Error fetching movie:", error);
//     }
//   };

//   return (
//     <div className="relative w-full h-full flex justify-center items-center bg-black">
//       {/* Check if we have a movie URL to play */}
//       {movieUrl ? (
//         <ReactPlayer
//           url={movieUrl} // The URL of the video file to play
//           playing={isPlaying}
//           controls
//           width="100%"
//           height="100%"
//         />
//       ) : (
//         <div>
//           {backdropUrl ? (
//             <img
//               src={backdropUrl}
//               alt="Backdrop"
//               className="w-full h-auto object-cover"
//             />
//           ) : (
//             <p className="text-white">No backdrop available</p>
//           )}

//           {/* Overlayed Play button */}
//           <div className="absolute inset-0 flex justify-center items-center">
//             <button onClick={handlePlay}>
//               <Image
//                 src="/Logo3.png" // The logo image to display as a play button
//                 alt="Play logo"
//                 width={180}
//                 height={75.47}
//                 className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
//               />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlayerJs;

// import React, { useState } from "react";
// import Image from "next/image";
// import ReactPlayer from "react-player";

// const PlayerJs = ({ backdropUrl, tmdbId }) => {
//   const [movieUrl, setMovieUrl] = useState(null); // State to hold the movie URL
//   const [isPlaying, setIsPlaying] = useState(false); // State to control playback

//   // Function to handle fetching the downloaded movie
//   const handlePlay = async () => {
//     try {
//       console.log("Fetching movie for TMDB ID:", tmdbId);

//       if (!tmdbId) {
//         console.error("No tmdbId provided");
//         return;
//       }

//       // Fetch the URL or path of the downloaded movie from your backend
//       const response = await fetch(
//         `http://localhost:3001/api/radar/movie/${tmdbId}`
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const videoPath = data.filePath; // Assuming your backend returns the file path as `filePath`

//         // Set the movie URL in state to play it in ReactPlayer
//         setMovieUrl(videoPath);
//         setIsPlaying(true); // Set playing state to true
//       } else {
//         console.error("Failed to fetch the movie path");
//       }
//     } catch (error) {
//       console.error("Error fetching movie:", error);
//     }
//   };

//   return (
//     <div className="relative w-full h-full flex justify-center items-center bg-black">
//       {/* Check if we have a movie URL to play */}
//       {movieUrl ? (
//         <ReactPlayer
//           url={movieUrl} // The URL of the video file to play
//           playing={isPlaying}
//           controls
//           width="100%"
//           height="100%"
//         />
//       ) : (
//         <div>
//           {backdropUrl ? (
//             <img
//               src={backdropUrl}
//               alt="Backdrop"
//               className="w-full h-auto object-cover"
//             />
//           ) : (
//             <p className="text-white">No backdrop available</p>
//           )}

//           {/* Overlayed Play button */}
//           <div className="absolute inset-0 flex justify-center items-center">
//             <button onClick={handlePlay}>
//               <Image
//                 src="/Logo3.png" // The logo image to display as a play button
//                 alt="Play logo"
//                 width={180}
//                 height={75.47}
//                 className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
//               />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlayerJs;

// import React from "react";
// import Image from "next/image";

// const PlayerJs = ({ backdropUrl, tmdbId }) => {
//   // Function to handle the image download
//   const handleDownload = async () => {
//     try {
//       // Log the tmdbId to ensure it's passed correctly
//       console.log("TMDB ID being sent:", tmdbId);

//       if (!tmdbId) {
//         console.error("No tmdbId provided");
//         return;
//       }

//       const response = await fetch("http://localhost:3001/api/radar/download", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ tmdbId }), // Send tmdbId in the request body
//       });

//       if (response.ok) {
//         console.log("Movie added to download queue");
//       } else {
//         const errorData = await response.json();
//         console.error("Error details:", errorData);
//         console.error("Failed to add movie to download queue");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="relative w-full h-full flex justify-center items-center bg-black">
//       {backdropUrl ? (
//         <img
//           src={backdropUrl}
//           alt="Backdrop"
//           className="w-full h-auto object-cover"
//         />
//       ) : (
//         <p className="text-white">No backdrop available</p>
//       )}

//       {/* Overlayed download button */}
//       <div className="absolute inset-0 flex justify-center items-center">
//         <button onClick={handleDownload}>
//           <Image
//             src="/Logo3.png" // The logo image to display
//             alt="Download logo"
//             width={180}
//             height={75.47}
//             className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlayerJs;
