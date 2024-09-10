"use client"; // For client-side hooks
import { useSearchParams } from "next/navigation"; // Hook to access URL query parameters
import { useEffect, useState } from "react";
import axios from "axios";
import { Odibee_Sans } from "next/font/google";

const Odibee = Odibee_Sans({
  weight: "400",
  subsets: ["latin"],
});

const Seasons = () => {
  const searchParams = useSearchParams();
  const tvShowId = searchParams.get("tvShowId"); // Get the tvShowId from the query params
  const [tvShowDetails, setTvShowDetails] = useState(null); // To store TV show and season details
  const [episodes, setEpisodes] = useState([]); // To store episodes for the selected season
  const [loading, setLoading] = useState(true);

  // Fetch TV show details
  useEffect(() => {
    const fetchSeasons = async () => {
      if (tvShowId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/tvshows/${tvShowId}`
          );
          setTvShowDetails(response.data); // Store TV show details in state

          // Automatically fetch episodes for the first season after fetching the TV show
          if (response.data.seasons && response.data.seasons.length > 0) {
            fetchEpisodes(response.data.seasons[0].season_number);
          }
          setLoading(false);
          console.log("TV Show Details:", response.data); // Log TV show details
        } catch (error) {
          console.error("Error fetching TV show seasons:", error);
        }
      }
    };
    fetchSeasons();
  }, [tvShowId]);

  // Fetch episodes for the selected season
  const fetchEpisodes = async (seasonNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/tvshows/${tvShowId}/season/${seasonNumber}`
      );
      setEpisodes(response.data.episodes); // Set episodes of the selected season
      console.log(
        `Episodes for Season ${seasonNumber}:`,
        response.data.episodes
      ); // Log the episodes
    } catch (error) {
      console.error("Error fetching season episodes:", error);
    }
  };

  const downloadEpisode = async (showId, seasonNumber, episodeNumber) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/sonar/download-episode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ showId, seasonNumber, episodeNumber }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Episode download initiated successfully!");
      } else {
        console.error("Error initiating download:", data.error);
      }
    } catch (error) {
      console.error("Failed to download episode:", error);
    }
  };

  const handleEpisodeClick = (episode) => {
    const episodeId = episode.id;
    const seasonNumber = episode.season_number;
    const episodeNumber = episode.episode_number;

    console.log("TMDB Episode ID:", episodeId);
    console.log("Episode Details:", episode);

    // Initiate download by calling downloadEpisode
    downloadEpisode(tvShowId, seasonNumber, episodeNumber);
  };
  // Log episode details when an episode button is clicked
  //   const handleEpisodeClick = (episode) => {
  //     const tmdbId = episode.id;
  //     console.log("TMDB Episode ID:", tmdbId);
  //     console.log("Episode Details:", episode);

  //     console.log("handle episode click");
  //   };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  if (!tvShowDetails) {
    return <p>No TV show details found.</p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col ">
      {/* Purple Div */}
      <div className="h-1/2 w-full bg-purple-800"></div>

      {/* List of seasons */}
      <div className="w-full h-1/2 ">
        {tvShowDetails.seasons.map((season) => (
          <div key={season.id} className="w-full p-4 h-full flex ">
            <img
              src={season.poster_path}
              alt={season.name}
              className="cursor-pointer"
            />
            <div className="w-1/2 h-full p-8">
              <h1 className={`text-6xl ${Odibee.className}`}>
                {tvShowDetails.name}
              </h1>
              <br />
              <hr />
              <br />
              <p>{tvShowDetails.overview}</p>
              <br />
              <p>Air Date: {season.air_date}</p>
            </div>

            {/* Green Div (to hold episode buttons wrapped with images or air dates) */}
            <div className="w-full grid grid-cols-4 overflow-scroll">
              {episodes.length > 0 ? (
                episodes.map((episode) => (
                  <button
                    key={episode.id}
                    className="m-2"
                    onClick={() => handleEpisodeClick(episode)} // Log episode details on click
                    disabled={!episode.still_path} // Disable if still_path is not available
                  >
                    {/* Display air date if no still_path is available */}
                    {episode.still_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} // Display still_path image
                        alt={`Episode ${episode.episode_number}`}
                        className="w-48 h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="w-48 h-32 flex items-center justify-center bg-gray-300 rounded">
                        <p>{episode.air_date}</p> {/* Show air date */}
                      </div>
                    )}
                    <p>Episode {episode.episode_number}</p>{" "}
                    {/* Episode number */}
                  </button>
                ))
              ) : (
                <p>No episodes available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons;
