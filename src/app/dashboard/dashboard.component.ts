import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroSerivce:HeroService) { }

  ngOnInit(): void {

    this.getHeroes();
  }

  heroes : Hero[] = [];

  getHeroes()
  {
    this.heroSerivce.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0,3));
  }

}
