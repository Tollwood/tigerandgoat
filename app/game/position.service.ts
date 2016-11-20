import { Injectable } from '@angular/core';
import { Position } from './meeples/position';

declare var createjs: any;

@Injectable()
export class PositionService {

  private positions: Array<Position> = [];

  public initValidPositions(){
   this.positions = VALID_POSITION.map(function(position){
     let destHeight = 50;
     let destWidth = 50;
     let box = new createjs.Shape();
     box.graphics.setStrokeStyle(1).beginStroke("white").rect(-25, -25, destHeight, destWidth);
     box.alpha = 1;

     position.setBounds(position.x , position.y, destHeight, destWidth);
     position.addChild(box);
     return position;

   });
    return this.positions;
  }

  public getPositions() {
    return this.positions;
  }
}


export var VALID_POSITION : Position[] = [
  new Position(100, 100),
  new Position(100, 200),
  new Position(100, 300),
  new Position(100, 400),
  new Position(100, 500),

  new Position(200, 100),
  new Position(200, 200),
  new Position(200, 300),
  new Position(200, 400),
  new Position(200, 500),

  new Position(300, 100),
  new Position(300, 200),
  new Position(300, 300),
  new Position(300, 400),
  new Position(300, 500),

  new Position(400, 100),
  new Position(400, 200),
  new Position(400, 300),
  new Position(400, 400),
  new Position(400, 500),

  new Position(500, 100),
  new Position(500, 200),
  new Position(500, 300),
  new Position(500, 400),
  new Position(500, 500)
  ];
