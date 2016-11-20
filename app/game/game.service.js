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
var Animal_1 = require("./meeples/Animal");
var GameService = (function () {
    function GameService(positionService) {
        this.positionService = positionService;
        this.currentPlayer = Animal_1.Animal.Goat;
    }
    GameService.prototype.updateLastPosition = function (x, y) {
        this.lastPosition = this.getPosition(x, y);
        if (!this.lastPosition) {
            this.lastPosition = new position_1.Position(x, y);
        }
        console.log("x: " + x + " y: " + y);
    };
    GameService.prototype.canMove = function (meeple) {
        var position = this.intersectsWithPosition(meeple);
        return this.isMeepleOfCurrentPlayer(meeple) && position && !position.animal && (!this.onBoard() || this.isNFieldsAway(position, 1) || this.canJumpOverGoat(position, meeple));
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
    GameService.prototype.isNFieldsAway = function (position, steps) {
        return this.isVerticalNeighbour(position, steps) || this.isHorizontalNeighbour(position, steps) || this.isDiagnoalNeighbour(position, steps);
    };
    GameService.prototype.isVerticalNeighbour = function (position, steps) {
        return this.lastPosition.x === position.x && (this.isUpwardsMove(position, steps) || this.isDownWardsMove(position, steps));
    };
    GameService.prototype.isHorizontalNeighbour = function (position, steps) {
        return this.lastPosition.y === position.y && (this.isRightMove(position, steps) || this.isLeftMove(position, steps));
    };
    GameService.prototype.isDiagnoalNeighbour = function (position, steps) {
        return this.isAllowedToMoveDiagonal(this.lastPosition) && (this.isRightMove(position, steps) || this.isLeftMove(position, steps)) && (this.isUpwardsMove(position, steps) || this.isDownWardsMove(position, steps));
    };
    GameService.prototype.isAllowedToMoveDiagonal = function (lastPosition) {
        var allowedPositions = exports.ALLOWED_TO_MOVE_DIAGONAL.filter(function (position) {
            return lastPosition.x === position.x && lastPosition.y === position.y;
        });
        return allowedPositions.length > 0;
    };
    GameService.prototype.isUpwardsMove = function (position, steps) {
        return this.lastPosition.y + 100 * steps === position.y;
    };
    GameService.prototype.isRightMove = function (position, steps) {
        return this.lastPosition.x + 100 * steps === position.x;
    };
    GameService.prototype.isDownWardsMove = function (position, steps) {
        return this.lastPosition.y - 100 * steps === position.y;
    };
    GameService.prototype.isLeftMove = function (position, steps) {
        return this.lastPosition.x - 100 * steps === position.x;
    };
    GameService.prototype.onBoard = function () {
        return this.lastPosition.y <= 500;
    };
    GameService.prototype.moveToPosition = function (intersectingPosition, meeple) {
        intersectingPosition.animal = meeple.animal;
        var position = this.getPosition(this.lastPosition.x, this.lastPosition.y);
        if (position) {
            position.animal = undefined;
        }
        this.nextPlayer();
    };
    GameService.prototype.getPosition = function (x, y) {
        return this.positionService.getPositions().filter(function (position) {
            return position.x === x && position.y === y;
        })[0];
    };
    GameService.prototype.nextPlayer = function () {
        switch (this.currentPlayer) {
            case Animal_1.Animal.Goat:
                this.currentPlayer = Animal_1.Animal.Tiger;
                break;
            case Animal_1.Animal.Tiger:
                this.currentPlayer = Animal_1.Animal.Goat;
                break;
        }
    };
    GameService.prototype.isMeepleOfCurrentPlayer = function (meeple) {
        return meeple.animal === this.currentPlayer;
    };
    GameService.prototype.updateFields = function (meeples) {
        var positions = this.positionService.getPositions();
        for (var i = 0; i < positions.length; i++) {
            var match = false;
            var position = positions[i];
            for (var j = 0; j < meeples.length; j++) {
                var meeple = meeples[j];
                match = meeple.x === position.x && meeple.y === position.y;
                if (match) {
                    position.animal = meeple.animal;
                }
            }
        }
    };
    GameService.prototype.canJumpOverGoat = function (position, meeple) {
        var isTwoFieldsAway = this.isNFieldsAway(position, 2);
        var isTiger = meeple.animal === Animal_1.Animal.Tiger;
        var isGoatInbetween = true;
        return isTiger && isTwoFieldsAway && isGoatInbetween;
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [position_service_1.PositionService])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
exports.ALLOWED_TO_MOVE_DIAGONAL = [
    new position_1.Position(100, 100),
    new position_1.Position(100, 300),
    new position_1.Position(100, 300),
    new position_1.Position(100, 500),
    new position_1.Position(200, 200),
    new position_1.Position(200, 400),
    new position_1.Position(300, 100),
    new position_1.Position(300, 300),
    new position_1.Position(300, 500),
    new position_1.Position(200, 400),
    new position_1.Position(400, 400),
    new position_1.Position(500, 100),
    new position_1.Position(500, 300),
    new position_1.Position(500, 500)
];
//# sourceMappingURL=game.service.js.map