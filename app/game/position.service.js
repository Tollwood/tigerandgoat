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
    new position_1.Position(100, 100),
    new position_1.Position(100, 200),
    new position_1.Position(100, 300),
    new position_1.Position(100, 400),
    new position_1.Position(100, 500),
    new position_1.Position(200, 100),
    new position_1.Position(200, 200),
    new position_1.Position(200, 300),
    new position_1.Position(200, 400),
    new position_1.Position(200, 500),
    new position_1.Position(300, 100),
    new position_1.Position(300, 200),
    new position_1.Position(300, 300),
    new position_1.Position(300, 400),
    new position_1.Position(300, 500),
    new position_1.Position(400, 100),
    new position_1.Position(400, 200),
    new position_1.Position(400, 300),
    new position_1.Position(400, 400),
    new position_1.Position(400, 500),
    new position_1.Position(500, 100),
    new position_1.Position(500, 200),
    new position_1.Position(500, 300),
    new position_1.Position(500, 400),
    new position_1.Position(500, 500)
];
//# sourceMappingURL=position.service.js.map