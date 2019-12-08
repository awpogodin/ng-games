import {Component, OnInit} from '@angular/core';
import {GamesService} from '../shared/games.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  private searchString = '';

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getGamesFromLocalStorage();
  }

  removeGame(id: number) {
    this.gamesService.removeGame(id);
  }
}
