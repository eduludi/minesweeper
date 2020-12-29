import { makeAutoObservable } from "mobx";

export default class Cell {
  x = 0;
  y = 0;
  visible = false;
  flag = false;
  counter = 0;
  hasBomb = false;
  exploded = false;

  constructor(x, y) {
    makeAutoObservable(this);

    this.x = x;
    this.y = y;
  }

  get id() {
    return `${this.x}-${this.y}`;
  }

  setBomb = (value) => (this.hasBomb = value);

  makeBoom = () => (this.exploded = true);

  unveil = () => (this.visible = true);

  toggleFlag = () => (this.flag = !this.flag);

  setCounter = (value) => (this.counter = value);

  increaseCount = () => (this.counter += 1);
}
