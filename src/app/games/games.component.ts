import {Component, OnInit} from '@angular/core';
import {GamesService} from '../shared/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  private searchString = '';

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getGamesFromLocalStorage();
  }

  removeGame(id: number) {
    this.gamesService.removeGame(id);
  }
}
