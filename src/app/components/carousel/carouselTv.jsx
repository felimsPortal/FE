import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./emblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./emblaCarouselDotButton";

const EmblaCarouselTv = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 3500 }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla_tv">
      <div className="embla__viewport_tv" ref={emblaRef}>
        <div className="embla__container_tv h-5/6">
          {slides.map((src, index) => (
            <div className="embla__slide_tv" key={index}>
              <img src={src} alt="Tv Slide" className="embla__slide__img_tv" />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls_tv">
        <div className="embla__buttons_tv">
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
    </div>
  );
};

export default EmblaCarouselTv;
