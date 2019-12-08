import {Component, EventEmitter, Output} from '@angular/core';
import {Game} from '../shared/game.interface';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent {
  name = '';
  developer = '';
  platforms = '';
  error = '';

  @Output()
  add = new EventEmitter<Game>();

  private static isFieldValid(item: string): boolean {
    return !!item.trim();
  }

  private static isValid({name, developer, platforms}: Game): boolean {
    return (
      GameFormComponent.isFieldValid(name) &&
      GameFormComponent.isFieldValid(developer) &&
      GameFormComponent.isFieldValid(platforms)
    );
  }

  onAddClick(): void {
    const game: Game = {
      id: Date.now(),
      name: this.name,
      developer: this.developer,
      platforms: this.platforms
    };
    if (GameFormComponent.isValid(game)) {
      this.name = '';
      this.developer = '';
      this.platforms = '';
      this.error = '';
      this.add.emit(game);
    } else {
      this.error = 'Введены неверные данные';
    }

  }

}
