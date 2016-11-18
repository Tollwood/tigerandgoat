import {Component, OnInit} from '@angular/core'
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  moduleId : module.id,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})

export class HeroesComponent implements  OnInit{

  constructor(
    private heroService: HeroService,
    private router : Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  title = 'Tour of Heroes';
  selectedHero : Hero;
  heroes : Hero[];

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}

