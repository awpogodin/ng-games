import {Component} from '@angular/core';
import {GameModel} from '../../models/game.model';

@Component({
  selector: 'app-game-form',
  templateUrl: './games-add.component.html',
  styleUrls: ['./games-add.component.scss']
})
export class GamesAddComponent {
  name = '';
  developer = '';
  platforms = '';
  error = '';

  private static isFieldValid(item: string): boolean {
    return !!item.trim();
  }

  private static isValid({name, developer, platforms}: GameModel): boolean {
    return (
      GamesAddComponent.isFieldValid(name) &&
      GamesAddComponent.isFieldValid(developer) &&
      GamesAddComponent.isFieldValid(platforms)
    );
  }

  onAddClick(): void {
    const game: GameModel = {
      name: this.name,
      developer: this.developer,
      platforms: this.platforms
    };
    if (GamesAddComponent.isValid(game)) {
      this.name = '';
      this.developer = '';
      this.platforms = '';
      this.error = '';
      // this.add.emit(game);
    } else {
      this.error = 'Введены неверные данные';
    }

  }

}
