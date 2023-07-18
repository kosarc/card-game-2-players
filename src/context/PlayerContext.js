import { createContext, useReducer } from "react";

export const PlayerContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK_PLAYER":
      return { ...state, player: action.payload };
    default:
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const changePlayer = (player) => {
    dispatch({ type: "CHECK_PLAYER", payload: player });
  };

  const [state, dispatch] = useReducer(reducer, {
    player: "first",
  });

  return (
    <PlayerContext.Provider value={{ ...state, changePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
