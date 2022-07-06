import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

export interface MovieProp {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

const ResultCard = (movie: MovieProp) => {
  const { addMovieToWatchlist, addMovieToWatched, watchlist, watched } =
    useContext(GlobalContext);

  let storedMovie = watchlist.find((wlmovie) => wlmovie.id === movie.id);
  let storedMovieWatched = watched.find((wmovie) => wmovie.id === movie.id);

  const watchlistDisabled = storedMovie ? true : !!storedMovieWatched;
  const watchedDisaled = !!storedMovieWatched;

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </h4>
        </div>

        <div className="controls">
          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn"
            disabled={watchedDisaled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
