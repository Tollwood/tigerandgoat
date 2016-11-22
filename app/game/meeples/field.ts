import {Animal} from "./animal";
export class Field {
  x;
  y;
  id;

  constructor(id: number, x:number,y:number){
    this.id = id;
    this.x = x;
    this.y = y;
  }

  animal : Animal;

}
