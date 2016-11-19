export class Position extends createjs.Container{

  constructor(x:number,y:number){
    super();
    this.x = x;
    this.y = y;
    this.occupied = false;
  }

  occupied : boolean;

}
