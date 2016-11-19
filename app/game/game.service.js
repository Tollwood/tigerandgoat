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
var position_1 = require('./meeples/position');
var position_service_1 = require("./position.service");
var GameService = (function () {
    function GameService(positionService) {
        this.positionService = positionService;
        this.lastPosition = new position_1.Position(0, 0, false);
    }
    GameService.prototype.updateLastPosition = function (x, y) {
        this.lastPosition.x = x;
        this.lastPosition.y = y;
        console.log("x: " + x + " y: " + y);
    };
    GameService.prototype.canMove = function (meeple) {
        var position = this.intersectsWithPosition(meeple);
        return position && (!this.onBoard() || this.isNeighbourField(position));
    };
    GameService.prototype.intersectsWithPosition = function (meeple) {
        var intersectionPositions = this.positionService.getPositions().filter(function (position) {
            var objBounds2 = position.getBounds().clone();
            var objBounds1 = meeple.getBounds().clone();
            var pt = meeple.globalToLocal(objBounds2.x, objBounds2.y);
            var h1 = -(objBounds1.height / 2 + objBounds2.height);
            var h2 = objBounds2.width / 2;
            var w1 = -(objBounds1.width / 2 + objBounds2.width);
            var w2 = objBounds2.width / 2;
            if (pt.x > w2 || pt.x < w1)
                return false;
            if (pt.y > h2 || pt.y < h1)
                return false;
            return true;
        });
        if (intersectionPositions.length > 0) {
            return intersectionPositions[0];
        }
        return;
    };
    GameService.prototype.getLastPosition = function () {
        return this.lastPosition;
    };
    GameService.prototype.isNeighbourField = function (position) {
        return this.isVerticalNeighbour(position) || this.isHorizontalNeighbour(position) || this.isDiagnoalNeighbour(position);
    };
    GameService.prototype.isVerticalNeighbour = function (position) {
        return this.lastPosition.x === position.x + 25 && (this.isUpwardsMove(position) || this.isDownWardsMove(position));
    };
    GameService.prototype.isHorizontalNeighbour = function (position) {
        return this.lastPosition.y === position.y + 25 && (this.isRightMove(position) || this.isLeftMove(position));
    };
    GameService.prototype.isDiagnoalNeighbour = function (position) {
        return this.isAllowedToMoveDiagonal(this.lastPosition) && (this.isRightMove(position) || this.isLeftMove(position)) && (this.isUpwardsMove(position) || this.isDownWardsMove(position));
    };
    GameService.prototype.isAllowedToMoveDiagonal = function (lastPosition) {
        var allowedPositions = exports.ALLOWED_TO_MOVE_DIAGONAL.filter(function (position) {
            return lastPosition.x === position.x && lastPosition.y === position.y;
        });
        return allowedPositions.length > 0;
    };
    GameService.prototype.isUpwardsMove = function (position) {
        return this.lastPosition.y + 75 === position.y;
    };
    GameService.prototype.isRightMove = function (position) {
        return this.lastPosition.x + 75 === position.x;
    };
    GameService.prototype.isDownWardsMove = function (position) {
        return this.lastPosition.y - 125 === position.y;
    };
    GameService.prototype.isLeftMove = function (position) {
        return this.lastPosition.x - 125 === position.x;
    };
    GameService.prototype.onBoard = function () {
        return this.lastPosition.y <= 500;
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [position_service_1.PositionService])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
exports.ALLOWED_TO_MOVE_DIAGONAL = [
    new position_1.Position(100, 100, false),
    new position_1.Position(100, 300, false),
    new position_1.Position(100, 500, false),
    new position_1.Position(200, 200, false),
    new position_1.Position(200, 400, false),
    new position_1.Position(100, 300, false),
    new position_1.Position(300, 300, false),
    new position_1.Position(300, 500, false),
    new position_1.Position(200, 400, false),
    new position_1.Position(400, 400, false),
    new position_1.Position(100, 500, false),
    new position_1.Position(300, 500, false),
    new position_1.Position(500, 500, false)
];
//# sourceMappingURL=game.service.js.map