import React, { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
import { MovieProp } from "../components/ResultCard";

export interface MovieState {
  watchlist: any[];
  watched: any[];
  addMovieToWatchlist: (movie: MovieProp) => any;
}

export interface MovieAction {
  type: string;
  payload: any;
}

const initialState: MovieState = {
  watchlist: [],
  watched: [],
  addMovieToWatchlist(movie: MovieProp): any {},
};

export const GlobalContext = createContext<MovieState>(initialState);

export const GlobalProvider = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addMovieToWatchlist = (movie: MovieProp) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist: addMovieToWatchlist,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
