import React from "react";
import PropTypes from "prop-types";

const MovieModal = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;
  const {
    title,
    overview,
    release_date,
    vote_average,
    original_language,
    poster_path,
  } = movie;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>{title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modal-poster"
        />
        <p>{overview}</p>
        <p>Release Date: {release_date}</p>
        <p>Vote Average: {vote_average}</p>
        <p>Original Language: {original_language}</p>
      </div>
    </div>
  );
};
MovieModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    original_language: PropTypes.string,
    poster_path: PropTypes.string,
  }),
};

export default MovieModal;
