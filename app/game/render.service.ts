import {Injectable, OnInit} from "@angular/core";
import {Meeple} from "./meeples/meeple";
import {GameService} from "./game.service";
import {Position} from "./meeples/position";
declare var createjs: any;

@Injectable()
export class RenderService{

  private stage;

  constructor(private gameService : GameService){}

  initBoard() {
    this.stage = new createjs.Stage("gameboard");
    this.drawBoard();
    this.stage.mouseMoveOutside = true;
    this.stage.update();
  }

  getStage() : createjs.Stage{
    return this.stage;
  }

  private drawBoard(){
    var background = new createjs.Shape();
    background.graphics.beginFill("Black").drawRect(0,0, 600, 800);
    this.stage.addChild(background);

    for(var i = 0; i< 5 ; i++){
      var backgroundLine = new createjs.Shape();
      backgroundLine.graphics.beginFill("White").drawRect(100,100 + i * 100, 400, 1);
      this.stage.addChild(backgroundLine);
    }
    for(var i = 0; i< 5 ; i++){
      var backgroundLine = new createjs.Shape();
      backgroundLine.graphics.beginFill("White").drawRect(100 + i * 100,100, 1, 400);
      this.stage.addChild(backgroundLine);
    }

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,100).lineTo(500,500);
    this.stage.addChild(diagonalLine);
    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,500).lineTo(500,100);
    this.stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,300).lineTo(300,500);
    this.stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(100,300).lineTo(300,100);
    this.stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(300,100).lineTo(500,300);
    this.stage.addChild(diagonalLine);

    var diagonalLine = new createjs.Shape();
    diagonalLine.graphics.beginStroke("White").moveTo(300,500).lineTo(500,300);
    this.stage.addChild(diagonalLine);

    return this.stage;
  }

  renderFields(positions: Position[]) {
    for(let i = 0; i< positions.length; i++){
      this.stage.addChild(positions[i]);
    }
    this.stage.update();
  }

  initMeeples(meeples: Meeple[]) {
    for(let i = 0; i < meeples.length; i++){
      let meeple = meeples[i];
      this.addMouseDownEvent(meeple,this.gameService);
      this.addMoveEvent(meeple,this.stage,this.gameService);
      this.addSnapMeepleToPositionEvent(meeple,this.stage,this.gameService);
      this.getStage().addChild(meeple);
    }
    this.stage.update();
  }


  private addMoveEvent(container: createjs.Container, stage :createjs.Stage, gameService : GameService){
    container.on("pressmove", function(evt : createjs.MouseEvent) {
      let meeple = evt.currentTarget;
      if(gameService.isMeepleOfCurrentPlayer(meeple)){
        meeple.x = evt.stageX;
        meeple.y = evt.stageY;
        stage.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker

      }
    });
  }

  private addSnapMeepleToPositionEvent(meeple : createjs.Container, stage :createjs.Stage, gameService : GameService){
    meeple.on("pressup", function(evt: createjs.MouseEvent) {
      let meeple = evt.currentTarget;
      if(gameService.canMove(meeple)){
        let intersectingPosition = gameService.intersectsWithPosition(meeple);
        gameService.moveToPosition(intersectingPosition,meeple);
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
