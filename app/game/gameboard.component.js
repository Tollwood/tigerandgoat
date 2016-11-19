"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var position_service_1 = require('./position.service');
var meeple_service_1 = require("./meeples/meeple.service");
var GameboardComponent = (function () {
    function GameboardComponent(positionService, meepleService) {
        this.positionService = positionService;
        this.meepleService = meepleService;
    }
    GameboardComponent.prototype.ngOnInit = function () {
        var stage = new createjs.Stage("gameboard");
        this.drawBoard(stage);
        var positions = this.positionService.initValidPositions();
        positions.forEach(function (validPosition) {
            stage.addChild(validPosition);
        });
        var meeples = this.meepleService.initMeeples();
        for (var i = 0; i < meeples.length; i++) {
            var meeple = meeples[i];
            this.addMoveEvent(meeple, stage);
            stage.addChild(meeple);
        }
        stage.mouseMoveOutside = true;
        stage.update();
    };
    GameboardComponent.prototype.drawBoard = function (stage) {
        var background = new createjs.Shape();
        background.graphics.beginFill("Black").drawRect(0, 0, 600, 800);
        stage.addChild(background);
        for (var i = 0; i < 5; i++) {
            var backgroundLine = new createjs.Shape();
            backgroundLine.graphics.beginFill("White").drawRect(100, 100 + i * 100, 400, 1);
            stage.addChild(backgroundLine);
        }
        for (var i = 0; i < 5; i++) {
            var backgroundLine = new createjs.Shape();
            backgroundLine.graphics.beginFill("White").drawRect(100 + i * 100, 100, 1, 400);
            stage.addChild(backgroundLine);
        }
        var diagonalLine = new createjs.Shape();
        diagonalLine.graphics.beginStroke("White").moveTo(100, 100).lineTo(500, 500);
        stage.addChild(diagonalLine);
        var diagonalLine = new createjs.Shape();
        diagonalLine.graphics.beginStroke("White").moveTo(100, 500).lineTo(500, 100);
        stage.addChild(diagonalLine);
        var diagonalLine = new createjs.Shape();
        diagonalLine.graphics.beginStroke("White").moveTo(100, 300).lineTo(300, 500);
        stage.addChild(diagonalLine);
        var diagonalLine = new createjs.Shape();
        diagonalLine.graphics.beginStroke("White").moveTo(100, 300).lineTo(300, 100);
        stage.addChild(diagonalLine);
        var diagonalLine = new createjs.Shape();
        diagonalLine.graphics.beginStroke("White").moveTo(300, 100).lineTo(500, 300);
        stage.addChild(diagonalLine);
        var diagonalLine = new createjs.Shape();
        diagonalLine.graphics.beginStroke("White").moveTo(300, 500).lineTo(500, 300);
        stage.addChild(diagonalLine);
        return stage;
    };
    GameboardComponent.prototype.addMoveEvent = function (container, stage) {
        container.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX;
            evt.currentTarget.y = evt.stageY;
            stage.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
        });
    };
    GameboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gameboard',
            templateUrl: 'gameboard.component.html',
        }), 
        __metadata('design:paramtypes', [position_service_1.PositionService, meeple_service_1.MeepleService])
    ], GameboardComponent);
    return GameboardComponent;
}());
exports.GameboardComponent = GameboardComponent;
//# sourceMappingURL=gameboard.component.js.map