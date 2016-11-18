import { Meeple } from './meeple';

export class Goat extends Meeple {
  constructor(id: number, position: Position) {
    this.id = id;
    this.position = position;
  }
  color = "red";
}
