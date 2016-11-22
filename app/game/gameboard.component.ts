
import { Component, OnInit } from '@angular/core';
import {MeepleService} from "./meeples/meeple.service";
import {GameService} from "./game.service";
import {RenderService} from "./render.service";

import {Field} from "./meeples/field";

declare var createjs: any;

@Component({
  moduleId : module.id,
  selector: 'gameboard',
  templateUrl: 'gameboard.component.html',
})

export class GameboardComponent implements OnInit {
  constructor(
    private meepleService: MeepleService,
    private gameService : GameService,
    private renderService : RenderService) { }

  ngOnInit(): void {
    this.renderService.initBoard();

    let positions : Field[] = this.gameService.getFields();
    this.renderService.renderFields(positions);

    let meeples = this.meepleService.initMeeples();
    this.renderService.initMeeples(meeples);
    this.gameService.updateFields(meeples);

  }

}



