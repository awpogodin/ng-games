import {Pipe, PipeTransform} from '@angular/core';
import {Game} from './games.service';

@Pipe({
  name: 'gamesFilter'
})
export class GamesFilterPipe implements PipeTransform {
  transform(games: Game[], search: string = ''): Game[] {
    if (!search.trim()) {
      return games;
    }

    return games.filter(game => {
      return game.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

}
