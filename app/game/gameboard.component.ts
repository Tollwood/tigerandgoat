import { Component, OnInit } from '@angular/core';
import { Tiger } from './meeples/tiger';
import { Goat } from './meeples/goat';
import { Meeple } from './meeples/meeple';
import { Position } from './meeples/position';
import Stage = createjs.Stage;

declare var createjs: any;
var destHeight = 50;
var destWidth = 50;
var position;

@Component({
  moduleId : module.id,
  selector: 'gameboard',
  templateUrl: 'gameboard.component.html',
})

export class GameboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

    var stage = this.drawBoard();

    var destHeight = 50;
    var destWidth = 50;
    var box = new createjs.Shape();
    box.graphics.setStrokeStyle(1).beginStroke("black").rect(0, 0, destHeight, destWidth);

    position = new createjs.Container();
    position.x = 75;
    position.y = 175;
    position.setBounds(position.x, position.y, destHeight, destWidth);
    position.addChild(box);
    stage.addChild(position);

    this.drawMeeple(stage, TIGERS);
    this.drawMeeple(stage, GOATS);
    stage.mouseMoveOutside = true;
    stage.update();
  }

  private drawMeeple(stage: createjs.Stage, meeples: Meeple[]) {
    for(let meeple of meeples){
      var dragRadius = 20;
      var circle = new createjs.Shape();
      circle.graphics.beginFill(meeple.color).drawCircle(0, 0, dragRadius);

      var tigerShape = new createjs.Container();
      tigerShape.x = meeple.position.x;
      tigerShape.y = meeple.position.y;
      tigerShape.addChild(circle);
      tigerShape.setBounds(meeple.position.x, meeple.position.y, dragRadius*2, dragRadius*2);
      stage.addChild(tigerShape);


      tigerShape.on("pressmove",function(evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        // make sure to redraw the stage to show the change:
        stage.update();
        var destination = intersectWith(evt.currentTarget)

        if(destination){

          evt.currentTarget.alpha=0.2;
          var box = destination.getChildAt(0);
          box.graphics.clear();
          box.getChildAt(0).graphics.setStrokeStyle(3)
            .beginStroke("#0066A4")
            .rect(0, 0, destHeight, destWidth);

        }else{
          evt.currentTarget.alpha=1;
          box.graphics.clear();     box.graphics.setStrokeStyle(2).beginStroke("black").rect(0, 0, destHeight, destWidth);
        }



      });

      //Mouse UP and SNAP====================
      tigerShape.on("pressup", function(evt) {
        var destination = intersectWith(evt.currentTarget)
        if(destination){
          tigerShape.x = destination.x + destWidth/2;
          tigerShape.y = destination.y + destHeight/2;
          tigerShape.alpha = 1;
          var box = destination.getChildAt(0);
          box.graphics.clear();
          box.graphics.setStrokeStyle(2).beginStroke("black").rect(0, 0, destHeight, destWidth);
          stage.update();
        }
      });

      stage.addChild(tigerShape);
    }
  }



  private drawBoard(){
    var stage = new createjs.Stage("gameboard");
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

}


//Tests if two objects are intersecting
//Sees if obj1 passes through the first and last line of its
//bounding box in the x and y sectors
//Utilizes globalToLocal to get the x and y of obj1 in relation
//to obj2
//PRE: Must have bounds set for each object
//Post: Returns true or false
function intersectWith(obj1){

  var obj2 = position;
  var objBounds1 = obj1.getBounds().clone();
  var objBounds2 = obj2.getBounds().clone();

  var pt = obj1.globalToLocal(objBounds2.x, objBounds2.y);

  var h1 = -(objBounds1.height / 2 + objBounds2.height);
  var h2 = objBounds2.width / 2;
  var w1 = -(objBounds1.width / 2 + objBounds2.width);
  var w2 = objBounds2.width / 2;

  if(pt.x > w2 || pt.x < w1) return undefined;
  if(pt.y > h2 || pt.y < h1) return undefined;

  return position;
}
export const TIGERS: Tiger[] = [
  new Tiger(1, <Position>{x: 100, y: 100})
  /*,
  new Tiger(2, <Position>{x:500,y:100}),
  new Tiger(3, <Position>{x:100,y:500}),
  new Tiger(4, <Position>{x:500,y:500})
*/
];

export const GOATS: Goat [] = [
  new Goat(1, <Position>{x:100,y:560}),
  new Goat(2, <Position>{x:100,y:610}),
  new Goat(3, <Position>{x:100,y:660}),
  new Goat(4, <Position>{x:100,y:710}),

  new Goat(5, <Position>{x:200,y:560}),
  new Goat(6, <Position>{x:200,y:610}),
  new Goat(7, <Position>{x:200,y:660}),
  new Goat(8, <Position>{x:200,y:710}),

  new Goat(9, <Position>{x:300,y:560}),
  new Goat(10, <Position>{x:300,y:610}),
  new Goat(11, <Position>{x:300,y:660}),
  new Goat(12, <Position>{x:300,y:710}),

  new Goat(13, <Position>{x:400,y:560}),
  new Goat(14, <Position>{x:400,y:610}),
  new Goat(15, <Position>{x:400,y:660}),
  new Goat(16, <Position>{x:400,y:710}),

  new Goat(17, <Position>{x:500,y:560}),
  new Goat(18, <Position>{x:500,y:610}),
  new Goat(19, <Position>{x:500,y:660}),
  new Goat(20, <Position>{x:500,y:710})
];

export const VALID_POSITION : Position[] = [
  {x: 100, y: 100},
  {x: 100, y: 200},
  {x: 100, y: 300},
  {x: 100, y: 400},
  {x: 100, y: 500},
  {x: 200, y: 100},
  {x: 200, y: 200},
  {x: 200, y: 300},
  {x: 200, y: 400},
  {x: 200, y: 500},
  {x: 300, y: 100},
  {x: 300, y: 200},
  {x: 300, y: 300},
  {x: 300, y: 400},
  {x: 300, y: 500},
  {x: 400, y: 100},
  {x: 400, y: 200},
  {x: 400, y: 300},
  {x: 400, y: 400},
  {x: 400, y: 500},
  {x: 500, y: 100},
  {x: 500, y: 200},
  {x: 500, y: 300},
  {x: 500, y: 400},
  {x: 500, y: 500},
];




