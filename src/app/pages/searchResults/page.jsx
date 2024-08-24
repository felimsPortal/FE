"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    // Retrieve and parse the results from localStorage
    const moviesStored = localStorage.getItem("movies");
    const tvShowsStored = localStorage.getItem("tvShows");

    if (moviesStored) {
      setMovies(JSON.parse(moviesStored));
    } else {
      console.log("No movies found in localStorage");
    }

    if (tvShowsStored) {
      setTvShows(JSON.parse(tvShowsStored));
    } else {
      console.log("No TV shows found in localStorage");
    }
  }, []);

  return (
    <div>
      <h1>Search Results for &quot;{query}&quot;</h1>
      <div>
        <h2>Movies</h2>
        <ul>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li key={movie.id}>
                <img src={movie.poster_path} alt={movie.title} />
                {/* <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p> */}
              </li>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </ul>
      </div>
      <div>
        <h2>TV Shows</h2>
        <ul>
          {tvShows.length > 0 ? (
            tvShows.map((tvShow) => (
              <li key={tvShow.id}>
                <img src={tvShow.poster_path} alt={tvShow.title} />
                {/* <h3>{tvShow.title}</h3>
                <p>{tvShow.overview}</p>
                <p>First Air Date: {tvShow.release_date}</p>
                <p>Rating: {tvShow.vote_average}</p> */}
              </li>
            ))
          ) : (
            <p>No TV shows found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
