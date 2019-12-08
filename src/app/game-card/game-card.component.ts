import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from '../shared/game.interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input() game: Game;

  @Output() delete = new EventEmitter<void>();

  onDelete(): void {
    this.delete.emit();
  }
}
