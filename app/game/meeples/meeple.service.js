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
var meeple_1 = require('./meeple');
var Animal_1 = require("./Animal");
var MeepleService = (function () {
    function MeepleService() {
        this.tigers = [];
        this.goats = [];
    }
    MeepleService.prototype.initMeeples = function () {
        this.tigers = this.createContainer(exports.TIGERS, this);
        this.goats = this.createContainer(exports.GOATS, this);
        return this.tigers.concat(this.goats);
    };
    MeepleService.prototype.createContainer = function (meeples, meepleService) {
        return meeples.map(function (meeple) {
            var dragRadius = 20;
            var circle = new createjs.Shape();
            circle.graphics.beginFill(meepleService.getColorForAnimal(meeple.animal)).drawCircle(0, 0, dragRadius);
            meeple.addChild(circle);
            meeple.setBounds(meeple.x, meeple.y, dragRadius * 2, dragRadius * 2);
            return meeple;
        });
    };
    MeepleService.prototype.getColorForAnimal = function (animal) {
        switch (animal) {
            case Animal_1.Animal.Tiger:
                return "blue";
            case Animal_1.Animal.Goat:
                return "red";
        }
    };
    MeepleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MeepleService);
    return MeepleService;
}());
exports.MeepleService = MeepleService;
exports.TIGERS = [
    new meeple_1.Meeple(1, 100, 100, Animal_1.Animal.Tiger),
    new meeple_1.Meeple(2, 500, 100, Animal_1.Animal.Tiger),
    new meeple_1.Meeple(3, 100, 500, Animal_1.Animal.Tiger),
    new meeple_1.Meeple(4, 500, 500, Animal_1.Animal.Tiger)
];
exports.GOATS = [
    new meeple_1.Meeple(1, 100, 560, Animal_1.Animal.Goat),
    new meeple_1.Meeple(2, 100, 610, Animal_1.Animal.Goat),
    new meeple_1.Meeple(3, 100, 660, Animal_1.Animal.Goat),
    new meeple_1.Meeple(4, 100, 710, Animal_1.Animal.Goat),
    new meeple_1.Meeple(5, 200, 560, Animal_1.Animal.Goat),
    new meeple_1.Meeple(6, 200, 610, Animal_1.Animal.Goat),
    new meeple_1.Meeple(7, 200, 660, Animal_1.Animal.Goat),
    new meeple_1.Meeple(8, 200, 710, Animal_1.Animal.Goat),
    new meeple_1.Meeple(9, 300, 560, Animal_1.Animal.Goat),
    new meeple_1.Meeple(10, 300, 610, Animal_1.Animal.Goat),
    new meeple_1.Meeple(11, 300, 660, Animal_1.Animal.Goat),
    new meeple_1.Meeple(12, 300, 710, Animal_1.Animal.Goat),
    new meeple_1.Meeple(13, 400, 560, Animal_1.Animal.Goat),
    new meeple_1.Meeple(14, 400, 610, Animal_1.Animal.Goat),
    new meeple_1.Meeple(15, 400, 660, Animal_1.Animal.Goat),
    new meeple_1.Meeple(16, 400, 710, Animal_1.Animal.Goat),
    new meeple_1.Meeple(17, 500, 560, Animal_1.Animal.Goat),
    new meeple_1.Meeple(18, 500, 610, Animal_1.Animal.Goat),
    new meeple_1.Meeple(19, 500, 660, Animal_1.Animal.Goat),
    new meeple_1.Meeple(20, 500, 710, Animal_1.Animal.Goat),
];
//# sourceMappingURL=meeple.service.js.map