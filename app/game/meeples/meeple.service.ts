import { Injectable } from '@angular/core';
import { Meeple } from './meeple';
import {Animal} from "./Animal";

declare var createjs: any;

@Injectable()
export class MeepleService {
  private tigers: Array<Meeple> = [];
  private goats: Array<Meeple> = [];


  public initMeeples() : Meeple[]{
    this.tigers = this.createContainer(TIGERS, this);
    this.goats = this.createContainer(GOATS,this);
    return this.tigers.concat(this.goats);
  }

  private createContainer(meeples: Meeple[],meepleService : MeepleService){
  return meeples.map(function(meeple){
      var dragRadius = 20;
      var circle = new createjs.Shape();
      circle.graphics.beginFill(meepleService.getColorForAnimal(meeple.animal)).drawCircle(0, 0, dragRadius);

      meeple.addChild(circle);
      meeple.setBounds(meeple.x, meeple.y, dragRadius*2, dragRadius*2);
      return meeple;
    });
  }

  private getColorForAnimal(animal : Animal){
    switch(animal) {
      case Animal.Tiger:
        return "blue";

      case Animal.Goat:
        return "red";
    }
  }
}



export const TIGERS: Meeple[] = [
  new Meeple(1, 100, 100,Animal.Tiger),
  new Meeple(2, 500, 100,Animal.Tiger),
  new Meeple(3, 100, 500,Animal.Tiger),
  new Meeple(4, 500, 500,Animal.Tiger)
];

export const GOATS: Meeple [] = [
  new Meeple (1, 100,560, Animal.Goat),
  new Meeple (2, 100,610, Animal.Goat),
  new Meeple (3, 100,660, Animal.Goat),
  new Meeple (4, 100,710, Animal.Goat),
  new Meeple (5, 200,560, Animal.Goat),
  new Meeple (6, 200,610, Animal.Goat),
  new Meeple (7, 200,660, Animal.Goat),
  new Meeple (8, 200,710, Animal.Goat),
  new Meeple ( 9, 300,560, Animal.Goat),
  new Meeple (10, 300,610, Animal.Goat),
  new Meeple (11, 300,660, Animal.Goat),
  new Meeple (12, 300,710, Animal.Goat),
  new Meeple (13, 400,560, Animal.Goat),
  new Meeple (14, 400,610, Animal.Goat),
  new Meeple (15, 400,660, Animal.Goat),
  new Meeple (16, 400,710, Animal.Goat),
  new Meeple (17, 500,560, Animal.Goat),
  new Meeple (18, 500,610, Animal.Goat),
  new Meeple (19, 500,660, Animal.Goat),
  new Meeple (20, 500,710, Animal.Goat),

];

