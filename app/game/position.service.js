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
var PositionService = (function () {
    function PositionService() {
        this.positions = [];
    }
    PositionService.prototype.initValidPositions = function () {
        this.positions = exports.VALID_POSITION.map(function (position) {
            var destHeight = 50;
            var destWidth = 50;
            var box = new createjs.Shape();
            box.graphics.setStrokeStyle(1).beginStroke("white").rect(0, 0, destHeight, destWidth);
            box.alpha = 1;
            var positionContainer = new createjs.Container();
            positionContainer.x = position.x;
            positionContainer.y = position.y;
            positionContainer.setBounds(positionContainer.x, positionContainer.y, destHeight, destWidth);
            positionContainer.addChild(box);
            return positionContainer;
        });
        return this.positions;
    };
    PositionService.prototype.getPositions = function () {
        return this.positions;
    };
    PositionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PositionService);
    return PositionService;
}());
exports.PositionService = PositionService;
exports.VALID_POSITION = [
    new position_1.Position(75, 75),
    new position_1.Position(75, 175),
    new position_1.Position(75, 275),
    new position_1.Position(75, 375),
    new position_1.Position(75, 475),
    new position_1.Position(175, 75),
    new position_1.Position(175, 175),
    new position_1.Position(175, 275),
    new position_1.Position(175, 375),
    new position_1.Position(175, 475),
    new position_1.Position(275, 75),
    new position_1.Position(275, 175),
    new position_1.Position(275, 275),
    new position_1.Position(275, 375),
    new position_1.Position(275, 475),
    new position_1.Position(375, 75),
    new position_1.Position(375, 175),
    new position_1.Position(375, 275),
    new position_1.Position(375, 375),
    new position_1.Position(375, 475),
    new position_1.Position(475, 75),
    new position_1.Position(475, 175),
    new position_1.Position(475, 275),
    new position_1.Position(475, 375),
    new position_1.Position(475, 475)
];
//# sourceMappingURL=position.service.js.map