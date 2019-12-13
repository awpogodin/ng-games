import {Component, OnInit} from '@angular/core';
import {Game} from '../../shared/game.interface';

const GAMES = 'games';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  searchString = '';

  games: Game[];

  ngOnInit(): void {
    this.games = JSON.parse(localStorage.getItem(GAMES)) || [];
  }

  addGame(game: Game): void {
    this.games.push(game);
    localStorage.setItem(GAMES, JSON.stringify(this.games));
  }

  deleteGame(id: number): void {
    this.games = this.games.filter(g => g.id !== id);
    localStorage.setItem(GAMES, JSON.stringify(this.games));
  }
}
