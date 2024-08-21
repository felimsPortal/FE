"use client";

import React, { useState, useEffect } from "react";
import { DotButton, useDotButton } from "./emblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./emblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { useMovies } from "../../context/MovieContext";

const EmblaCarousel = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { movies } = useMovies();

  const [currentMovies, setCurrentMovies] = useState([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
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
    const mappedMovies = movies.map((movie) => ({
      src: movie.poster_path,
      title: movie.title,
      overview: movie.overview,
    }));
    setCurrentMovies(mappedMovies);
  }, [movies]);

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
                <p className="text-xl text-center">{movie.title}</p>
                <br />
                <hr />
                <p className="pl-8 ">{truncateText(movie.overview, 128)}</p>
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
