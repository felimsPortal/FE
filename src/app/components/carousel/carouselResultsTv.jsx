"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getGenreNames } from "../genres/genres";
import { getLanguageNames } from "../lanuages/languages";
import { DotButton, useDotButton } from "./emblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./emblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { FcLike, FcBookmark } from "react-icons/fc";

const EmblaCarouselResultsTv = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [currentTvShows, setCurrentTvShows] = useState([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    5
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  useEffect(() => {
    const fetchAndSetTvShows = async () => {
      const tvShowsStored = localStorage.getItem("tvShows");

      if (tvShowsStored) {
        const parsedTvShowsData = JSON.parse(tvShowsStored);

        if (parsedTvShowsData && Array.isArray(parsedTvShowsData.results)) {
          let allSeasons = [];

          parsedTvShowsData.results.forEach((tvShow) => {
            console.log(`Full TV data:`, tvShow);
            const genres = getGenreNames(tvShow.genre_ids || []);
            const languages = getLanguageNames([tvShow.original_language]);

            // Iterate through each season of the TV show
            tvShow.seasons.forEach((season) => {
              allSeasons.push({
                title: `${tvShow.name} - ${season.name}`,
                original_language: languages.join(", "),
                vote_average: season.vote_average || tvShow.vote_average,
                release_date: season.air_date || tvShow.first_air_date,
                genres: genres,
                overview: season.overview || tvShow.overview,
                src: `https://image.tmdb.org/t/p/w500${season.poster_path}`,
                seasonNumber: season.season_number,
                episode_count: season.episode_count,
              });
            });
          });

          setCurrentTvShows(allSeasons);
        } else {
          console.error(
            "TV shows data structure is not as expected:",
            parsedTvShowsData
          );
          setCurrentTvShows([]); // Ensure that the component handles the empty state
        }
      } else {
        console.log("No TV shows found in localStorage");
      }
    };

    fetchAndSetTvShows();
  }, []);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {currentTvShows.map((tvShow, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={tvShow.src}
                alt={`Slide ${index + 1}`}
                className="embla__slide__img rounded-xl"
              />
              <div className="embla__slide__overlay flex flex-col">
                <div className="w-full flex justify-evenly items-center mt-10">
                  <Image
                    src="/Logo3.png"
                    alt="logo"
                    width={50}
                    height={75.47}
                    className="transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                  />
                  <div className="transform transition-transform duration-300 hover:scale-150 cursor-pointer">
                    <FcBookmark size={40} />
                  </div>
                  <div className="transform transition-transform duration-300 hover:scale-150 cursor-pointer">
                    <FcLike size={43} />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xl text-center">{tvShow.title}</p>
                  <br />
                  <p>Language: {tvShow.original_language}</p>
                  <p>Avg vote: {tvShow.vote_average}</p>
                  <p>Release Date: {tvShow.release_date}</p>
                  <p>Genres: {tvShow.genres.join(", ")}</p>
                  <br />
                  <hr />
                  <br />
                  <p className="text-center">
                    {truncateText(tvShow.overview, 128)}
                  </p>

                  {/* Display additional season info if it's not the main show */}
                  {!tvShow.isMainShow && (
                    <>
                      <p className="text-sm text-center mt-2">
                        {`Season ${tvShow.seasonNumber} - ${tvShow.episode_count} Episodes`}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarouselResultsTv;
