"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { getGenreNames } from "../../components/genres/genres";
import { getLanguageNames } from "../../components/lanuages/languages";
import { DotButton, useDotButton } from "./emblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./emblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { FcLike, FcBookmark } from "react-icons/fc";
import { useMovies } from "../../context/MovieContext";

const EmblaCarousel = ({ firebase_uid, page }) => {
  const { movies, fetchMovies } = useMovies();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const slidesPerGroup = 5;

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
    if (firebase_uid) {
      fetchMovies(firebase_uid, page);
    }
  }, [firebase_uid, page, fetchMovies]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {movies.map((movie, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={movie.poster_path}
                alt={`Slide ${index + 1}`}
                className="embla__slide__img rounded-xl"
              />
              <div className="embla__slide__overlay flex flex-col ">
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
                  <p className="text-xl text-center">{movie.title}</p>
                  <br />
                  <p>Language: {getLanguageNames([movie.original_language])}</p>
                  <p>Avg vote: {movie.vote_average}</p>
                  <p>Release Date: {movie.release_date}</p>
                  <p>Genres: {getGenreNames(movie.genre_ids).join(", ")}</p>
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

export default EmblaCarousel;
