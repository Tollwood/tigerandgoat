import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }   from './app.component';
import { GameboardComponent }         from './game/gameboard.component';
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
    GameboardComponent
  ],
  providers: [
    RenderService,
    GameService],
  bootstrap: [
    AppComponent
  ]
})



export class AppModule { }

