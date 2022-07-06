import React, { createContext, useEffect, useReducer } from "react";

import AppReducer from "./AppReducer";
import { MovieProp } from "../components/ResultCard";

export interface MovieState {
  watchlist: MovieProp[];
  watched: MovieProp[];
  addMovieToWatchlist: (movie: MovieProp) => void;
  removeMovieFromWatchlist: (id: number) => void;
  addMovieToWatched: (movie: MovieProp) => void;
  moveToWatchlist: (movie: MovieProp) => void;
  removeFromWatched: (id: number) => void;
}

export interface MovieAction {
  type: string;
  payload: any;
}

const initialState: MovieState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist") ?? "")
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched") ?? "")
    : [],
  addMovieToWatchlist(movie: MovieProp): void {},
  removeMovieFromWatchlist(id: number): void {},
  addMovieToWatched(movie: MovieProp): void {},
  moveToWatchlist(movie: MovieProp): void {},
  removeFromWatched(id: number): void {},
};

export const GlobalContext = createContext<MovieState>(initialState);

export const GlobalProvider = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const addMovieToWatchlist = (movie: MovieProp) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id: number) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = (movie: MovieProp) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie: MovieProp) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const removeFromWatched = (id: number) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist: addMovieToWatchlist,
        removeMovieFromWatchlist: removeMovieFromWatchlist,
        addMovieToWatched: addMovieToWatched,
        moveToWatchlist: moveToWatchlist,
        removeFromWatched: removeFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
