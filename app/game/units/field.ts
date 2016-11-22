import {Animal} from "./animal";
export class Field {



  constructor(id: number, x:number,y:number){
    this.id = id;
    this.x = x;
    this.y = y;
  }

  id : number;
  x : number;
  y : number;
  animal : Animal;

}
