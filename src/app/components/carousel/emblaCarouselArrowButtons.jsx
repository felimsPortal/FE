"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useMovies } from "../../context/MovieContext.js";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  );
};
export const NextButton = (props) => {
  const { selectedIndex, scrollSnaps = [], onClick, ...restProps } = props;
  const { totalPages, page, setPage } = useMovies();

  // Ensure selectedIndex is valid
  useEffect(() => {
    if (selectedIndex === undefined) {
      console.warn("selectedIndex is undefined in NextButton");
    }
  }, [selectedIndex]);

  // Determine if the current group is the last one
  const isLastGroup =
    scrollSnaps.length > 0 && selectedIndex === scrollSnaps.length - 1;

  console.log("NextButton selectedIndex:", selectedIndex);
  console.log("isLastGroup:", isLastGroup);
  console.log("Movie Context values:", { totalPages, page, setPage });

  const loadMoreMovies = () => {
    console.log("loadMoreMovies function triggered");
    console.log("Current page:", page);
    console.log("Total pages:", totalPages);

    if (page < totalPages) {
      console.log("Loading more movies...");
      setPage((prevPage) => prevPage + 1);
    } else {
      console.log("No more pages to load");
    }
  };

  return (
    <>
      {isLastGroup ? (
        <button
          onClick={() => {
            console.log("Load More button clicked");
            loadMoreMovies();
          }}
          className="bg-green-700 w-[6.6rem] h-[7.6rem] text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          type="button"
          {...restProps}
        >
          Load More
        </button>
      ) : (
        <button
          onClick={onClick} // Use the default onClick provided by parent
          className="embla__button embla__button--next"
          type="button"
          {...restProps}
        >
          <svg className="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
            />
          </svg>
          {/* {children} */}
        </button>
      )}
    </>
  );
};
// export const NextButton = (props) => {
//   const { children, selectedIndex, scrollSnaps = [], ...restProps } = props;
//   const { totalPages, page, setPage } = useMovies();
//   const [buttonRendered, setButtonRendered] = useState(false); // State to track rendering

//   // Determine if the current group is the last one
//   const isLastGroup =
//     scrollSnaps.length > 0 && selectedIndex === scrollSnaps.length - 1;

//   console.log("NextButton selectedIndex:", selectedIndex);
//   console.log("isLastGroup:", isLastGroup);
//   console.log("Movie Context values:", { totalPages, page, setPage });

//   const loadMoreMovies = () => {
//     console.log("loadMoreMovies function triggered");
//     console.log("Current page:", page);
//     console.log("Total pages:", totalPages);

//     if (page < totalPages) {
//       console.log("Loading more movies...");
//       setPage((prevPage) => prevPage + 1);
//     } else {
//       console.log("No more pages to load");
//     }
//   };

//   // Render the button only when it should be visible
//   if (isLastGroup && !buttonRendered) {
//     setButtonRendered(true); // Ensure this runs once
//   }

//   return (
//     <>
//       {buttonRendered && (
//         <button
//           onClick={() => {
//             console.log("Load More button clicked");
//             loadMoreMovies();
//           }}
//           className="bg-green-700 w-[6.6rem] h-[7.6rem] text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//           type="button"
//           {...restProps}
//         >
//           Load More
//         </button>
//       )}
//       {!buttonRendered && (
//         <button
//           className="embla__button embla__button--next"
//           type="button"
//           {...restProps}
//         >
//           <svg className="embla__button__svg" viewBox="0 0 532 532">
//             <path
//               fill="currentColor"
//               d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
//             />
//           </svg>
//           {children}
//         </button>
//       )}
//     </>
//   );
// };
