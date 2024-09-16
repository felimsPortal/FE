import { useState, useEffect, useRef } from "react";

const Sliders = ({ onImdbScoreChange, onReleaseYearChange }) => {
  const leftBackgroundRef = useRef(null); // Ref for the left background (before the min thumb of year)
  const rangeRef = useRef(null); // Ref for the range (between the thumbs of year)

  const imdbLeftBackgroundRef = useRef(null); // Ref for IMDB left background
  const imdbRangeRef = useRef(null); // Ref for IMDB range

  const yearMinRef = useRef(null);
  const yearMaxRef = useRef(null);
  const imdbMinRef = useRef(null);
  const imdbMaxRef = useRef(null);

  const [yearRange, setYearRange] = useState({ min: 1906, max: 2024 });
  const [imdbRange, setImdbRange] = useState({ min: 0, max: 10 });

  const priceGap = 1;

  // Function for handling year slider input
  const handleYearInput = (e) => {
    let minVal = parseInt(yearMinRef.current.value);
    let maxVal = parseInt(yearMaxRef.current.value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className.includes("range-min")) {
        yearMinRef.current.value = maxVal - priceGap;
      } else {
        yearMaxRef.current.value = minVal + priceGap;
      }
    } else {
      setYearRange({ min: minVal, max: maxVal });
      onReleaseYearChange({ min: minVal, max: maxVal });

      // Update the progress bar between the two thumbs
      if (rangeRef.current) {
        rangeRef.current.style.left =
          ((minVal - 1906) / (2024 - 1906)) * 100 + "%";
        rangeRef.current.style.right =
          100 - ((maxVal - 1906) / (2024 - 1906)) * 100 + "%";
      }

      // Update the grey background before the min thumb
      if (leftBackgroundRef.current) {
        leftBackgroundRef.current.style.width =
          ((minVal - 1906) / (2024 - 1906)) * 100 + "%";
      }
    }
  };

  // Function for handling IMDB slider input (updated)
  const handleImdbInput = (e) => {
    let minVal = parseFloat(imdbMinRef.current.value);
    let maxVal = parseFloat(imdbMaxRef.current.value);

    if (maxVal - minVal < 0.1) {
      if (e.target.className.includes("range-min")) {
        imdbMinRef.current.value = maxVal - 0.1;
      } else {
        imdbMaxRef.current.value = minVal + 0.1;
      }
    } else {
      setImdbRange({ min: minVal, max: maxVal });
      onImdbScoreChange({ min: minVal, max: maxVal });

      // Update the progress bar between the two IMDB thumbs
      if (imdbRangeRef.current) {
        imdbRangeRef.current.style.left = (minVal / 10) * 100 + "%";
        imdbRangeRef.current.style.right = 100 - (maxVal / 10) * 100 + "%";
      }

      // Update the grey background before the IMDB min thumb
      if (imdbLeftBackgroundRef.current) {
        imdbLeftBackgroundRef.current.style.width = (minVal / 10) * 100 + "%";
      }
    }
  };

  useEffect(() => {
    const yearRangeInput = [yearMinRef.current, yearMaxRef.current];
    const imdbRangeInput = [imdbMinRef.current, imdbMaxRef.current];

    // Add event listeners for year sliders
    if (yearRangeInput[0] && yearRangeInput[1]) {
      yearRangeInput.forEach((input) => {
        input.addEventListener("input", handleYearInput);
      });
    }

    // Add event listeners for IMDB sliders
    if (imdbRangeInput[0] && imdbRangeInput[1]) {
      imdbRangeInput.forEach((input) => {
        input.addEventListener("input", handleImdbInput);
      });
    }

    // Cleanup listeners on unmount
    return () => {
      if (yearRangeInput[0] && yearRangeInput[1]) {
        yearRangeInput.forEach((input) => {
          input.removeEventListener("input", handleYearInput);
        });
      }
      if (imdbRangeInput[0] && imdbRangeInput[1]) {
        imdbRangeInput.forEach((input) => {
          input.removeEventListener("input", handleImdbInput);
        });
      }
    };
  }, []);

  return (
    <div>
      {/* Release Year */}
      <h4 className="font-semibold tracking-wider text-center text-2xl mb-4">
        Release Year: {yearRange.min} - {yearRange.max}
      </h4>
      <div className="slider">
        <div className="left-background" ref={leftBackgroundRef}></div>
        <div className="progress" ref={rangeRef}></div>
        <input
          type="range"
          className="range-min year-slider"
          min="1906"
          max="2024"
          ref={yearMinRef}
          defaultValue={yearRange.min}
        />
        <input
          type="range"
          className="range-max year-slider"
          min="1906"
          max="2024"
          ref={yearMaxRef}
          defaultValue={yearRange.max}
        />
      </div>
      <br />
      <br />
      {/* IMDB Score */}
      <h4 className="font-semibold tracking-wider text-center text-2xl mb-4">
        IMDB Score: {imdbRange.min.toFixed(1)} - {imdbRange.max.toFixed(1)}
      </h4>
      <div className="slider">
        <div className="left-background" ref={imdbLeftBackgroundRef}></div>
        <div className="progress" ref={imdbRangeRef}></div>
        <input
          type="range"
          className="range-min imdb-slider"
          min="0"
          max="10"
          step="0.1"
          ref={imdbMinRef}
          defaultValue={imdbRange.min}
        />
        <input
          type="range"
          className="range-max imdb-slider"
          min="0"
          max="10"
          step="0.1"
          ref={imdbMaxRef}
          defaultValue={imdbRange.max}
        />
      </div>

      {/* Custom styles for the sliders */}
      <style jsx>{`
        .slider {
          height: 5px;
          position: relative;
          background: #ddd;
          border-radius: 5px;
          margin-top: 10px;
        }
        .left-background {
          height: 100%;
          position: absolute;
          background: #f0f1f2; /* Grey color for the left side of min thumb */
          border-radius: 5px;
          width: 0; /* Will be dynamically set */
          left: 0;
          z-index: 5;
        }
        .progress {
          height: 100%;
          position: absolute;
          border-radius: 5px;
          left: 0;
          right: 0;
           {
            /* z-index: 10; */
          }
          background: #17a2b8; /* Blue color for the progress bar */
        }
        .range-min,
        .range-max {
          position: absolute;
          width: 100%;
          height: 5px;
          background: none;
          pointer-events: none;
        }

        /* Year Slider - Thumb Size and z-index */
        .year-slider::-webkit-slider-thumb {
          height: 60px;
          width: 60px;
          border-radius: 50%;
          background: #17a2b8;
          pointer-events: auto;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
          z-index: 20;
        }
        .year-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #17a2b8;
          pointer-events: auto;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
          z-index: 20;
        }

        /* IMDB Slider - Thumb Size and z-index */
        .imdb-slider::-webkit-slider-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #17a2b8;
          pointer-events: auto;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
          z-index: 30;
        }
        .imdb-slider::-moz-range-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
           {
            /* background: #17a2b8; */
          }
          pointer-events: auto;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
          z-index: 30;
        }
      `}</style>
    </div>
  );
};

export default Sliders;
