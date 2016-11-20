
import { Component, OnInit } from '@angular/core';
import { PositionService} from './position.service';
import {MeepleService} from "./meeples/meeple.service";
import {GameService} from "./game.service";

declare var createjs: any;

@Component({
  moduleId : module.id,
  selector: 'gameboard',
  templateUrl: 'gameboard.component.html',
})

export class GameboardComponent implements OnInit {
  constructor(
    private positionService: PositionService,
    private meepleService: MeepleService,
    private gameService : GameService) { }

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
      this.addMouseDownEvent(meeple,this.gameService);
      this.addMoveEvent(meeple,stage,this.gameService);
      this.addSnapMeepleToPositionEvent(meeple,stage,this.gameService);
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


  private addMoveEvent(container: createjs.Container, stage :createjs.Stage, gameService : GameService){
    container.on("pressmove", function(evt : createjs.MouseEvent) {
      let meeple = evt.currentTarget;
      meeple.x = evt.stageX;
      meeple.y = evt.stageY;
      stage.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
    });
  }

  private addSnapMeepleToPositionEvent(meeple : createjs.Container, stage :createjs.Stage, gameService : GameService){
    meeple.on("pressup", function(evt: createjs.MouseEvent) {
      let meeple = evt.currentTarget;
      if(gameService.canMove(meeple)){
        let intersectingPosition = gameService.intersectsWithPosition(meeple);


        let box : createjs.DisplayObject = intersectingPosition.getChildAt(0);
        meeple.x = intersectingPosition.x;
        meeple.y = intersectingPosition.y;
        meeple.alpha = 1;
        stage.update(event);
      }
      else{
        meeple.x = gameService.getLastPosition().x;
        meeple.y = gameService.getLastPosition().y;
        stage.update(event);
      }
    });

  }


  private addMouseDownEvent(meeple: createjs.Container, gameService: GameService) {
    meeple.addEventListener("mousedown", function(event : createjs.MouseEvent) {
      gameService.updateLastPosition(event.currentTarget.x,event.currentTarget.y);
    });
  }
}
