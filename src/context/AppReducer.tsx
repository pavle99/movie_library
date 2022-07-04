import { MovieAction, MovieState } from "./GlobalState";

const appReducer = (state: MovieState, action: MovieAction) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist]
      };
    default:
      return state;
  }
}

export default appReducer;