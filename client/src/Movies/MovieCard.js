import React from 'react';
import { Route } from 'react-router'

import MovieUpdateForm from './MovieUpdateForm'

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <>
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button
          onClick={() => props.history.push(`/update-movie/${props.movie.id}`)}
          className="md-button"
      >
        Edit Movie Details
    </button>
    </div>
    <Route
        path="/update-movie/:id"
        render={props => {
          return <MovieUpdateForm {...props} movie={props.movie} />
      }}
      />
    </>
  );
};

export default MovieCard;
