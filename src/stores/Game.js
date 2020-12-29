import { makeAutoObservable } from "mobx";

import Cell from "./Cell";

export const levels = {
  easy: 0.9,
  advanced: 0.8,
  hard: 0.7
};

export const sizes = {
  small: 8,
  medium: 12,
  large: 16
};

/**
 * Gameplay:
 * In Minesweeper, mines are scattered throughout a board, which is divided into cells. Cells have three states: uncovered, covered and flagged. A covered cell is blank and clickable, while an uncovered cell is exposed. Flagged cells are those marked by the player to indicate a potential mine location.
 * A player left-clicks a cell to uncover it. If a player uncovers a mined cell, the game ends, as there is only 1 life per game. Otherwise, the uncovered cells displays either a number, indicating the quantity of mines adjacent to it, or a blank tile (or "0"), and all adjacent non-mined cells will automatically be uncovered. Right-clicking on a cell will flag it, causing a flag to appear on it. Flagged cells are still considered covered, and a player can click on them to uncover them, although typically they must first be unflagged with an additional right-click.
 * The first click in any game will never be a mine.
 * To win the game, players must uncover all non-mine cells, at which point, the timer is stopped. Flagging all the mined cells is not required.
 *
 * (source https://en.wikipedia.org/wiki/Minesweeper_(video_game))
 */
export default class Game {
  level = "easy";
  size = "small";
  board = [];
  status = "home"; // home, loading, idle, started, win, or boom
  time = 0;
  timer = null;

  constructor() {
    makeAutoObservable(this);
  }

  get totalCells() {
    return Math.pow(sizes[this.size], 2);
  }

  get totalBombs() {
    return this.board.map((row) => row.filter((cell) => cell.hasBomb)).flat()
      .length;
  }

  get veiledCells() {
    return this.board.map((row) => row.filter((cell) => !cell.visible)).flat();
  }

  get hasBombs() {
    return this.totalBombs > 0;
  }

  setLevel = (level) => {
    this.level = level;
  };

  setSize = (size) => {
    this.size = size;
  };

  cellAtPos = (x, y) => {
    const limit = sizes[this.size] - 1;
    if (x > limit || y > limit) return null;

    return this.board[x] ? this.board[x][y] : null;
  };

  getNeighborCells = (cell) => {
    const { x, y } = cell;
    const positionsX = [x - 1, x, x + 1];
    const positionsY = [y - 1, y, y + 1];

    return positionsX
      .map((posX) => positionsY.map((posY) => this.cellAtPos(posX, posY)))
      .flat()
      .filter(Boolean);
  };

  start = () => {
    this.board = [];

    this.status = "loading";

    const max = sizes[this.size];

    let x = 0;
    let y = 0;

    while (x < max) {
      this.board[x] = [];
      y = 0;
      while (y < max) {
        this.board[x].push(new Cell(x, y));
        y++;
      }
      x++;
    }

    this.status = "idle";

    return this;
  };

  layBombs = (initialCell) => {
    for (const row of this.board) {
      for (const cell of row) {
        cell.setBomb(
          cell.id === initialCell.id
            ? false
            : Math.random() > levels[this.level]
        );

        if (cell.hasBomb) {
          for (const neighbor of this.getNeighborCells(cell)) {
            neighbor.increaseCount();
          }
        }
      }
    }

    this.unveilCell(initialCell);

    this.startTimer();

    this.status = "started";
  };

  unveilCell = (cell) => {
    if (cell.visible) {
    } else {
      cell.unveil();

      if (cell.hasBomb) {
        this.status = "boom";
        this.stopTimer();

        cell.makeBoom();

        for (const cell of this.veiledCells) {
          cell.unveil();
        }
      } else if (this.totalBombs === this.veiledCells.length) {
        this.status = "win";
        this.stopTimer();
      } else if (cell.counter === 0) {
        for (const neighbor of this.getNeighborCells(cell)) {
          this.unveilCell(neighbor);
        }
      }
    }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      this.time += 1;
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  goHome = () => {
    this.status = "home";
    this.time = 0;
    this.stopTimer();
  };

  restart = () => {
    this.status = "loading";
    this.time = 0;
    this.stopTimer();
    return this.start();
  };
}
