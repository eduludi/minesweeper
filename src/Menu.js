import React from "react";
import { observer } from "mobx-react";

import { useGame } from "./stores/GameProvider";
import { levels, sizes } from "./stores/Game";
import Button from "./ui/Button";
import Select from "./ui/Select";

import "./Menu.css";

function Menu() {
  const game = useGame();

  return (
    <div className="menu">
      <Button label="Start" onClick={game.start} primary large />

      <div className="options">
        <Select
          label="Level"
          items={Object.keys(levels)}
          value={game.level}
          onChange={(level) => game.setLevel(level)}
        />

        <Select
          label="Size"
          items={Object.keys(sizes)}
          value={game.size}
          onChange={(size) => game.setSize(size)}
        />
      </div>
    </div>
  );
}

export default observer(Menu);
