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

  public games: Game[] = [
    {
      id: 1,
      name: 'GTA 5',
      developer: 'Rockstar Games',
      platforms: 'PC, XBOXONE, PS4, XBOX360, PS3',
    },
    {
      id: 2,
      name: 'RDR 2',
      developer: 'Rockstar Games',
      platforms: 'PC, XBOXONE, PS4',
    },
  ];

  addGame(game: Game): boolean {
    if (isValid(game)) {
      this.games.push(game);
      return true;
    }
    return false;
  }

  removeGame(id: number) {
    this.games = this.games.filter(g => g.id !== id);
  }
}
