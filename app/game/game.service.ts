import { Injectable } from '@angular/core';
import { Field } from './meeples/field';
import {Meeple} from "./meeples/meeple";
import {Animal} from "./meeples/animal";

declare var createjs: any;

@Injectable()
export class GameService {

  private lastPosition ;
  private currentPlayer : Animal = Animal.Goat;

  public updateLastPosition(x : number, y: number){
    this.lastPosition = this.getPosition(x,y);
    if(!this.lastPosition){
      this.lastPosition = new Field(-1, x,y);
    }
    console.log("x: "+ x + " y: " + y);
  }
    public canMove(x: number, y:number, meeple :Meeple){
      let position = this.getPosition(x,y);
      return this.isMeepleOfCurrentPlayer(meeple) && position && !position.animal && (!this.onBoard() || this.isNFieldsAway(position,1) || this.canJumpOverGoat(position,meeple));
    }

  getFields(){
    return VALID_POSITION;
  }

  public getLastPosition() {
    return this.lastPosition;
  }

  private isNFieldsAway(position: Field, steps:number) {
    return this.isVerticalNeighbour(position,steps) || this.isHorizontalNeighbour(position,steps) || this.isDiagnoalNeighbour(position,steps);
  }

  private isVerticalNeighbour(position: Field, steps:number) {
    return this.lastPosition.x === position.x  && (this.isUpwardsMove(position,steps) || this.isDownWardsMove(position,steps));
  }

  private isHorizontalNeighbour(position: Field, steps:number) {
    return this.lastPosition.y === position.y  && (this.isRightMove(position,steps) || this.isLeftMove(position,steps));
  }

  private isDiagnoalNeighbour(position: Field, steps:number) {
    return this.isAllowedToMoveDiagonal(this.lastPosition) && (this.isRightMove(position,steps) || this.isLeftMove(position,steps)) && (this.isUpwardsMove(position,steps) || this.isDownWardsMove(position,steps));
  }

  private isAllowedToMoveDiagonal(lastPosition: Field) {
    let allowedPositions = ALLOWED_TO_MOVE_DIAGONAL.filter(function(position){
      return lastPosition.x === position.x && lastPosition.y === position.y;
    });
    return allowedPositions.length > 0;
  }

  private isUpwardsMove(position: Field, steps : number) {
    return this.lastPosition.y + 100 * steps === position.y;
  }

  private isRightMove(position: Field, steps : number) {
    return this.lastPosition.x + 100 * steps === position.x;
  }

  private isDownWardsMove(position: Field, steps : number) {

    return this.lastPosition.y - 100 * steps === position.y;
  }

  private isLeftMove(position: Field, steps : number) {
    return this.lastPosition.x -100 * steps === position.x;
  }

  private onBoard() {
    return this.lastPosition.y <= 500;
  }

  moveToField(x : number, y: number, meeple :Meeple) {
    let position : Field = this.getPosition(x,y);
    position.animal = meeple.animal;
    let lastPosition = this.getPosition(this.lastPosition.x,this.lastPosition.y);
    if(lastPosition){
      lastPosition.animal = undefined;
    }
    this.nextPlayer();

  }

  private getPosition(x: number, y: number) : Field {
    return VALID_POSITION.filter(function(position){
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
    for(let i = 0; i< VALID_POSITION.length; i++){
      var match = false;
      let position = VALID_POSITION[i];
      for(let j = 0; j< meeples.length ; j++) {
        let meeple = meeples[j];
        match = meeple.x === position.x && meeple.y === position.y;
        if(match){
          position.animal = meeple.animal;
        }
      }
     }
  }

  private canJumpOverGoat(position: Field, meeple:Meeple) {
    let isTwoFieldsAway = this.isNFieldsAway(position,2);
    let direction = this.getDirection(position);
    let isGoatInbetween = this.isGoatInDirection(this.lastPosition,direction);
  let isTiger = meeple.animal === Animal.Tiger;

    return isTiger && isTwoFieldsAway && isGoatInbetween;
  }

  private getDirection(position: Field) {
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

export const ALLOWED_TO_MOVE_DIAGONAL: Field[] = [
  new Field(0,100,100),
  new Field(1,100,300),
  new Field(2,100,300),
  new Field(3,100,500),
  new Field(4,200,200),
  new Field(5,200,400),
  new Field(6,300,100),
  new Field(7,300,300),
  new Field(8,300,500),
  new Field(9,200,400),
  new Field(10,400,400),
  new Field(11,500,100),
  new Field(12,500,300),
  new Field(13,500,500)
];


export var VALID_POSITION : Field[] = [
  new Field(0,100, 100),
  new Field(1,100, 200),
  new Field(2,100, 300),
  new Field(3,100, 400),
  new Field(4,100, 500),

  new Field(5,200, 100),
  new Field(6,200, 200),
  new Field(7,200, 300),
  new Field(8,200, 400),
  new Field(9,200, 500),

  new Field(10,300, 100),
  new Field(11,300, 200),
  new Field(12,300, 300),
  new Field(13,300, 400),
  new Field(14,300, 500),

  new Field(15,400, 100),
  new Field(16,400, 200),
  new Field(17,400, 300),
  new Field(18,400, 400),
  new Field(19,400, 500),

  new Field(20,500, 100),
  new Field(21,500, 200),
  new Field(22,500, 300),
  new Field(23,500, 400),
  new Field(24,500, 500)
];
