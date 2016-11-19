export class Position{

  constructor(x:number,y:number, occupied: boolean){
    this.x = x;
    this.y = y;
    this.occupied = occupied;
  }

  x: number;
  y: number;
  occupied : boolean;

}
