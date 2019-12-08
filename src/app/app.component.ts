import {Component} from '@angular/core';

export interface Game {
  id: number;
  name: string;
  developer: string;
  platforms: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchString = '';

  public games: Game[] = JSON.parse(localStorage.getItem('games')) || [];

  addGame(game: Game): void {
    this.games.push(game);
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  deleteGame(id: number): void {
    this.games = this.games.filter(g => g.id !== id);
    localStorage.setItem('games', JSON.stringify(this.games));
  }
}
