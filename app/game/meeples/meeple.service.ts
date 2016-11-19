import { Injectable } from '@angular/core';
import { Meeple } from './meeple';

declare var createjs: any;

@Injectable()
export class MeepleService {
  private tigers: Array<createjs.Container> = [];
  private goats: Array<createjs.Container> = [];


  public initMeeples(){
    this.tigers = this.createContainer(TIGERS);
    this.goats = this.createContainer(GOATS);
    return this.tigers.concat(this.goats);
  }

  private createContainer(meeples: Meeple[]){
  return meeples.map(function(meeple){
      var dragRadius = 20;
      var circle = new createjs.Shape();
      circle.graphics.beginFill(meeple.color).drawCircle(0, 0, dragRadius);

      var container = new createjs.Container();
      container.x = meeple.x;
      container.y = meeple.y;
      container.addChild(circle);
      container.setBounds(meeple.x, meeple.y, dragRadius*2, dragRadius*2);
      return container;
    });
  }
}


export const TIGERS: Meeple[] = [
  new Meeple(1, 100, 100,"blue"),
  new Meeple(2, 500, 100,"blue"),
  new Meeple(3, 100, 500,"blue"),
  new Meeple(4, 500, 500,"blue")
];

export const GOATS: Meeple [] = [
  new Meeple (1, 100,560, "red"),
  new Meeple (2, 100,610, "red"),
  new Meeple (3, 100,660, "red"),
  new Meeple (4, 100,710, "red"),
  new Meeple (5, 200,560, "red"),
  new Meeple (6, 200,610, "red"),
  new Meeple (7, 200,660, "red"),
  new Meeple (8, 200,710, "red"),
  new Meeple ( 9, 300,560, "red"),
  new Meeple (10, 300,610, "red"),
  new Meeple (11, 300,660, "red"),
  new Meeple (12, 300,710, "red"),
  new Meeple (13, 400,560, "red"),
  new Meeple (14, 400,610, "red"),
  new Meeple (15, 400,660, "red"),
  new Meeple (16, 400,710, "red"),
  new Meeple (17, 500,560, "red"),
  new Meeple (18, 500,610, "red"),
  new Meeple (19, 500,660, "red"),
  new Meeple (20, 500,710, "red"),

];

