import React from "react";
import { observer } from "mobx-react";

import { useGame } from "./stores/GameProvider";
import Cell from "./Cell";

import "./Board.css";

function Board() {
  const game = useGame();

  return (
    <div className="board">
      {game.board.map((row, x) => {
        return (
          <div className="row" key={`row_${x}`}>
            {row.map((cell, y) => (
              <Cell cell={cell} key={`cell_${x}-${y}`} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default observer(Board);
