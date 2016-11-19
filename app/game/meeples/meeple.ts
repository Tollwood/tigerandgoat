export class Meeple{
  constructor( id:number, x : number, y: number, color:string){
    this.id = id;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  id: number;
  x : number;
  y : number;
  position : Position;
  color : string;
}
