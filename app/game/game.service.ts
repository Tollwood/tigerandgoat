import { Injectable } from '@angular/core';
import { Position } from './meeples/position';
import {PositionService} from "./position.service";

declare var createjs: any;

@Injectable()
export class GameService {

  private lastPosition = new Position(0,0);

  constructor(private positionService : PositionService){}

  public updateLastPosition(x : number, y: number){
    this.lastPosition.x = x;
    this.lastPosition.y = y;
    console.log("x: "+ x + " y: " + y);
  }
    public canMove(meeple :createjs.Container){
      let position =this.intersectsWithPosition(meeple);
      return position && (!this.onBoard() || this.isNeighbourField(position));
    }

  public intersectsWithPosition(meeple : createjs.Container) {
    let intersectionPositions = this.positionService.getPositions().filter(function (position) {
      var objBounds2 = position.getBounds().clone();
      var objBounds1 = meeple.getBounds().clone();
      var pt = meeple.globalToLocal(objBounds2.x, objBounds2.y);

      var h1 = -(objBounds1.height / 2 + objBounds2.height);
      var h2 = objBounds2.width / 2;
      var w1 = -(objBounds1.width / 2 + objBounds2.width);
      var w2 = objBounds2.width / 2;


      if (pt.x > w2 || pt.x < w1) return false;
      if (pt.y > h2 || pt.y < h1) return false;

      return true;
    });
    if(intersectionPositions.length > 0){
      return intersectionPositions[0];
    }
    return;
  }

  public getLastPosition() {
    return this.lastPosition;
  }

  private isNeighbourField( position: createjs.Container) {
    return this.isVerticalNeighbour(position) || this.isHorizontalNeighbour(position) || this.isDiagnoalNeighbour(position);
  }

  private isVerticalNeighbour(position: createjs.Container) {
    return this.lastPosition.x === position.x  && (this.isUpwardsMove(position) || this.isDownWardsMove(position));
  }

  private isHorizontalNeighbour( position: createjs.Container) {
    return this.lastPosition.y === position.y  && (this.isRightMove(position) || this.isLeftMove(position));
  }

  private isDiagnoalNeighbour(position: createjs.Container) {
    return this.isAllowedToMoveDiagonal(this.lastPosition) && (this.isRightMove(position) || this.isLeftMove(position)) && (this.isUpwardsMove(position) || this.isDownWardsMove(position));
  }

  private isAllowedToMoveDiagonal(lastPosition: Position) {
    let allowedPositions = ALLOWED_TO_MOVE_DIAGONAL.filter(function(position){
      return lastPosition.x === position.x && lastPosition.y === position.y;
    });
    return allowedPositions.length > 0;
  }

  private isUpwardsMove(position: createjs.Container) {
    return this.lastPosition.y + 100 === position.y;
  }

  private isRightMove(position: createjs.Container) {
    return this.lastPosition.x + 100 === position.x;
  }

  private isDownWardsMove(position: createjs.Container) {

    return this.lastPosition.y - 100 === position.y;
  }

  private isLeftMove(position: createjs.Container) {
    return this.lastPosition.x -100 === position.x;
  }

  private onBoard() {
    return this.lastPosition.y <= 500;
  }
}


export const ALLOWED_TO_MOVE_DIAGONAL: Position[] = [
  new Position(100,100),
  new Position(100,300),
  new Position(100,300),
  new Position(100,500),
  new Position(200,200),
  new Position(200,400),
  new Position(300,100),
  new Position(300,300),
  new Position(300,500),
  new Position(200,400),
  new Position(400,400),
  new Position(500,100),
  new Position(500,300),
  new Position(500,500)
];
