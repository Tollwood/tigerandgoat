import { Meeple } from './meeple';

export class Tiger extends Meeple {

  constructor(id: number, position: Position) {
    this.id = id;
    this.position = position;
  }
  color = "blue";
}
