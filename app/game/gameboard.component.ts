
import { Component, OnInit } from '@angular/core';
import { PositionService} from './position.service';
import {MeepleService} from "./meeples/meeple.service";
import {GameService} from "./game.service";
import {RenderService} from "./render.service";

import {Position} from "./meeples/position";

declare var createjs: any;

@Component({
  moduleId : module.id,
  selector: 'gameboard',
  templateUrl: 'gameboard.component.html',
})

export class GameboardComponent implements OnInit {
  constructor(
    private positionService: PositionService,
    private meepleService: MeepleService,
    private gameService : GameService,
    private renderService : RenderService) { }

  ngOnInit(): void {
    this.renderService.initBoard();

    let positions : Position[] = this.positionService.initValidPositions();
    this.renderService.renderFields(positions);

    let meeples = this.meepleService.initMeeples();
    this.renderService.initMeeples(meeples);
    this.gameService.updateFields(meeples);

  }

}
