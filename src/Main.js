import React from "react";
import { observer } from "mobx-react";

import { useGame } from "./stores/GameProvider";
import Board from "./Board";
import Status from "./Status";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import Menu from "./Menu";
import Footer from "./Footer";

import "./Main.css";

function Main() {
  const game = useGame();

  return (
    <div className="main">
      {game.status === "home" ? (
        <div class="home">
          <Logo />
          <Menu />
        </div>
      ) : game.status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Status />
          <Board />

          <div className="actions">
            <Button label="Home" onClick={game.goHome} />
            <Button label="Restart" onClick={game.restart} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default observer(Main);
