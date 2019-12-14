import {Pipe, PipeTransform} from '@angular/core';
import {GameModel} from '../models/game.model';


@Pipe({
  name: 'gamesFilter'
})
export class GamesFilterPipe implements PipeTransform {
  transform(games: GameModel[], search: string = ''): GameModel[] {
    if (!search.trim()) {
      return games;
    }

    return games.filter(game => {
      return game.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

}
