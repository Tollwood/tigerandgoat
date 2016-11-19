
import { Component, OnInit } from '@angular/core';
import { Meeple } from './meeples/meeple';
import { PositionService} from './position.service';
import {MeepleService} from "./meeples/meeple.service";

declare var createjs: any;



@Component({
  moduleId : module.id,
  selector: 'gameboard',
  templateUrl: 'gameboard.component.html',
})

export class GameboardComponent implements OnInit {
  constructor(
    private positionService: PositionService,
    private meepleService: MeepleService) { }

  ngOnInit(): void {

    var stage = new createjs.Stage("gameboard");
    this.drawBoard(stage);
    let positions = this.positionService.initValidPositions();
    positions.forEach(function(validPosition) {
      stage.addChild(validPosition);
    });
    let meeples = this.meepleService.initMeeples();
    for(let i = 0; i < meeples.length; i++){
      let meeple = meeples[i];
      this.addMoveEvent(meeple,stage);
      stage.addChild(meeple);


    }
    stage.mouseMoveOutside = true;
    stage.update();
  }

  private drawBoard(stage: createjs.Stage){
    var background = new createjs.Shape();
    background.graphics.beginFill("Black").drawRect(0,0, 600, 800);
    stage.addChild(background);

    for(var i = 0; i< 5 ; i++){
      var backgroundLine = new createjs.Shape();
      backgroundLine.graphics.beginFill("White").drawRect(100,100 + i * 100, 400, 1);
      stage.addChild(backgroundLine);
    }
    for(var i = 0; i< 5 ; i++){
      var backgroundLine = new createjs.Shape();
      backgroundLine.graphics.beginFill("White").drawRect(100 + i * 100,100, 1, 400);
      stage.addChild(backgroundLine);
    }

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,100).lineTo(500,500);
    stage.addChild(diagonalLine);
    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,500).lineTo(500,100);
    stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,300).lineTo(300,500);
    stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,300).lineTo(300,100);
    stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(300,100).lineTo(500,300);
    stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(300,500).lineTo(500,300);
    stage.addChild(diagonalLine);

    return stage;
  }


  private addMoveEvent(container: createjs.Container, stage :createjs.Stage){
    container.on("pressmove", function(evt) {
      evt.currentTarget.x = evt.stageX;
      evt.currentTarget.y = evt.stageY;
      stage.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker

    });
  }


}
