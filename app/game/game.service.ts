import { Injectable } from '@angular/core';
import { Position } from './meeples/position';
import {PositionService} from "./position.service";
import {Meeple} from "./meeples/meeple";
import {Animal} from "./meeples/Animal";

declare var createjs: any;

@Injectable()
export class GameService {

  private lastPosition ;
  private currentPlayer : Animal = Animal.Goat;

  constructor(private positionService : PositionService){}

  public updateLastPosition(x : number, y: number){
    this.lastPosition = this.getPosition(x,y);
    if(!this.lastPosition){
      this.lastPosition = new Position(x,y);
    }
    console.log("x: "+ x + " y: " + y);
  }
    public canMove(meeple :Meeple){
      let position =this.intersectsWithPosition(meeple);
      return this.isMeepleOfCurrentPlayer(meeple) && position && !position.animal && (!this.onBoard() || this.isNFieldsAway(position,1) || this.canJumpOverGoat(position,meeple));
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

  private isNFieldsAway(position: createjs.Container,steps:number) {
    return this.isVerticalNeighbour(position,steps) || this.isHorizontalNeighbour(position,steps) || this.isDiagnoalNeighbour(position,steps);
  }

  private isVerticalNeighbour(position: createjs.Container,steps:number) {
    return this.lastPosition.x === position.x  && (this.isUpwardsMove(position,steps) || this.isDownWardsMove(position,steps));
  }

  private isHorizontalNeighbour( position: createjs.Container,steps:number) {
    return this.lastPosition.y === position.y  && (this.isRightMove(position,steps) || this.isLeftMove(position,steps));
  }

  private isDiagnoalNeighbour(position: createjs.Container,steps:number) {
    return this.isAllowedToMoveDiagonal(this.lastPosition) && (this.isRightMove(position,steps) || this.isLeftMove(position,steps)) && (this.isUpwardsMove(position,steps) || this.isDownWardsMove(position,steps));
  }

  private isAllowedToMoveDiagonal(lastPosition: Position) {
    let allowedPositions = ALLOWED_TO_MOVE_DIAGONAL.filter(function(position){
      return lastPosition.x === position.x && lastPosition.y === position.y;
    });
    return allowedPositions.length > 0;
  }

  private isUpwardsMove(position: createjs.Container,steps : number) {
    return this.lastPosition.y + 100 * steps === position.y;
  }

  private isRightMove(position: createjs.Container,steps : number) {
    return this.lastPosition.x + 100 * steps === position.x;
  }

  private isDownWardsMove(position: createjs.Container,steps : number) {

    return this.lastPosition.y - 100 * steps === position.y;
  }

  private isLeftMove(position: createjs.Container,steps : number) {
    return this.lastPosition.x -100 * steps === position.x;
  }

  private onBoard() {
    return this.lastPosition.y <= 500;
  }

  moveToPosition(intersectingPosition: Position, meeple :Meeple) {
    intersectingPosition.animal = meeple.animal;
    let position = this.getPosition(this.lastPosition.x,this.lastPosition.y);
    if(position){
      position.animal = undefined;
    }
    this.nextPlayer();

  }

  private getPosition(x: number, y: number) : Position {
    return this.positionService.getPositions().filter(function(position){
        return position.x === x && position.y ===y;
    })[0];
  }

  private nextPlayer(){
    switch (this.currentPlayer){
      case Animal.Goat:
        this.currentPlayer = Animal.Tiger;
        break;
      case Animal.Tiger:
        this.currentPlayer = Animal.Goat;
        break;
    }
  }
  isMeepleOfCurrentPlayer(meeple: Meeple) {
    return meeple.animal === this.currentPlayer;

  }

  updateFields(meeples: Meeple[]) {
    let positions = this.positionService.getPositions();
    for(let i = 0; i< positions.length; i++){
      var match = false;
      let position = positions[i];
      for(let j = 0; j< meeples.length ; j++) {
        let meeple = meeples[j];
        match = meeple.x === position.x && meeple.y === position.y;
        if(match){
          position.animal = meeple.animal;
        }
      }
     }
  }

  private canJumpOverGoat(position: createjs.Container, meeple:Meeple) {
    let isTwoFieldsAway = this.isNFieldsAway(position,2);
    let direction = this.getDirection(position);
    let isGoatInbetween = this.isGoatInDirection(this.lastPosition,direction);
  let isTiger = meeple.animal === Animal.Tiger;

    return isTiger && isTwoFieldsAway && isGoatInbetween;
  }

  private getDirection(position: createjs.Container) {
    if(this.lastPosition.x === position.x && this.lastPosition.y > position.y){
      return Direction.UP;
    }
    if(this.lastPosition.x === position.x && this.lastPosition.y < position.y){
      return Direction.DOWN;
    }
    if(this.lastPosition.x < position.x && this.lastPosition.y === position.y){
      return Direction.RIGHT;
    }
    if(this.lastPosition.x > position.x && this.lastPosition.y === position.y){
      return Direction.LEFT;
    }
    if(this.lastPosition.x < position.x && this.lastPosition.y < position.y){
      return Direction.DOWN_RIGHT;
    }
    if(this.lastPosition.x < position.x && this.lastPosition.y > position.y){
      return Direction.UP_RIGHT;
    }
    if(this.lastPosition.x > position.x && this.lastPosition.y > position.y){
      return Direction.UP_LEFT;
    }
    if(this.lastPosition.x > position.x && this.lastPosition.y < position.y){
      return Direction.DOWN_LEFT;
    }

  }

  private isGoatInDirection(lastPosition: any, direction: Direction|Direction|Direction|Direction|Direction|Direction|any) {
    let positionToCheckForGoat;
    switch(direction){
      case Direction.UP:
        positionToCheckForGoat = this.getPosition(lastPosition.x, lastPosition.y -100);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.UP_RIGHT:
        positionToCheckForGoat = this.getPosition(lastPosition.x + 100, lastPosition.y -100);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.RIGHT:
        positionToCheckForGoat = this.getPosition(lastPosition.x + 100, lastPosition.y);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.DOWN_RIGHT:
        positionToCheckForGoat = this.getPosition(lastPosition.x + 100, lastPosition.y +100);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.DOWN:
        positionToCheckForGoat = this.getPosition(lastPosition.x, lastPosition.y +100);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.DOWN_LEFT:
        positionToCheckForGoat = this.getPosition(lastPosition.x -100, lastPosition.y +100);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.LEFT:
        positionToCheckForGoat = this.getPosition(lastPosition.x- 100 , lastPosition.y);
        return positionToCheckForGoat.animal === Animal.Goat;
      case Direction.UP_LEFT:
        positionToCheckForGoat = this.getPosition(lastPosition.x -100, lastPosition.y -100);
        return positionToCheckForGoat.animal === Animal.Goat;
      }
    }
}

export enum Direction {
  UP = 1,
  UP_LEFT,
  LEFT,
  DOWN_LEFT,
  DOWN,
  DOWN_RIGHT,
  RIGHT,
  UP_RIGHT
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
