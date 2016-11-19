import { Injectable } from '@angular/core';
import { Position } from './meeples/position';

declare var createjs: any;

@Injectable()
export class PositionService {

  private positions: Array<createjs.Container> = [];

  public initValidPositions(){
   this.positions = VALID_POSITION.map(function(position){
     let destHeight = 50;
     let destWidth = 50;
     let box = new createjs.Shape();
     box.graphics.setStrokeStyle(1).beginStroke("white").rect(0, 0, destHeight, destWidth);
     box.alpha = 0;
     let positionContainer = new createjs.Container();
     positionContainer.x = position.x;
     positionContainer.y = position.y;
     positionContainer.setBounds(positionContainer.x , positionContainer.y , destHeight, destWidth);
     positionContainer.addChild(box);
     return positionContainer;

   });
    return this.positions;
  }

  public getPositions() {
    return this.positions;
  }
}


export const VALID_POSITION : Position[] = [
  new Position(75, 75,true),
  new Position(75, 175,false),
  new Position(75, 275,false),
  new Position(75, 375,false),
  new Position(75, 475,true),

  new Position(175, 75,false),
  new Position(175, 175,false),
  new Position(175, 275,false),
  new Position(175, 375,false),
  new Position(175, 475,false),

  new Position(275, 75,false),
  new Position(275, 175,false),
  new Position(275, 275,false),
  new Position(275, 375,false),
  new Position(275, 475,false),

  new Position(375, 75,false),
  new Position(375, 175,false),
  new Position(375, 275,false),
  new Position(375, 375,false),
  new Position(375, 475,false),

  new Position(475, 75,true),
  new Position(475, 175,false),
  new Position(475, 275,false),
  new Position(475, 375,false),
  new Position(475, 475,true)
];
