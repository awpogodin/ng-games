import {Component, OnInit} from '@angular/core';
import {GameModel} from './models/game.model';

const GAMES = 'games';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchString = '';

  games: GameModel[];

  ngOnInit(): void {
    this.games = JSON.parse(localStorage.getItem(GAMES)) || [];
  }

  addGame(game: GameModel): void {
    this.games.push(game);
    localStorage.setItem(GAMES, JSON.stringify(this.games));
  }

  deleteGame(id: string): void {
    this.games = this.games.filter(g => g.id !== id);
    localStorage.setItem(GAMES, JSON.stringify(this.games));
  }
}
