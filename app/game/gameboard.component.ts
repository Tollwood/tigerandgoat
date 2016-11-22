
import { Component, OnInit } from '@angular/core';
import {GameService} from "./game.service";
import {RenderService} from "./render.service";

import {Field} from "./units/field";

declare var createjs: any;

@Component({
  moduleId : module.id,
  selector: 'gameboard',
  templateUrl: 'gameboard.component.html',
})

export class GameboardComponent implements OnInit {
  constructor(
    private gameService : GameService,
    private renderService : RenderService) { }

  ngOnInit(): void {
    this.renderService.initBoard();

    let positions : Field[] = this.gameService.getFields();
    this.renderService.renderFields(positions);

    let meeples = this.gameService.getMeeples();
    this.renderService.renderMeeples(meeples);
    this.gameService.updateFields(meeples);

  }

}



