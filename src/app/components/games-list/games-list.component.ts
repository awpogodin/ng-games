import {Component, OnInit} from '@angular/core';
import {GameModel} from '../../models/game.model';
import {RestApiService} from '../../shared/rest-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  searchString = '';

  games: GameModel[] = [];

  constructor(public restApiService: RestApiService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadGames();
  }

  deleteGame(id: string): void {
    this.restApiService.deleteGame(id).subscribe(() => {
      this.loadGames();
    });
  }

  private loadGames(): void {
    this.restApiService.getGames().subscribe(res => {
      console.log(res);
      this.games = res;
    });
  }
}
