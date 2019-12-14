import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameModel} from '../../models/game.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input() game: GameModel;

  @Output() delete = new EventEmitter<void>();

  constructor(public router: Router) {
  }

  onDelete(): void {
    this.delete.emit();
  }

  onEdit(id: string) {
    this.router.navigate([`/games/${id}`]);
  }
}
