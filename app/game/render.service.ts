import {Injectable} from "@angular/core";
import {Meeple} from "./meeples/meeple";
import {GameService} from "./game.service";
import {Position} from "./meeples/position";
declare var createjs: any;

@Injectable()
export class RenderService{

  private stage;
  private fields : Array<createjs.Container> = [];
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
        let field = positions[i];
        let destHeight = 50;
        let destWidth = 50;
        let box = new createjs.Shape();
        box.graphics.setStrokeStyle(1).beginStroke("white").rect(-25, -25, destHeight, destWidth);
        box.alpha = 1;
      let fieldContainer = new createjs.Container();
      fieldContainer.id = field.id;
      fieldContainer.x = field.x;
      fieldContainer.y = field.y;
      fieldContainer.setBounds(field.x , field.y -25, destWidth, destHeight);
      fieldContainer.addChild(box);
      this.stage.addChild(fieldContainer);
      this.fields.push(fieldContainer);

    }
    this.stage.update();
  }

  initMeeples(meeples: Meeple[]) {
    for(let i = 0; i < meeples.length; i++){
      let meeple = meeples[i];
      this.addMouseDownEvent(meeple,this.gameService);
      this.addMoveEvent(meeple,this.stage,this.gameService);
      this.addSnapMeepleToPositionEvent(meeple,this.stage,this.gameService,this);
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

  private addSnapMeepleToPositionEvent(meeple : createjs.Container, stage :createjs.Stage, gameService : GameService,renderService : RenderService){
    meeple.on("pressup", function(evt: createjs.MouseEvent) {
      let meeple = evt.currentTarget;
      let position = renderService.intersectsWithField(meeple);
      if(position && gameService.canMove(position.x, position.y,meeple)){
        let intersectingPosition = renderService.intersectsWithField(meeple);
        gameService.moveToField(intersectingPosition.x,intersectingPosition.y,meeple);
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

  public intersectsWithField(meeple : createjs.Container) :createjs.Container {
    let intersectingFields = this.fields.filter(function (field) {
      var objBounds2 = field.getBounds().clone();
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
    if(intersectingFields.length > 0){
      return intersectingFields[0];
    }
    return;
  }
}
