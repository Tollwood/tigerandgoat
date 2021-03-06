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
var game_service_1 = require("./game.service");
var render_service_1 = require("./render.service");
var GameboardComponent = (function () {
    function GameboardComponent(gameService, renderService) {
        this.gameService = gameService;
        this.renderService = renderService;
    }
    GameboardComponent.prototype.ngOnInit = function () {
        this.renderService.initBoard();
        var positions = this.gameService.getFields();
        this.renderService.renderFields(positions);
        var meeples = this.gameService.getMeeples();
        this.renderService.renderMeeples(meeples);
        this.gameService.updateFields(meeples);
    };
    GameboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gameboard',
            templateUrl: 'gameboard.component.html',
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService, render_service_1.RenderService])
    ], GameboardComponent);
    return GameboardComponent;
}());
exports.GameboardComponent = GameboardComponent;
//# sourceMappingURL=gameboard.component.js.map