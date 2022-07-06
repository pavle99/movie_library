import React, { useContext } from "react";
import { MovieCardProp } from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";

const MovieControls = ({ movie, type }: MovieCardProp) => {
  const {removeMovieFromWatchlist} = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button className="ctrl-btn">
            <i className="fa-fw far fa-eye"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}

    </div>
  );
};

export default MovieControls;