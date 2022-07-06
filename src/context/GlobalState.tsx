import React, { createContext, useEffect, useReducer } from "react";

import AppReducer from "./AppReducer";
import { MovieProp } from "../components/ResultCard";

export interface MovieState {
  watchlist: MovieProp[];
  watched: MovieProp[];
  addMovieToWatchlist: (movie: MovieProp) => any;
  removeMovieFromWatchlist: (id: number) => void;
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
  addMovieToWatchlist(movie: MovieProp): any {},
  removeMovieFromWatchlist(id: number): void {},
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

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist: addMovieToWatchlist,
        removeMovieFromWatchlist: removeMovieFromWatchlist,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
