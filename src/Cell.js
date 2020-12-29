import React from "react";
import { observer } from "mobx-react";
import { useGame } from "./stores/GameProvider";

import "./Cell.css";

function Cell({ cell }) {
  const { counter, flag, visible, hasBomb, exploded } = cell;
  const game = useGame();

  return (
    <span
      className={`cell cell--${counter} ${visible ? "cell--visible" : ""} ${
        exploded ? "cell--exploded" : ""
      }`}
      onClick={() =>
        game.status === "started" ? game.unveilCell(cell) : game.layBombs(cell)
      }
      onContextMenu={(e) => {
        e.preventDefault();
        cell.toggleFlag();
      }}
    >
      <span>{visible ? (hasBomb ? "💣" : counter) : flag ? "🚩" : null}</span>
    </span>
  );
}

export default observer(Cell);
