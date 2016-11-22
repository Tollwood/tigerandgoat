import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }   from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }   from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';
import { GameboardComponent }         from './game/gameboard.component';
import { PositionService} from './game/position.service';
import { MeepleService} from './game/meeples/meeple.service';
import {GameService} from "./game/game.service";
import {RenderService} from "./game/render.service";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    GameboardComponent
  ],
  providers: [
    HeroService,
    RenderService,
    PositionService,
    MeepleService,
    GameService],
  bootstrap: [
    AppComponent
  ]
})



export class AppModule { }

