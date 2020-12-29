import React from "react";
import { observer } from "mobx-react";

import { useGame } from "./stores/GameProvider";

import "./Status.css";

const faces = {
  loading: "⌛️",
  idle: "😶",
  started: "🙂",
  win: "😎",
  boom: "😵"
};

function Status() {
  const game = useGame();

  return (
    <div className="status">
      <div className="counter">{game.totalBombs}</div>
      <div className="face">{faces[game.status]}</div>
      <div className="counter">{game.time}</div>
    </div>
  );
}

export default observer(Status);
