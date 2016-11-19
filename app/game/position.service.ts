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
     box.graphics.setStrokeStyle(1).beginStroke("white").rect(0, 0, destHeight, destWidth);
     box.alpha = 0;

     position.setBounds(position.x, position.y, destHeight, destWidth);
     position.addChild(box);
     return position;

   });
    return this.positions;
  }

  public getPositions() {
    return this.positions;
  }
}


export const VALID_POSITION : Position[] = [
  new Position(75, 75),
  new Position(75, 175),
  new Position(75, 275),
  new Position(75, 375),
  new Position(75, 475),

  new Position(175, 75),
  new Position(175, 175),
  new Position(175, 275),
  new Position(175, 375),
  new Position(175, 475),

  new Position(275, 75),
  new Position(275, 175),
  new Position(275, 275),
  new Position(275, 375),
  new Position(275, 475),

  new Position(375, 75),
  new Position(375, 175),
  new Position(375, 275),
  new Position(375, 375),
  new Position(375, 475),

  new Position(475, 75),
  new Position(475, 175),
  new Position(475, 275),
  new Position(475, 375),
  new Position(475, 475)
];
