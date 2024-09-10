"use client";
import React, { useEffect } from "react";
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
import { useMovies } from "../../context/MovieContext";

const EmblaCarousel = ({ firebase_uid, page }) => {
  const { movies, fetchMovies } = useMovies();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    speed: 20,
    slidesToScroll: 2,
  });
  const slidesPerGroup = 5;

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    slidesPerGroup
  );

  console.log("EmblaCarousel selectedIndex:", selectedIndex);

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
    if (emblaApi) {
      console.log("Scroll snaps:", scrollSnaps);
    }
  }, [emblaApi, scrollSnaps]);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        const currentIndex = emblaApi.selectedScrollSnap();
        console.log("Currently selected slide index:", currentIndex);
      };
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  // Conditionally rendering based on the current index
  // if (currentIndex >= 16) {
  //   // Render the Load More button
  // }

  // else {
  //   // Render the NextButton
  // }

  useEffect(() => {
    if (firebase_uid) {
      fetchMovies(firebase_uid, page);
    }
  }, [firebase_uid, page, fetchMovies]);

  useEffect(() => {
    console.log("EmblaCarousel selectedIndex:", selectedIndex);
  }, [selectedIndex]);

  return (
    <section
      className="max-w-screen relative"
      style={{
        "--slide-height": "20rem",
        "--slide-spacing": "1rem",
        "--slide-size": "23%",
      }}
    >
      <div className="embla__dots text-center">
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
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {movies.map((movie, index) => (
            <div className="embla__slide relative" key={index}>
              <img
                src={movie.poster_path}
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
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 flex justify-between items-center px-2 translate-y-52 h-fit ">
          <div className="bg-green-700">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          </div>
          <div className="bg-green-700">
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              selectedIndex={selectedIndex}
              scrollSnaps={scrollSnaps}
            />

            {/* <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
