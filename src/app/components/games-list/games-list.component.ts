import {Component, OnInit} from '@angular/core';
import {GameModel} from '../../models/game.model';
import {RestApiService} from '../../shared/rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {Unsubscribable} from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  games: GameModel[] = [];
  private search: string;

  private subscription: Unsubscribable;

  constructor(public restApiService: RestApiService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe(params => {
      this.search = params.get('search') || '';
      this.loadGames();
    });
  }

  deleteGame(id: string): void {
    this.restApiService.deleteGame(id).subscribe(() => {
      this.loadGames();
    });
  }

  private loadGames(): void {
    this.restApiService.getGames().subscribe(games => {
      this.games = games;
    });
  }
}
