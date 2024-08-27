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
import { FcLike } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";

const EmblaCarouselResults = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const slidesPerGroup = 5;

  const [currentMovies, setCurrentMovies] = useState([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    slidesPerGroup
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
    const moviesStored = localStorage.getItem("movies");

    if (moviesStored) {
      const parsedMovies = JSON.parse(moviesStored);

      const mappedMovies = parsedMovies.map((movie) => {
        console.log(`Full movie data:`, movie);
        const genres = getGenreNames(movie.genre_ids || []);
        const languages = getLanguageNames([movie.original_language]);
        console.log(languages);

        return {
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          original_language: languages.join(", "),
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          genres: genres,
          overview: movie.overview,
        };
      });

      setCurrentMovies(mappedMovies);
    } else {
      console.log("No movies found in localStorage");
    }
  }, []);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {currentMovies.map((movie, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={movie.src}
                alt={`Slide ${index + 1}`}
                className="embla__slide__img rounded-xl"
              />
              <div className="embla__slide__overlay flex flex-col ">
                <div className=" w-full flex justify-evenly items-center mt-10">
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
                  <p className="text-xl text-center">{movie.title}</p>
                  <br />
                  <p>Language: {movie.original_language}</p>
                  <p>Avg vote: {movie.vote_average}</p>
                  <p>Release Date: {movie.release_date}</p>
                  <p>Genres: {movie.genres.join(", ")}</p>
                  <br />
                  <hr />
                  <br />
                  <p className="text-center">
                    {truncateText(movie.overview, 128)}
                  </p>
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

export default EmblaCarouselResults;
