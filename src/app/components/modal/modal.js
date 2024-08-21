import React from "react";
import PropTypes from "prop-types";

const MovieModal = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modal-poster"
        />
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Vote Average: {movie.vote_average}</p>
      </div>
    </div>
  );
};

MovieModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.object,
};

export default MovieModal;
