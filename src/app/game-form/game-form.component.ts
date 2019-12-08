import {Component, EventEmitter, Output} from '@angular/core';
import {Game} from '../app.component';

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

  isValid(data: Game): boolean {
    const {name, developer, platforms} = data;

    function isFieldValid(item: string): boolean {
      return !!item.trim();
    }

    return (
      isFieldValid(name) &&
      isFieldValid(developer) &&
      isFieldValid(platforms)
    );
  }

  onAddClick(): void {
    const game: Game = {
      id: Date.now(),
      name: this.name,
      developer: this.developer,
      platforms: this.platforms
    };
    if (this.isValid(game)) {
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
