import React from "react";
import ReactDOM from "react-dom";

import GameProvider from "./stores/GameProvider";
import Main from "./Main";
import "./styles.css";

function App() {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
