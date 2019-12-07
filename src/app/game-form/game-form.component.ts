import {Component, OnInit} from '@angular/core';
import {Game, GamesService} from '../shared/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  name = '';
  developer = '';
  platforms = '';

  error = '';

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
  }

  addGame() {
    const game: Game = {
      id: Date.now(),
      name: this.name,
      developer: this.developer,
      platforms: this.platforms
    };
    if (this.gamesService.addGame(game)) {
      this.name = '';
      this.developer = '';
      this.platforms = '';
      this.error = '';
    } else {
      this.error = 'Введены неверные данные!';
    }
  }

}
