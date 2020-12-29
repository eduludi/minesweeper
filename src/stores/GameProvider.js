import React, { useContext } from "react";
import { useLocalObservable } from "mobx-react";

import Game from "./Game";

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export default function GameProvider({ children }) {
  const game = useLocalObservable(() => new Game());

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
