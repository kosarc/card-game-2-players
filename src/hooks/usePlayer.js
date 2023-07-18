import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const usePlayer = () => {
  const value = useContext(PlayerContext);

  if (value === undefined) {
    throw new Error("usePlayer() should be used in PlayerProvider scope!");
  }

  return value;
};
