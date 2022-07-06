import React from "react";
import { MovieProp } from "./ResultCard";
import MovieControls from "./MovieControls";

export interface MovieCardProp {
  movie: MovieProp;
  type: string;
}

const MovieCard = ({ movie, type }: MovieCardProp) => {
  return (
    <div className="movie-card">
      <div className="overlay"> </div>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : (
        <div className="filler-poster watch"></div>
      )}

      <MovieControls movie={movie} type={type} />
    </div>
  );
};

export default MovieCard;
