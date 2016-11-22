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
var field_1 = require('./meeples/field');
var animal_1 = require("./meeples/animal");
var GameService = (function () {
    function GameService() {
        this.currentPlayer = animal_1.Animal.Goat;
    }
    GameService.prototype.updateLastPosition = function (x, y) {
        this.lastPosition = this.getPosition(x, y);
        if (!this.lastPosition) {
            this.lastPosition = new field_1.Field(-1, x, y);
        }
        console.log("x: " + x + " y: " + y);
    };
    GameService.prototype.canMove = function (x, y, meeple) {
        var position = this.getPosition(x, y);
        return this.isMeepleOfCurrentPlayer(meeple) && position && !position.animal && (!this.onBoard() || this.isNFieldsAway(position, 1) || this.canJumpOverGoat(position, meeple));
    };
    GameService.prototype.getFields = function () {
        return exports.VALID_POSITION;
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
    GameService.prototype.moveToField = function (x, y, meeple) {
        var position = this.getPosition(x, y);
        position.animal = meeple.animal;
        var lastPosition = this.getPosition(this.lastPosition.x, this.lastPosition.y);
        if (lastPosition) {
            lastPosition.animal = undefined;
        }
        this.nextPlayer();
    };
    GameService.prototype.getPosition = function (x, y) {
        return exports.VALID_POSITION.filter(function (position) {
            return position.x === x && position.y === y;
        })[0];
    };
    GameService.prototype.nextPlayer = function () {
        switch (this.currentPlayer) {
            case animal_1.Animal.Goat:
                this.currentPlayer = animal_1.Animal.Tiger;
                break;
            case animal_1.Animal.Tiger:
                this.currentPlayer = animal_1.Animal.Goat;
                break;
        }
    };
    GameService.prototype.isMeepleOfCurrentPlayer = function (meeple) {
        return meeple.animal === this.currentPlayer;
    };
    GameService.prototype.updateFields = function (meeples) {
        for (var i = 0; i < exports.VALID_POSITION.length; i++) {
            var match = false;
            var position = exports.VALID_POSITION[i];
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
        var direction = this.getDirection(position);
        var isGoatInbetween = this.isGoatInDirection(this.lastPosition, direction);
        var isTiger = meeple.animal === animal_1.Animal.Tiger;
        return isTiger && isTwoFieldsAway && isGoatInbetween;
    };
    GameService.prototype.getDirection = function (position) {
        if (this.lastPosition.x === position.x && this.lastPosition.y > position.y) {
            return Direction.UP;
        }
        if (this.lastPosition.x === position.x && this.lastPosition.y < position.y) {
            return Direction.DOWN;
        }
        if (this.lastPosition.x < position.x && this.lastPosition.y === position.y) {
            return Direction.RIGHT;
        }
        if (this.lastPosition.x > position.x && this.lastPosition.y === position.y) {
            return Direction.LEFT;
        }
        if (this.lastPosition.x < position.x && this.lastPosition.y < position.y) {
            return Direction.DOWN_RIGHT;
        }
        if (this.lastPosition.x < position.x && this.lastPosition.y > position.y) {
            return Direction.UP_RIGHT;
        }
        if (this.lastPosition.x > position.x && this.lastPosition.y > position.y) {
            return Direction.UP_LEFT;
        }
        if (this.lastPosition.x > position.x && this.lastPosition.y < position.y) {
            return Direction.DOWN_LEFT;
        }
    };
    GameService.prototype.isGoatInDirection = function (lastPosition, direction) {
        var positionToCheckForGoat;
        switch (direction) {
            case Direction.UP:
                positionToCheckForGoat = this.getPosition(lastPosition.x, lastPosition.y - 100);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.UP_RIGHT:
                positionToCheckForGoat = this.getPosition(lastPosition.x + 100, lastPosition.y - 100);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.RIGHT:
                positionToCheckForGoat = this.getPosition(lastPosition.x + 100, lastPosition.y);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.DOWN_RIGHT:
                positionToCheckForGoat = this.getPosition(lastPosition.x + 100, lastPosition.y + 100);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.DOWN:
                positionToCheckForGoat = this.getPosition(lastPosition.x, lastPosition.y + 100);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.DOWN_LEFT:
                positionToCheckForGoat = this.getPosition(lastPosition.x - 100, lastPosition.y + 100);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.LEFT:
                positionToCheckForGoat = this.getPosition(lastPosition.x - 100, lastPosition.y);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
            case Direction.UP_LEFT:
                positionToCheckForGoat = this.getPosition(lastPosition.x - 100, lastPosition.y - 100);
                return positionToCheckForGoat.animal === animal_1.Animal.Goat;
        }
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
(function (Direction) {
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["UP_LEFT"] = 2] = "UP_LEFT";
    Direction[Direction["LEFT"] = 3] = "LEFT";
    Direction[Direction["DOWN_LEFT"] = 4] = "DOWN_LEFT";
    Direction[Direction["DOWN"] = 5] = "DOWN";
    Direction[Direction["DOWN_RIGHT"] = 6] = "DOWN_RIGHT";
    Direction[Direction["RIGHT"] = 7] = "RIGHT";
    Direction[Direction["UP_RIGHT"] = 8] = "UP_RIGHT";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
exports.ALLOWED_TO_MOVE_DIAGONAL = [
    new field_1.Field(0, 100, 100),
    new field_1.Field(1, 100, 300),
    new field_1.Field(2, 100, 300),
    new field_1.Field(3, 100, 500),
    new field_1.Field(4, 200, 200),
    new field_1.Field(5, 200, 400),
    new field_1.Field(6, 300, 100),
    new field_1.Field(7, 300, 300),
    new field_1.Field(8, 300, 500),
    new field_1.Field(9, 200, 400),
    new field_1.Field(10, 400, 400),
    new field_1.Field(11, 500, 100),
    new field_1.Field(12, 500, 300),
    new field_1.Field(13, 500, 500)
];
exports.VALID_POSITION = [
    new field_1.Field(0, 100, 100),
    new field_1.Field(1, 100, 200),
    new field_1.Field(2, 100, 300),
    new field_1.Field(3, 100, 400),
    new field_1.Field(4, 100, 500),
    new field_1.Field(5, 200, 100),
    new field_1.Field(6, 200, 200),
    new field_1.Field(7, 200, 300),
    new field_1.Field(8, 200, 400),
    new field_1.Field(9, 200, 500),
    new field_1.Field(10, 300, 100),
    new field_1.Field(11, 300, 200),
    new field_1.Field(12, 300, 300),
    new field_1.Field(13, 300, 400),
    new field_1.Field(14, 300, 500),
    new field_1.Field(15, 400, 100),
    new field_1.Field(16, 400, 200),
    new field_1.Field(17, 400, 300),
    new field_1.Field(18, 400, 400),
    new field_1.Field(19, 400, 500),
    new field_1.Field(20, 500, 100),
    new field_1.Field(21, 500, 200),
    new field_1.Field(22, 500, 300),
    new field_1.Field(23, 500, 400),
    new field_1.Field(24, 500, 500)
];
//# sourceMappingURL=game.service.js.map