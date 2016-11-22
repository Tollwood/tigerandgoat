import {Animal} from "./animal";
export class Meeple{

  constructor( id:number, x : number, y: number, animal:Animal){
    this.id = id;
    this.x = x;
    this.y = y;
    this.animal = animal;
  }

  id: number;
  x : number;
  y : number;
  animal : Animal;
}
