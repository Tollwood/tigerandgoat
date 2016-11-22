import {Animal} from "./animal";
export class Meeple extends createjs.Container{
  constructor( id:number, x : number, y: number, animal:Animal){
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.animal = animal;
  }
  id: number;
  position : Position;
  animal : Animal;
}


