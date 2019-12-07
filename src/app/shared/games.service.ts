import {Injectable} from '@angular/core';

export interface Game {
  id: number;
  name: string;
  developer: string;
  platforms: string;
}

function isValid(data): boolean {
  const {name, developer, platforms} = data;
  return (
    name.trim() &&
    developer.trim() &&
    platforms.trim()
  );
}

@Injectable({providedIn: 'root'})
export class GamesService {

  constructor() {
  }

  public games: Game[] = [];

  getGamesFromLocalStorage() {
    this.games = JSON.parse(localStorage.getItem('games')) || [];
  }

  addGame(game: Game): boolean {
    if (isValid(game)) {
      this.games.push(game);
      localStorage.setItem('games', JSON.stringify(this.games));
      return true;
    }
    return false;
  }

  removeGame(id: number) {
    this.games = this.games.filter(g => g.id !== id);
  }
}
